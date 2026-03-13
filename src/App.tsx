/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Wedding from './pages/Wedding';
import NormalPhotography from './pages/NormalPhotography';
import LedScreens from './pages/LedScreens';
import RRLedWalls from './pages/RRLedWalls';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="wedding" element={<Wedding />} />
          <Route path="normal" element={<NormalPhotography />} />
          <Route path="led" element={<LedScreens />} />
          <Route path="led-walls" element={<RRLedWalls />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
