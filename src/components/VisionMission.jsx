import React, { useEffect, useRef, useState } from 'react';

const VisionMission = () => {
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
      id="vision"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all group hover:shadow-xl hover:shadow-primary/10 animate-slide-in-left">
          <div className="bg-primary/10 text-primary w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">visibility</span>
          </div>
          <h4 className="text-2xl font-bold mb-4">Our Vision</h4>
          <p className="text-[#111813]/70 leading-relaxed text-lg">
            To see a generation of Christian youth across Cross River State and Nigeria at large, fully equipped and burning with zeal for Christ, making a significant impact in their host communities through service and evangelism.
          </p>
        </div>
        {/* Mission Card */}
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-primary/5 hover:border-primary/20 transition-all group hover:shadow-xl hover:shadow-primary/10 animate-slide-in-right">
          <div className="bg-primary/10 text-primary w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">task_alt</span>
          </div>
          <h4 className="text-2xl font-bold mb-4">Our Mission</h4>
          <p className="text-[#111813]/70 leading-relaxed text-lg">
            To mobilize corps members for effective rural rugged evangelism, to provide a platform for spiritual growth during the service year, and to foster a unity of faith that transcends ethnic and denominational boundaries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
