import React, { useEffect, useRef, useState } from 'react';
import PstEnwereuzor from '../assets/PstEnwereuzor.jpeg';
import PstVictorAnaele from '../assets/PstVictorAnaele.jpeg';
import RevSamBassey from '../assets/RevSamBassey.jpeg';



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
          <h2 className="text-[#feab00] text-sm font-extrabold uppercase tracking-widest animate-fade-in">Anointed Vessels</h2>
          <h3 className="text-4xl font-extrabold text-[#111813] mt-2 animate-fade-in animate-delay-100">Featured Speakers</h3>
          <p className="text-lg text-[#111813]/70 mt-4 max-w-2xl mx-auto animate-fade-in animate-delay-200">Prepare your hearts to receive from heaven through the ministry of our specially invited guest speakers. They carry a profound grace for teaching and the prophetic.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Speaker 1 */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all animate-fade-in-up animate-delay-500">
            <div className="aspect-[4/5] overflow-hidden">
              <img alt="Speaker 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Professional portrait of a Male speaker" src={RevSamBassey}/>
            </div>
            <div className="p-8 text-center">
              <h4 className="text-xl font-bold mb-1">Reverend Samuel Bassey</h4>
              <p className="text-[#feab00] text-sm font-bold uppercase mb-4">Keynote Speaker</p>
              <p className="text-[#111813]/60 text-sm">He is traveling missionary and Gospel teacher focused on Discipleship making, prophetic ministry, and spiritual development. He is the Senior Pastor Harvest Across Nations Int'l, a non-denominational and cross-cultural missionary church committed to raising at least one Kingdom disciple in every family of the earth.</p>
            </div>
          </div>

          {/* Speaker 2 */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all animate-fade-in-up animate-delay-500">
            <div className="aspect-[4/5] overflow-hidden">
              <img alt="Speaker 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Professional portrait of a Female speaker" src={PstVictorAnaele}/>
            </div>
            <div className="p-8 text-center">
              <h4 className="text-xl font-bold mb-1">Reverend Victor Anaele</h4>
              <p className="text-[#feab00] text-sm font-bold uppercase mb-4">Keynote Speaker</p>
              <p className="text-[#111813]/60 text-sm">Reverend Victor Anaele is a passionate disciple of Jesus, Agropreneur and Web designer. He is a teacher of God's word, preacher of the Gospel and the Pointman of the Remnant Christian Network, Uyo, Awka Ibom State</p>
            </div>
          </div>

          {/* Speaker 3 */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all animate-fade-in-up animate-delay-300">
            <div className="aspect-[4/5] overflow-hidden">
              <img alt="Guest Minister" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={PstEnwereuzor}/>
            </div>
            <div className="p-8 text-center">
              <h4 className="text-xl font-bold mb-1">Pastor Victor Enwereuzor</h4>
              <p className="text-[#feab00] text-sm font-bold uppercase mb-4">Keynote Speaker</p>
              <p className="text-[#111813]/60 text-sm">He is the Pastor Intimate Vessels Church, Lagos. He is committed to raising and building a people of genuine intimacy with God, equipping them to live victoriously through sound teaching of God's Word. He is a husband and father, a software developer, and a marketplace Apostle.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestMinister;
