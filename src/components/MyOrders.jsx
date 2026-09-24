import React from 'react';
import { useApp } from '../context/AppContext';
import { LocationPicker } from './LocationPicker';
import { Package, Clock, CheckCircle2, Truck, MapPin, ShoppingBag } from 'lucide-react';

export const MyOrders = () => {
  const { orders, user, setCurrentTab } = useApp();

  // Filter orders matching logged in user's email or name
  const userOrders = user 
    ? orders.filter(o => o.customerEmail?.toLowerCase() === user.email?.toLowerCase() || o.customerName === user.name)
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      <div className="border-b border-[#E3D3C5] pb-4 mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif font-extrabold text-3xl text-[#4A2E25]">
            My Craft Orders
          </h1>
          <p className="text-xs text-[#8C7A6B] mt-1">
            Track online payment status, delivery map location, and studio dispatch details.
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('shop')}
          className="bg-[#8C4A38] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#723A2B] transition-colors"
        >
          Back to Shop
        </button>
      </div>

      {userOrders.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#E3D3C5] rounded-3xl p-8">
          <Package className="w-12 h-12 text-[#D6C5B7] mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-[#4A2E25]">No orders placed yet</h3>
          <p className="text-xs text-[#8C7A6B] max-w-sm mx-auto mb-6">
            Explore our studio collection of handmade embroidery hoops, crochet bags, and custom gifts.
          </p>
          <button
            onClick={() => setCurrentTab('shop')}
            className="bg-[#8C4A38] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#723A2B] shadow-xs"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {userOrders.map(order => (
            <div 
              key={order.id}
              className="bg-white border border-[#E3D3C5] rounded-3xl p-6 shadow-2xs overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F0ECE1] pb-4 mb-4">
                <div>
                  <span className="font-mono font-bold text-xs text-[#8C4A38] bg-[#F3EAE1] px-2.5 py-0.5 rounded-md border border-[#D6B9A8]">
                    {order.id}
                  </span>
                  <p className="text-xs text-[#8C7A6B] mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                    order.status === 'Delivered'
                      ? 'bg-[#EBF2EC] text-[#2F6D38]'
                      : order.status === 'Shipped'
                      ? 'bg-[#EBF5FB] text-[#1E6B9E]'
                      : 'bg-[#FFF4E5] text-[#9A6A18]'
                  }`}>
                    {order.status === 'Delivered' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {order.status === 'Shipped' && <Truck className="w-3.5 h-3.5" />}
                    {order.status === 'Processing' && <Clock className="w-3.5 h-3.5 animate-spin" />}
                    <span>Status: {order.status}</span>
                  </span>
                </div>
              </div>

              {/* Items & Address Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-2">
                    Order Items
                  </h4>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E3D3C5]">
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#4A2E25] truncate">{item.title}</p>
                          <p className="text-[11px] text-[#8C7A6B]">Qty: {item.quantity} • ${item.price.toFixed(2)} each</p>
                        </div>
                        <span className="font-serif font-bold text-xs text-[#8C4A38]">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#F0ECE1] flex justify-between text-xs">
                    <span className="text-[#7A8B7B] font-bold">Online Payment Verified ({order.paymentMethod})</span>
                    <span className="font-serif font-extrabold text-sm text-[#8C4A38]">Paid: ${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery Map Preview */}
                <div>
                  <h4 className="text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8C4A38]" />
                    <span>Delivery Location</span>
                  </h4>
                  <p className="text-xs text-[#634E42] mb-2">{order.deliveryAddress}</p>
                  
                  <LocationPicker
                    lat={order.lat || 34.0522}
                    lng={order.lng || -118.2437}
                    readOnly={true}
                    height="160px"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
