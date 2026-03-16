import { Camera, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-warm)] border-t border-[var(--color-border)] py-16 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <Camera className="w-8 h-8 text-[var(--color-primary)]" />
              <span className="font-serif text-2xl font-bold tracking-wide text-[var(--color-primary)]">RR Clicks</span>
            </Link>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed max-w-xs">
              Capturing your precious moments with elegance and style. We specialize in wedding photography, events, and LED screen setups.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-bold text-[var(--color-primary)] mb-5 tracking-wide">Quick Links</h3>
            <ul className="space-y-3 text-sm text-[var(--color-muted)] font-medium">
              <li><Link to="/wedding" className="hover:text-[var(--color-primary)] transition-colors duration-300">Wedding Photography</Link></li>
              <li><Link to="/normal" className="hover:text-[var(--color-primary)] transition-colors duration-300">Normal Photography</Link></li>
              <li><Link to="/events" className="hover:text-[var(--color-primary)] transition-colors duration-300">Events</Link></li>
              <li><Link to="/led" className="hover:text-[var(--color-primary)] transition-colors duration-300">LED Screens</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--color-primary)] transition-colors duration-300">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-[var(--color-primary)] mb-5 tracking-wide">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-11 h-11 rounded-full border border-[var(--color-primary)]/30 flex items-center justify-center text-[var(--color-primary)]/70 hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] hover:border-[var(--color-primary)] transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 rounded-full border border-[var(--color-primary)]/30 flex items-center justify-center text-[var(--color-primary)]/70 hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] hover:border-[var(--color-primary)] transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 rounded-full border border-[var(--color-primary)]/30 flex items-center justify-center text-[var(--color-primary)]/70 hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] hover:border-[var(--color-primary)] transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-6 text-sm text-[var(--color-muted)] font-medium leading-relaxed">
              Email: info@rrclicks.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-[var(--color-border)] mt-14 pt-8 text-center text-sm text-[var(--color-muted)]/60 font-medium">
          &copy; {new Date().getFullYear()} RR Clicks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
