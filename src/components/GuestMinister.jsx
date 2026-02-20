import React, { useEffect, useRef, useState } from 'react';

const GuestMinister = () => {
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
      id="minister"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-extrabold uppercase tracking-widest animate-fade-in">Anointed Vessels</h2>
          <h3 className="text-4xl font-extrabold text-[#111813] mt-2 animate-fade-in animate-delay-100">Featured Speakers</h3>
          <p className="text-lg text-[#111813]/70 mt-4 max-w-2xl mx-auto animate-fade-in animate-delay-200">Prepare your hearts to receive from heaven through the ministry of our specially invited guest speakers. They carry a profound grace for teaching and the prophetic.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Speaker 1 */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all animate-fade-in-up animate-delay-300">
            <div className="aspect-[4/5] overflow-hidden">
              <img alt="Guest Minister" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkIjRDIxZBmGV8998Uve1ZaaOQ6YZazsgbhhjHZlEEQdU-tBpB0S6mLHQ-EJUrcD8o1jLa5tK0ipAFQ0wG8HKO5NcZUc4c6Dr48mHD4J7ChskiZArAsgA097gOVtskqNsdOUQ6IKgtfBar_bQU4v1SexX8_2oQXiXyY_D_cmp8rLzJBMTwhdePqWExDWLLMa64qD8V2iGar43OKKs6rJBfGGs-hLHDYrGAWUhVywNe52KNNE7hXz4jn2pPtV2i9RxTxBd4HXtmXxob"/>
            </div>
            <div className="p-8 text-center">
              <h4 className="text-xl font-bold mb-1">Apostle Michael Thompson</h4>
              <p className="text-primary text-sm font-bold uppercase mb-4">Keynote Speaker</p>
              <p className="text-[#111813]/60 text-sm">A prophetic voice to this generation with a mandate to raise disciples for Christ.</p>
            </div>
          </div>
          {/* Speaker 2 */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all animate-fade-in-up animate-delay-500">
            <div className="aspect-[4/5] overflow-hidden">
              <img alt="Speaker 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Professional portrait of a Female speaker" src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            </div>
            <div className="p-8 text-center">
              <h4 className="text-xl font-bold mb-1">Pastor Sarah Williams</h4>
              <p className="text-primary text-sm font-bold uppercase mb-4">Workshop Lead</p>
              <p className="text-[#111813]/60 text-sm">Dedicated to helping youth discover their divine purpose and excel in their careers.</p>
            </div>
          </div>
          {/* Speaker 3 */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all animate-fade-in-up animate-delay-500">
            <div className="aspect-[4/5] overflow-hidden">
              <img alt="Speaker 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Professional portrait of a Male speaker" src="https://images.unsplash.com/photo-1623184663796-f0eb7e46d6ab?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            </div>
            <div className="p-8 text-center">
              <h4 className="text-xl font-bold mb-1">Bro. Emmanuel Okon</h4>
              <p className="text-primary text-sm font-bold uppercase mb-4">Guest Psalmist</p>
              <p className="text-[#111813]/60 text-sm">A worship leader with a unique grace for leading congregations into the presence of God.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestMinister;
