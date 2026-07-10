import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import EditProfileModal from './EditProfileModal';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/agb2.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = () => {
    setIsSigningOut(true);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      logout();
      setIsSigningOut(false);
    }, 1500); // Show loading page for 1.5 seconds
  };

  const isHome = location.pathname === '/';
  
  // Hide Navbar on specific routes
  if (['/login', '/register'].includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <nav className={`w-full z-50 ${isHome ? 'absolute top-0 bg-transparent' : 'sticky top-0 bg-white border-b border-[#E5E2DC] shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <img src={logoImg} alt="Prompt Gallery Logo" className="h-8 w-auto object-contain" />
            <span className="text-2xl font-bold tracking-tight text-[#5C5450]">Prompt Gallery</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {isHome && (
                  <Link to="/dashboard" className="bg-[#5C5450] hover:bg-[#FB923C] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md">
                    Dashboard
                  </Link>
                )}
                
                <button 
                  onClick={() => setIsEditProfileModalOpen(true)} 
                  className={`flex items-center gap-2 text-sm font-bold transition-all px-4 py-2.5 rounded-xl ${isHome ? 'bg-white text-[#5C5450] border border-[#E5E2DC] hover:border-[#5C5450]' : 'text-[#A09690] hover:text-[#5C5450] hover:bg-slate-50'}`}
                >
                  <UserIcon size={18} /> Edit Profile
                </button>

                <button 
                  onClick={handleSignOut} 
                  className={`flex items-center gap-2 text-sm font-bold transition-all px-4 py-2.5 rounded-xl ${isHome ? 'bg-white text-[#5C5450] border border-[#E5E2DC] hover:border-[#5C5450]' : 'text-[#A09690] hover:text-[#5C5450] hover:bg-slate-50'}`}
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-[#5C5450] font-semibold hover:text-[#5C5450] transition-colors">
                  Log In
                </Link>
                <Link to="/register" className="bg-[#5C5450] hover:bg-[#FB923C] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden z-50 p-2 text-[#5C5450] hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-[#E5E2DC] overflow-hidden absolute w-full left-0 top-full shadow-lg"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-[#F7F5F0] rounded-xl mb-2 border border-[#E5E2DC]">
                      <div className="w-10 h-10 bg-[#5C5450] rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {user.name?.charAt(0).toUpperCase() || <UserIcon size={20} />}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-[#5C5450] truncate">{user.name}</div>
                        <div className="text-xs text-[#A09690] truncate">{user.email}</div>
                      </div>
                    </div>
                    
                    {isHome && (
                      <Link to="/dashboard" className="flex justify-center bg-[#F97316] text-white px-5 py-3 rounded-xl font-bold shadow-sm">
                        Go to Dashboard
                      </Link>
                    )}
                    
                    <button 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsEditProfileModalOpen(true);
                      }} 
                      className="flex items-center gap-3 p-3 text-[#5C5450] font-bold hover:bg-slate-50 rounded-xl"
                    >
                      <UserIcon size={20} className="text-[#A09690]" /> Edit Profile
                    </button>
                    
                    <button 
                      onClick={handleSignOut} 
                      className="flex items-center gap-3 p-3 text-red-500 font-bold hover:bg-red-50 rounded-xl"
                    >
                      <LogOut size={20} className="text-red-400" /> Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link to="/login" className="flex justify-center border border-[#E5E2DC] text-[#5C5450] bg-white px-5 py-3 rounded-xl font-bold shadow-sm">
                      Log In
                    </Link>
    <Link to="/register" className="flex justify-center bg-[#5C5450] text-white px-5 py-3 rounded-xl font-bold shadow-sm">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Edit Profile Modal (Rendered globally but hidden by default) */}
      <EditProfileModal 
        isOpen={isEditProfileModalOpen} 
        onClose={() => setIsEditProfileModalOpen(false)} 
      />

      {/* Sign Out Loading Overlay */}
      <AnimatePresence>
        {isSigningOut && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F5F0]"
          >
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-[#E5E2DC] rounded-full"></div>
              <div className="w-20 h-20 border-4 border-transparent border-t-[#F97316] rounded-full animate-spin absolute inset-0"></div>
            </div>
            <motion.h2 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-[#5C5450] tracking-tight mb-2"
            >
              Signing out...
            </motion.h2>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#A09690] font-medium"
            >
              See you next time!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
