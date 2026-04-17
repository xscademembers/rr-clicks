import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import EventCtaSection from './EventCtaSection';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-secondary)] font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <EventCtaSection />
      <Footer />
    </div>
  );
}
