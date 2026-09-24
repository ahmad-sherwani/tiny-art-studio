import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LocationPicker } from './LocationPicker';
import confetti from 'canvas-confetti';
import { 
  X, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  AlertCircle,
  Truck,
  ArrowRight,
  PackageCheck
} from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    user, 
    placeOrder, 
    setCurrentTab 
  } = useApp();

  const [step, setStep] = useState(1); // 1: Delivery Details, 2: Payment Method, 3: Confirmation
  
  // Form State
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || 'Flat 402, Lotus Apartments, Park Street, Connaught Place, New Delhi - 110001');
  const [location, setLocation] = useState({ lat: user?.lat || 28.6315, lng: user?.lng || 77.2167 });
  
  // Payment State
  const [paymentType, setPaymentType] = useState('card'); // 'card' | 'upi' | 'stripe_api'
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [upiId, setUpiId] = useState('user@okaxis');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 60 ? 0 : 5.00;
  const total = subtotal + shipping;

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8C4A38', '#E5A93C', '#7A8B7B', '#E8D4C8']
    });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    // Check if live Razorpay Key is provided and SDK is loaded
    if (razorpayKey && window.Razorpay) {
      const options = {
        key: razorpayKey,
        amount: Math.round(total * 100), // amount in paise for INR / cents for USD
        currency: "INR",
        name: "Tiny Art Studio",
        description: "Craft Order Payment (@tinyyartstudio_)",
        handler: function (response) {
          setIsProcessing(false);
          const newOrder = placeOrder({
            customerName,
            customerEmail,
            customerPhone,
            deliveryAddress,
            lat: location.lat,
            lng: location.lng,
            items: cart,
            totalAmount: total,
            paymentMethod: `Razorpay Live (${response.razorpay_payment_id})`,
            paymentId: response.razorpay_payment_id || `pay_${Math.random().toString(36).substr(2, 9)}`
          });

          setCompletedOrder(newOrder);
          setStep(3);
          triggerConfetti();
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone
        },
        theme: {
          color: "#8C4A38"
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      // Demo Simulated Payment Delay
      setTimeout(() => {
        setIsProcessing(false);
        const newOrder = placeOrder({
          customerName,
          customerEmail,
          customerPhone,
          deliveryAddress,
          lat: location.lat,
          lng: location.lng,
          items: cart,
          totalAmount: total,
          paymentMethod: paymentType === 'card' 
            ? `Card (${cardNumber.slice(-4)})` 
            : paymentType === 'upi' ? `UPI (${upiId})` : 'Online Payment Gateway',
          paymentId: `pay_${Math.random().toString(36).substr(2, 9)}`
        });

        setCompletedOrder(newOrder);
        setStep(3);
        triggerConfetti();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-[#FAF7F2] border border-[#E3D3C5] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E3D3C5] bg-[#FAF6F0] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8C4A38]" />
            <h2 className="font-serif font-bold text-xl text-[#4A2E25]">
              {step === 1 && 'Step 1: Delivery Location & Address'}
              {step === 2 && 'Step 2: Online Payment API'}
              {step === 3 && 'Order Placed Successfully!'}
            </h2>
          </div>
          
          {step !== 3 && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-full text-[#8C7A6B] hover:text-[#4A2E25] hover:bg-[#E8D4C8]/50"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        {step !== 3 && (
          <div className="px-6 py-2 bg-[#F3EAE1] border-b border-[#E3D3C5] flex items-center justify-center gap-4 text-xs font-bold text-[#8C7A6B]">
            <span className={step === 1 ? 'text-[#8C4A38] font-extrabold flex items-center gap-1' : ''}>
              <span className="w-5 h-5 rounded-full bg-[#8C4A38] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Delivery</span>
            </span>
            <span>&rarr;</span>
            <span className={step === 2 ? 'text-[#8C4A38] font-extrabold flex items-center gap-1' : ''}>
              <span className="w-5 h-5 rounded-full bg-[#8C4A38] text-white flex items-center justify-center text-[10px]">2</span>
              <span>Online Payment</span>
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Delivery Location & Address */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#D6C5B7] rounded-xl text-xs focus:ring-2 focus:ring-[#8C4A38]/30 focus:border-[#8C4A38]"
                    placeholder="e.g. Ishita Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#D6C5B7] rounded-xl text-xs focus:ring-2 focus:ring-[#8C4A38]/30 focus:border-[#8C4A38]"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-1">
                  Full Street Address & Landmark *
                </label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#D6C5B7] rounded-xl text-xs focus:ring-2 focus:ring-[#8C4A38]/30 focus:border-[#8C4A38]"
                  placeholder="Enter house no, street name, city, pin code..."
                />
              </div>

              {/* Delivery Map Location Picker */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#4A2E25] uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8C4A38]" />
                    <span>Drop Pin on Delivery Map (Visible to Admin)</span>
                  </label>
                  <span className="text-[10px] text-[#8C7A6B]">Click map to set precise location</span>
                </div>

                <LocationPicker
                  lat={location.lat}
                  lng={location.lng}
                  onLocationSelect={(loc) => setLocation(loc)}
                  height="200px"
                />
              </div>

              {/* Summary Bar & Next button */}
              <div className="pt-4 border-t border-[#E8D4C8] flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#8C7A6B]">Total Pay (with Shipping):</p>
                  <p className="font-serif font-extrabold text-xl text-[#8C4A38]">${total.toFixed(2)}</p>
                </div>

                <button
                  type="button"
                  disabled={!customerName || !deliveryAddress}
                  onClick={() => setStep(2)}
                  className="bg-[#8C4A38] hover:bg-[#723A2B] text-white px-6 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50"
                >
                  <span>Continue to Online Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: Online Payment API */}
          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              
              {/* COD Disabled Notice */}
              <div className="bg-[#FFF4E5] border border-[#F0D5B5] p-3 rounded-xl text-xs text-[#855B14] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Cash on Delivery (COD) is NOT available</p>
                  <p className="text-[11px] text-[#9A6A18] mt-0.5">
                    As all crafts are custom made or limited batch embroidery, we only accept secure online payments via Card, UPI, or Online Gateways.
                  </p>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div>
                <label className="block text-xs font-bold text-[#4A2E25] uppercase tracking-wider mb-2">
                  Select Online Payment API Gateway
                </label>
                <div className="grid grid-cols-2 gap-3">
                  
                  <button
                    type="button"
                    onClick={() => setPaymentType('card')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      paymentType === 'card'
                        ? 'bg-white border-[#8C4A38] ring-2 ring-[#8C4A38]/20 shadow-xs'
                        : 'bg-[#FAF6F0] border-[#D6C5B7] text-[#634E42]'
                    }`}
                  >
                    <CreditCard className={`w-5 h-5 ${paymentType === 'card' ? 'text-[#8C4A38]' : 'text-[#8C7A6B]'}`} />
                    <div>
                      <p className="text-xs font-bold text-[#4A2E25]">Credit / Debit Card</p>
                      <p className="text-[10px] text-[#8C7A6B]">Stripe API Integration</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType('upi')}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      paymentType === 'upi'
                        ? 'bg-white border-[#8C4A38] ring-2 ring-[#8C4A38]/20 shadow-xs'
                        : 'bg-[#FAF6F0] border-[#D6C5B7] text-[#634E42]'
                    }`}
                  >
                    <Smartphone className={`w-5 h-5 ${paymentType === 'upi' ? 'text-[#8C4A38]' : 'text-[#8C7A6B]'}`} />
                    <div>
                      <p className="text-xs font-bold text-[#4A2E25]">UPI / GPay / QR</p>
                      <p className="text-[10px] text-[#8C7A6B]">Instant Online UPI</p>
                    </div>
                  </button>

                </div>
              </div>

              {/* Payment Details Form */}
              {paymentType === 'card' ? (
                <div className="bg-white border border-[#E3D3C5] p-4 rounded-2xl space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4A2E25] mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] border border-[#D6C5B7] rounded-xl text-xs font-mono"
                      />
                      <CreditCard className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#4A2E25] mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#D6C5B7] rounded-xl text-xs font-mono text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#4A2E25] mb-1">CVC / CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#D6C5B7] rounded-xl text-xs font-mono text-center"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-[#E3D3C5] p-4 rounded-2xl space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4A2E25] mb-1">Enter UPI VPA ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#D6C5B7] rounded-xl text-xs font-mono"
                      placeholder="username@bank"
                    />
                  </div>
                  <p className="text-[10px] text-[#8C7A6B] italic">
                    A payment request prompt will be pushed to your UPI banking app.
                  </p>
                </div>
              )}

              {/* Order Pay CTA */}
              <div className="pt-3 flex items-center justify-between border-t border-[#E8D4C8]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-[#8C7A6B] hover:text-[#4A2E25]"
                >
                  &larr; Back to Address
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-[#8C4A38] hover:bg-[#723A2B] text-white px-7 py-3 rounded-full font-bold text-xs transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Processing Online Payment...' : `Pay Online • $${total.toFixed(2)}`}</span>
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: Order Confirmation Screen */}
          {step === 3 && completedOrder && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EBF2EC] text-[#7A8B7B] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-serif font-extrabold text-2xl text-[#4A2E25]">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-[#8C7A6B] mt-1">
                  Order ID: <strong className="text-[#8C4A38] font-mono">{completedOrder.id}</strong> • Payment Verified
                </p>
              </div>

              <div className="bg-white border border-[#E3D3C5] p-4 rounded-2xl text-left space-y-2 text-xs text-[#634E42]">
                <div className="flex justify-between border-b border-[#F0ECE1] pb-2">
                  <span className="font-bold">Recipient Name:</span>
                  <span>{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-[#F0ECE1] pb-2">
                  <span className="font-bold">Delivery Address:</span>
                  <span className="max-w-xs text-right truncate">{completedOrder.deliveryAddress}</span>
                </div>
                <div className="flex justify-between border-b border-[#F0ECE1] pb-2">
                  <span className="font-bold">Payment Method:</span>
                  <span className="text-[#7A8B7B] font-bold">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-bold text-[#4A2E25]">Total Amount Paid:</span>
                  <span className="font-serif font-extrabold text-base text-[#8C4A38]">
                    ${completedOrder.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setCurrentTab('orders');
                  }}
                  className="bg-[#8C4A38] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#723A2B] transition-colors shadow-xs"
                >
                  Track in My Orders
                </button>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setCurrentTab('shop');
                  }}
                  className="bg-white border border-[#D6C5B7] text-[#4A2E25] px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#FAF6F0]"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
