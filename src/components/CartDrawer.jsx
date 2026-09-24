import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    setIsCheckoutOpen,
    user,
    setIsAuthOpen
  } = useApp();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 60 || subtotal === 0 ? 0 : 5.00;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E3D3C5] shadow-2xl flex flex-col justify-between relative">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E3D3C5] flex items-center justify-between bg-[#FAF6F0]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8C4A38]" />
              <h2 className="font-serif font-bold text-xl text-[#4A2E25]">Your Studio Bag</h2>
              <span className="bg-[#8C4A38] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#8C7A6B] hover:text-[#4A2E25] hover:bg-[#E8D4C8]/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* COD Warning Notification Banner */}
          <div className="bg-[#FFF4E5] border-b border-[#F0D5B5] px-4 py-2.5 text-xs text-[#855B14] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#D97706]" />
            <span><strong>Online Payment Only:</strong> Cash on Delivery (COD) is disabled for handmade orders.</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#F3EAE1] text-[#8C4A38] mx-auto flex items-center justify-center text-3xl mb-4">
                  🧵
                </div>
                <h3 className="font-serif font-bold text-lg text-[#4A2E25] mb-1">Your cart is empty</h3>
                <p className="text-xs text-[#8C7A6B] max-w-xs mx-auto mb-6">
                  Browse our handcrafted embroidery hoops, crochet accessories, and custom art to add items.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#8C4A38] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#723A2B] transition-colors"
                >
                  Explore Crafts
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div 
                  key={item.id}
                  className="bg-white border border-[#E3D3C5] rounded-2xl p-3 flex gap-3 items-center shadow-2xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-xl bg-[#FAF6F0] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#4A2E25] truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#8C7A6B] font-semibold">
                      ${item.price.toFixed(2)} each
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#D6C5B7] rounded-full bg-[#FAF6F0]">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs font-bold text-[#4A2E25] hover:bg-[#E8D4C8]"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-extrabold text-[#4A2E25]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs font-bold text-[#4A2E25] hover:bg-[#E8D4C8]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#A39284] hover:text-[#8C4A38] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-serif font-extrabold text-sm text-[#8C4A38]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Calculations & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E3D3C5] bg-[#FAF6F0] space-y-3">
              <div className="space-y-1.5 text-xs text-[#634E42]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Delivery</span>
                  <span className="font-bold text-[#7A8B7B]">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-[#8C7A6B] italic">
                    Add ${(60 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                )}
                <div className="flex justify-between text-base font-serif font-extrabold text-[#4A2E25] pt-2 border-t border-[#E8D4C8]">
                  <span>Total Amount</span>
                  <span className="text-[#8C4A38]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!user) {
                    setIsCartOpen(false);
                    setIsAuthOpen(true);
                  } else {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }
                }}
                className="w-full bg-[#8C4A38] hover:bg-[#723A2B] text-white py-3 px-6 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Delivery & Payment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C7A6B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C4A38]" />
                <span>Encrypted 256-bit online checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
