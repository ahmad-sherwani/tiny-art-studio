import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingBag, Eye, Star, CheckCircle } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, setSelectedProduct } = useApp();

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className="bg-white border border-[#E3D3C5] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group relative">
      
      {/* Product Image & Badges Container */}
      <div className="relative aspect-square overflow-hidden bg-[#FAF6F0]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category & Tag Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="bg-[#8C4A38]/90 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full shadow-xs">
            {product.category}
          </span>
          {product.tags && product.tags[0] && (
            <span className="bg-white/90 backdrop-blur-xs text-[#4A2E25] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#D6C5B7]">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform hover:scale-110 shadow-xs z-10 ${
            isWishlisted 
              ? 'bg-[#8C4A38] text-white' 
              : 'bg-white/80 text-[#4A2E25] hover:bg-white'
          }`}
          title={isWishlisted ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={() => setSelectedProduct(product)}
            className="bg-white text-[#4A2E25] hover:bg-[#8C4A38] hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex text-[#E5A93C]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-[#8C7A6B] font-semibold">
              {product.rating || 5.0} ({product.reviewsCount || 12})
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-serif font-bold text-base text-[#4A2E25] hover:text-[#8C4A38] cursor-pointer line-clamp-2 transition-colors mb-2 leading-snug"
          >
            {product.title}
          </h3>

          <p className="text-xs text-[#8C7A6B] line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer Pricing & Add to Cart */}
        <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-extrabold text-lg text-[#8C4A38]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#A39284] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-[#7A8B7B] font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-[#7A8B7B]" />
              <span>In Stock ({product.stock})</span>
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className="bg-[#F3EAE1] hover:bg-[#8C4A38] text-[#8C4A38] hover:text-white p-2.5 rounded-full transition-all duration-200 shadow-2xs group-hover:bg-[#8C4A38] group-hover:text-white disabled:opacity-50"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
