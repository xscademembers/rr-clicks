import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Image as ImageIcon, Video, FileText, Loader2, AlertCircle } from 'lucide-react';
import { getApiUnavailableMessage } from '../utils/apiError';

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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'media' | 'contacts'>('media');
  const [category, setCategory] = useState('events');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaHint, setMediaHint] = useState<string | null>(null);

  const categories = [
    { id: 'events', name: 'Events' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'normal', name: 'Normal Photography' },
    { id: 'led', name: 'LED Screens' },
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
      
      await fetchMedia(); // Refresh list
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
      
      await fetchMedia(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto w-full">
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-secondary mb-2 uppercase tracking-wide">
          Dashboard
        </h1>
        <p className="text-gray-500">Manage your portfolio and view leads.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-4">
        <button
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'media' 
              ? 'bg-secondary text-white' 
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-secondary'
          }`}
        >
          <ImageIcon className="w-5 h-5" /> Media Manager
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'contacts' 
              ? 'bg-secondary text-white' 
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-secondary'
          }`}
        >
          <FileText className="w-5 h-5" /> Leads
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Error</p>
            <p className="text-sm">{error}</p>
            {(error.includes('credentials') || error.includes('GitHub configuration')) && (
              <p className="text-xs mt-2 text-red-500 font-medium">
                Add GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO to your environment (e.g. in Vercel project settings) to enable uploads.
              </p>
            )}
          </div>
        </div>
      )}

      {mediaHint && activeTab === 'media' && !error && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-sm">
          <p className="font-medium">Media not connected</p>
          <p className="mt-1">{mediaHint}</p>
        </div>
      )}

      {activeTab === 'media' && (
        <div className="space-y-8">
          {/* Category Selector & Upload */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                    category === cat.id
                      ? 'bg-primary text-secondary border border-primary'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300'
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
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-black uppercase tracking-wider cursor-pointer transition-colors ${
                  uploading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-secondary text-white hover:bg-secondary/90'
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

          {/* Media Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-gray-200">
              No media found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item) => {
                const isVideo = /\.(mp4|webm)$/i.test(item.name);
                return (
                  <div key={item.sha} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                    {isVideo ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Video className="w-12 h-12 text-gray-400" />
                      </div>
                    ) : (
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                      <p className="text-xs text-white truncate w-full text-center mb-4">{item.name}</p>
                      <button
                        onClick={() => handleDelete(item.path, item.sha)}
                        className="p-2 bg-red-500 text-white hover:bg-red-600 rounded-full transition-colors shadow-lg"
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
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No contact submissions yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="text-xs text-secondary uppercase bg-gray-50 border-b border-gray-200 font-bold">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-bold text-secondary">
                        {contact.name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{contact.email}</div>
                        <div className="text-gray-400">{contact.phone}</div>
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
