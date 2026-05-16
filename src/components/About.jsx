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
        <h2 className="text-[#feab00] text-sm font-extrabold uppercase tracking-widest animate-fade-in">About the Conference</h2>
        <h3 className="text-3xl lg:text-4xl font-extrabold text-[#111813] animate-fade-in animate-delay-100">A Divine Appointment for Rejuvenation</h3>
        <div className="h-1 w-24 bg-[#feab00] mx-auto rounded-full mt-2 animate-fade-in animate-delay-200"></div>
        <p className="text-lg text-[#111813]/70 leading-loose animate-fade-in animate-delay-300">
          The Nigerian Christian Corpers' Fellowship (NCCF) Cross River State Conference is more than just a gathering; it is a sacred space designed for spiritual alignment and empowerment. For decades, NCCF has stood as a beacon of faith for corps members across Nigeria, and this year's conference in the heart of Cross River aims to reignite the fire of service, fellowship, and purpose in every attendee. We invite you to experience a shift in your spiritual journey.
        </p>
        <div className="bg-background-light border border-primary/10 rounded-2xl p-6 lg:p-8 text-left animate-fade-in animate-delay-400">
          <h4 className="text-lg font-extrabold text-[#111813] tracking-tight">About NCCF</h4>
          <p className="mt-3 text-sm lg:text-base text-[#111813]/70 leading-relaxed">
            In the late 1950s, a Scottish missionary, Pa S. G. Elton, prophesied that a time would come when Nigeria would raise and send her youths to preach the Gospel across the nation. In the aftermath of the Nigerian Civil War (1967–1970), the Federal Government established the National Youth Service Corps (NYSC) in 1973 to foster unity and national integration. Within this setting, NCCF (Nigeria Christian Corpers’ Fellowship) emerged as a non-denominational, non-governmental, non-profit Christian body for corps members—known as Jesus Corpers.
          </p>
          <p className="mt-4 text-sm lg:text-base text-[#111813]/70 leading-relaxed">
            Our vision is to ensure that corps members encounter Christ and are equipped to preach the Gospel and disciple men everywhere in Nigeria. NCCF expresses this in three dimensions:
          </p>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-primary/10 p-4">
              <p className="text-sm font-extrabold text-primary">Organization</p>
              <p className="mt-1 text-sm text-[#111813]/70 leading-relaxed">
                A registered body that supports structure, accountability, and service.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-primary/10 p-4">
              <p className="text-sm font-extrabold text-primary">Fellowship</p>
              <p className="mt-1 text-sm text-[#111813]/70 leading-relaxed">
                A Spirit-filled home for worship, discipleship, and growth.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-primary/10 p-4">
              <p className="text-sm font-extrabold text-primary">Family</p>
              <p className="mt-1 text-sm text-[#111813]/70 leading-relaxed">
                A community of oneness—often expressed through Family Houses as a home away from home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
