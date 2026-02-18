import React from 'react';

const Header = ({ onRegisterClick }) => {
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
        <nav className="hidden md:flex items-center gap-10">
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#about">About</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#vision">Vision</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#minister">Minister</a>
          <button
            type="button"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/20 hover:shadow-primary/40 bg-gradient-to-br from-primary to-primary-dark cursor-pointer"
            onClick={onRegisterClick}
          >
            Register Now
          </button>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#schedule">Schedule</a>
        </nav>
        <button className="md:hidden text-primary">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
