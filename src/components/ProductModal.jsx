import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, ShoppingBag, Star, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';

export const ProductModal = () => {
  const { selectedProduct, setSelectedProduct, addToCart, wishlist, toggleWishlist } = useApp();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.some(item => item.id === selectedProduct.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-[#FAF7F2] border border-[#E3D3C5] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#4A2E25] flex items-center justify-center transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Column */}
        <div className="md:w-1/2 relative bg-[#FAF6F0] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E3D3C5]">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="max-h-[380px] w-full object-contain rounded-2xl shadow-sm"
          />
          <span className="absolute top-4 left-4 bg-[#8C4A38] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {selectedProduct.category}
          </span>
        </div>

        {/* Product Info Column */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Title & Ratings */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex text-[#E5A93C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#8C7A6B] font-bold">
                5.0 (Handmade Verified)
              </span>
            </div>

            <h2 className="font-serif font-extrabold text-2xl text-[#4A2E25] mb-2 leading-tight">
              {selectedProduct.title}
            </h2>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif font-extrabold text-3xl text-[#8C4A38]">
                ${selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-[#A39284] line-through">
                  ${selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs font-bold text-[#7A8B7B] bg-[#EBF2EC] px-2.5 py-0.5 rounded-full">
                In Stock ({selectedProduct.stock} left)
              </span>
            </div>

            <p className="text-sm text-[#634E42] leading-relaxed mb-6">
              {selectedProduct.description}
            </p>

            {/* Product Tags */}
            {selectedProduct.tags && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedProduct.tags.map(tag => (
                  <span key={tag} className="craft-tag text-xs px-2.5 py-1 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold text-[#4A2E25] uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-[#D6C5B7] rounded-full bg-white">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1 text-sm font-bold text-[#4A2E25] hover:bg-[#F3EAE1] rounded-l-full"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-extrabold text-[#4A2E25]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(selectedProduct.stock, q + 1))}
                  className="px-3 py-1 text-sm font-bold text-[#4A2E25] hover:bg-[#F3EAE1] rounded-r-full"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => {
                  addToCart(selectedProduct, quantity);
                  setSelectedProduct(null);
                }}
                className="flex-1 bg-[#8C4A38] hover:bg-[#723A2B] text-white py-3 px-6 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • ${(selectedProduct.price * quantity).toFixed(2)}</span>
              </button>

              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className={`p-3 rounded-full border transition-colors ${
                  isWishlisted 
                    ? 'bg-[#8C4A38] border-[#8C4A38] text-white' 
                    : 'border-[#D6C5B7] bg-white text-[#4A2E25] hover:bg-[#FAF6F0]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Guarantee Pills */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#8C7A6B]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8C4A38]" />
                <span>100% Online Secure Payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8C4A38]" />
                <span>Tracked Postal Delivery</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
