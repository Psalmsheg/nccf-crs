import React, { useEffect, useRef, useState } from 'react';

const Support = () => {
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
      className={`py-24 px-6 lg:px-20 bg-background-light transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      id="support"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6 animate-slide-in-left">
            <h2 className="text-primary text-sm font-bold uppercase tracking-widest">Support the Mission</h2>
            <h3 className="text-4xl font-extrabold text-[#111813]">Partner with us for a greater impact</h3>
            <p className="text-lg text-[#111813]/70 leading-relaxed">
              Your generous partnership enables us to provide logistics, welfare, and materials for hundreds of Corpers attending this life-transforming conference.
            </p>
            {/* <div className="pt-4">
              <a className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg shadow-primary/20 w-full sm:w-auto" href="#">
                Give Now via Online
                <span className="material-symbols-outlined">payments</span>
              </a>
            </div> */}
          </div>
          <div className="relative animate-slide-in-right">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white p-8 lg:p-12 rounded-2xl shadow-xl border border-primary/10">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 border-b border-primary/10 pb-6">
                  <div className="bg-primary/10 text-primary p-3 rounded-xl">
                    <span className="material-symbols-outlined text-3xl">account_balance</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Account Details</p>
                    <h4 className="text-xl font-bold text-[#111813]">Bank Transfer</h4>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-[#111813]/50 font-medium mb-1 uppercase tracking-wider">Account Name</p>
                    <p className="text-xl font-extrabold text-[#111813]">Nigeria Christian Corpers Fellowship (NCCF)</p>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                    <div>
                      <p className="text-sm text-[#111813]/50 font-medium mb-1 uppercase tracking-wider">Account Number</p>
                      <p className="text-3xl font-black text-primary tracking-tighter">2311058742</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#111813]/50 font-medium mb-1 uppercase tracking-wider text-md-right">Bank Name</p>
                      <p className="text-lg font-bold text-[#111813] text-md-right">ECOBANK</p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">info</span>
                  <p className="text-xs text-[#111813]/70 font-medium">Please include "CONFERENCE 2026" as the transaction description.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
