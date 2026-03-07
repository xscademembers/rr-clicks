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
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white py-6">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Camera className="w-10 h-10 text-secondary" />
            <span className="font-sans text-4xl font-black tracking-tighter text-secondary">
              RR Clicks
            </span>
          </Link>

          {/* Desktop Navigation & Socials */}
          <div className="hidden md:flex flex-col items-end gap-4">
            {/* Socials */}
            <div className="flex items-center gap-4 text-secondary">
              <a href="#" className="hover:text-primary transition-colors"><Cloud className="w-4 h-4" fill="currentColor" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-4 h-4" fill="currentColor" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-4 h-4" fill="currentColor" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
            
            {/* Nav Links */}
            <nav className="flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-bold transition-colors ${
                    isActive(link.path) ? 'text-[var(--color-accent)]' : 'text-secondary hover:text-[var(--color-accent)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 mt-4">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-bold ${
                  isActive(link.path)
                    ? 'text-[var(--color-accent)] bg-gray-50'
                    : 'text-secondary hover:bg-gray-50'
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
