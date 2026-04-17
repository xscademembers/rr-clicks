import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery';

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
              href="#led-walls-gallery"
              className="inline-flex items-center justify-center gap-2 border border-[var(--color-primary)]/40 text-[var(--color-primary)] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-sm"
            >
              View Gallery
            </a>
          </div>
          <p className="mt-8 text-xs text-[var(--color-muted)]/60 tracking-widest uppercase">
            Bringing your vision to life, screen by screen.
          </p>
        </div>
      </section>

      <section id="led-walls-gallery" className="scroll-mt-20">
        <Gallery
          category="led-walls"
          title="LED Walls Gallery"
          description="Explore our recent LED wall setups for weddings, corporate events, and live experiences."
        />
      </section>

    </div>
  );
}
