import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

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
          setError('Server not available. Run the app with npm run dev.');
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
          <h1 className="text-[12vw] font-black text-gray-50 leading-none tracking-tighter select-none lowercase whitespace-nowrap">
            {category}
          </h1>
        </div>
        <div className="relative z-10">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-secondary mb-6 tracking-tight">
            {title}
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light tracking-wide">
            {description}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8 border border-red-100 rounded-2xl bg-red-50">
          <p className="font-medium">Failed to load gallery: {error}</p>
          <p className="text-sm mt-2 text-red-400">Please ensure GitHub credentials are configured in the environment.</p>
        </div>
      ) : media.length === 0 ? (
        <div className="text-center text-gray-500 p-16 border border-gray-200 rounded-2xl bg-gray-50">
          <p className="text-xl font-serif italic">No media found for {title}.</p>
          <p className="mt-2 text-sm">Upload some images from the dashboard to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {media.map((item) => {
            const isVideo = /\.(mp4|webm)$/i.test(item.name);
            return (
              <div key={item.sha} className="group relative aspect-square overflow-hidden bg-gray-100">
                {isVideo ? (
                  <video 
                    src={item.url} 
                    controls 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 motion-safe:duration-300"
                  />
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 motion-safe:duration-300"
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
