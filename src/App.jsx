import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { AdminPanel } from './components/AdminPanel';
import { MyOrders } from './components/MyOrders';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { Heart, Search, SlidersHorizontal, Package, Sparkles } from 'lucide-react';

const MainContent = () => {
  const { 
    products, 
    currentTab, 
    searchQuery, 
    selectedCategory, 
    wishlist, 
    setCurrentTab 
  } = useApp();

  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price_low' | 'price_high' | 'rating'

  // Filter products by search and category
  let filtered = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.tags && product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory = selectedCategory === 'All Crafts' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  if (sortBy === 'price_low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Header />

      <main className="flex-1">
        
        {/* SHOP TAB VIEW */}
        {currentTab === 'shop' && (
          <>
            <Hero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              
              {/* Filter & Sorting Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white/60 p-4 rounded-2xl border border-[#E3D3C5] backdrop-blur-xs">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl text-[#4A2E25]">
                    {selectedCategory === 'All Crafts' ? 'All Handcrafted Creations' : selectedCategory}
                  </h2>
                  <p className="text-xs text-[#8C7A6B] mt-0.5">
                    Showing {filtered.length} unique handmade item{filtered.length !== 1 ? 's' : ''}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#8C7A6B] font-bold">
                    <SlidersHorizontal className="w-4 h-4 text-[#8C4A38]" />
                    <span>Sort By:</span>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-[#D6C5B7] text-[#4A2E25] text-xs font-bold px-3.5 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C4A38]/30 cursor-pointer shadow-2xs"
                  >
                    <option value="featured">Featured Collection</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Top Customer Rating</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white border border-[#E3D3C5] rounded-3xl p-8 max-w-xl mx-auto">
                  <Search className="w-12 h-12 text-[#D6C5B7] mx-auto mb-3" />
                  <h3 className="font-serif font-bold text-xl text-[#4A2E25]">No crafts match your search</h3>
                  <p className="text-xs text-[#8C7A6B] mt-1 mb-6">
                    Try searching for another embroidery pattern, custom name, or change category filter.
                  </p>
                  <button
                    onClick={() => {
                      // reset filters
                    }}
                    className="bg-[#8C4A38] text-white px-5 py-2.5 rounded-full text-xs font-bold"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

            </div>
          </>
        )}

        {/* WISHLIST TAB VIEW */}
        {currentTab === 'wishlist' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
            <div className="border-b border-[#E3D3C5] pb-4 mb-8 flex items-center justify-between">
              <div>
                <h1 className="font-serif font-extrabold text-3xl text-[#4A2E25] flex items-center gap-2">
                  <Heart className="w-7 h-7 text-[#8C4A38] fill-current" />
                  <span>My Saved Favorites</span>
                </h1>
                <p className="text-xs text-[#8C7A6B] mt-1">
                  Saved craft items you're keeping an eye on ({wishlist.length})
                </p>
              </div>

              <button
                onClick={() => setCurrentTab('shop')}
                className="bg-[#8C4A38] text-white px-4 py-2 rounded-full text-xs font-bold"
              >
                Back to Shop
              </button>
            </div>

            {wishlist.length === 0 ? (
              <div className="text-center py-16 bg-white border border-[#E3D3C5] rounded-3xl p-8 max-w-md mx-auto">
                <Heart className="w-12 h-12 text-[#D6C5B7] mx-auto mb-3" />
                <h3 className="font-serif font-bold text-lg text-[#4A2E25]">No saved favorites yet</h3>
                <p className="text-xs text-[#8C7A6B] mt-1 mb-6">
                  Click the heart icon on any craft product to save it to your personal collection.
                </p>
                <button
                  onClick={() => setCurrentTab('shop')}
                  className="bg-[#8C4A38] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-xs"
                >
                  Explore Studio Store
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ADMIN PANEL TAB VIEW */}
        {currentTab === 'admin' && <AdminPanel />}

        {/* MY ORDERS TAB VIEW */}
        {currentTab === 'orders' && <MyOrders />}

      </main>

      {/* Global Modals & Notifications */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
      <Toast />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
