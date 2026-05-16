import React, { useEffect, useRef, useState } from 'react';

const Schedule = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const days = [
    {
      id: 'day-1',
      title: 'Day 1',
      date: 'Thursday, June 4, 2026',
      sessions: [
        {
          title: 'Thursday Evening Session',
          items: [
            { time: '2:00PM – 5:00PM', program: 'Arrival and Registration', minister: 'Secretariat' },
            { time: '5:00PM – 6:00PM', program: 'Prayer Uproar', minister: 'State Prayer Secretary' },
            { time: '6:00PM – 6:15PM', program: 'Worship', minister: 'Fountain Choir' },
            { time: '6:15PM – 6:30PM', program: 'Meeting Declaration / Camp Orientation', minister: 'Camp Commandant' },
            { time: '6:30PM – 7:15PM', program: 'Opening Charge', minister: 'State Secretary' },
            { time: '7:15PM – 8:30PM', program: 'Theme Exposition', minister: 'State Chairman' },
            {
              time: '8:30PM – 8:40PM',
              program: 'Announcement and Benediction',
              minister: 'Incoming State General Secretary',
            },
            {
              time: '9:00PM – 10:30PM',
              program: 'Dinner / Light Out',
              minister: 'State Sisters Coordinator & Welfare Secretary / Camp Commandant',
            },
            { time: '10:30PM – 5:00AM', program: 'Rest', minister: 'Camp Commandant' },
          ],
        },
      ],
    },
    {
      id: 'day-2',
      title: 'Day 2',
      date: 'Friday, June 5, 2026',
      sessions: [
        {
          title: 'Friday Morning Session',
          items: [
            { time: '5:00AM – 5:30AM', program: 'Corporate Devotion', minister: 'All Jesus Corpers' },
            { time: '5:30AM – 6:30AM', program: 'Cleanup', minister: 'Camp Commandant' },
            { time: '6:30AM – 7:00AM', program: 'Unit Meeting', minister: 'Camp Officials' },
            { time: '7:00AM – 7:10AM', program: 'Opening Prayer', minister: 'Prayer Unit' },
            { time: '7:10AM – 7:30AM', program: 'Praise and Worship', minister: 'Fountain Choir' },
            { time: '7:30AM – 7:40AM', program: 'Welcome Address', minister: 'Incoming State General Secretary' },
            { time: '7:40AM – 8:40AM', program: 'Bible Study', minister: 'Bible Study Unit' },
            { time: '8:40AM – 9:00AM', program: 'Prayer Uproar', minister: 'Incoming State Prayer Secretary' },
            { time: '9:00AM – 9:20AM', program: 'Choir Ministration', minister: 'Fountain Choir' },
            { time: '9:20AM – 11:20AM', program: 'Theme Exposition I', minister: 'Rev Samuel Bassey' },
            { time: '11:20AM – 11:40AM', program: 'Prayer', minister: 'Zonal Delegate' },
            { time: '11:40AM – 12:00PM', program: 'Announcement', minister: 'Incoming AGS' },
            {
              time: '12:00PM – 1:30PM',
              program: 'Brunch / Rest',
              minister: 'State Sisters Coordinator & Welfare Secretary / Camp Commandant',
            },
          ],
        },
        {
          title: 'Friday Afternoon Session',
          items: [
            { time: '1:30PM – 1:40PM', program: 'Hymn', minister: 'Fountain Choir' },
            { time: '1:40PM – 2:00PM', program: 'Prayer Uproar', minister: 'Zonal Delegate' },
            { time: '3:00PM – 3:40PM', program: 'Drama Ministration', minister: 'Drama Unit' },
            { time: '3:40PM – 5:40PM', program: 'Theme Exposition II', minister: 'Rev Anaele Victor' },
            { time: '5:40PM – 6:00PM', program: 'Prayer', minister: 'Zonal Delegate' },
            { time: '6:00PM', program: 'Announcement', minister: 'Zonal Delegate' },
            { time: '6:00PM – 8:00PM', program: 'Rest / Dinner', minister: 'Camp Commandant' },
          ],
        },
        {
          title: 'Friday Evening Session',
          items: [
            { time: '8:00PM – 8:30PM', program: 'Worship', minister: 'Fountain Choir' },
            { time: '8:30PM – 9:00PM', program: 'Prayer Uproar', minister: 'Prayer Unit' },
            { time: '9:00PM – 11:00PM', program: 'Power Night', minister: 'Rev Anaele Victor' },
            { time: '11:00PM', program: 'Announcement', minister: 'Zonal Delegate' },
            { time: '11:00PM – 5:00AM', program: 'Rest / Light Out', minister: 'Camp Commandant' },
          ],
        },
      ],
    },
    {
      id: 'day-3',
      title: 'Day 3',
      date: 'Saturday, June 6, 2026',
      sessions: [
        {
          title: 'Saturday Morning Session',
          items: [
            { time: '5:00AM – 5:30AM', program: 'Corporate Devotion', minister: 'All Jesus Corpers' },
            { time: '5:30AM – 6:30AM', program: 'Cleanup', minister: 'Camp Commandant' },
            { time: '6:30AM – 7:00AM', program: 'Unit Meeting', minister: 'Camp Officials' },
            { time: '7:00AM – 7:10AM', program: 'Opening Prayer', minister: 'Prayer Unit' },
            { time: '7:10AM – 7:30AM', program: 'Praise and Worship', minister: 'Fountain Choir' },
            { time: '7:30AM – 8:30AM', program: 'Bible Study', minister: 'Bible Study Unit' },
            { time: '8:30AM – 8:40AM', program: 'Worship', minister: 'Fountain Choir' },
            { time: '8:40AM – 10:00AM', program: 'Mission Awareness', minister: 'Harvest in all Nations' },
            {
              time: '10:00AM – 11:30AM',
              program: 'Relationship and Marriage',
              minister: 'Pastor Joshua Olalekan',
            },
            { time: '11:30AM – 11:40AM', program: 'Announcement and Benediction', minister: 'Assistant Secretary' },
            { time: '11:40AM – 1:30PM', program: 'Brunch / Rest', minister: 'Camp Commandant' },
          ],
        },
        {
          title: 'Saturday Afternoon Session',
          items: [
            { time: '2:00PM – 5:00PM', program: 'Alumni Reunion', minister: 'Pastor Joshua Olalekan' },
            { time: '5:00PM – 5:20PM', program: 'Praise and Worship', minister: 'Fountain Choir' },
            { time: '5:20PM – 6:20PM', program: 'Health Matters', minister: 'Pastor Adesanya Emmanuel' },
            {
              time: '6:20PM – 8:20PM',
              program: 'Missionaries in the Marketplace',
              minister: 'Pastor Victor Enwereuzor',
            },
            { time: '8:20PM', program: 'Announcement and Benediction', minister: 'Zonal Delegate' },
            {
              time: '10:00PM',
              program: 'Testimony and Award Night',
              minister: 'Publicity Unit and Incoming General Secretary',
            },
          ],
        },
      ],
    },
    {
      id: 'day-4',
      title: 'Day 4',
      date: 'Sunday, June 7, 2026',
      sessions: [
        {
          title: 'Sunday Morning Session (Sunday Service, Thanksgiving & Handing Over Service)',
          items: [
            { time: '8:00AM – 8:05AM', program: 'Opening Prayer', minister: 'Prayer Unit' },
            { time: '8:05AM – 8:25AM', program: 'Worship', minister: 'Fountain Choir' },
            { time: '8:25AM – 8:30AM', program: 'Hymn', minister: 'Fountain Choir' },
            { time: '8:35AM – 8:50AM', program: 'Prayer', minister: 'Prayer Unit' },
            { time: '8:50AM – 8:55AM', program: 'Prayer of Confession', minister: 'Zonal Delegate' },
            { time: '8:55AM – 9:05AM', program: 'Choir Ministration', minister: 'Fountain Choir' },
            { time: '9:05AM – 10:30AM', program: 'Ministration', minister: 'Pastor Joshua Olalekan' },
            { time: '10:30AM – 11:30AM', program: 'Thanksgiving and Handing Over', minister: '—' },
            { time: '11:30AM – 11:40AM', program: 'Tithe and Offering', minister: 'Outgoing State Treasurer' },
            { time: '11:40AM – 11:50AM', program: 'Theme Song', minister: 'Fountain Choir' },
            { time: '11:50AM – 12:00PM', program: 'Announcement', minister: 'Incoming State General Secretary' },
            { time: '12:00PM – 12:10PM', program: 'Vote of thanks', minister: 'Incoming State President' },
            { time: '12:10PM – 12:20PM', program: 'Family Song', minister: 'Fountain Choir' },
            { time: '12:20PM – 12:30PM', program: 'Closing and Blessing', minister: 'Outgoing State Chairman' },
            { time: '12:30PM', program: 'DEPARTURE', minister: 'All Jesus Corpers' },
          ],
        },
      ],
    },
  ];

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
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#feab00] text-sm font-extrabold uppercase tracking-widest animate-fade-in">Program of Events</h2>
          <h3 className="text-4xl font-extrabold text-[#111813] mt-2 animate-fade-in animate-delay-100">Conference Schedule</h3>
          <p className="mt-3 text-sm font-semibold text-[#111813]/70 animate-fade-in animate-delay-150">
            Thursday, June 4 – Sunday, June 7, 2026
          </p>
          <div className="h-1.5 w-20 bg-[#feab00] mx-auto rounded-full mt-4 animate-fade-in animate-delay-200"></div>
        </div>
        <div className="space-y-6">
          {days.map((day) => (
            <details
              key={day.id}
              className="group bg-background-light rounded-2xl border border-primary/10 shadow-sm overflow-hidden"
            >
              <summary className="cursor-pointer select-none px-6 py-5 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">calendar_today</span>
                  <div>
                    <p className="text-[#111813] font-extrabold tracking-tight">
                      {day.title}: {day.date}
                    </p>
                    <p className="text-sm text-[#111813]/70 font-semibold">Tap to view schedule</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary transition-transform duration-300 group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 pt-1 space-y-6">
                {day.sessions.map((session) => (
                  <div key={session.title} className="bg-white rounded-xl border border-primary/10 overflow-hidden">
                    <div className="px-4 py-3 bg-primary/5 border-b border-primary/10">
                      <p className="font-bold text-[#111813]">{session.title}</p>
                    </div>
                    <div className="p-4">
                      <div className="hidden md:grid md:grid-cols-[160px_1fr_240px] gap-3 pb-2 border-b border-gray-100">
                        <p className="text-xs font-extrabold uppercase tracking-widest text-[#111813]/60">Time</p>
                        <p className="text-xs font-extrabold uppercase tracking-widest text-[#111813]/60">Program</p>
                        <p className="text-xs font-extrabold uppercase tracking-widest text-[#111813]/60">Minister</p>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {session.items.map((item) => (
                          <div
                            key={`${item.time}-${item.program}`}
                            className="py-3 md:grid md:grid-cols-[160px_1fr_240px] md:gap-3"
                          >
                            <p className="text-sm font-extrabold text-primary">{item.time}</p>
                            <p className="text-sm font-semibold text-[#111813] mt-1 md:mt-0">{item.program}</p>
                            <p className="text-sm font-semibold text-[#111813]/70 mt-1 md:mt-0">
                              {item.minister || '—'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
