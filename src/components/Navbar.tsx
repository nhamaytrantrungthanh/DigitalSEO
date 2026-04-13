import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DigitalPro
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  location.pathname === link.path ? "text-blue-600" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {isAdmin && (
              <Link to="/admin" className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <LayoutDashboard size={20} />
              </Link>
            )}

            {user ? (
              <button onClick={handleLogout} className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <button onClick={handleLogin} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-2"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Admin Dashboard
            </Link>
          )}
          <div className="pt-4 border-t border-gray-100">
            {user ? (
              <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <button onClick={handleLogin} className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md">
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
