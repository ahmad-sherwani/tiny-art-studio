import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LocationPicker } from './LocationPicker';
import { CATEGORIES } from '../data/initialProducts';
import { 
  ShieldCheck, 
  Plus, 
  Package, 
  Trash2, 
  Edit3, 
  MapPin, 
  DollarSign, 
  ShoppingBag, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Sparkles,
  X,
  Search,
  AlertCircle
} from 'lucide-react';

export const AdminPanel = () => {
  const { 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    removeProduct, 
    updateOrderStatus,
    user 
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'add_product'
  const [selectedOrderMap, setSelectedOrderMap] = useState(null); // Order object to view on map modal
  const [editingProduct, setEditingProduct] = useState(null);
  const [orderFilter, setOrderFilter] = useState('All');

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Embroidery Hoops');
  const [newPrice, setNewPrice] = useState('');
  const [newOriginalPrice, setNewOriginalPrice] = useState('');
  const [newStock, setNewStock] = useState('10');
  const [newImage, setNewImage] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('Hand-stitched, New Arrival');

  // Calculated Stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    addProduct({
      title: newTitle,
      category: newCategory,
      price: newPrice,
      originalPrice: newOriginalPrice,
      stock: newStock,
      image: newImage || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      description: newDescription,
      tags: newTags
    });

    // Reset Form
    setNewTitle('');
    setNewPrice('');
    setNewOriginalPrice('');
    setNewDescription('');
    setNewImage('');
    setActiveTab('products');
  };

  const filteredOrders = orderFilter === 'All' 
    ? orders 
    : orders.filter(o => o.status.toLowerCase() === orderFilter.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Admin Header Banner */}
      <div className="bg-[#4A2E25] text-[#FAF7F2] rounded-3xl p-6 sm:p-8 mb-8 shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full border border-dashed border-white/10 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A93C] text-[#2D231E] text-xs font-extrabold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Studio Owner Control Center</span>
            </div>
            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl">
              Admin Dashboard
            </h1>
            <p className="text-xs text-[#E8D4C8] mt-1">
              Manage product listings, track online orders, and view customer delivery GPS coordinates.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('add_product')}
            className="bg-[#8C4A38] hover:bg-[#A35742] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Craft Product</span>
          </button>
        </div>

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-[#E8D4C8] font-medium">Total Studio Sales</p>
            <p className="font-serif font-extrabold text-2xl text-[#E5A93C]">${totalRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-[#E8D4C8] font-medium">Total Customer Orders</p>
            <p className="font-serif font-extrabold text-2xl text-white">{orders.length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-[#E8D4C8] font-medium">Pending Shipments</p>
            <p className="font-serif font-extrabold text-2xl text-[#F9A8D4]">{pendingOrders}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <p className="text-[11px] text-[#E8D4C8] font-medium">Live Products Count</p>
            <p className="font-serif font-extrabold text-2xl text-[#A7F3D0]">{products.length}</p>
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center justify-between gap-4 mb-6 border-b border-[#E3D3C5] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#8C4A38] text-white shadow-xs'
                : 'bg-white border border-[#D6C5B7] text-[#4A2E25] hover:bg-[#FAF6F0]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#8C4A38] text-white shadow-xs'
                : 'bg-white border border-[#D6C5B7] text-[#4A2E25] hover:bg-[#FAF6F0]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Store Products ({products.length})</span>
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#D6C5B7] text-xs">
            {['All', 'Processing', 'Shipped', 'Delivered'].map(status => (
              <button
                key={status}
                onClick={() => setOrderFilter(status)}
                className={`px-3 py-1 rounded-full font-bold transition-colors ${
                  orderFilter === status ? 'bg-[#4A2E25] text-white' : 'text-[#634E42] hover:text-[#4A2E25]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB 1: CUSTOMER ORDERS & DELIVERY LOCATION MAP */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E3D3C5]">
              <Package className="w-12 h-12 text-[#D6C5B7] mx-auto mb-3" />
              <h3 className="font-serif font-bold text-lg text-[#4A2E25]">No orders found</h3>
              <p className="text-xs text-[#8C7A6B]">Orders placed by customers will appear here with delivery details.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div 
                key={order.id}
                className="bg-white border border-[#E3D3C5] rounded-3xl p-5 shadow-2xs hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#F0ECE1] pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-sm text-[#8C4A38] bg-[#F3EAE1] px-2.5 py-0.5 rounded-md border border-[#D6B9A8]">
                        {order.id}
                      </span>
                      <span className="text-xs text-[#8C7A6B]">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#4A2E25] mt-1">
                      {order.customerName}
                    </h3>
                    <p className="text-xs text-[#8C7A6B]">
                      {order.customerEmail} • {order.customerPhone}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                    {/* Status Updater Select */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#8C7A6B]">Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border focus:outline-none cursor-pointer ${
                          order.status === 'Delivered' 
                            ? 'bg-[#EBF2EC] text-[#2F6D38] border-[#A8D5AF]' 
                            : order.status === 'Shipped' 
                            ? 'bg-[#EBF5FB] text-[#1E6B9E] border-[#A8D4F5]'
                            : 'bg-[#FFF4E5] text-[#9A6A18] border-[#F0D5B5]'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>

                    {/* View Delivery Map Pin Button */}
                    <button
                      onClick={() => setSelectedOrderMap(order)}
                      className="bg-[#F3EAE1] hover:bg-[#8C4A38] text-[#8C4A38] hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>View Delivery Map</span>
                    </button>
                  </div>
                </div>

                {/* Delivery Address & Order Items Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Address */}
                  <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#E3D3C5] text-xs">
                    <p className="font-bold text-[#4A2E25] uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8C4A38]" />
                      <span>Delivery Address</span>
                    </p>
                    <p className="text-[#634E42] font-medium leading-relaxed">{order.deliveryAddress}</p>
                    <p className="text-[10px] font-mono text-[#8C7A6B] mt-2">
                      GPS: Lat {order.lat?.toFixed(4)}, Lng {order.lng?.toFixed(4)}
                    </p>
                  </div>

                  {/* Items List */}
                  <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#E3D3C5] text-xs md:col-span-2">
                    <p className="font-bold text-[#4A2E25] uppercase text-[10px] tracking-wider mb-2">
                      Ordered Craft Items ({order.items.length})
                    </p>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs border-b border-[#E8D4C8] last:border-0 pb-1.5 last:pb-0">
                          <div className="flex items-center gap-2">
                            <img src={item.image} alt={item.title} className="w-8 h-8 rounded-md object-cover" />
                            <span className="font-medium text-[#4A2E25]">{item.title} (x{item.quantity})</span>
                          </div>
                          <span className="font-bold text-[#8C4A38]">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-[#D6C5B7]">
                      <span className="text-[11px] text-[#7A8B7B] font-bold">Paid Online ({order.paymentMethod})</span>
                      <span className="font-serif font-extrabold text-sm text-[#8C4A38]">Total: ${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: STORE PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(prod => (
            <div key={prod.id} className="bg-white border border-[#E3D3C5] rounded-3xl overflow-hidden shadow-2xs flex flex-col justify-between">
              <div className="relative aspect-video bg-[#FAF6F0]">
                <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#8C4A38] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {prod.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#4A2E25] line-clamp-1">{prod.title}</h3>
                  <p className="text-xs text-[#8C7A6B] line-clamp-2 mt-1">{prod.description}</p>
                </div>

                <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between mt-3">
                  <div>
                    <span className="font-serif font-extrabold text-lg text-[#8C4A38]">${prod.price.toFixed(2)}</span>
                    <span className="text-[10px] text-[#7A8B7B] block font-bold">Stock: {prod.stock} left</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => removeProduct(prod.id)}
                      className="p-2 text-[#A39284] hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ADD NEW CRAFT PRODUCT FORM */}
      {activeTab === 'add_product' && (
        <div className="bg-white border border-[#E3D3C5] rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-md">
          <h2 className="font-serif font-extrabold text-2xl text-[#4A2E25] mb-2">
            Add New Craft Product to Studio Store
          </h2>
          <p className="text-xs text-[#8C7A6B] mb-6">
            Upload new embroidery hoops, crochet items, or custom art listings for customers to buy online.
          </p>

          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF6F0] border border-[#D6C5B7] rounded-xl text-xs"
                placeholder="e.g. Celestial Sun & Moon Embroidery Hoop (8&quot;)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FAF6F0] border border-[#D6C5B7] rounded-xl text-xs font-bold text-[#4A2E25]"
                >
                  {CATEGORIES.filter(c => c !== 'All Crafts').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FAF6F0] border border-[#D6C5B7] rounded-xl text-xs"
                  placeholder="29.99"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                  Stock Qty *
                </label>
                <input
                  type="number"
                  required
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FAF6F0] border border-[#D6C5B7] rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                Image URL (Unsplash or direct image link)
              </label>
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF6F0] border border-[#D6C5B7] rounded-xl text-xs"
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF6F0] border border-[#D6C5B7] rounded-xl text-xs"
                placeholder="Handcrafted with cotton thread on beige linen fabric..."
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className="px-5 py-2 rounded-full border border-[#D6C5B7] text-xs font-bold text-[#4A2E25]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-[#8C4A38] hover:bg-[#723A2B] text-white px-6 py-2 rounded-full text-xs font-bold transition-all shadow-xs"
              >
                Publish Craft Listing
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MAP MODAL FOR ADMIN ORDER DELIVERY VIEW */}
      {selectedOrderMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FAF7F2] border border-[#E3D3C5] rounded-3xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedOrderMap(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C7A6B] hover:bg-[#E8D4C8]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-[#8C4A38]" />
              <h3 className="font-serif font-bold text-lg text-[#4A2E25]">
                Delivery Map Location: {selectedOrderMap.id}
              </h3>
            </div>

            <p className="text-xs text-[#634E42] mb-3">
              Recipient: <strong>{selectedOrderMap.customerName}</strong> ({selectedOrderMap.customerPhone})
              <br />
              Address: {selectedOrderMap.deliveryAddress}
            </p>

            <LocationPicker
              lat={selectedOrderMap.lat || 34.0522}
              lng={selectedOrderMap.lng || -118.2437}
              readOnly={true}
              height="280px"
            />

            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedOrderMap(null)}
                className="bg-[#8C4A38] text-white px-5 py-2 rounded-full text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
