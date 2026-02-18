import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import VisionMission from './components/VisionMission';
import Schedule from './components/Schedule';
import GuestMinister from './components/GuestMinister';
import CallToAction from './components/CallToAction';
import Location from './components/Location';
import Support from './components/Support';
import Footer from './components/Footer';

const REGISTRATION_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = 'd31be791-9551-4e0d-835d-38e503848636';

function formatDateTimeForICS(date) {
  const pad = (value) => String(value).padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

function RegistrationModal({ open, onClose, onSubmit, isSubmitting, submitError, isSuccess, onAddToCalendar, onResetSuccess }) {
  const [fullName, setFullName] = useState('');
  const [zone, setZone] = useState('');
  const [batch, setBatch] = useState('Batch A1');
  const [email, setEmail] = useState('');

  if (!open) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullName.trim() || !zone.trim() || !email.trim() || !batch) {
      return;
    }

    await onSubmit(
      {
        fullName: fullName.trim(),
        zone: zone.trim(),
        batch,
        email: email.trim(),
      }
    );

    setFullName('');
    setZone('');
    setBatch('Batch A1');
    setEmail('');
  };

  if (isSuccess) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
        onClick={handleOverlayClick}
      >
        <div className="bg-white dark:bg-[#1a2e20] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-primary/10 text-center px-8 py-10 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center shadow-inner shadow-emerald-200 mb-2">
            <span className="material-symbols-outlined text-6xl text-primary">check_circle</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Registration Successful!
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
              Thank you for registering for the NCCF Cross River State Conference 2026. You will
              receive your confirmation details via email.
            </p>
          </div>
          <div className="w-full flex flex-col gap-3 mt-2">
            <button
              type="button"
              onClick={onResetSuccess}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-4 text-sm font-bold rounded-full w-full shadow-lg shadow-primary/25 transition-all flex items-center justify-center cursor-pointer"
            >
              Continue to portal
            </button>
            <button
              type="button"
              onClick={onAddToCalendar}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-primary/90 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">event</span>
              <span>Add to my calendar</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-[#1a2e20] rounded-xl max-w-[520px] w-full shadow-2xl overflow-hidden border border-primary/10">
        {/* Modal Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-primary/10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
                <img src="/Logo.png" alt="NCCF CRS Logo" className="h-10 w-10 rounded-lg" />
                <div className="text-[#111813] text-[8px] font-bold tracking-tight leading-tight border-l-3 border-black pl-1">
                  <div>NCCF</div>
                  <div className="">CROSS RIVER</div>
                  <div className="">STATE CHAPTER</div>
                </div>
              </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-tight text-center">
            Register for State Conference 2026
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            Fill in your details below to secure your spot for this year's state conference.
          </p>
        </div>

        {/* Registration Form */}
        <form className="px-8 pb-4 space-y-5" onSubmit={handleSubmit}>
          {submitError && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex gap-3">
              <span className="material-symbols-outlined text-red-600 text-[20px]">error</span>
              <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed">
                {submitError}
              </p>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-0.5" htmlFor="full-name">Full Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">person</span>
              <input
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-background-dark/50 border border-gray-200 dark:border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                id="full-name"
                placeholder="e.g., John Doe"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-0.5" htmlFor="email">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">mail</span>
              <input
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-background-dark/50 border border-gray-200 dark:border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                id="email"
                placeholder="e.g., john.doe@example.com"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          {/* Two Column Layout for Zone and Batch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Zone Selection */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-0.5" htmlFor="zone">Zone</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">location_on</span>
                <select
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-background-dark/50 border border-gray-200 dark:border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                  id="zone"
                  value={zone}
                  onChange={(event) => setZone(event.target.value)}
                  required
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="" disabled>Select Zone</option>
                  <option value="Calabar">Calabar</option>
                  <option value="Akamkpa">Akamkpa</option>
                  <option value="Obudu">Obudu</option>
                  <option value="Ikom">Ikom</option>
                  <option value="Ogoja">Ogoja</option>
                  <option value="Yakurr">Yakurr</option>
                  <option value="Boki East">Boki East</option>
                  <option value="Boki West">Boki West</option>
                  <option value="Obubra">Obubra</option>
                  <option value="Odukpani">Odukpani</option>
                  <option value="Bekwarra">Bekwarra</option>
                  <option value="Akpabuyo">Akpabuyo</option>
                </select>
              </div>
            </div>

            {/* Batch Selection */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-0.5" htmlFor="batch">Batch</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">groups</span>
                <select
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-background-dark/50 border border-gray-200 dark:border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                  id="batch"
                  value={batch}
                  onChange={(event) => setBatch(event.target.value)}
                  required
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="" disabled>Select Batch</option>
                  <option value="Batch A1">Batch A1</option>
                  <option value="Batch A2">Batch A2</option>
                  <option value="Batch B1">Batch B1</option>
                  <option value="Batch B2">Batch B2</option>
                  <option value="Batch C1">Batch C1</option>
                  <option value="Batch C2">Batch C2</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Info/Notice */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 flex gap-3">
            <span className="material-symbols-outlined text-primary text-[20px]">info</span>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              By registering, you agree to receive conference updates via email. Please ensure your details are correct before submitting.
            </p>
          </div>
        </form>

        {/* Modal Footer Actions */}
        <div className="px-8 py-6 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-primary/10 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className="order-2 sm:order-1 flex-1 px-6 py-3 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="order-1 sm:order-2 flex-[2] bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:bg-primary/60 disabled:cursor-not-allowed cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Complete Registration'}
            {!isSubmitting && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [isSubmittingRegistration, setIsSubmittingRegistration] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const smoothScrollTo = (targetY, duration) => {
      const startY = window.pageYOffset;
      const diff = targetY - startY;
      let start;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);
        const eased = 1 - Math.pow(1 - percent, 3);

        window.scrollTo(0, startY + diff * eased);

        if (time < duration) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    const handleClick = (event) => {
      const link = event.target.closest('a[href^="#"]');

      if (!link) return;

      const hash = link.getAttribute('href');
      const target = document.querySelector(hash);

      if (!target) return;

      event.preventDefault();

      const headerOffset = 80;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
      const scrollTarget = targetTop - headerOffset;

      smoothScrollTo(scrollTarget, 1200);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const [registrationKey, setRegistrationKey] = useState(0);

  const handleOpenRegistration = () => {
    setShowRegistration(true);
    setRegistrationKey(prev => prev + 1); // Force remount to reset form state
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
    setRegistrationError('');
    setRegistrationSuccess(false);
  };

  const handleSubmitRegistration = async (data) => {
    setRegistrationError('');
    setIsSubmittingRegistration(true);

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'New NCCF CRS Conference Registration',
        from_name: 'NCCF CRS Conference Website',
        // Add timestamp to make each submission unique
        timestamp: new Date().toISOString(),
        ...data,
      };

      const response = await fetch(
        REGISTRATION_ENDPOINT,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Request failed');
      }

      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationError('Unable to submit your registration. Please try again.');
      throw error;
    } finally {
      setIsSubmittingRegistration(false);
    }
  };

  const handleAddToCalendar = () => {
    const now = new Date();
    const dtStamp = formatDateTimeForICS(now);
    const dtStart = '20261105T180000';
    const dtEnd = '20261107T160000';

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NCCF Cross River State//Conference 2026//EN',
      'BEGIN:VEVENT',
      `UID:${now.getTime()}@nccfcrossriver.org`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'SUMMARY:NCCF Cross River State Conference 2026',
      'DESCRIPTION:Annual state conference themed "Renewed Strength" (Isaiah 40:31).',
      'LOCATION:NCCF Family House, Calabar, Cross River State',
      'END:VEVENT',
      'END:VCALENDAR',
    ];

    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nccf-conference-2026.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header onRegisterClick={handleOpenRegistration} />
      <main>
        <Hero onRegisterClick={handleOpenRegistration} />
        <About />
        <VisionMission />
        <Schedule />
        <GuestMinister />
        <CallToAction onRegisterClick={handleOpenRegistration} />
        <Location />
        <Support />
      </main>
      <Footer onRegisterClick={handleOpenRegistration} />
      <RegistrationModal
        key={registrationKey}
        open={showRegistration}
        onClose={handleCloseRegistration}
        onSubmit={handleSubmitRegistration}
        isSubmitting={isSubmittingRegistration}
        submitError={registrationError}
        isSuccess={registrationSuccess}
        onAddToCalendar={handleAddToCalendar}
        onResetSuccess={() => {
          setRegistrationSuccess(false);
          setShowRegistration(false);
          setRegistrationError('');
        }}
      />
    </>
  );
}

export default App;
