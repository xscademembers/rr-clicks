import { Camera, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Camera className="w-8 h-8 text-secondary" />
              <span className="font-sans text-2xl font-black tracking-tighter text-secondary uppercase">RR Clicks</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Capturing your precious moments with elegance and style. We specialize in wedding photography, events, and LED screen setups.
            </p>
          </div>
          
          <div>
            <h3 className="font-sans text-lg font-bold text-secondary mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500 font-medium">
              <li><Link to="/wedding" className="hover:text-primary transition-colors">Wedding Photography</Link></li>
              <li><Link to="/normal" className="hover:text-primary transition-colors">Normal Photography</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link to="/led" className="hover:text-primary transition-colors">LED Screens</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-lg font-bold text-secondary mb-4 uppercase tracking-wider">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500 font-medium">
              Email: info@rrclicks.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} RR Clicks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
