import { Link } from 'react-router-dom';
import { Monitor, Sun, CloudRain, Zap, Play, Speaker, Check } from 'lucide-react';

const features = [
  { icon: Monitor, title: 'Massive Display Sizes', desc: 'From 8x6 ft to 20x12 ft and custom configurations to match any venue.' },
  { icon: Sun, title: 'Ultra-High Brightness', desc: 'Crystal-clear visuals even in broad daylight with 5000+ nits outdoor panels.' },
  { icon: CloudRain, title: 'Weatherproof Builds', desc: 'IP65-rated outdoor panels that perform flawlessly in rain, dust, and heat.' },
  { icon: Zap, title: 'Rapid Setup', desc: 'Professional crew ensures your LED wall is installed, tested, and ready in hours.' },
  { icon: Play, title: 'Seamless Content', desc: 'Support for live video feeds, presentations, social walls, and custom animations.' },
  { icon: Speaker, title: 'Full AV Integration', desc: 'Paired with premium sound systems for a complete immersive experience.' },
];

const packages = [
  {
    label: 'For Intimate Events',
    name: 'Classic',
    spec: '8x6 ft P3 Indoor',
    price: '15,000',
    highlights: ['On-site technician', 'Setup & teardown included', 'Up to 6 hours', 'HD resolution'],
    accent: false,
  },
  {
    label: 'For Premium and Luxury Feel',
    name: 'Luxe',
    spec: '12x10 ft P2.5 Indoor',
    price: '35,000',
    highlights: ['Sound system add-on available', 'Dedicated AV technician', 'Content playback support', 'Up to 10 hours', 'Full HD resolution'],
    accent: true,
  },
  {
    label: 'For Large-Scale Productions',
    name: 'Grand',
    spec: '20x12 ft P3 Outdoor',
    price: '65,000',
    highlights: ['Custom branding', 'Live feed integration', 'Complete AV crew', 'Multi-screen configurations', 'Full-day coverage', '4K resolution support'],
    accent: false,
  },
];

export default function LedWalls() {
  return (
    <div className="bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f05] via-[var(--color-bg)] to-[#0a0a14] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, var(--color-primary) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--color-primary)] mb-6">
            Premium Visual Solutions
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--color-secondary)] tracking-wide mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            RR <em className="text-[var(--color-primary)] font-light">LED Walls</em>
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Transform any venue into a breathtaking visual spectacle. Our state-of-the-art LED walls deliver unmatched brilliance for weddings, corporate events, concerts, and exhibitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-[var(--color-bg)] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[var(--color-primary-hover)] rounded-sm"
            >
              Book Now
            </Link>
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 border border-[var(--color-primary)]/40 text-[var(--color-primary)] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-sm"
            >
              View Packages
            </a>
          </div>
          <p className="mt-8 text-xs text-[var(--color-muted)]/60 tracking-widest uppercase">
            Bringing your vision to life, screen by screen.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, var(--color-primary) 0%, transparent 50%)' }} />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">Who We Are</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary)] mb-4 tracking-wide">
                About <em className="font-light text-[var(--color-primary)]">RR LED Walls</em>
              </h2>
              <div className="w-12 h-0.5 bg-[var(--color-primary)] mb-8" />
              <div className="space-y-5 text-[var(--color-muted)] text-base font-light leading-relaxed">
                <p>
                  RR LED Walls is the dedicated LED display division of RR Clicks, born from years of experience setting up immersive visual environments at premium events across the country.
                </p>
                <p>
                  We provide cutting-edge indoor and outdoor LED wall solutions for weddings, receptions, corporate conferences, product launches, concerts, and exhibitions. Our panels deliver stunning color accuracy and brightness that make every visual unforgettable.
                </p>
                <p>
                  From consultation and content design to installation, operation, and teardown — our end-to-end service ensures a seamless experience so you can focus on your event.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--color-border)] pt-8">
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-1">300+</div>
                  <div className="text-xs text-[var(--color-muted)] uppercase tracking-[0.15em] font-semibold">Events Powered</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-1">50+</div>
                  <div className="text-xs text-[var(--color-muted)] uppercase tracking-[0.15em] font-semibold">Screen Sizes</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-1">24/7</div>
                  <div className="text-xs text-[var(--color-muted)] uppercase tracking-[0.15em] font-semibold">Tech Support</div>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[var(--color-surface-light)] border border-[var(--color-border)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-1.5 w-4/5 h-4/5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-[2px] transition-all duration-700 ${
                        i === 5 || i === 6 || i === 9 || i === 10
                          ? 'bg-[var(--color-primary)]/30 border border-[var(--color-primary)]/50'
                          : 'bg-[var(--color-surface-light)] border border-[var(--color-border)]'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 border border-[var(--color-primary)]/15 m-3 rounded-sm pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">Why Choose Us</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-secondary)] tracking-tight mb-4">
              Built for Brilliance
            </h2>
            <div className="w-12 h-0.5 bg-[var(--color-primary)] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-8 group hover:border-[var(--color-primary)]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                  <f.icon className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--color-secondary)] mb-3">{f.title}</h3>
                <p className="text-[var(--color-muted)] text-sm font-light leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-28 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)] relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 80%, var(--color-primary) 0%, transparent 50%)' }} />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">Investment</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-secondary)] tracking-tight mb-4">
              Our Packages
            </h2>
            <div className="w-12 h-0.5 bg-[var(--color-primary)] mx-auto mb-6" />
            <p className="text-base text-[var(--color-muted)] font-light">
              Tailored solutions for every scale. All packages include professional setup, operation, and teardown.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-sm p-8 flex flex-col transition-all duration-300 ${
                  pkg.accent
                    ? 'bg-gradient-to-b from-[var(--color-primary)]/10 to-[var(--color-surface-light)] border-2 border-[var(--color-primary)]/40 scale-[1.02]'
                    : 'bg-[var(--color-surface-light)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30'
                }`}
              >
                {pkg.accent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-[var(--color-bg)] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-sm">
                    Popular
                  </div>
                )}
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)] mb-2">{pkg.label}</p>
                <h3 className="font-serif text-3xl font-bold text-[var(--color-secondary)] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  <em>{pkg.name}</em>
                </h3>
                <p className="text-sm text-[var(--color-muted)] mb-6">{pkg.spec}</p>

                <div className="mb-8">
                  <span className="font-serif text-4xl font-bold text-[var(--color-primary)]">
                    &#8377;{pkg.price}
                  </span>
                  <span className="text-sm text-[var(--color-muted)] ml-1">+ GST</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-[var(--color-muted)]">
                      <Check className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`block text-center py-3.5 text-sm font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 ${
                    pkg.accent
                      ? 'bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[var(--color-primary-hover)]'
                      : 'border border-[var(--color-primary)]/40 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] hover:border-[var(--color-primary)]'
                  }`}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f05] via-[var(--color-bg)] to-[var(--color-bg)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-primary) 0%, transparent 50%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
            Ready to Elevate?
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-secondary)] tracking-tight mb-6">
            Let's Light Up Your Event
          </h2>
          <div className="w-12 h-0.5 bg-[var(--color-primary)] mx-auto mb-6" />
          <p className="text-base text-[var(--color-muted)] font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Whether it's a grand wedding, an intimate reception, or a corporate gala — our LED walls create an atmosphere your guests will never forget. Get in touch for a custom quote.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-bg)] px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[var(--color-primary-hover)] rounded-sm"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
