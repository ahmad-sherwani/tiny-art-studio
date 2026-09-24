import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, loginUser, setCurrentTab } = useApp();
  
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [role, setRole] = useState('customer'); // 'customer' | 'admin'
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Jane Doe');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      name: name || (role === 'admin' ? 'Admin Studio Owner' : 'Ishita Sharma'),
      email,
      role,
      address: 'Flat 402, Lotus Apartments, Park Street, Connaught Place, New Delhi - 110001',
      lat: 28.6315,
      lng: 77.2167
    });
    if (role === 'admin') {
      setCurrentTab('admin');
    }
  };

  const handleQuickAdminLogin = () => {
    loginUser({
      name: 'Tiny Art Studio Owner',
      email: 'admin@tinyartstudio.com',
      role: 'admin',
      address: 'Studio HQ, 88 Art Gallery Road, Bandra West, Mumbai, Maharashtra - 400050',
      lat: 19.0596,
      lng: 72.8295
    });
    setCurrentTab('admin');
  };

  const handleQuickCustomerLogin = () => {
    loginUser({
      name: 'Ishita Sharma',
      email: 'ishita@example.com',
      role: 'customer',
      address: 'House 14, Sector 15, Vashi, Navi Mumbai, Maharashtra - 400703',
      lat: 19.0770,
      lng: 72.9986
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
          onClick={() => setIsAuthOpen(false)}
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
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-xs text-[#8C7A6B] mt-1">
            Join tiny art studio to track craft orders & custom designs.
          </p>
        </div>

        {/* Quick Demo Login Preset Buttons */}
        <div className="bg-[#FAF6F0] border border-[#E3D3C5] p-3 rounded-2xl mb-5 space-y-2">
          <p className="text-[11px] font-bold text-[#8C4A38] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#E5A93C]" />
            <span>Quick 1-Click Demo Login</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickCustomerLogin}
              className="bg-white hover:bg-[#F3EAE1] text-[#4A2E25] border border-[#D6C5B7] py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-[#8C4A38]" />
              <span>Customer Demo</span>
            </button>
            <button
              type="button"
              onClick={handleQuickAdminLogin}
              className="bg-[#4A2E25] hover:bg-[#341F18] text-white py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-1.5 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Role selector */}
          <div className="flex bg-[#F3EAE1] p-1 rounded-xl border border-[#E3D3C5]">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                role === 'customer' 
                  ? 'bg-[#8C4A38] text-white shadow-2xs' 
                  : 'text-[#634E42] hover:text-[#4A2E25]'
              }`}
            >
              Customer Role
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                role === 'admin' 
                  ? 'bg-[#4A2E25] text-white shadow-2xs' 
                  : 'text-[#634E42] hover:text-[#4A2E25]'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Role</span>
            </button>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#D6C5B7] rounded-xl text-xs focus:ring-2 focus:ring-[#8C4A38]/30"
                  placeholder="e.g. Ishita Sharma"
                />
                <User className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#D6C5B7] rounded-xl text-xs focus:ring-2 focus:ring-[#8C4A38]/30"
                placeholder="name@example.com"
              />
              <Mail className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#D6C5B7] rounded-xl text-xs focus:ring-2 focus:ring-[#8C4A38]/30"
                placeholder="••••••••"
              />
              <Lock className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#8C4A38] hover:bg-[#723A2B] text-white py-2.5 rounded-full font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <span>{mode === 'login' ? `Login as ${role}` : `Register as ${role}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-xs text-[#8C7A6B] hover:text-[#8C4A38] font-bold transition-colors"
          >
            {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>

      </div>
    </div>
  );
};
