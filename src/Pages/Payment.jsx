import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { paymentAPI } from '../services/api';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const teamId = location.state?.teamId || localStorage.getItem('teamId');
  const teamName = location.state?.teamName || localStorage.getItem('teamName');

  const REGISTRATION_FEE = 499; // in INR

  useEffect(() => {
    if (!teamId) {
      navigate('/register');
    }
    
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
  }, [teamId, navigate]);

  const handlePayment = async () => {
    setError('');
    setPaymentProcessing(true);

    try {
      // Initiate payment
      const response = await paymentAPI.initiatePayment({
        teamId,
        amount: REGISTRATION_FEE,
        teamName
      });

      const { orderId } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: REGISTRATION_FEE * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'Hackathon 2024',
        description: 'Event Registration',
        order_id: orderId,
        handler: handlePaymentSuccess,
        prefill: {
          name: teamName,
          email: localStorage.getItem('userEmail') || '',
          contact: localStorage.getItem('userPhone') || ''
        },
        theme: {
          color: '#64b5f6'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || 'Payment initiation failed');
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      setLoading(true);
      
      // Verify payment
      const verifyResponse = await paymentAPI.verifyPayment({
        teamId,
        razorpayPaymentId: paymentResponse.razorpay_payment_id,
        razorpayOrderId: paymentResponse.razorpay_order_id,
        razorpaySignature: paymentResponse.razorpay_signature
      });

      if (verifyResponse.data.success) {
        // Store payment details
        localStorage.setItem('paymentStatus', 'completed');
        localStorage.setItem('paymentId', verifyResponse.data.paymentId);

        // Redirect to success page or dashboard
        navigate('/dashboard', { state: { paymentSuccess: true } });
      } else {
        setError('Payment verification failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-blue-950/20 to-black">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-neon">
            Complete Payment
          </h1>
          <p className="text-gray-400">
            Secure your spot in the hackathon
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-cyan-500/20">
                <span className="text-gray-300">Team Name</span>
                <span className="font-semibold">{teamName || 'Loading...'}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-cyan-500/20">
                <span className="text-gray-300">Event Registration</span>
                <span className="font-semibold">₹{REGISTRATION_FEE}</span>
              </div>

              <div className="flex justify-between items-center py-3 text-lg font-bold border-t-2 border-cyan-500/50">
                <span>Total Amount</span>
                <span className="text-cyan-400">₹{REGISTRATION_FEE}</span>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <h3 className="font-semibold text-cyan-400 mb-3">What's Included:</h3>
              {[
                '48-hour hackathon access',
                'Free meals & refreshments',
                'Certificate of participation',
                'Mentorship sessions',
                'Prize eligibility',
                'Networking opportunities'
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6 text-cyan-400">Payment Details</h2>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 mb-6"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Amount to Pay</label>
                  <div className="text-3xl font-bold text-cyan-400">
                    ₹{REGISTRATION_FEE}
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-300">
                    ✓ Secure payment powered by Razorpay
                  </p>
                  <p className="text-sm text-blue-300 mt-1">
                    ✓ Your payment information is encrypted
                  </p>
                </div>
              </div>

              <motion.button
                onClick={handlePayment}
                disabled={loading || paymentProcessing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-400/50 transition text-lg"
              >
                {loading || paymentProcessing ? 'Processing...' : 'Pay Now'}
              </motion.button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By proceeding, you agree to our terms and conditions
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 card"
        >
          <h3 className="text-xl font-bold mb-4 text-cyan-400">Payment Information</h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <p className="font-semibold text-cyan-400 mb-1">Is my payment secure?</p>
              <p>Yes, we use Razorpay, a trusted payment gateway with end-to-end encryption.</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-400 mb-1">What payment methods are accepted?</p>
              <p>We accept credit cards, debit cards, UPI, net banking, and digital wallets.</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-400 mb-1">Can I get a refund?</p>
              <p>Refunds are processed within 7-10 business days if requested before the event.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;