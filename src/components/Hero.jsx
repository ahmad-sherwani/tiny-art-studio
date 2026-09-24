import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/initialProducts';
import { Sparkles, HeartHandshake, ShieldCheck, MapPin, Search } from 'lucide-react';

export const Hero = () => {
  const { selectedCategory, setSelectedCategory, products } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5ECE3] to-[#FAF7F2] border-b border-[#E8D4C8] py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Background Decorative Stitches & Floating Circles */}
      <div className="absolute top-4 left-10 w-24 h-24 rounded-full border border-dashed border-[#D6C5B7]/60 pointer-events-none animate-spin" style={{ animationDuration: '30s' }} />
      <div className="absolute bottom-6 right-12 w-36 h-36 rounded-full border border-dashed border-[#8C4A38]/20 pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Instagram Badge Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EAE1] border border-[#D6B9A8] text-[#8C4A38] text-xs font-semibold tracking-wider uppercase mb-6 shadow-2xs">
          <span>🧵</span>
          <span>@ TINYYARTSTUDIO _</span>
        </div>

        {/* Hero Main Header Card (Styled after user's image) */}
        <div className="bg-[#FAF6F0]/90 border border-[#E3D3C5] rounded-3xl p-6 sm:p-10 shadow-sm max-w-3xl mx-auto backdrop-blur-xs relative">
          
          {/* Subtle Stitched Dashed Frame */}
          <div className="absolute inset-2 sm:inset-3 border border-dashed border-[#D8C4B6] rounded-2xl pointer-events-none" />

          <span className="font-script text-3xl sm:text-4xl text-[#8C4A38] block mb-1">
            welcome to
          </span>

          <h2 className="font-serif font-extrabold text-4xl sm:text-6xl text-[#4A2E25] tracking-tight mb-4">
            tiny art studio
          </h2>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="w-8 h-px bg-[#D6C5B7]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A38]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A38]" />
            <div className="w-8 h-px bg-[#D6C5B7]" />
          </div>

          <p className="text-base sm:text-lg text-[#634E42] max-w-xl mx-auto leading-relaxed font-medium mb-3">
            a little corner for handmade things, made slowly and with care.
          </p>

          <p className="text-sm sm:text-base text-[#8C7A6B] italic max-w-lg mx-auto mb-4">
            hoops, stitches, tiny details — this page is where it all comes together.
          </p>

          <p className="text-xs sm:text-sm text-[#4A2E25] font-semibold tracking-wide">
            excited to share what we create, one thread at a time.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
          <div className="bg-white/80 border border-[#E3D3C5] rounded-2xl p-4 flex items-center gap-3 text-left shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#F3EAE1] text-[#8C4A38] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#4A2E25]">100% Handcrafted</h4>
              <p className="text-[11px] text-[#8C7A6B]">Every piece made with slow care & attention.</p>
            </div>
          </div>

          <div className="bg-white/80 border border-[#E3D3C5] rounded-2xl p-4 flex items-center gap-3 text-left shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#F3EAE1] text-[#8C4A38] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#4A2E25]">Secure Online Payment</h4>
              <p className="text-[11px] text-[#8C7A6B]">Stripe & UPI powered. COD not available.</p>
            </div>
          </div>

          <div className="bg-white/80 border border-[#E3D3C5] rounded-2xl p-4 flex items-center gap-3 text-left shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#F3EAE1] text-[#8C4A38] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#4A2E25]">Live Delivery Tracking</h4>
              <p className="text-[11px] text-[#8C7A6B]">Set exact location coordinates for admin delivery.</p>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="mt-10">
          <p className="text-xs uppercase font-bold text-[#8C7A6B] tracking-wider mb-3">
            Explore Collection Categories ({products.length} Products Available)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All Crafts' 
                ? products.length 
                : products.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                    selectedCategory === cat
                      ? 'bg-[#8C4A38] text-white ring-2 ring-[#8C4A38]/30 shadow-xs'
                      : 'bg-white border border-[#D6C5B7] text-[#4A2E25] hover:border-[#8C4A38] hover:bg-[#FAF6F0]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-[#F3EAE1] text-[#8C4A38]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
