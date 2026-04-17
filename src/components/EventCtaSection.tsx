import { Link, useLocation } from 'react-router-dom';

type CtaCopy = {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
};

const CTA_COPY_BY_PATH: Record<string, CtaCopy> = {
  '/': {
    eyebrow: 'Ready to Capture More?',
    title: 'Let Us Tell Your Story',
    description:
      'From candid moments to cinematic highlights, our team turns your vision into timeless visuals. Share your event details and we will craft a custom plan.',
    action: 'Book a Consultation',
  },
  '/wedding': {
    eyebrow: 'Your Big Day Awaits',
    title: 'Create Wedding Memories Forever',
    description:
      'Celebrate every ritual, smile, and emotion with elegant wedding coverage designed around your style. Reach out for personalized wedding packages.',
    action: 'Plan My Wedding Shoot',
  },
  '/normal': {
    eyebrow: 'Celebrate Everyday Moments',
    title: 'Turn Simple Moments Into Art',
    description:
      'From portraits to family milestones, we capture natural, heartfelt frames you will cherish for years. Let us plan your next session.',
    action: 'Book a Session',
  },
  '/events': {
    eyebrow: 'Make Every Event Unforgettable',
    title: 'Bring Your Event Story to Life',
    description:
      'Corporate events, cultural programs, and private celebrations deserve premium visual coverage. Get a tailored package that matches your event scale.',
    action: 'Get Event Coverage',
  },
  '/led': {
    eyebrow: 'Ready to Elevate?',
    title: "Let's Light Up Your Event",
    description:
      'Our LED screens add impact and clarity to every celebration, launch, and live show. Contact us for the ideal setup and a custom quote.',
    action: 'Get a Quote',
  },
  '/led-walls': {
    eyebrow: 'Ready to Elevate?',
    title: "Let's Light Up Your Event",
    description:
      'Whether it is a grand wedding, an intimate reception, or a corporate gala, our LED walls create an atmosphere your guests will remember.',
    action: 'Get a Quote',
  },
  '/contact': {
    eyebrow: 'Let Us Connect',
    title: 'Tell Us About Your Event',
    description:
      'Share your requirements, date, and vision with us. Our team will get back quickly with the best package and timeline for your event.',
    action: 'Send Your Details',
  },
  '/dashboard': {
    eyebrow: 'Need Something New?',
    title: 'Keep Your Portfolio Growing',
    description:
      'Add fresh captures and showcase your best work with confidence. For new projects and shoots, connect with us to schedule your next assignment.',
    action: 'Start a New Booking',
  },
};

export default function EventCtaSection() {
  const { pathname } = useLocation();
  const cta = CTA_COPY_BY_PATH[pathname] ?? {
    eyebrow: 'Ready to Get Started?',
    title: 'Create Something Memorable',
    description:
      'Let us craft a photo and video experience tailored to your event. Share your plans and we will provide a customized quote.',
    action: 'Contact Us',
  };

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f05] via-[var(--color-bg)] to-[var(--color-bg)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-primary) 0%, transparent 50%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
          {cta.eyebrow}
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-secondary)] tracking-tight mb-6">
          {cta.title}
        </h2>
        <div className="w-12 h-0.5 bg-[var(--color-primary)] mx-auto mb-6" />
        <p className="text-base text-[var(--color-muted)] font-light leading-relaxed mb-10 max-w-xl mx-auto">
          {cta.description}
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-bg)] px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[var(--color-primary-hover)] rounded-sm"
        >
          {cta.action}
        </Link>
      </div>
    </section>
  );
}
