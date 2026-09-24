import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, ShieldCheck, Lock, Phone, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, loginUser, setCurrentTab, showToast } = useApp();
  
  const [role, setRole] = useState('customer'); // 'customer' | 'admin'
  
  // Admin Form State
  const [adminUsername, setAdminUsername] = useState('ishita_sharma');
  const [adminPassword, setAdminPassword] = useState('ishita@12');
  const [adminError, setAdminError] = useState('');

  // Customer OTP Form State
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [customerName, setCustomerName] = useState('Ishita Sharma');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [demoOtp, setDemoOtp] = useState('1234');

  if (!isAuthOpen) return null;

  // Handle Admin Login (Strict Admin Credentials Check: ishita_sharma / ishita@12)
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setAdminError('');

    if (adminUsername.trim() === 'ishita_sharma' && adminPassword === 'ishita@12') {
      loginUser({
        name: 'Ishita Sharma (Admin)',
        email: 'ishita_sharma@tinyartstudio.com',
        role: 'admin',
        address: 'Studio HQ, 88 Art Gallery Road, Bandra West, Mumbai - 400050',
        lat: 19.0596,
        lng: 72.8295
      });
      setCurrentTab('admin');
    } else {
      setAdminError('Invalid Admin Credentials! Required username: ishita_sharma, password: ishita@12');
    }
  };

  // Step 1: Send OTP to Phone
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!customerPhone || customerPhone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number.');
      return;
    }
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setDemoOtp(generatedOtp);
    setOtpSent(true);
    showToast(`OTP sent to +91 ${customerPhone}! (Demo OTP: ${generatedOtp})`);
  };

  // Step 2: Verify OTP & Login Customer
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otpInput) {
      showToast('Please enter the 4-digit OTP.');
      return;
    }

    loginUser({
      name: customerName || `Customer (${customerPhone.slice(-4)})`,
      phone: `+91 ${customerPhone}`,
      role: 'customer',
      address: 'Flat 402, Lotus Apartments, Park Street, Connaught Place, New Delhi - 110001',
      lat: 28.6315,
      lng: 77.2167
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-[#FAF7F2] border border-[#E3D3C5] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsAuthOpen(false);
            setOtpSent(false);
            setAdminError('');
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C7A6B] hover:text-[#4A2E25] hover:bg-[#E8D4C8]/50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#E8D4C8] text-[#8C4A38] mx-auto flex items-center justify-center text-2xl font-serif mb-2">
            🧵
          </div>
          <h2 className="font-serif font-extrabold text-2xl text-[#4A2E25]">
            {role === 'customer' ? 'Customer Phone Login' : 'Admin Login'}
          </h2>
          <p className="text-xs text-[#8C7A6B] mt-1">
            {role === 'customer' 
              ? 'Log in using your phone number & OTP (No password required)' 
              : 'Enter admin username & password to access Studio Controls'}
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex bg-[#F3EAE1] p-1 rounded-xl border border-[#E3D3C5] mb-6">
          <button
            type="button"
            onClick={() => {
              setRole('customer');
              setOtpSent(false);
              setAdminError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'customer' 
                ? 'bg-[#8C4A38] text-white shadow-2xs' 
                : 'text-[#634E42] hover:text-[#4A2E25]'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Customer OTP Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('admin');
              setAdminError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'admin' 
                ? 'bg-[#4A2E25] text-white shadow-2xs' 
                : 'text-[#634E42] hover:text-[#4A2E25]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Admin Login</span>
          </button>
        </div>

        {/* CUSTOMER PHONE OTP LOGIN FORM */}
        {role === 'customer' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#D6C5B7] rounded-xl text-xs focus:ring-2 focus:ring-[#8C4A38]/30"
                      placeholder="e.g. Ishita Sharma"
                    />
                    <User className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                    Mobile Phone Number *
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-[#8C4A38]">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-12 pr-3 py-2 bg-white border border-[#D6C5B7] rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#8C4A38]/30"
                      placeholder="9876543210"
                    />
                  </div>
                  <p className="text-[10px] text-[#8C7A6B] mt-1 italic">
                    We will send a 4-digit SMS OTP verification code to this number.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8C4A38] hover:bg-[#723A2B] text-white py-2.5 rounded-full font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Get OTP Code</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="bg-[#FFF4E5] border border-[#F0D5B5] p-3 rounded-2xl text-xs text-[#855B14] flex items-center justify-between">
                  <div>
                    <p className="font-bold">OTP sent to +91 {customerPhone}</p>
                    <p className="text-[10px] text-[#9A6A18] mt-0.5">Enter OTP code below (Demo OTP: <strong className="font-mono text-[#8C4A38]">{demoOtp}</strong>)</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-[10px] underline font-bold text-[#8C4A38]"
                  >
                    Change
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                    Enter 4-Digit OTP Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center tracking-[0.5em] font-mono text-xl py-2 bg-white border border-[#D6C5B7] rounded-xl focus:ring-2 focus:ring-[#8C4A38]/30 text-[#8C4A38] font-bold"
                    placeholder="••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8C4A38] hover:bg-[#723A2B] text-white py-2.5 rounded-full font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify OTP & Login</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* ADMIN LOGIN FORM (ishita_sharma / ishita@12) */}
        {role === 'admin' && (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            {adminError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl font-medium">
                {adminError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                Admin Username *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#D6C5B7] rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#4A2E25]/30"
                  placeholder="ishita_sharma"
                />
                <User className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                Admin Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#D6C5B7] rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#4A2E25]/30"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4A2E25] hover:bg-[#341F18] text-white py-2.5 rounded-full font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#E5A93C]" />
              <span>Login as Admin</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
