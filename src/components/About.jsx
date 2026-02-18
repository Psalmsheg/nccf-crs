import React, { useEffect, useRef, useState } from 'react';

const About = () => {
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
      id="about"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col gap-8">
        <h2 className="text-primary text-sm font-bold uppercase tracking-widest animate-fade-in">About the Conference</h2>
        <h3 className="text-3xl lg:text-4xl font-extrabold text-[#111813] animate-fade-in animate-delay-100">A Divine Appointment for Rejuvenation</h3>
        <div className="h-1 w-24 bg-primary mx-auto rounded-full mt-2 animate-fade-in animate-delay-200"></div>
        <p className="text-lg text-[#111813]/70 leading-loose animate-fade-in animate-delay-300">
          The Nigerian Christian Corpers' Fellowship (NCCF) Cross River State Conference is more than just a gathering; it is a sacred space designed for spiritual alignment and empowerment. For decades, NCCF has stood as a beacon of faith for corps members across Nigeria, and this year's conference in the heart of Cross River aims to reignite the fire of service, fellowship, and purpose in every attendee. We invite you to experience a shift in your spiritual journey.
        </p>
      </div>
    </section>
  );
};

export default About;
