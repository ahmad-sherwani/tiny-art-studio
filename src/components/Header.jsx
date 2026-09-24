import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  ShieldCheck, 
  Package, 
  LogOut
} from 'lucide-react';

export const Header = () => {
  const { 
    cart, 
    wishlist, 
    user, 
    currentTab, 
    setCurrentTab, 
    searchQuery, 
    setSearchQuery,
    setIsCartOpen,
    setIsAuthOpen,
    logoutUser
  } = useApp();

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8D4C8] w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Slogan */}
          <div 
            onClick={() => setCurrentTab('shop')} 
            className="cursor-pointer flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E8D4C8] text-[#8C4A38] flex items-center justify-center font-serif font-bold text-base sm:text-xl shadow-inner group-hover:scale-105 transition-transform">
              🧵
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg sm:text-2xl tracking-tight text-[#4A2E25] group-hover:text-[#8C4A38] transition-colors leading-none">
                tiny art studio
              </h1>
              <p className="text-[9px] sm:text-[11px] text-[#8C7A6B] font-medium tracking-wider uppercase mt-0.5">
                @tinyyartstudio_
              </p>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input
              type="text"
              placeholder="Search embroidery hoops, custom crafts, crochet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/80 border border-[#D6C5B7] rounded-full text-sm placeholder-[#9E8E81] focus:outline-none focus:ring-2 focus:ring-[#8C4A38]/30 focus:border-[#8C4A38] transition-all shadow-sm"
            />
            <Search className="w-4 h-4 text-[#9E8E81] absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A6B] hover:text-[#4A2E25]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

            {/* Mode Toggle: Shop / Orders / Admin */}
            <div className="flex items-center bg-[#F3EAE1] p-0.5 sm:p-1 rounded-full border border-[#E3D3C5]">
              <button
                onClick={() => setCurrentTab('shop')}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                  currentTab === 'shop' 
                    ? 'bg-[#8C4A38] text-white shadow-xs' 
                    : 'text-[#634E42] hover:text-[#4A2E25]'
                }`}
              >
                Shop
              </button>
              
              {user && (
                <button
                  onClick={() => setCurrentTab('orders')}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 ${
                    currentTab === 'orders' 
                      ? 'bg-[#8C4A38] text-white shadow-xs' 
                      : 'text-[#634E42] hover:text-[#4A2E25]'
                  }`}
                >
                  <Package className="w-3 h-3" />
                  <span className="hidden xs:inline">Orders</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (!user || user.role !== 'admin') {
                    setIsAuthOpen(true);
                  } else {
                    setCurrentTab('admin');
                  }
                }}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 ${
                  currentTab === 'admin' 
                    ? 'bg-[#4A2E25] text-[#F9F5F0] shadow-xs' 
                    : 'text-[#8C4A38] hover:bg-[#E8D4C8]/50'
                }`}
              >
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => setCurrentTab('wishlist')}
              className={`p-1.5 sm:p-2 rounded-full relative transition-all ${
                currentTab === 'wishlist' ? 'bg-[#E8D4C8] text-[#8C4A38]' : 'text-[#634E42] hover:bg-[#F3EAE1]'
              }`}
              title="Saved Crafts"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#8C4A38] text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 sm:p-2.5 rounded-full bg-[#8C4A38] text-white hover:bg-[#723A2B] transition-colors relative shadow-xs flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-[#E5A93C] text-[#2D231E] text-[10px] sm:text-xs font-extrabold px-1.5 py-0.5 rounded-full min-w-[16px] text-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="flex items-center gap-1.5 pl-1.5 sm:pl-2 border-l border-[#D6C5B7]">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-[#4A2E25] truncate max-w-[90px]">{user.name}</p>
                  <p className="text-[10px] text-[#8C7A6B] capitalize font-medium">{user.role}</p>
                </div>
                <button
                  onClick={logoutUser}
                  className="p-1.5 sm:p-2 text-[#8C7A6B] hover:text-[#8C4A38] hover:bg-[#F3EAE1] rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white border border-[#D6C5B7] text-[#4A2E25] hover:border-[#8C4A38] hover:text-[#8C4A38] text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 shadow-2xs"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Login</span>
              </button>
            )}

          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2 sm:mt-3 md:hidden relative">
          <input
            type="text"
            placeholder="Search embroidery hoops, custom crafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#D6C5B7] rounded-full text-xs placeholder-[#9E8E81] focus:outline-none focus:ring-2 focus:ring-[#8C4A38]/30"
          />
          <Search className="w-3.5 h-3.5 text-[#9E8E81] absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

      </div>
    </header>
  );
};
