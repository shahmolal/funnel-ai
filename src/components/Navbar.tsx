import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg shadow-lg group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-display font-bold text-xl tracking-tight">FunnelLens AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium hover:text-violet-600 transition-colors">
            Login
          </Link>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.02, translateY: -1 }}
              whileTap={{ scale: 0.98 }}
              className="bg-charcoal text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all bg-gradient-to-r hover:from-charcoal hover:to-violet-900"
            >
              Start Free
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="text-sm font-medium text-charcoal/70 hover:text-charcoal transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
