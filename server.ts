import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import multer from 'multer';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new Database('contacts.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Multer for file uploads (in memory)
const upload = multer({ storage: multer.memoryStorage() });

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

// Helper to interact with GitHub API
async function githubRequest(endpoint: string, method: string = 'GET', body?: any) {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    throw new Error('GitHub credentials not configured');
  }

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}${endpoint}`;
  const response = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`GitHub API Error (${response.status}):`, errorText);
    throw new Error(`GitHub API Error: ${response.statusText}`);
  }

  return response.json();
}

// API Routes

// Contacts
app.post('/api/contacts', (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const stmt = db.prepare('INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)');
    stmt.run(name, email, phone, message);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

app.get('/api/contacts', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC');
    const contacts = stmt.all();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

function isGitHubConfigured() {
  return !!(GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO);
}

// Media (GitHub Integration) – works without GitHub: returns empty list, upload/delete return clear error
app.get('/api/media/:category', async (req, res) => {
  try {
    if (!isGitHubConfigured()) {
      return res.json([]);
    }
    const { category } = req.params;
    try {
      const files = await githubRequest(`/contents/${category}`);
      if (Array.isArray(files)) {
        res.json(files.map(f => ({
          name: f.name,
          url: f.download_url,
          sha: f.sha,
          path: f.path
        })));
      } else {
        res.json([]);
      }
    } catch (e: any) {
      if (e.message.includes('404')) {
        res.json([]);
      } else {
        throw e;
      }
    }
  } catch (error: any) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch media' });
  }
});

app.post('/api/media/:category', upload.single('file'), async (req, res) => {
  try {
    if (!isGitHubConfigured()) {
      return res.status(503).json({
        error: 'Media uploads require GitHub configuration. Add GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO to your environment.',
      });
    }
    const { category } = req.params;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const filePath = `${category}/${fileName}`;
    const content = file.buffer.toString('base64');

    const result = await githubRequest(`/contents/${filePath}`, 'PUT', {
      message: `Upload ${fileName} to ${category}`,
      content: content,
    });

    res.status(201).json({
      success: true,
      file: {
        name: result.content.name,
        url: result.content.download_url,
        sha: result.content.sha,
        path: result.content.path
      }
    });
  } catch (error: any) {
    console.error('Error uploading media:', error);
    res.status(500).json({ error: error.message || 'Failed to upload media' });
  }
});

app.delete('/api/media', async (req, res) => {
  try {
    if (!isGitHubConfigured()) {
      return res.status(503).json({
        error: 'Media delete requires GitHub configuration. Add GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO to your environment.',
      });
    }
    const { path, sha } = req.body;
    if (!path || !sha) {
      return res.status(400).json({ error: 'Path and SHA are required' });
    }

    await githubRequest(`/contents/${path}`, 'DELETE', {
      message: `Delete ${path}`,
      sha: sha,
    });

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting media:', error);
    res.status(500).json({ error: error.message || 'Failed to delete media' });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
