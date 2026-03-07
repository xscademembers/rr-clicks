import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function HomeImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [useFallback, setUseFallback] = useState(false);
  return (
    <img
      src={useFallback ? fallback : src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-700 motion-safe:duration-300 group-hover:scale-105"
      referrerPolicy="no-referrer"
      onError={() => setUseFallback(true)}
    />
  );
}

const FALLBACK_IMAGES: Record<string, string> = {
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
  normal: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
  events: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
  led: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop',
};
const ABOUT_FALLBACK = 'https://images.unsplash.com/photo-1554046920-90dcac824104?q=80&w=1000&auto=format&fit=crop';

const CATEGORIES = ['wedding', 'normal', 'events', 'led'];
const isImageFile = (name: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(name);

export default function Home() {
  const [featuredByCategory, setFeaturedByCategory] = useState<Record<string, string>>({});

  // Load first image from each category (Dashboard uploads) so Home shows client's images
  useEffect(() => {
    const loadFeatured = async () => {
      const results = await Promise.all(
        CATEGORIES.map(async (category) => {
          try {
            const res = await fetch(`/api/media/${category}`);
            if (!res.ok) return { category, url: null };
            const text = await res.text();
            let data: { name?: string; url?: string; download_url?: string }[];
            try {
              data = JSON.parse(text);
            } catch {
              return { category, url: null };
            }
            const firstImage = Array.isArray(data)
              ? data.find((f: { name: string }) => isImageFile(f.name))
              : null;
            const url = firstImage?.url ?? (firstImage as { download_url?: string })?.download_url ?? null;
            return { category, url };
          } catch {
            return { category, url: null };
          }
        })
      );
      const map: Record<string, string> = {};
      results.forEach(({ category, url }) => {
        if (url) map[category] = url;
      });
      setFeaturedByCategory((prev) => ({ ...prev, ...map }));
    };
    loadFeatured();
  }, []);

  const services = [
    { title: 'Wedding', slug: 'wedding', link: '/wedding' },
    { title: 'Normal', slug: 'normal', link: '/normal' },
    { title: 'Events', slug: 'events', link: '/events' },
    { title: 'LED Screens', slug: 'led', link: '/led' },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Hero / Services Section */}
      <section className="relative w-full max-w-[1600px] mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="services-heading">
        {/* Decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none z-0">
          <span className="text-[16vw] font-black text-gray-100 leading-none tracking-tighter select-none lowercase" aria-hidden>
            services
          </span>
        </div>

        <div className="relative z-10">
          {/* Section header: title + paragraph */}
          <header className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-primary)] mb-4">
              What we offer
            </p>
            <h2 id="services-heading" className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-secondary)] tracking-tight mb-6">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              From intimate weddings to large-scale events, we capture every moment with care. Explore our photography and LED screen services below—each crafted to bring your vision to life.
            </p>
          </header>

          {/* Grid of 4 service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group block aspect-square relative overflow-hidden bg-gray-100 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
              >
                {featuredByCategory[service.slug] ? (
                  <HomeImage
                    src={featuredByCategory[service.slug]}
                    fallback={FALLBACK_IMAGES[service.slug] ?? FALLBACK_IMAGES.wedding}
                    alt={service.title}
                  />
                ) : (
                  <HomeImage
                    src={`/images/home/${service.slug}.jpg`}
                    fallback={FALLBACK_IMAGES[service.slug] ?? FALLBACK_IMAGES.wedding}
                    alt={service.title}
                  />
                )}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-300 motion-safe:duration-150" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white font-serif text-2xl sm:text-3xl font-bold tracking-wide drop-shadow-md">
                    {service.title}
                  </h3>
                  <span className="text-white/90 text-sm font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-safe:duration-150">
                    View gallery →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 rounded-lg grayscale hover:grayscale-0 transition-all duration-700 motion-safe:duration-300">
              <HomeImage
                src="/images/home/about.jpg"
                fallback={ABOUT_FALLBACK}
                alt="Photographer"
              />
            </div>
            
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-8 tracking-wide">
                About RR Clicks
              </h2>
              <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed">
                <p>
                  Founded with a passion for visual storytelling, RR Clicks has grown into a premier photography and videography studio. We believe that every moment is unique and deserves to be captured with authenticity and artistic flair.
                </p>
                <p>
                  Our team of dedicated professionals specializes in a diverse range of services, from the intimate moments of a wedding to the grand scale of corporate events. We don't just take pictures; we craft memories that last a lifetime.
                </p>
                <p>
                  With state-of-the-art equipment, including our premium LED screen setups, we ensure that your events are not only captured beautifully but experienced vividly by every guest.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-gray-200 pt-8">
                <div>
                  <div className="font-sans text-4xl font-black text-secondary mb-2">500+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Events Covered</div>
                </div>
                <div>
                  <div className="font-sans text-4xl font-black text-secondary mb-2">10+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
