import React, { useEffect, useRef, useState } from 'react';

const CallToAction = ({ onRegisterClick }) => {
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
      className={`py-20 px-6 lg:px-20 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto bg-primary rounded-[2.5rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/40 bg-gradient-to-br from-primary to-primary-dark">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
        <div className="relative z-10 flex flex-col items-center gap-8">
          <h2 className="text-4xl lg:text-6xl font-black text-white animate-fade-in-up">Ready for a Spiritual Transformation?</h2>
          <p className="text-white/90 text-xl max-w-2xl font-medium animate-fade-in-up animate-delay-200">
            Spaces are filling up fast. Join hundreds of other Christian Corpers across Cross River State for this life-changing encounter.
          </p>
          <button
            type="button"
            className="bg-white text-primary hover:bg-background-light px-12 py-5 rounded-full text-xl font-black transition-all transform hover:scale-110 shadow-xl animate-fade-in-up animate-delay-300 cursor-pointer"
            onClick={onRegisterClick}
          >
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
