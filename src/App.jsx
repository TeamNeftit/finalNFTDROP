import Home from './component/Home'
import Footer from './component/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DocsRoutes from "./pages/DocsRoutes";
import { DocsNavigationProvider } from "./contexts/DocsNavigationContext";

function AppContent() {
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith('/docs');
  const [homeKey, setHomeKey] = useState(0);

  // Force full page reload when returning from docs to home
  useEffect(() => {
    if (location.pathname === '/') {
      const wasOnDocs = sessionStorage.getItem('wasOnDocs');
      if (wasOnDocs === 'true') {
        console.log('🔄 Returning from docs - forcing reload');
        sessionStorage.removeItem('wasOnDocs');
        // Force full page reload to ensure all state is fresh
        window.location.reload();
      }
    } else if (location.pathname.startsWith('/docs')) {
      sessionStorage.setItem('wasOnDocs', 'true');
    }
  }, [location.pathname]);

  return (
    <div className="container">

      <Routes>
        <Route path="/" element={<Home key={homeKey} />} />
        <Route
          path="/docs/*"
          element={
            <DocsNavigationProvider>
              <DocsRoutes />
            </DocsNavigationProvider>
          }
        />
      </Routes>

      {!isDocsPage && <Footer />}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
