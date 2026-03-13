import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Monitor, Zap, Shield, Maximize, Sun, Volume2, ArrowRight } from 'lucide-react';

const LED_FALLBACK = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop';
const LED_STAGE_FALLBACK = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop';

const isImageFile = (name: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(name);

function LedImage({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  const [useFallback, setUseFallback] = useState(false);
  return (
    <img
      src={useFallback ? fallback : src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setUseFallback(true)}
    />
  );
}

const features = [
  {
    icon: Maximize,
    title: 'Massive Display Sizes',
    desc: 'From 8\u00d76 ft to 20\u00d712 ft and custom configurations to match any venue.',
  },
  {
    icon: Sun,
    title: 'Ultra-High Brightness',
    desc: 'Crystal-clear visuals even in broad daylight with 5000+ nits outdoor panels.',
  },
  {
    icon: Shield,
    title: 'Weatherproof Builds',
    desc: 'IP65-rated outdoor panels that perform flawlessly in rain, dust, and heat.',
  },
  {
    icon: Zap,
    title: 'Rapid Setup',
    desc: 'Professional crew ensures your LED wall is installed, tested, and ready in hours.',
  },
  {
    icon: Monitor,
    title: 'Seamless Content',
    desc: 'Support for live video feeds, presentations, social walls, and custom animations.',
  },
  {
    icon: Volume2,
    title: 'Full AV Integration',
    desc: 'Paired with premium sound systems for a complete immersive experience.',
  },
];

const packages = [
  {
    name: 'Classic',
    tagline: 'For Intimate Events',
    size: '8\u00d76 ft P3 Indoor',
    price: '15,000',
    highlights: ['HD resolution', 'Up to 6 hours', 'Setup & teardown included', 'On-site technician'],
  },
  {
    name: 'Luxe',
    tagline: 'For Premium and Luxury Feel',
    size: '12\u00d710 ft P2.5 Indoor',
    price: '35,000',
    highlights: ['Full HD resolution', 'Up to 10 hours', 'Content playback support', 'Dedicated AV technician', 'Sound system add-on available'],
    featured: true,
  },
  {
    name: 'Grand',
    tagline: 'For Large-Scale Productions',
    size: '20\u00d712 ft P3 Outdoor',
    price: '65,000',
    highlights: ['4K resolution support', 'Full-day coverage', 'Multi-screen configurations', 'Complete AV crew', 'Live feed integration', 'Custom branding'],
  },
];

export default function RRLedWalls() {
  const [ledImages, setLedImages] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await fetch('/api/media/led');
        if (!res.ok) return;
        const text = await res.text();
        let data: { name: string; url?: string; download_url?: string }[];
        try { data = JSON.parse(text); } catch { return; }
        if (!Array.isArray(data)) return;
        const images = data
          .filter((f) => isImageFile(f.name))
          .slice(0, 4)
          .map((f) => ({ name: f.name, url: f.url ?? f.download_url ?? '' }));
        setLedImages(images);
      } catch { /* silent */ }
    };
    loadImages();
  }, []);

  return (
    <div className="flex flex-col bg-[var(--color-bg)]">

      {/* Hero */}
      <section className="relative w-full py-28 sm:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-bg)] to-[#0f0a05]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/80 mb-6">
            Premium Visual Solutions
          </p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-bold tracking-wide mb-4">
            <span className="text-secondary">RR</span>{' '}
            <span className="text-primary">LED Walls</span>
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Transform any venue into a breathtaking visual spectacle. Our state-of-the-art LED 
            walls deliver unmatched brilliance for weddings, corporate events, concerts, and exhibitions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-[var(--color-bg)] font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-primary/40 text-primary font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-primary/10 transition-colors"
            >
              View Packages
            </a>
          </div>
        </div>
      </section>

      {/* About LED Walls */}
      <section className="py-24 bg-[var(--color-surface)] relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface-light)] rounded-sm border border-[var(--color-border)]">
              <LedImage
                src="/images/home/led.jpg"
                fallback={LED_FALLBACK}
                alt="RR LED Wall setup at event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="w-8 h-px bg-primary mb-3" />
                <p className="text-white font-serif text-lg italic">Bringing your vision to life, screen by screen.</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">
                Who We Are
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-8 tracking-wide">
                About RR LED Walls
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-primary to-transparent mb-8" />
              <div className="space-y-6 text-muted text-lg font-light leading-relaxed">
                <p>
                  RR LED Walls is the dedicated LED display division of RR Clicks, born from years of experience 
                  setting up immersive visual environments at premium events across the country.
                </p>
                <p>
                  We provide cutting-edge indoor and outdoor LED wall solutions for weddings, receptions, 
                  corporate conferences, product launches, concerts, and exhibitions. Our panels deliver 
                  stunning color accuracy and brightness that make every visual unforgettable.
                </p>
                <p>
                  From consultation and content design to installation, operation, and teardown — our 
                  end-to-end service ensures a seamless experience so you can focus on your event.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[var(--color-border)] pt-8">
                <div>
                  <div className="font-display text-4xl sm:text-5xl font-bold text-primary mb-2">300+</div>
                  <div className="text-xs text-muted uppercase tracking-[0.2em] font-semibold">Events Powered</div>
                </div>
                <div>
                  <div className="font-display text-4xl sm:text-5xl font-bold text-primary mb-2">50+</div>
                  <div className="text-xs text-muted uppercase tracking-[0.2em] font-semibold">Screen Sizes</div>
                </div>
                <div>
                  <div className="font-display text-4xl sm:text-5xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-xs text-muted uppercase tracking-[0.2em] font-semibold">Tech Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </section>

      {/* Features */}
      <section className="py-24 bg-[var(--color-bg)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">Why Choose Us</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-secondary tracking-tight mb-6">
              Built for Brilliance
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm hover:border-primary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-secondary mb-3">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-24 bg-[var(--color-surface)] relative scroll-mt-8">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">Investment</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-secondary tracking-tight mb-6">
              Our Packages
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
            <p className="text-muted text-lg font-light max-w-2xl mx-auto">
              Tailored solutions for every scale. All packages include professional setup, operation, and teardown.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative flex flex-col p-8 rounded-sm border transition-colors ${
                  pkg.featured
                    ? 'border-primary bg-gradient-to-b from-primary/5 to-[var(--color-surface-light)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface-light)] hover:border-primary/30'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-px left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70 mb-2">
                  {pkg.tagline}
                </p>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-secondary italic mb-1">
                  {pkg.name}
                </h3>
                <p className="text-muted text-sm mb-6">{pkg.size}</p>

                <div className="mb-8">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-primary">
                    &#8377;{pkg.price}
                  </span>
                  <span className="text-muted text-sm ml-2">+ GST</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`w-full inline-flex items-center justify-center gap-2 py-4 font-bold uppercase tracking-widest text-sm rounded-sm transition-colors ${
                    pkg.featured
                      ? 'bg-primary text-[var(--color-bg)] hover:bg-[var(--color-primary-hover)]'
                      : 'border border-primary/40 text-primary hover:bg-primary/10'
                  }`}
                >
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </section>

      {/* Gallery Preview */}
      {ledImages.length > 0 && (
        <section className="py-24 bg-[var(--color-bg)]">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">Our Work</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-secondary tracking-tight mb-6">
                Recent Setups
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {ledImages.map((img, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/led"
                className="inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm hover:text-[var(--color-primary-hover)] transition-colors"
              >
                View Full Gallery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-[var(--color-surface)] relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">Ready to Elevate?</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-secondary mb-6 tracking-tight">
            Let's Light Up Your Event
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-muted text-lg font-light leading-relaxed mb-10">
            Whether it's a grand wedding, an intimate reception, or a corporate gala — our LED walls 
            create an atmosphere your guests will never forget. Get in touch for a custom quote.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-12 py-5 bg-primary text-[var(--color-bg)] font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </section>
    </div>
  );
}
