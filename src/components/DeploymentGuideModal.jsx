import React from 'react';
import { useApp } from '../context/AppContext';
import { X, UploadCloud, GitBranch, Globe, Key, ShieldCheck, CheckCircle2, Terminal } from 'lucide-react';

export const DeploymentGuideModal = () => {
  const { isDeployGuideOpen, setIsDeployGuideOpen } = useApp();

  if (!isDeployGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-[#FAF7F2] border border-[#E3D3C5] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E3D3C5] bg-[#FAF6F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-[#8C4A38]" />
            <h2 className="font-serif font-bold text-xl text-[#4A2E25]">
              Deploy on Vercel & GitHub Guide
            </h2>
          </div>
          <button
            onClick={() => setIsDeployGuideOpen(false)}
            className="p-1.5 rounded-full text-[#8C7A6B] hover:text-[#4A2E25] hover:bg-[#E8D4C8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#634E42]">
          
          {/* Step 1: Push to GitHub */}
          <div className="bg-white border border-[#E3D3C5] p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#4A2E25] text-sm">
              <GitBranch className="w-4 h-4 text-[#8C4A38]" />
              <span>Step 1: Push Project to GitHub</span>
            </div>
            <p className="text-[#8C7A6B]">Run these terminal commands in your project folder:</p>
            <div className="bg-[#2D231E] text-[#F9F5F0] p-3 rounded-xl font-mono text-[11px] space-y-1">
              <p>git init</p>
              <p>git add .</p>
              <p>git commit -m "Initial commit for Tiny Art Studio"</p>
              <p>git branch -M main</p>
              <p>git remote add origin https://github.com/your-username/tiny-art-studio.git</p>
              <p>git push -u origin main</p>
            </div>
          </div>

          {/* Step 2: Deploy to Vercel */}
          <div className="bg-white border border-[#E3D3C5] p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#4A2E25] text-sm">
              <Globe className="w-4 h-4 text-[#8C4A38]" />
              <span>Step 2: Deploy to Vercel</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[#634E42]">
              <li>Log in to <strong className="text-[#8C4A38]">vercel.com</strong> and click <strong>"Add New Project"</strong>.</li>
              <li>Select your imported <strong>tiny-art-studio</strong> GitHub repository.</li>
              <li>Vercel automatically detects <strong>Vite + React</strong> framework settings.</li>
              <li>Click <strong>Deploy</strong>! Your site will be live in 30 seconds with standard SSL certificate.</li>
            </ol>
          </div>

          {/* Step 3: Payment API Environment Setup */}
          <div className="bg-white border border-[#E3D3C5] p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#4A2E25] text-sm">
              <Key className="w-4 h-4 text-[#8C4A38]" />
              <span>Step 3: Online Payment API Integration (Stripe / Razorpay)</span>
            </div>
            <p className="text-[#8C7A6B]">
              Add your API credentials in Vercel project environment variables settings:
            </p>
            <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#D6C5B7] font-mono text-[11px] text-[#4A2E25] space-y-1">
              <p>VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_key_here</p>
              <p>VITE_RAZORPAY_KEY_ID=rzp_live_your_razorpay_key_here</p>
            </div>
            <p className="text-[11px] text-[#7A8B7B] font-bold">
              ✓ Built-in simulated gateway works out-of-the-box for instant testing!
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E3D3C5] bg-[#FAF6F0] text-right">
          <button
            onClick={() => setIsDeployGuideOpen(false)}
            className="bg-[#8C4A38] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-[#723A2B]"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
