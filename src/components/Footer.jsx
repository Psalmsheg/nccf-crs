import React, { useEffect, useRef, useState } from 'react';

const Footer = ({ onRegisterClick }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <footer
      ref={sectionRef}
      className={`bg-background-dark text-white/70 py-10 px-6 lg:px-20 animate-fade-in transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 border-b border-white/30 pb-12">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <img src="/Logo.png" alt="NCCF CRS Logo" className="h-14 w-14" />
            <div className="text-white text-[10px] font-bold tracking-tight leading-tight">
              <div className='text-white/70'>NCCF</div>
              <div className="text-white/70">CROSS RIVER</div>
              <div className="text-white/70">STATE CHAPTER</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            The Nigerian Christian Corpers' Fellowship, Cross River State Chapter. Building youth for Christ and serving the nation with integrity.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:gap-6">
          <h4 className="text-white font-bold text-lg uppercase tracking-widest text-primary mb-2 block">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-white/70">
            <li><a className="hover:text-[#feab00] transition-colors" href="#about">About Us</a></li>
            <li><a className="hover:text-[#feab00] transition-colors" href="#vision">Vision &amp; Mission</a></li>
            <li><a className="hover:text-[#feab00] transition-colors" href="#minister">Minister</a></li>
            <li><a className="hover:text-[#feab00] transition-colors" href="#schedule">Schedule</a></li>
            <li>
              <button
                type="button"
                className="hover:text-[#feab00] transition-colors text-left"
                onClick={onRegisterClick}
              >
                Registration
              </button>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 sm:gap-6">
          <h4 className="text-white font-bold text-lg uppercase tracking-widest text-primary mb-2 block">Contact</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#feab00] text-sm mb-2 block">location_on</span>
              <span className="text-sm text-white/70">State Secretariat, Calabar, CRS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#feab00] text-sm mb-2 block">mail</span>
              <span className="text-sm text-white/70">info@nccfcrossriver.org</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-xs tracking-[0.1em] text-white/70 font-semibold">
              Follow us @NCCFCROSSRIVER
            </p>
            <div className="flex gap-2">
              <a
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
                href="https://facebook.com/NCCFCROSSRIVER"
                target="_blank"
                aria-label="Follow us on Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-[#feab00] transition-colors"
                >
                  <path d="M12 2.04C6.48 2.04 2 6.52 2 12.04 2 17 5.66 21.13 10.44 22v-7.02H8.1v-2.94h2.34V9.41c0-2.32 1.38-3.6 3.49-3.6.7 0 1.43.11 2.13.22v2.34h-1.2c-1.17 0-1.54.73-1.54 1.48v1.79h2.63l-.42 2.94h-2.21V22C18.34 21.13 22 17 22 12.04 22 6.52 17.52 2.04 12 2.04z" />
                </svg>
              </a>
              <a
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
                href="https://twitter.com/NCCFCROSSRIVER"
                target="_blank"
                aria-label="Follow us on Twitter/X"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-[#feab00] transition-colors"
                >
                  <path d="M4 4h4.5l3.06 4.52L14.44 4H20l-5.5 7.5L20 20h-4.5l-3.2-4.78L9.56 20H4l5.5-8.5L4 4z" />
                </svg>
              </a>
              <a
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
                href="https://instagram.com/NCCFCROSSRIVER"
                target="_blank"
                aria-label="Follow us on Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-[#feab00] transition-colors"
                >
                  <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm0 2A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 16.5 5h-9zm4.5 2.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm4-2.75a.75.75 0 1 1-.75.75.75.75 0 0 1 .75-.75z" />
                </svg>
              </a>
              <a
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
                href="https://youtube.com/@NCCFCROSSRIVER"
                target="_blank"
                aria-label="Subscribe to our YouTube channel"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-[#feab00] transition-colors"
                >
                  <path d="M21.8 8.2a2.3 2.3 0 0 0-1.6-1.6C18.4 6 12 6 12 6S5.6 6 3.8 6.6a2.3 2.3 0 0 0-1.6 1.6A24.8 24.8 0 0 0 2 12a24.8 24.8 0 0 0 .2 3.8 2.3 2.3 0 0 0 1.6 1.6C5.6 18 12 18 12 18s6.4 0 8.2-.6a2.3 2.3 0 0 0 1.6-1.6A24.8 24.8 0 0 0 22 12a24.8 24.8 0 0 0-.2-3.8zM10 15v-6l5 3-5 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-[0.2em]">
        <p className="text-white/70 text-center md:text-left">© {new Date().getFullYear()} NCCF Cross River State. All rights reserved.</p>
        <p className="text-white/70 text-center md:text-left">Rural Rugged Evangelism...</p>
      </div>
    </footer>
  );
};

export default Footer;
