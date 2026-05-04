import { Link, useLocation } from 'react-router-dom';
import { Camera, Menu, X, Facebook, Twitter, Youtube, Instagram, Cloud } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Wedding', path: '/wedding' },
    { name: 'Normal', path: '/normal' },
    { name: 'LED Screens', path: '/led' },
    { name: 'LED Walls', path: '/led-walls' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-[var(--color-bg-warm)]/80 backdrop-blur-md border-b border-[var(--color-border)] py-5 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <Camera className="w-9 h-9 text-[var(--color-primary)]" />
            <span className="font-serif text-3xl font-bold tracking-wide text-[var(--color-primary)]">
              RR Clicks
            </span>
          </Link>

          <div className="hidden md:flex flex-col items-end gap-3">
            <div className="flex items-center gap-4 text-[var(--color-muted)]">
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors duration-300"><Cloud className="w-4 h-4" fill="currentColor" /></a>
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors duration-300"><Facebook className="w-4 h-4" fill="currentColor" /></a>
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors duration-300"><Twitter className="w-4 h-4" fill="currentColor" /></a>
              <a href="#" className="hover:text-[var(--color-primary)] transition-colors duration-300"><Youtube className="w-4 h-4" /></a>
              <a href="https://www.instagram.com/rrclicksphotography14?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="hover:text-[var(--color-primary)] transition-colors duration-300"><Instagram className="w-4 h-4" /></a>
            </div>
            
            <nav className="flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-secondary)]/70 hover:text-[var(--color-primary)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <button
            className="md:hidden text-[var(--color-primary)]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] mt-4">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-semibold tracking-wide transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-[var(--color-primary)] bg-[var(--color-surface-light)]'
                    : 'text-[var(--color-secondary)] hover:bg-[var(--color-surface-light)] hover:text-[var(--color-primary)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
