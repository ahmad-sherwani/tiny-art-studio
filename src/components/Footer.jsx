import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const { setCurrentTab, setIsAuthOpen, user } = useApp();

  return (
    <footer className="bg-[#2D231E] text-[#E8D4C8] border-t border-[#4A2E25] pt-12 pb-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Brand Slogan */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧵</span>
            <h3 className="font-serif font-extrabold text-2xl text-white tracking-tight">
              tiny art studio
            </h3>
          </div>
          <p className="text-xs text-[#C5B4A5] leading-relaxed max-w-md">
            a little corner for handmade things, made slowly and with care. hoops, stitches, tiny details — this page is where it all comes together.
          </p>
          <div className="inline-block bg-[#4A2E25] text-[#E5A93C] text-[11px] font-bold px-3 py-1 rounded-full border border-[#634E42]">
            @ TINYYARTSTUDIO _
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-3">
            Explore Studio
          </h4>
          <ul className="space-y-2 text-xs text-[#C5B4A5]">
            <li>
              <button onClick={() => setCurrentTab('shop')} className="hover:text-white transition-colors">
                Handcrafted Shop
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('wishlist')} className="hover:text-white transition-colors">
                Saved Crafts Wishlist
              </button>
            </li>
            <li>
              <button onClick={() => setIsAuthOpen(true)} className="hover:text-white transition-colors">
                User & Admin Authentication
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  if (user && user.role === 'admin') setCurrentTab('admin');
                  else setIsAuthOpen(true);
                }} 
                className="hover:text-[#E5A93C] transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>Admin Dashboard</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Payment Info */}
        <div>
          <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-3">
            Online Payments
          </h4>
          <p className="text-xs text-[#C5B4A5] mb-3">
            Secure checkout via Cards & Instant UPI. <strong className="text-white">Cash on Delivery (COD) is disabled.</strong>
          </p>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-[#4A2E25] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A6B] gap-3">
        <p>© {new Date().getFullYear()} Tiny Art Studio (@tinyyartstudio_). Handmade one thread at a time.</p>
        <p className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#8C4A38] fill-current" />
          <span>for Vercel Deployment</span>
        </p>
      </div>
    </footer>
  );
};
