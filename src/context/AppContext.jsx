import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

const AppContext = createContext();

const INITIAL_USER = {
  name: 'Ishita Sharma',
  email: 'ishita@example.com',
  role: 'customer', // 'customer' | 'admin'
  address: 'Flat 402, Lotus Apartments, Park Street, Connaught Place, New Delhi - 110001',
  lat: 28.6315,
  lng: 77.2167
};

const INITIAL_ORDERS = [
  {
    id: 'ORD-9821',
    customerName: 'Priya Verma',
    customerEmail: 'priya.v@example.com',
    customerPhone: '+91 98765 43210',
    deliveryAddress: 'House 14, Sector 15, Vashi, Navi Mumbai, Maharashtra - 400703',
    lat: 19.0770,
    lng: 72.9986,
    items: [
      { id: 'prod-1', title: 'Botanical Wildflower Embroidery Hoop (6")', price: 34.99, quantity: 1, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' }
    ],
    totalAmount: 39.99, // 34.99 + 5.00 shipping
    paymentMethod: 'Online Payment (UPI: priya@okicici)',
    paymentId: 'pay_upi_mock_881923',
    status: 'Processing',
    createdAt: '2026-09-23T14:20:00.000Z'
  },
  {
    id: 'ORD-9820',
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav.m@example.com',
    customerPhone: '+91 98123 45678',
    deliveryAddress: '42 Indiranagar 100ft Road, Bengaluru, Karnataka - 560038',
    lat: 12.9784,
    lng: 77.6408,
    items: [
      { id: 'prod-4', title: 'Hand-Painted Ceramic Ring Dish - Lavender Dreams', price: 22.50, quantity: 2, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80' }
    ],
    totalAmount: 50.00,
    paymentMethod: 'Online Payment (Razorpay Card ending 4242)',
    paymentId: 'pay_rzp_mock_773192',
    status: 'Shipped',
    createdAt: '2026-09-22T09:15:00.000Z'
  }
];

export const AppProvider = ({ children }) => {
  // Products State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('tiny_art_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('tiny_art_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('tiny_art_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders State (Viewable by Admin & Customer)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('tiny_art_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tiny_art_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Active View & Filters
  const [currentTab, setCurrentTab] = useState('shop'); // 'shop' | 'admin' | 'orders' | 'wishlist'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Crafts');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('tiny_art_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tiny_art_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tiny_art_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tiny_art_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('tiny_art_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tiny_art_user');
    }
  }, [user]);

  // Notification helper
  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.title}" to cart! 🧵`);
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart.');
  };

  const clearCart = () => setCart([]);

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast('Removed from favorites.');
        return prev.filter(item => item.id !== product.id);
      }
      showToast('Saved to your favorites! ❤️');
      return [...prev, product];
    });
  };

  // Product Admin Actions
  const addProduct = (newProd) => {
    const productToAdd = {
      ...newProd,
      id: `prod-${Date.now()}`,
      price: parseFloat(newProd.price),
      originalPrice: newProd.originalPrice ? parseFloat(newProd.originalPrice) : parseFloat(newProd.price) * 1.2,
      stock: parseInt(newProd.stock, 10) || 1,
      rating: 5.0,
      reviewsCount: 1,
      tags: newProd.tags ? newProd.tags.split(',').map(t => t.trim()) : ['New Arrival'],
      image: newProd.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    };
    setProducts(prev => [productToAdd, ...prev]);
    showToast('New craft product added successfully! ✨');
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    showToast('Product details updated.');
  };

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from studio store.');
  };

  // Order Placement (Online Payment Only)
  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Processing',
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast('🎉 Order placed successfully! Thank you for supporting handmade art.');
    return newOrder;
  };

  // Admin update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order ${orderId} status changed to ${newStatus}.`);
  };

  // Auth actions
  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
    showToast(`Welcome back, ${userData.name}! ${userData.role === 'admin' ? '(Admin Mode Active)' : ''}`);
  };

  const logoutUser = () => {
    setUser(null);
    setCurrentTab('shop');
    showToast('Logged out successfully.');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        user,
        currentTab,
        setCurrentTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isDeployGuideOpen,
        setIsDeployGuideOpen,
        toastMessage,
        showToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        addProduct,
        updateProduct,
        removeProduct,
        placeOrder,
        updateOrderStatus,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
