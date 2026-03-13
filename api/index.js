/**
 * Vercel serverless API – runs automatically after deploy. No separate server.
 * Uses GitHub for media and contacts (set GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO in Vercel env).
 * After adding env vars in Vercel, you must Redeploy for them to take effect.
 */
import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

function isGitHubConfigured() {
  return !!(GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO);
}

async function githubRequest(endpoint, method = 'GET', body) {
  if (!isGitHubConfigured()) throw new Error('GitHub credentials not configured');
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}${endpoint}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`GitHub API Error (${res.status}):`, text);
    throw new Error(`GitHub API Error: ${res.statusText}`);
  }
  return res.json();
}

const CONTACTS_PATH = 'data/contacts.json';

app.get('/api/contacts', async (req, res) => {
  try {
    if (!isGitHubConfigured()) return res.json([]);
    const file = await githubRequest(`/contents/${CONTACTS_PATH}`);
    const content = Buffer.from(file.content, 'base64').toString('utf8');
    const data = JSON.parse(content);
    res.json(Array.isArray(data) ? data : []);
  } catch (e) {
    if (e.message?.includes('404') || e.message?.includes('Not Found')) return res.json([]);
    console.error('Error fetching contacts:', e);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    if (!isGitHubConfigured()) {
      return res.status(503).json({
        error: 'Contact form requires GitHub configuration. Add GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO in Vercel environment.',
      });
    }
    const { name, email, phone, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    let list = [];
    let sha = null;
    try {
      const file = await githubRequest(`/contents/${CONTACTS_PATH}`);
      sha = file.sha;
      const content = Buffer.from(file.content, 'base64').toString('utf8');
      list = JSON.parse(content);
      if (!Array.isArray(list)) list = [];
    } catch (e) {
      if (!e.message?.includes('404') && !e.message?.includes('Not Found')) {
        console.error('Error reading contacts file:', e);
        return res.status(500).json({ error: 'Failed to read contacts' });
      }
    }
    const entry = {
      id: Date.now(),
      name,
      email,
      phone: phone || '',
      message,
      created_at: new Date().toISOString(),
    };
    list.unshift(entry);
    const content = Buffer.from(JSON.stringify(list, null, 2)).toString('base64');
    if (sha) {
      await githubRequest(`/contents/${CONTACTS_PATH}`, 'PUT', {
        message: 'Add contact submission',
        content,
        sha,
      });
    } else {
      await githubRequest(`/contents/${CONTACTS_PATH}`, 'PUT', {
        message: 'Create contacts file',
        content,
      });
    }
    res.status(201).json({ success: true });
  } catch (e) {
    console.error('Error saving contact:', e);
    res.status(500).json({ error: e.message || 'Failed to save contact' });
  }
});

app.get('/api/media/:category', async (req, res) => {
  try {
    if (!isGitHubConfigured()) return res.json([]);
    const { category } = req.params;
    try {
      const files = await githubRequest(`/contents/${category}`);
      if (Array.isArray(files)) {
        res.json(files.map((f) => ({
          name: f.name,
          url: f.download_url,
          sha: f.sha,
          path: f.path,
        })));
      } else {
        res.json([]);
      }
    } catch (e) {
      if (e.message?.includes('404')) res.json([]);
      else throw e;
    }
  } catch (e) {
    console.error('Error fetching media:', e);
    res.status(500).json({ error: e.message || 'Failed to fetch media' });
  }
});

app.post('/api/media/:category', upload.single('file'), async (req, res) => {
  try {
    if (!isGitHubConfigured()) {
      return res.status(503).json({
        error: 'Media uploads require GitHub configuration. Add GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO in Vercel environment.',
      });
    }
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    const { category } = req.params;
    const fileName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const filePath = `${category}/${fileName}`;
    const content = file.buffer.toString('base64');
    const result = await githubRequest(`/contents/${filePath}`, 'PUT', {
      message: `Upload ${fileName} to ${category}`,
      content,
    });
    res.status(201).json({
      success: true,
      file: {
        name: result.content.name,
        url: result.content.download_url,
        sha: result.content.sha,
        path: result.content.path,
      },
    });
  } catch (e) {
    console.error('Error uploading media:', e);
    res.status(500).json({ error: e.message || 'Failed to upload media' });
  }
});

app.delete('/api/media', async (req, res) => {
  try {
    if (!isGitHubConfigured()) {
      return res.status(503).json({
        error: 'Delete requires GitHub configuration. Add GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO in Vercel environment.',
      });
    }
    const { path: filePath, sha } = req.body || {};
    if (!filePath || !sha) return res.status(400).json({ error: 'Path and SHA are required' });
    await githubRequest(`/contents/${filePath}`, 'DELETE', { message: `Delete ${filePath}`, sha });
    res.json({ success: true });
  } catch (e) {
    console.error('Error deleting media:', e);
    res.status(500).json({ error: e.message || 'Failed to delete media' });
  }
});

export default app;
