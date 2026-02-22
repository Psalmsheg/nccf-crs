import React, { useEffect, useRef, useState } from 'react';

const Hero = ({ onRegisterClick }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = 'Conference 2026';

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

  useEffect(() => {
    if (isVisible) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setTypewriterText(fullText.slice(0, index + 1));
          index++;
        } else {
          // Reset to start over for continuous effect
          index = 0;
          setTypewriterText('');
        }
      }, 250); // Slower speed for better readability

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden pt-16 pb-24 px-6 lg:px-20 bg-[#f8f6fc] transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full w-fit border border-primary/20 animate-fade-in-up">
            <span className="material-symbols-outlined text-sm">event</span>
            <span className="text-xs font-extrabold uppercase tracking-widest">Annual State Conference 2026</span>
          </div>
          <h1 className="text-[#111813] text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight animate-fade-in-up animate-delay-100">NCCF Cross River State <span className="text-primary block underline decoration-primary/30">{typewriterText}<span className="animate-pulse">|</span></span></h1>
          <div className="flex flex-col gap-4 animate-fade-in-up animate-delay-200">
            <p className="text-xl font-bold text-[#feab00] uppercase tracking-[0.1em]">Theme: <span className="font-extrabold text-2xl">Missio Dei;</span> ADVANCING THE MISSION OF GOD ON EARTH (2Cor., 5:20, Matt. 28:19, John 20:21)</p>
            <p className="text-lg text-[#111813]/70 max-w-xl leading-relaxed">
              "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit..."
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 animate-fade-in-up animate-delay-300">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-primary/30 bg-gradient-to-br from-primary to-primary-dark w-full sm:w-auto transform hover:scale-105 cursor-pointer"
              onClick={onRegisterClick}
            >
              Register Now
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <a className="flex items-center justify-center gap-2 bg-white border border-primary/20 hover:border-primary text-[#111813] px-8 py-4 rounded-xl text-lg font-bold transition-all w-full sm:w-auto transform hover:scale-105 cursor-pointer" href="#about">
              Learn More
            </a>
          </div>
        </div>
        <div className="relative animate-fade-in-up animate-delay-500">
          <div className="absolute -top-10 -right-10 w-72 h-72 gradient-primary-accent-subtle rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-72 h-72 accent-bg-subtle rounded-full blur-3xl"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <img alt="Conference Atmosphere" className="w-full aspect-[4/5] object-cover" data-alt="Group of people worshiping at a christian conference" src="NCCF CRS Conference.jpeg"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
