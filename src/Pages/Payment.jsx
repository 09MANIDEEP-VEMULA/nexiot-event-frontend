// src/pages/Payment.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const teamName = 'Tech Innovators';
  const amountInPaisa = 500000; // ₹5000 in paisa
  const amount = (amountInPaisa / 100).toFixed(2);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep(3);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0e27 50%, #000000 100%)',
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '60px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 3D Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'fixed',
          top: -300,
          right: -300,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(255,152,0,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: '50px',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ff9800, #f57c00)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '15px',
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: '2px',
            }}
          >
            Payment Gateway
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#bdbdbd' }}>
            Complete your registration by paying the fee
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '50px',
            position: 'relative',
          }}
        >
          {/* Progress line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: 0,
              right: 0,
              height: '2px',
              background: 'rgba(100,181,246,0.2)',
              zIndex: 0,
            }}
          />
          <motion.div
            animate={{ width: paymentStep === 1 ? '33%' : paymentStep === 2 ? '66%' : '100%' }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: '20px',
              left: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #ff9800, #f57c00)',
              zIndex: 1,
            }}
          />

          {[
            { step: 1, label: 'Order Review', icon: '📋' },
            { step: 2, label: 'Payment Method', icon: '💳' },
            { step: 3, label: 'Confirmation', icon: '✓' },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <motion.div
                animate={{
                  scale: paymentStep >= item.step ? 1.2 : 1,
                  background: paymentStep >= item.step
                    ? 'linear-gradient(135deg, #ff9800, #f57c00)'
                    : 'rgba(100,100,100,0.3)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  border: `2px solid ${paymentStep >= item.step ? '#ff9800' : 'rgba(100,100,100,0.5)'}`,
                  marginBottom: '12px',
                  color: paymentStep >= item.step ? 'white' : '#666',
                }}
              >
                {paymentStep > item.step ? '✓' : item.icon}
              </motion.div>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: paymentStep >= item.step ? '#ff9800' : '#666',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Step 1: Order Review */}
          {paymentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                background: 'linear-gradient(135deg, rgba(45,45,45,0.8) 0%, rgba(26,26,26,0.8) 100%)',
                border: '2px solid rgba(255,152,0,0.2)',
                borderRadius: '20px',
                padding: '50px 40px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: '#ff9800',
                  marginBottom: '30px',
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Order Summary
              </h2>

              <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
                <div
                  style={{
                    padding: '25px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,152,0,0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p style={{ color: '#bdbdbd', fontSize: '0.95rem', marginBottom: '5px' }}>
                      Team Name
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
                      {teamName}
                    </p>
                  </div>
                  <div style={{ fontSize: '2rem' }}>👥</div>
                </div>

                <div
                  style={{
                    padding: '25px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,152,0,0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p style={{ color: '#bdbdbd', fontSize: '0.95rem', marginBottom: '5px' }}>
                      Registration Fee
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
                      ₹{amount}
                    </p>
                  </div>
                  <div style={{ fontSize: '2rem' }}>💰</div>
                </div>

                <div
                  style={{
                    padding: '25px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,152,0,0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p style={{ color: '#bdbdbd', fontSize: '0.95rem', marginBottom: '5px' }}>
                      Total Amount
                    </p>
                    <p
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 'bold',
                        color: '#ff9800',
                        fontFamily: "'Orbitron', sans-serif",
                      }}
                    >
                      ₹{amount}
                    </p>
                  </div>
                  <div style={{ fontSize: '2rem' }}>🎯</div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,152,0,0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPaymentStep(2)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(255,152,0,0.4)',
                  transition: 'all 0.3s ease',
                }}
              >
                Proceed to Payment →
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Payment Method */}
          {paymentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                background: 'linear-gradient(135deg, rgba(45,45,45,0.8) 0%, rgba(26,26,26,0.8) 100%)',
                border: '2px solid rgba(255,152,0,0.2)',
                borderRadius: '20px',
                padding: '50px 40px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: '#ff9800',
                  marginBottom: '30px',
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Select Payment Method
              </h2>

              <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
                {[
                  { id: 'razorpay', name: 'Razorpay', icon: '💳', desc: 'Secure payment gateway' },
                  { id: 'upi', name: 'UPI', icon: '📱', desc: 'Direct bank transfer' },
                  { id: 'netbanking', name: 'Net Banking', icon: '🏦', desc: 'All major banks' },
                ].map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    style={{
                      padding: '25px',
                      background: paymentMethod === method.id
                        ? 'linear-gradient(135deg, rgba(255,152,0,0.3), rgba(245,124,0,0.3))'
                        : 'rgba(0,0,0,0.3)',
                      border: paymentMethod === method.id ? '2px solid #ff9800' : '1px solid rgba(255,152,0,0.2)',
                      borderRadius: '12px',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ fontSize: '2.5rem' }}>{method.icon}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '5px' }}>
                        {method.name}
                      </p>
                      <p style={{ color: '#bdbdbd', fontSize: '0.9rem' }}>{method.desc}</p>
                    </div>
                    {paymentMethod === method.id && (
                      <div style={{ fontSize: '1.5rem', color: '#ff9800' }}>✓</div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentStep(1)}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    background: 'transparent',
                    color: '#ff9800',
                    border: '2px solid #ff9800',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  ← Back
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,152,0,0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePayment}
                  disabled={isProcessing}
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    background: isProcessing ? '#666' : 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    boxShadow: '0 0 30px rgba(255,152,0,0.4)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isProcessing ? '⏳ Processing...' : 'Pay ₹' + amount}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {paymentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                background: 'linear-gradient(135deg, rgba(45,45,45,0.8) 0%, rgba(26,26,26,0.8) 100%)',
                border: '2px solid rgba(76,175,80,0.3)',
                borderRadius: '20px',
                padding: '60px 40px',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, times: [0, 0.5, 1] }}
                style={{
                  fontSize: '4rem',
                  marginBottom: '20px',
                }}
              >
                ✓
              </motion.div>

              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#4caf50',
                  marginBottom: '15px',
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                Payment Successful!
              </h2>

              <p style={{ color: '#bdbdbd', fontSize: '1.05rem', marginBottom: '30px', lineHeight: '1.6' }}>
                Thank you for registering! Your team {teamName} is now officially part of Hackathon 2024.
                You will receive a confirmation email shortly.
              </p>

              <div
                style={{
                  padding: '25px',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '12px',
                  marginBottom: '30px',
                  border: '1px solid rgba(76,175,80,0.3)',
                }}
              >
                <p style={{ color: '#bdbdbd', marginBottom: '10px' }}>Transaction ID</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#64b5f6' }}>
                  TXN_{Date.now()}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(76,175,80,0.4)',
                  transition: 'all 0.3s ease',
                }}
              >
                Go to Dashboard →
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Security Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            marginTop: '40px',
            padding: '25px',
            background: 'linear-gradient(135deg, rgba(255,152,0,0.1) 0%, rgba(245,124,0,0.1) 100%)',
            border: '1px solid rgba(255,152,0,0.2)',
            borderRadius: '12px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p style={{ color: '#bdbdbd', marginBottom: '8px' }}>
            🔒 Your payment is secured with industry-standard encryption
          </p>
          <p style={{ color: '#9e9e9e', fontSize: '0.9rem' }}>
            All transactions are processed securely through trusted payment gateways
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;