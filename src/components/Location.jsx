import React, { useEffect, useRef, useState } from 'react';

const Location = () => {
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
    <section
      ref={sectionRef}
      className={`py-24 px-6 lg:px-20 bg-white transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      id="location"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-primary text-sm font-bold uppercase tracking-widest animate-fade-in">Location</h2>
          <h3 className="text-4xl font-extrabold text-[#111813] mt-2 animate-fade-in animate-delay-100">Event Venue</h3>
          <p className="text-xl text-[#111813]/70 mt-4 animate-fade-in animate-delay-200">NCCF Family House, Calabar, Cross River State</p>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full mt-4 animate-fade-in animate-delay-300"></div>
        </div>
        <div className="relative group animate-slide-in-left animate-delay-500">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-background-light rounded-[2rem] overflow-hidden shadow-2xl border border-primary/10 aspect-[12/9] md:aspect-[21/9]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.5692283954536!2d8.339793175028792!3d5.010966294965494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105d7d6350a4922f%3A0x77daa6012126e349!2sNCCF%20Family%20House%20Calabar!5e0!3m2!1sen!2sng!4v1771362343276!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NCCF Family House Calabar Location"
            ></iframe>
          </div>
        </div>
        <div className="mt-12 text-center">
          <a className="inline-flex items-center gap-2 text-primary font-bold hover:underline" href="https://www.google.com/maps/place/NCCF+Family+House+Calabar/@5.0109663,8.3397932,17z" target="_blank">
            <span className="material-symbols-outlined">map</span>
            View on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default Location;
