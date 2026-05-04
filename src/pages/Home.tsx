import { Link } from 'react-router-dom';
import { mediaListApiUrls } from '../utils/mediaApi';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function HeroSlideImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [useFallback, setUseFallback] = useState(false);
  return (
    <img
      src={useFallback ? fallback : src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      referrerPolicy="no-referrer"
      onError={() => setUseFallback(true)}
    />
  );
}

function HomeImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [useFallback, setUseFallback] = useState(false);
  return (
    <img
      src={useFallback ? fallback : src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-700 motion-safe:duration-300 group-hover:scale-110"
      referrerPolicy="no-referrer"
      onError={() => setUseFallback(true)}
    />
  );
}

const FALLBACK_IMAGES: Record<string, string> = {
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
  ads: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
  events: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
  led: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop',
};
const ABOUT_FALLBACK = 'https://images.unsplash.com/photo-1554046920-90dcac824104?q=80&w=1000&auto=format&fit=crop';

/** Hero slides — files in `public/images/hero/` (see repo `wedding/` / `events/` sources). */
const HERO_SLIDES = [
  {
    src: '/images/hero/hero-slide-1.jpeg',
    fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80',
    alt: 'Wedding celebration',
  },
  {
    src: '/images/hero/hero-slide-2.jpeg',
    fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80',
    alt: 'Wedding moment',
  },
  {
    src: '/images/hero/hero-slide-3.jpeg',
    fallback: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80',
    alt: 'Event photography',
  },
  {
    src: '/images/hero/hero-slide-4.jpeg',
    fallback: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80',
    alt: 'Live event',
  },
  {
    src: '/images/hero/hero-slide-5.jpeg',
    fallback: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80',
    alt: 'Event atmosphere',
  },
] as const;

const CATEGORIES = ['wedding', 'ads', 'events', 'led'];
/** Pinned landing-page wedding card (see `public/images/home/wedding.jpg`). */
const WEDDING_CARD_IMAGE = '/images/home/wedding.jpg';
/** Pinned landing-page events card (see `public/images/home/events.jpg`). */
const EVENTS_CARD_IMAGE = '/images/home/events.jpg';
/** Pinned landing-page LED Screens card (see `public/images/hero/led-tv.jpg`). */
const LED_CARD_IMAGE = '/images/hero/led-tv.jpg';
/** About section image (see `public/images/Gemini_Generated_Image_iyrjc0iyrjc0iyrj.png`). */
const ABOUT_SECTION_IMAGE = '/images/Gemini_Generated_Image_iyrjc0iyrjc0iyrj.png';
const isImageFile = (name: string) =>
  /\.(jpg|jpeg|jfif|png|gif|webp|bmp)$/i.test(name);

export default function Home() {
  const [featuredByCategory, setFeaturedByCategory] = useState<Record<string, string>>({});
  const [heroIndex, setHeroIndex] = useState(0);

  const heroGo = useCallback((delta: number) => {
    setHeroIndex((i) => (i + delta + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const loadFeatured = async () => {
      const results = await Promise.all(
        CATEGORIES.map(async (category) => {
          try {
            for (const url of mediaListApiUrls(category)) {
              const res = await fetch(url);
              if (!res.ok) continue;
              const text = await res.text();
              let data: { name?: string; url?: string; download_url?: string }[];
              try {
                data = JSON.parse(text);
              } catch {
                continue;
              }
              const firstImage = Array.isArray(data)
                ? data.find((f: { name: string }) => isImageFile(f.name))
                : null;
              const imageUrl =
                firstImage?.url ?? (firstImage as { download_url?: string })?.download_url ?? null;
              if (imageUrl) return { category, url: imageUrl };
            }
            return { category, url: null };
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
    { title: 'Wedding', slug: 'wedding', link: '/wedding', tagline: 'Timeless Elegance' },
    { title: 'Ads', slug: 'ads', link: '/ads', tagline: 'Campaign Ready' },
    { title: 'Events', slug: 'events', link: '/events', tagline: 'Grand Moments' },
    { title: 'LED Screens', slug: 'led', link: '/led', tagline: 'Vivid Displays' },
  ];

  return (
    <div className="flex flex-col bg-[var(--color-bg)]">
      {/* Hero Section — image slider */}
      <section
        className="relative w-full min-h-[min(88vh,920px)] flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-labelledby="hero-heading"
        aria-roledescription="carousel"
      >
        <div className="absolute inset-0" aria-hidden>
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === heroIndex ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <HeroSlideImage src={slide.src} fallback={slide.fallback} alt={slide.alt} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[var(--color-bg)]/75 to-[#1a0a05]/85 pointer-events-none z-[1]" />
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none z-[1]"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, var(--color-primary) 0%, transparent 50%)' }}
        />

        <div className="relative z-10 max-w-[1600px] mx-auto text-center py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)] mb-6">
            Premium Photography & Videography
          </p>
          <h1 id="hero-heading" className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-light text-[var(--color-secondary)] tracking-wide mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Crafting <em className="text-[var(--color-primary)] font-light">Timeless</em> Memories
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto font-light leading-relaxed mb-10">
            From intimate weddings to large-scale events, we capture every moment with care and artistry. Experience premier photography that tells your story.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 rounded-sm"
          >
            Book Now <span className="text-lg">&rarr;</span>
          </Link>
        </div>

        <div className="relative z-10 flex justify-center gap-2 pb-10 mt-auto">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setHeroIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 ${
                i === heroIndex ? 'w-10 bg-[var(--color-primary)]' : 'w-2 bg-white/35 hover:bg-white/55'
              }`}
              aria-label={`Go to slide ${i + 1}: ${slide.alt}`}
              aria-pressed={i === heroIndex}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => heroGo(-1)}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full border border-white/20 bg-black/30 text-white/90 hover:bg-black/50 hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-7 h-7" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => heroGo(1)}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full border border-white/20 bg-black/30 text-white/90 hover:bg-black/50 hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Next slide"
        >
          <ChevronRight className="w-7 h-7" strokeWidth={1.5} />
        </button>

        <p className="sr-only" aria-live="polite">
          Slide {heroIndex + 1} of {HERO_SLIDES.length}: {HERO_SLIDES[heroIndex].alt}
        </p>
      </section>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center py-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-primary)]/40" />
        <div className="w-2 h-2 rotate-45 border border-[var(--color-primary)]/40 mx-4" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-primary)]/40" />
      </div>

      {/* Services Section */}
      <section className="relative w-full max-w-[1600px] mx-auto pt-12 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="services-heading">
        <div className="relative z-10">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
              What we offer
            </p>
            <h2 id="services-heading" className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-secondary)] tracking-tight mb-6">
              Our Services
            </h2>
            <div className="w-12 h-0.5 bg-[var(--color-primary)] mx-auto mb-6" />
            <p className="text-base text-[var(--color-muted)] font-light leading-relaxed">
              Each service is crafted to bring your vision to life with uncompromising quality and an eye for the extraordinary.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group block aspect-[3/4] relative overflow-hidden bg-[var(--color-surface)] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              >
                {service.slug === 'wedding' ? (
                  <HomeImage
                    src={WEDDING_CARD_IMAGE}
                    fallback={FALLBACK_IMAGES.wedding}
                    alt={service.title}
                  />
                ) : service.slug === 'events' ? (
                  <HomeImage
                    src={EVENTS_CARD_IMAGE}
                    fallback={FALLBACK_IMAGES.events}
                    alt={service.title}
                  />
                ) : service.slug === 'led' ? (
                  <HomeImage
                    src={LED_CARD_IMAGE}
                    fallback={FALLBACK_IMAGES.led}
                    alt={service.title}
                  />
                ) : featuredByCategory[service.slug] ? (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
                <div className="absolute inset-0 border border-[var(--color-primary)]/0 group-hover:border-[var(--color-primary)]/30 transition-all duration-500 m-3 rounded-sm" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-[var(--color-primary)]/70 text-xs font-semibold uppercase tracking-[0.25em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {service.tagline}
                  </span>
                  <h3 className="text-white font-serif text-2xl sm:text-3xl font-bold tracking-wide">
                    {service.title}
                  </h3>
                  <span className="text-[var(--color-primary)] text-sm font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    View Gallery &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-28 bg-[var(--color-surface)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 30%, var(--color-primary) 0%, transparent 50%)' }} />
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface-light)] rounded-sm">
              <HomeImage
                src={ABOUT_SECTION_IMAGE}
                fallback={ABOUT_FALLBACK}
                alt="RR Clicks photography"
              />
              <div className="absolute inset-0 border border-[var(--color-primary)]/20 m-4 rounded-sm pointer-events-none" />
            </div>
            
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">Our Story</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary)] mb-4 tracking-wide">
                About <em className="font-light text-[var(--color-primary)]">RR Clicks</em>
              </h2>
              <div className="w-12 h-0.5 bg-[var(--color-primary)] mb-8" />
              <div className="space-y-5 text-[var(--color-muted)] text-base font-light leading-relaxed">
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
              
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[var(--color-border)] pt-8">
                <div>
                  <div className="font-serif text-4xl font-bold text-[var(--color-primary)] mb-2">500+</div>
                  <div className="text-xs text-[var(--color-muted)] uppercase tracking-[0.2em] font-semibold">Events Covered</div>
                </div>
                <div>
                  <div className="font-serif text-4xl font-bold text-[var(--color-primary)] mb-2">10+</div>
                  <div className="text-xs text-[var(--color-muted)] uppercase tracking-[0.2em] font-semibold">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
