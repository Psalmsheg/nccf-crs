import React, { useEffect, useRef, useState } from 'react';

const Schedule = () => {
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
      id="schedule"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#feab00] text-sm font-extrabold uppercase tracking-widest animate-fade-in">Program of Events</h2>
          <h3 className="text-4xl font-extrabold text-[#111813] mt-2 animate-fade-in animate-delay-100">Conference Schedule</h3>
          <div className="h-1.5 w-20 bg-[#feab00] mx-auto rounded-full mt-4 animate-fade-in animate-delay-200"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Day 1 */}
          <div className="bg-background-light p-8 rounded-2xl border border-primary/10 shadow-sm animate-slide-in-left">
            <div className="flex items-center gap-2 text-primary font-bold mb-6">
              <span className="material-symbols-outlined">calendar_today</span>
              <span>Day 1: Arrival &amp; Opening</span>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="text-sm font-bold text-primary w-20 shrink-0">04:00 PM</span>
                <p className="text-sm font-semibold">Registration &amp; Accreditation</p>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-bold text-primary w-20 shrink-0">06:00 PM</span>
                <p className="text-sm font-semibold">Opening Plenary: Fire Night</p>
              </div>
            </div>
          </div>
          {/* Day 2 */}
          <div className="bg-primary text-white p-8 rounded-2xl shadow-xl transform scale-105 animate-fade-in-up animate-delay-300">
            <div className="flex items-center gap-2 font-bold mb-6">
              <span className="material-symbols-outlined">calendar_today</span>
              <span>Day 2: Transformation</span>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="text-sm font-bold text-white/80 w-20 shrink-0">08:00 AM</span>
                <p className="text-sm font-semibold">Morning Glory / Bible Study</p>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-bold text-white/80 w-20 shrink-0">12:00 PM</span>
                <p className="text-sm font-semibold">Workshops: Career &amp; Purpose</p>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-bold text-white/80 w-20 shrink-0">05:00 PM</span>
                <p className="text-sm font-semibold">Evening Word Explosion</p>
              </div>
            </div>
          </div>
          {/* Day 3 */}
          <div className="bg-background-light p-8 rounded-2xl border border-primary/10 shadow-sm animate-slide-in-right animate-delay-100">
            <div className="flex items-center gap-2 text-primary font-bold mb-6">
              <span className="material-symbols-outlined">calendar_today</span>
              <span>Day 3: Commissioning</span>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="text-sm font-bold text-primary w-20 shrink-0">08:00 AM</span>
                <p className="text-sm font-semibold">Special Impartation Service</p>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-bold text-primary w-20 shrink-0">01:00 PM</span>
                <p className="text-sm font-semibold">Closing Charge &amp; Departure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
