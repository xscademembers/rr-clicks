import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Image as ImageIcon, Video, FileText, Loader2, AlertCircle, Lock } from 'lucide-react';
import { getApiUnavailableMessage } from '../utils/apiError';

const DASHBOARD_STORAGE_KEY = 'rr_dashboard';
const DASHBOARD_PASSWORD = 'admin123';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

interface MediaItem {
  name: string;
  url: string;
  sha: string;
  path: string;
}

function getDashboardUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(DASHBOARD_STORAGE_KEY) === '1';
}

export default function Dashboard() {
  const [unlocked, setUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [activeTab, setActiveTab] = useState<'media' | 'contacts'>('media');
  const [category, setCategory] = useState('events');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaHint, setMediaHint] = useState<string | null>(null);

  useEffect(() => {
    setUnlocked(getDashboardUnlocked());
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(false);
    if (passwordInput === DASHBOARD_PASSWORD) {
      sessionStorage.setItem(DASHBOARD_STORAGE_KEY, '1');
      setUnlocked(true);
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  const categories = [
    { id: 'events', name: 'Events' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'normal', name: 'Normal Photography' },
    { id: 'led', name: 'LED Screens' },
    { id: 'led-walls', name: 'LED Walls' },
  ];

  useEffect(() => {
    if (activeTab === 'media') {
      fetchMedia();
    } else {
      fetchContacts();
    }
  }, [activeTab, category]);

  const fetchMedia = async () => {
    setLoading(true);
    setMediaHint(null);
    try {
      const response = await fetch(`/api/media/${category}`);
      if (!response.ok) throw new Error('Failed to fetch media');
      const text = await response.text();
      let data: MediaItem[];
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(getApiUnavailableMessage());
      }
      setMedia(Array.isArray(data) ? data : []);
    } catch {
      setMedia([]);
      setMediaHint(getApiUnavailableMessage());
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const text = await response.text();
      let data: ContactSubmission[];
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(getApiUnavailableMessage());
      }
      setContacts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/media/${category}`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const text = await response.text();
        let errMsg = 'Upload failed';
        try {
          const errData = JSON.parse(text);
          if (errData?.error) errMsg = errData.error;
        } catch {
          errMsg = getApiUnavailableMessage();
        }
        throw new Error(errMsg);
      }
      
      await fetchMedia();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (path: string, sha: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, sha }),
      });
      
      if (!response.ok) throw new Error('Delete failed');
      
      await fetchMedia();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-8">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[var(--color-surface-light)] flex items-center justify-center">
              <Lock className="w-7 h-7 text-[var(--color-primary)]" />
            </div>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] text-center mb-2">Dashboard</h2>
          <p className="text-[var(--color-muted)] text-sm text-center mb-6">Enter password to continue.</p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[var(--color-surface-light)] border border-[var(--color-border)] rounded-sm text-[var(--color-secondary)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
              autoFocus
              autoComplete="current-password"
            />
            {passwordError && (
              <p className="text-[var(--color-accent-light)] text-sm">Incorrect password.</p>
            )}
            <button
              type="submit"
              className="w-full border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] font-semibold py-3 rounded-sm transition-all duration-300"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto w-full">
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)] mb-2 tracking-wide">
          Dashboard
        </h1>
        <p className="text-[var(--color-muted)]">Manage your portfolio and view leads.</p>
      </div>

      <div className="flex space-x-4 mb-8 border-b border-[var(--color-border)] pb-4">
        <button
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-2 px-6 py-3 rounded-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
            activeTab === 'media' 
              ? 'bg-[var(--color-primary)] text-[var(--color-bg)]' 
              : 'bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30'
          }`}
        >
          <ImageIcon className="w-5 h-5" /> Media Manager
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`flex items-center gap-2 px-6 py-3 rounded-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
            activeTab === 'contacts' 
              ? 'bg-[var(--color-primary)] text-[var(--color-bg)]' 
              : 'bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30'
          }`}
        >
          <FileText className="w-5 h-5" /> Leads
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-sm flex items-start gap-3 text-[var(--color-accent-light)]">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Error</p>
            <p className="text-sm">{error}</p>
            {(error.includes('credentials') || error.includes('GitHub configuration')) && (
              <p className="text-xs mt-2 text-[var(--color-muted)] font-medium">
                Add GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO to your environment (e.g. in Vercel project settings) to enable uploads.
              </p>
            )}
          </div>
        </div>
      )}

      {mediaHint && activeTab === 'media' && !error && (
        <div className="mb-8 p-4 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-sm text-[var(--color-secondary)] text-sm">
          <p className="font-medium text-[var(--color-primary)]">Media not connected</p>
          <p className="mt-1 text-[var(--color-muted)]">{mediaHint}</p>
        </div>
      )}

      {activeTab === 'media' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--color-surface)] p-6 rounded-sm border border-[var(--color-border)]">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-300 ${
                    category === cat.id
                      ? 'bg-[var(--color-primary)] text-[var(--color-bg)] border border-[var(--color-primary)]'
                      : 'bg-[var(--color-surface-light)] text-[var(--color-muted)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:text-[var(--color-primary)]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleUpload}
                disabled={uploading}
              />
              <label
                htmlFor="file-upload"
                className={`flex items-center gap-2 px-6 py-3 rounded-sm font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                  uploading
                    ? 'bg-[var(--color-surface-light)] text-[var(--color-muted)] cursor-not-allowed'
                    : 'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)]'
                }`}
              >
                {uploading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</>
                ) : (
                  <><Upload className="w-5 h-5" /> Upload File</>
                )}
              </label>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-muted)] bg-[var(--color-surface)] rounded-sm border border-[var(--color-border)]">
              No media found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item) => {
                const isVideo = /\.(mp4|webm)$/i.test(item.name);
                return (
                  <div key={item.sha} className="group relative rounded-sm overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
                    {isVideo ? (
                      <video 
                        src={item.url} 
                        controls 
                        className="w-full h-auto max-h-48 object-contain"
                      />
                    ) : (
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        className="w-full h-auto object-contain"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute inset-0 bg-[var(--color-bg)]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                      <p className="text-xs text-[var(--color-secondary)] truncate w-full text-center mb-4">{item.name}</p>
                      <button
                        onClick={() => handleDelete(item.path, item.sha)}
                        className="p-2 bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-light)] rounded-full transition-colors"
                        title="Delete file"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="bg-[var(--color-surface)] rounded-sm border border-[var(--color-border)] overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-muted)]">
              No contact submissions yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[var(--color-muted)]">
                <thead className="text-xs text-[var(--color-primary)] uppercase bg-[var(--color-surface-light)] border-b border-[var(--color-border)] font-semibold">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface-light)]">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-[var(--color-secondary)]">
                        {contact.name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-[var(--color-secondary)]">{contact.email}</div>
                        <div className="text-[var(--color-muted)]/60">{contact.phone}</div>
                      </td>
                      <td className="px-6 py-4 max-w-md truncate" title={contact.message}>
                        {contact.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
