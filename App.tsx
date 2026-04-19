import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Lock, Loader2 } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AdminScreen from './screen/AdminScreen';
import PortfolioScreen from './screen/PortfolioScreen';
import { PortfolioContent, subscribeToPortfolioContent, initializePortfolioData } from './services/portfolioService';

const AdminLoginModal: React.FC<{
  onClose: () => void;
  onLogin: () => void;
}> = ({ onClose, onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'annas3120') {
      onLogin();
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white p-8 neo-brutal-border w-full max-w-md relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-sticker-yellow p-2 neo-brutal-border">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-heading font-bold uppercase">Admin Access</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-ink-black/40">Secret Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 neo-brutal-border bg-bg-primary font-bold"
              placeholder="Enter password..."
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-action-blue py-3 neo-brutal-border font-bold uppercase tracking-widest hover:translate-x-1 hover:-translate-y-1 transition-transform"
          >
            Enter Dashboard
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const AppContent: React.FC = () => {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminMode = location.pathname.startsWith('/admin') || showLogin;

  useEffect(() => {
    if (isAdminMode) {
      document.body.classList.add('admin-mode');
    } else {
      document.body.classList.remove('admin-mode');
    }
  }, [isAdminMode]);

  useEffect(() => {
    const init = async () => {
      await initializePortfolioData();
      const unsubscribe = subscribeToPortfolioContent((data) => {
        setContent(data);
        setIsLoading(false);
      });
      return () => unsubscribe();
    };
    init();
  }, []);

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    navigate('/admin');
  };

  const handleAdminClick = () => {
    if (isLoggedIn) {
      navigate('/admin');
    } else {
      setShowLogin(true);
    }
  };

  if (isLoading || !content) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-action-blue animate-spin" />
          <p className="font-heading font-bold uppercase tracking-widest text-ink-black/40">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <PortfolioScreen
              content={content}
              onAdminClick={handleAdminClick}
              isLoggedIn={isLoggedIn}
            />
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            isLoggedIn ? (
              <AdminScreen
                content={content}
                onClose={() => navigate('/')}
              />
            ) : (
              <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center gap-6">
                <p className="font-heading font-bold uppercase tracking-widest text-ink-black/60 text-xl">Access Denied</p>
                <p className="text-ink-black/40 font-bold">Please login to access the admin dashboard.</p>
                <div className="flex gap-4">
                  <button onClick={() => setShowLogin(true)} className="bg-action-blue px-6 py-3 neo-brutal-border font-bold uppercase hover:translate-x-1 hover:-translate-y-1 transition-transform">
                    Login
                  </button>
                  <button onClick={() => navigate('/')} className="bg-white px-6 py-3 neo-brutal-border font-bold uppercase hover:translate-x-1 hover:-translate-y-1 transition-transform">
                    Go Back
                  </button>
                </div>
              </div>
            )
          } 
        />
      </Routes>

      <AnimatePresence>
        {showLogin && (
          <AdminLoginModal
            onClose={() => setShowLogin(false)}
            onLogin={handleAdminLogin}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;