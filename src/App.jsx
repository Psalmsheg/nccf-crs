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
import PaymentModal from './components/PaymentModal';

const REGISTRATION_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = 'd31be791-9551-4e0d-835d-38e503848636';
const PAYSTACK_PUBLIC_KEY = 'pk_test_9f1ffc88bbd96453a60545989cee3ce0d33066d1';

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

function RegistrationModal({ open, onClose, onSubmit, isSubmitting, submitError, isSuccess, onAddToCalendar, onResetSuccess, allocations }) {
  const [fullName, setFullName] = useState('');
  const [zone, setZone] = useState('');
  const [batch, setBatch] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [serviceUnit, setServiceUnit] = useState('');;

  // Accommodation and Bible Study allocation logic
  const femaleRooms = ['Flourish Room', 'Love Room', 'Esther Room', 'Ruth Room', 'Deborah Room', 'Mary Room', 'Martha Room', 'Hannah Room', 'Abigail Room', 'Sarah Room'];
  const maleRooms = ['Kadosh Room', 'Faith Room', 'Grace Room', 'Victory Room', 'Gentleness Room', 'Joseph Room', 'David Room', 'Elijah Room', 'Paul Room', 'Peter Room'];
  const serviceUnits = [
    'Prayer Unit',
    'Protocol Unit',
    'Ushering Unit',
    'Choir Unit',
    'Publicity Unit',
    'Registration Unit',
    'Welfare Unit',
    'Bible Study Unit',
    'Transport and Organizing Unit'
  ];

  const getRandomAccommodation = (gender) => {
    const rooms = gender === 'Female' ? femaleRooms : maleRooms;
    const randomIndex = Math.floor(Math.random() * rooms.length);
    return rooms[randomIndex];
  };

  const getBibleStudyClass = () => {
    const counterKey = 'registrationCounter';
    const timestampKey = 'lastAllocationTime';
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const now = Date.now();
      const lastAllocation = parseInt(localStorage.getItem(timestampKey) || '0');

      // If last allocation was very recent (< 200ms), wait and retry
      if (now - lastAllocation < 200) {
        // Simple busy wait for other operations to complete
        const waitTime = 200 - (now - lastAllocation);
        const startWait = Date.now();
        while (Date.now() - startWait < waitTime) {
          // Busy wait
        }
        continue;
      }

      // Update timestamp to mark this allocation as in progress
      localStorage.setItem(timestampKey, now.toString());

      try {
        // Get and increment counter
        const currentCount = parseInt(localStorage.getItem(counterKey) || '0');
        const classNumber = (currentCount % 10) + 1;

        // Store the incremented counter
        localStorage.setItem(counterKey, (currentCount + 1).toString());

        return classNumber;

      } catch (error) {
        // Reset timestamp on error
        localStorage.removeItem(timestampKey);
        throw error;
      }
    }

    // Fallback: use timestamp-based allocation if retries exhausted
    const timestamp = Date.now();
    const fallbackClass = ((timestamp % 1000) % 10) + 1;
    console.warn('Using timestamp-based fallback allocation');
    return fallbackClass;
  };

  const allocateResources = (gender) => {
    const accommodation = getRandomAccommodation(gender);
    const bibleStudyClass = getBibleStudyClass();

    return { accommodation, bibleStudyClass };
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

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

    if (!fullName.trim() || !zone.trim() || !email.trim() || !batch || !phoneNumber.trim() || !gender) {
      return;
    }

    // Allocate accommodation and bible study class
    const allocations = allocateResources(gender);

    await onSubmit(
      {
        fullName: fullName.trim(),
        zone: zone.trim(),
        batch,
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        gender,
        serviceUnit: serviceUnit || null, // Optional field
        accommodation: allocations.accommodation,
        bibleStudyClass: allocations.bibleStudyClass,
      }
    );

    setFullName('');
    setZone('');
    setBatch('Batch A1');
    setEmail('');
    setPhoneNumber('');
    setGender('');
    setServiceUnit('');
  };

  if (isSuccess) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-4"
        onClick={handleOverlayClick}
      >
        <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-primary/10 text-center px-6 py-8 flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shadow-inner shadow-primary/20 mb-2 flex-shrink-0">
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

          {/* Allocation Information */}
          {allocations && (
            <div className="w-full bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">celebration</span>
                Your Allocations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/80 dark:bg-gray-800/50 rounded-lg p-4 border border-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary text-2xl">hotel</span>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Accommodation</span>
                  </div>
                  <p className="text-xl font-bold text-primary">{allocations.accommodation}</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/50 rounded-lg p-4 border border-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary text-2xl">school</span>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Bible Study</span>
                  </div>
                  <p className="text-xl font-bold text-primary">Bible Study Class {allocations.bibleStudyClass}</p>
                </div>
                {allocations.serviceUnit && (
                  <div className="bg-white/80 dark:bg-gray-800/50 rounded-lg p-4 border border-primary/10 md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-primary text-2xl">volunteer_activism</span>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Service Unit</span>
                    </div>
                    <p className="text-xl font-bold text-primary">{allocations.serviceUnit}</p>
                  </div>
                )}
              </div>
            </div>
          )}

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
      <div className="bg-white rounded-xl max-w-xl w-full max-h-[90vh] shadow-2xl border border-primary/10 flex flex-col">
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-primary/10 flex-shrink-0">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
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

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Registration Form */}
          <form className="px-6 pb-4 space-y-4" onSubmit={handleSubmit}>
          {submitError && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 flex gap-3">
              <span className="material-symbols-outlined text-red-600 text-[20px]">error</span>
              <p className="text-xs text-red-600 leading-relaxed">
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
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-background-dark/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                id="full-name"
                placeholder="e.g., John Doe"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
              {fullName && (
                <button
                  type="button"
                  onClick={() => setFullName('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-0.5" htmlFor="email">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">mail</span>
              <input
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-background-dark/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                id="email"
                placeholder="e.g., john.doe@example.com"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              {email && (
                <button
                  type="button"
                  onClick={() => setEmail('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-0.5" htmlFor="phoneNumber">Phone Number</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">phone</span>
              <input
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 dark:border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                id="phone"
                placeholder="e.g., +234xxxxxxxxx"
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
              />
              {phoneNumber && (
                <button
                  type="button"
                  onClick={() => setPhoneNumber('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Gender Selection */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-0.5" htmlFor="gender">Gender</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">person</span>
              <select
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 dark:border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                id="gender"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                required
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Service Unit Selection (Optional) */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-0.5" htmlFor="serviceUnit">
              Which Department Would You Like to Serve? <span className="text-gray-500 font-normal"></span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">volunteer_activism</span>
              <select
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 dark:border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                id="serviceUnit"
                value={serviceUnit}
                onChange={(event) => setServiceUnit(event.target.value)}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select a department</option>
                {serviceUnits.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Two Column Layout for Zone and Batch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Zone Selection */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-0.5" htmlFor="zone">Zone</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">location_on</span>
                <select
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 dark:border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
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
              <label className="text-sm font-semibold text-gray-700 ml-0.5" htmlFor="batch">Batch</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">groups</span>
                <select
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 dark:border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
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
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 flex gap-3">
            <span className="material-symbols-outlined text-primary text-[20px]">info</span>
            <p className="text-xs text-gray-600 leading-relaxed">
              By registering, you agree to receive conference updates via email. Please ensure your details are correct before submitting.
            </p>
          </div>
        </form>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3 flex-shrink-0">
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
  const [userAllocations, setUserAllocations] = useState(null);
  
  // Payment related state
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [conferenceFee] = useState(2500); // ₦1,500 conference fee

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
    setShowPayment(true); // Show payment modal first
  };

  const handlePaymentSuccess = (paymentInfo) => {
    setPaymentData(paymentInfo);
    setShowPayment(false);
    setShowRegistration(true);
    setRegistrationKey(prev => prev + 1); // Force remount to reset form state
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
    setRegistrationError('');
    setRegistrationSuccess(false);
    setUserAllocations(null);
  };

  const handleSubmitRegistration = async (data) => {
    setRegistrationError('');
    setIsSubmittingRegistration(true);

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'New NCCF CRS Conference Registration',
        from_name: 'NCCF CRS Conference Website',
        // Payment information
        payment_reference: paymentData?.reference || 'N/A',
        payment_amount: paymentData?.amount || 0,
        payment_status: paymentData?.status || 'N/A',
        // timestamp: new Date().toISOString(),
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

      // Store allocations for display in success modal
      setUserAllocations({
        accommodation: data.accommodation,
        bibleStudyClass: data.bibleStudyClass,
        serviceUnit: data.serviceUnit,
      });

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

    // Build detailed description with allocations
    let description = 'Annual state conference themed "Renewed Strength" (Isaiah 40:31).\\n\\n';
    description += 'Your Allocations:\\n';
    description += `• Accommodation: ${userAllocations.accommodation}\\n`;
    description += `• Bible Study Class: ${userAllocations.bibleStudyClass}\\n`;
    if (userAllocations.serviceUnit) {
      description += `• Service Unit: ${userAllocations.serviceUnit}\\n`;
    }
    description += '\\nPlease arrive on time and bring your conference materials.';

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
      `DESCRIPTION:${description}`,
      'LOCATION:NCCF Family House, Calabar, Cross River State',
      'END:VEVENT',
      'END:VCALENDAR',
    ];

    const icsContent = lines.join('\r\n');
    const dataUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

    // Try to open in calendar app
    const newWindow = window.open(dataUrl, '_blank');

    // Fallback: if popup blocked or calendar app doesn't open, download the file
    if (!newWindow || newWindow.closed) {
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nccf-conference-2026.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
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
      <PaymentModal
        open={showPayment}
        onClose={handleClosePayment}
        onPaymentSuccess={handlePaymentSuccess}
        amount={conferenceFee}
        publicKey={PAYSTACK_PUBLIC_KEY}
      />
      
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
          setUserAllocations(null);
        }}
        allocations={userAllocations}
      />
    </>
  );
}

export default App;
