import React, { useState } from 'react';

const PaymentModal = ({ open, onClose, onPaymentSuccess, amount = 1500, publicKey }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [email, setEmail] = useState('');

  const handlePayment = () => {
    if (!email.trim()) {
      setPaymentError('Please enter your email address');
      return;
    }

    if (typeof window.PaystackPop !== 'function') {
      setPaymentError('Unable to load Paystack. Please check your internet connection and try again.');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setPaymentError('Please enter a valid email address');
        setIsProcessing(false);
        return;
      }

      const paystackConfig = {
        key: publicKey,
        email: email.trim(),
        amount: amount * 100,
        currency: 'NGN',
        reference: `NCCF-CRS-CONFERENCE-${Date.now()}`,
        onSuccess: (transaction) => {
          setIsProcessing(false);
          onPaymentSuccess({
            reference: transaction.reference,
            amount: amount,
            status: 'success',
            email: email.trim()
          });
        },
        onCancel: () => {
          setIsProcessing(false);
          setPaymentError('Payment was cancelled');
        }
      };

      const paystack = new window.PaystackPop();
      paystack.newTransaction(paystackConfig);
    } catch (error) {
      console.error('Paystack initialization error:', error);
      setPaymentError(`Payment initialization failed: ${error.message || 'Unknown error'}`);
      setIsProcessing(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">payment</span>
            </div>
            <h2 className="text-2xl font-bold text-[#111813] dark:text-white mb-2">Conference Registration</h2>
            <p className="text-gray-600 dark:text-gray-300">Complete your payment to proceed with registration</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-300">Conference Fee</span>
              <span className="font-semibold text-[#111813] dark:text-white">₦{amount.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#111813] dark:text-white">Total</span>
                <span className="font-bold text-primary text-lg">₦{amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-[#111813] dark:text-white"
              required
            />
          </div>

          {paymentError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                <span className="text-red-700 dark:text-red-300 text-sm">{paymentError}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">credit_card</span>
                  Pay with Paystack
                </>
              )}
            </button>

            <button
              onClick={onClose}
              disabled={isProcessing}
              className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Secured by Paystack • SSL Encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
