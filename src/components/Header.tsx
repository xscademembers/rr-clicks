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
    { name: 'LED Walls', path: '/led-walls' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-[var(--color-bg)] border-b border-[var(--color-border)] py-6">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <Camera className="w-10 h-10 text-primary" />
            <div className="flex flex-col">
              <span className="font-display text-3xl sm:text-4xl font-bold tracking-wide text-primary">
                RR Clicks
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-muted font-medium -mt-1">
                Premium Photography
              </span>
            </div>
          </Link>

          <div className="hidden md:flex flex-col items-end gap-4">
            <div className="flex items-center gap-4 text-muted">
              <a href="#" className="hover:text-primary transition-colors"><Cloud className="w-4 h-4" fill="currentColor" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-4 h-4" fill="currentColor" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-4 h-4" fill="currentColor" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
            
            <nav className="flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                    isActive(link.path)
                      ? 'text-primary'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <button
            className="md:hidden text-primary"
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
                className={`block px-3 py-2 rounded-md text-base font-semibold uppercase tracking-wider ${
                  isActive(link.path)
                    ? 'text-primary bg-[var(--color-surface-light)]'
                    : 'text-secondary hover:bg-[var(--color-surface-light)] hover:text-primary'
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
