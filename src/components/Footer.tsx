import { Camera, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-16 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <Camera className="w-8 h-8 text-primary" />
              <span className="font-display text-2xl font-bold tracking-wide text-primary">RR Clicks</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Capturing your precious moments with elegance and style. We specialize in wedding photography, events, and LED screen setups.
            </p>
          </div>
          
          <div>
            <h3 className="font-sans text-sm font-bold text-primary mb-5 uppercase tracking-[0.2em]">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted font-medium">
              <li><Link to="/wedding" className="hover:text-primary transition-colors">Wedding Photography</Link></li>
              <li><Link to="/normal" className="hover:text-primary transition-colors">Normal Photography</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link to="/led" className="hover:text-primary transition-colors">LED Screens</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold text-primary mb-5 uppercase tracking-[0.2em]">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--color-border-light)] flex items-center justify-center text-muted hover:bg-primary hover:text-[var(--color-bg)] hover:border-primary transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--color-border-light)] flex items-center justify-center text-muted hover:bg-primary hover:text-[var(--color-bg)] hover:border-primary transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--color-border-light)] flex items-center justify-center text-muted hover:bg-primary hover:text-[var(--color-bg)] hover:border-primary transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-6 text-sm text-muted font-medium">
              Email: info@rrclicks.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-[var(--color-border)] mt-12 pt-8 text-center text-sm text-muted/60 font-medium">
          &copy; {new Date().getFullYear()} RR Clicks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
