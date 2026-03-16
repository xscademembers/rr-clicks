import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getApiUnavailableMessage } from '../utils/apiError';

interface MediaItem {
  name: string;
  url: string;
  sha: string;
  path: string;
}

interface GalleryProps {
  category: string;
  title: string;
  description: string;
}

export default function Gallery({ category, title, description }: GalleryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`/api/media/${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch media');
        }
        const text = await response.text();
        let data: MediaItem[];
        try {
          data = JSON.parse(text);
        } catch {
          setError(getApiUnavailableMessage());
          setMedia([]);
          setLoading(false);
          return;
        }
        const list = Array.isArray(data) ? data : [];
        const filtered = list.filter((item: MediaItem) =>
          /\.(jpg|jpeg|png|gif|mp4|webm)$/i.test(item.name)
        );
        setMedia(filtered);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [category]);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto w-full">
      <div className="text-center mb-16 relative">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
            Gallery
          </p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-[var(--color-secondary)] mb-4 tracking-tight">
            {title}
          </h2>
          <div className="w-12 h-0.5 bg-[var(--color-primary)] mx-auto mb-6" />
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto font-light tracking-wide">
            {description}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-[var(--color-accent-light)] p-8 border border-[var(--color-accent)]/30 rounded-sm bg-[var(--color-accent)]/10">
          <p className="font-medium">Failed to load gallery: {error}</p>
          <p className="text-sm mt-2 text-[var(--color-muted)]">Please ensure GitHub credentials are configured in the environment.</p>
        </div>
      ) : media.length === 0 ? (
        <div className="text-center text-[var(--color-muted)] p-16 border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)]">
          <p className="text-xl font-serif italic text-[var(--color-secondary)]">No media found for {title}.</p>
          <p className="mt-2 text-sm">Upload some images from the dashboard to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {media.map((item) => {
            const isVideo = /\.(mp4|webm)$/i.test(item.name);
            return (
              <div key={item.sha} className="group relative overflow-hidden bg-[var(--color-surface)] rounded-sm">
                {isVideo ? (
                  <video 
                    src={item.url} 
                    controls 
                    className="w-full h-auto max-h-[400px] object-contain group-hover:scale-[1.02] transition-transform duration-300 motion-safe:duration-150"
                  />
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.name} 
                    className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-300 motion-safe:duration-150"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 border border-[var(--color-primary)]/0 group-hover:border-[var(--color-primary)]/20 transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
