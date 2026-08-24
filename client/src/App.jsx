import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import StrapsPage from './pages/StrapsPage';
import WorkGallery from './pages/WorkGallery';

function AppShell() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isStraps = pathname === '/straps';
  const isServiceDetail = pathname.startsWith('/services/');
  const flushUnderNav = isHome || isServiceDetail;

  return (
    <div className={`min-h-screen text-right ${isStraps ? '' : 'bg-surface'}`}>
      <Navbar />
      <main className={flushUnderNav ? undefined : 'pt-16 md:pt-[4.25rem]'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/straps" element={<StrapsPage />} />
          <Route path="/work" element={<WorkGallery />} />
        </Routes>
      </main>
      <footer
        className={`relative z-10 border-t border-surface-muted py-8 text-center text-sm text-surface/60 ${
          isStraps ? 'bg-navy-deep/75 backdrop-blur-sm' : 'bg-navy-deep'
        }`}
      >
        <p>
          © {new Date().getFullYear()} Time.il — מעבדת תיקון שעונים. כל הזכויות שמורות.
        </p>
      </footer>
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
