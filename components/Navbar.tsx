"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, LayoutDashboard, LogIn, Menu, X, LogOut } from 'lucide-react';

// IMPORT YOUR USER CONTEXT TO DRIVE THE CTA STATE
import { useUser } from '@/app/context/UserContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Connect directly to the global authentication state
  const { isAuthenticated, isLoaded } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    // Force a hard reload to clear all states and redirect to home
    window.location.href = '/'; 
  };

  const navLinks = [
    { name: "The Hub", href: "/" },
    { name: "SIP Academy", href: "/sip-education" },
    { name: "Mutual Funds", href: "/mf-education" },
    { name: "CV Builder", href: "/cv-builder" }, 
    { name: "Site Builder", href: "/site-builder" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl">
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-cyan-500 text-black p-1.5 rounded-lg group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
              <Zap size={16} className="fill-black" />
            </div>
            <span className="font-black text-sm tracking-tighter uppercase italic text-white">
              First<span className="text-cyan-400">Cap.in</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth CTA Toggle */}
          <div className="flex items-center gap-4">
            {!isLoaded ? (
              // Prevent flashing by showing an invisible placeholder while checking auth
              <div className="w-24 h-10 opacity-0"></div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link 
                  href="/dashboard" 
                  className="px-6 py-2.5 bg-cyan-500 text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
                >
                  <LayoutDashboard size={14} /> My Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 bg-white/5 border border-white/10 text-white rounded-full hover:bg-red-500 transition-all"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="px-6 py-2.5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-cyan-400 hover:text-white transition-all flex items-center gap-2"
              >
                <LogIn size={14} /> Login
              </Link>
            )}
            
            {/* Mobile Toggle */}
            <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}