/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Wedding from './pages/Wedding';
import Ads from './pages/Ads';
import LedScreens from './pages/LedScreens';
import LedWalls from './pages/LedWalls';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="wedding" element={<Wedding />} />
          <Route path="ads" element={<Ads />} />
          <Route path="normal" element={<Navigate to="/ads" replace />} />
          <Route path="led" element={<LedScreens />} />
          <Route path="led-walls" element={<LedWalls />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
