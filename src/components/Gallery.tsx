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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none z-0">
          <h1 className="text-[12vw] font-black text-[var(--color-surface-light)] leading-none tracking-tighter select-none lowercase whitespace-nowrap">
            {category}
          </h1>
        </div>
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">Portfolio</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-secondary mb-6 tracking-tight">
            {title}
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-xl text-muted max-w-2xl mx-auto font-light tracking-wide">
            {description}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-accent p-8 border border-accent/30 rounded-sm bg-accent/10">
          <p className="font-medium">Failed to load gallery: {error}</p>
          <p className="text-sm mt-2 text-accent/70">Please ensure GitHub credentials are configured in the environment.</p>
        </div>
      ) : media.length === 0 ? (
        <div className="text-center text-muted p-16 border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)]">
          <p className="text-xl font-serif italic text-secondary">No media found for {title}.</p>
          <p className="mt-2 text-sm text-muted">Upload some images from the dashboard to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {media.map((item) => {
            const isVideo = /\.(mp4|webm)$/i.test(item.name);
            return (
              <div key={item.sha} className="group relative overflow-hidden bg-[var(--color-surface)] rounded-sm border border-[var(--color-border)]">
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
