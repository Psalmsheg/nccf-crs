import React, { useState, useEffect, useRef } from 'react';

const Header = ({ onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    closeMenu();
    // Smooth scroll will be handled by the existing click handler in App.jsx
  };
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-primary/10 px-6 lg:px-20 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/Logo.png" alt="NCCF CRS Logo" className="h-14 w-14 rounded-lg hover:shadow-primary/40 transition-shadow" />
          <div className="text-[#111813] text-[10px] font-bold tracking-tight leading-tight border-l-3 border-black pl-1">
            <div>NCCF</div>
            <div className="">CROSS RIVER</div>
            <div className="">STATE CHAPTER</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#about">About Us</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#vision">Vision & Mission</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#minister">Guest Ministers</a>
          <button
            type="button"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/20 hover:shadow-primary/40 bg-gradient-to-br from-primary to-primary-dark cursor-pointer"
            onClick={onRegisterClick}
          >
            Register Now
          </button>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#schedule">Conference Schedule</a>
        </nav>
        <button 
          className="md:hidden text-primary hover:text-primary/80 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div ref={menuRef} className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-primary/10 shadow-lg">
          <nav className="px-6 py-4 space-y-4">
            <a 
              className="block text-sm font-semibold hover:text-primary transition-colors py-2" 
              href="#about"
              onClick={() => handleNavClick('#about')}
            >
              About
            </a>
            <a 
              className="block text-sm font-semibold hover:text-primary transition-colors py-2" 
              href="#vision"
              onClick={() => handleNavClick('#vision')}
            >
              Vision
            </a>
            <a 
              className="block text-sm font-semibold hover:text-primary transition-colors py-2" 
              href="#minister"
              onClick={() => handleNavClick('#minister')}
            >
              Minister
            </a>
            <a 
              className="block text-sm font-semibold hover:text-primary transition-colors py-2" 
              href="#schedule"
              onClick={() => handleNavClick('#schedule')}
            >
              Schedule
            </a>
            <button
              type="button"
              className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 cursor-pointer mt-4"
              onClick={() => {
                closeMenu();
                onRegisterClick();
              }}
            >
              Register Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
