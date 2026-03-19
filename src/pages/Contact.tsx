import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to submit');
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto w-full">
      <div className="text-center mb-16 relative">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
            Reach Out
          </p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-[var(--color-secondary)] mb-4 tracking-tight">
            Get in Touch
          </h2>
          <div className="w-12 h-0.5 bg-[var(--color-primary)] mx-auto mb-6" />
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto font-light tracking-wide">
            Let us capture your next big moment. Reach out to discuss your vision.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-6">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-8">
            <h3 className="font-serif text-2xl text-[var(--color-primary)] font-bold mb-6 tracking-wide">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--color-surface-light)] rounded-full text-[var(--color-primary)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-secondary)] mb-1 text-sm">Studio Address</h4>
                  <p className="text-[var(--color-muted)] text-sm">
                    43-18-34, Venkatarajunagar, TSN Colony, Dondaparty, 530016.<br />
                    Visakhapatnam, Andhra Pradesh
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--color-surface-light)] rounded-full text-[var(--color-primary)]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-secondary)] mb-1 text-sm">Phone</h4>
                  <p className="text-[var(--color-muted)] text-sm">+1 (555) 123-4567<br />Mon-Fri, 9am-6pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--color-surface-light)] rounded-full text-[var(--color-primary)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-secondary)] mb-1 text-sm">Email</h4>
                  <p className="text-[var(--color-muted)] text-sm">rrclicks14@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-8">
          <h3 className="font-serif text-2xl text-[var(--color-primary)] font-bold mb-6 tracking-wide">Send a Message</h3>
          
          {status === 'success' ? (
            <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] p-6 rounded-sm text-center">
              <p className="font-bold mb-2">Thank you for reaching out!</p>
              <p className="text-sm text-[var(--color-muted)]">We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.15em]">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[var(--color-surface-light)] border border-[var(--color-border)] rounded-sm px-4 py-3 text-[var(--color-secondary)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.15em]">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[var(--color-surface-light)] border border-[var(--color-border)] rounded-sm px-4 py-3 text-[var(--color-secondary)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.15em]">Phone (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[var(--color-surface-light)] border border-[var(--color-border)] rounded-sm px-4 py-3 text-[var(--color-secondary)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-[0.15em]">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[var(--color-surface-light)] border border-[var(--color-border)] rounded-sm px-4 py-3 text-[var(--color-secondary)] placeholder-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors resize-none"
                  placeholder="Tell us about your event..."
                />
              </div>
              
              {status === 'error' && (
                <p className="text-[var(--color-accent-light)] text-sm font-medium">Failed to send message. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] font-semibold uppercase tracking-[0.2em] py-4 rounded-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
