import React, { useState } from 'react';
import { ShoppingCart, LogOut, Menu, X, Check, Star, Sparkles, TrendingUp, Shield } from 'lucide-react';

function Homepage() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const products = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, image: '🎧', category: 'Electronics', rating: 4.8 },
    { id: 2, name: 'Smart Watch', price: 199.99, image: '⌚', category: 'Electronics', rating: 4.9 },
    { id: 3, name: 'Laptop', price: 999.99, image: '💻', category: 'Electronics', rating: 4.7 },
    { id: 4, name: 'Camera', price: 599.99, image: '📷', category: 'Electronics', rating: 4.6 },
    { id: 5, name: 'Tablet', price: 399.99, image: '📱', category: 'Electronics', rating: 4.5 },
    { id: 6, name: 'Gaming Console', price: 499.99, image: '🎮', category: 'Gaming', rating: 4.9 },
    { id: 7, name: 'USB-C Cable', price: 19.99, image: '🔌', category: 'Accessories', rating: 4.4 },
    { id: 8, name: 'Phone Case', price: 24.99, image: '📦', category: 'Accessories', rating: 4.3 },
    { id: 9, name: 'Portable Speaker', price: 89.99, image: '🔊', category: 'Audio', rating: 4.7 },
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const NavigationBar = () => {
    return (
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white sticky top-0 z-50 shadow-2xl border-b border-amber-500/20">
        <div className="w-full mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <button onClick={() => { setCurrentPage('landing'); setShowMenu(false); }} className="text-xl sm:text-2xl font-bold hover:opacity-90 transition flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">ShopHub</span>
          </button>
          
          <div className="hidden md:flex gap-2 lg:gap-6 flex-1 justify-center">
            {user ? (
              <>
                <button onClick={() => { setCurrentPage('home'); setShowMenu(false); }} className="px-3 py-2 hover:bg-slate-700/50 rounded transition text-sm lg:text-base relative overflow-hidden group">
                  <span className="relative z-10">Home</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                </button>
                <button onClick={() => { setCurrentPage('products'); setShowMenu(false); }} className="px-3 py-2 hover:bg-slate-700/50 rounded transition text-sm lg:text-base relative overflow-hidden group">
                  <span className="relative z-10">Products</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                </button>
                <button onClick={() => { setCurrentPage('about'); setShowMenu(false); }} className="px-3 py-2 hover:bg-slate-700/50 rounded transition text-sm lg:text-base relative overflow-hidden group">
                  <span className="relative z-10">About</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setCurrentPage('login'); setShowMenu(false); }} className="px-3 py-2 hover:bg-slate-700/50 rounded transition text-sm lg:text-base">Login</button>
                <button onClick={() => { setCurrentPage('register'); setShowMenu(false); }} className="px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 rounded hover:from-amber-400 hover:to-amber-300 transition font-semibold text-sm lg:text-base shadow-lg shadow-amber-500/50">Register</button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {user && (
              <>
                <button
                  onClick={() => setCurrentPage('cart')}
                  className="relative p-2 hover:bg-slate-700/50 rounded-lg transition group"
                >
                  <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
                      {cart.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => { setUser(null); setCurrentPage('landing'); setCart([]); setShowMenu(false); }}
                  className="hidden sm:flex bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg items-center gap-2 transition text-sm lg:text-base"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            )}
            
            <button
              className="md:hidden p-2 hover:bg-slate-700/50 rounded transition"
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {showMenu && (
          <div className="md:hidden bg-slate-800 px-4 py-3 space-y-2 border-t border-amber-500/20">
            {user ? (
              <>
                <button onClick={() => { setCurrentPage('home'); setShowMenu(false); }} className="block w-full text-left py-2 px-2 hover:bg-slate-700/50 rounded transition">Home</button>
                <button onClick={() => { setCurrentPage('products'); setShowMenu(false); }} className="block w-full text-left py-2 px-2 hover:bg-slate-700/50 rounded transition">Products</button>
                <button onClick={() => { setCurrentPage('about'); setShowMenu(false); }} className="block w-full text-left py-2 px-2 hover:bg-slate-700/50 rounded transition">About</button>
                <button onClick={() => { setUser(null); setCurrentPage('landing'); setCart([]); setShowMenu(false); }} className="block w-full text-left py-2 px-2 hover:bg-slate-700/50 rounded transition">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => { setCurrentPage('login'); setShowMenu(false); }} className="block w-full text-left py-2 px-2 hover:bg-slate-700/50 rounded transition">Login</button>
                <button onClick={() => { setCurrentPage('register'); setShowMenu(false); }} className="block w-full text-left py-2 px-2 hover:bg-slate-700/50 rounded transition">Register</button>
              </>
            )}
          </div>
        )}
      </nav>
    );
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="w-full mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center justify-center min-h-screen text-center relative z-10">
        <div className="mb-6 relative">
          <Sparkles className="w-16 h-16 text-amber-400 mx-auto animate-pulse" />
          <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full"></div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 relative">
          Welcome to <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent animate-pulse">ShopHub</span>
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 blur-xl"></div>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 max-w-2xl">Your premium destination for exceptional products at unbeatable prices</p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button
            onClick={() => setCurrentPage('login')}
            className="relative bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition transform hover:scale-105 text-base sm:text-lg overflow-hidden group shadow-2xl shadow-amber-500/50"
          >
            <span className="relative z-10">Login</span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </button>
          <button
            onClick={() => setCurrentPage('register')}
            className="relative bg-slate-800 border-2 border-amber-400 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-slate-700 transition transform hover:scale-105 text-base sm:text-lg overflow-hidden group shadow-2xl"
          >
            <span className="relative z-10">Register</span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
          </button>
        </div>

        {/* Floating product cards preview */}
        <div className="mt-20 grid grid-cols-3 gap-4 opacity-60">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-3xl mb-2">🎧</div>
            <div className="text-amber-400 font-bold text-sm">Premium Audio</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform" style={{animationDelay: '0.2s'}}>
            <div className="text-3xl mb-2">⌚</div>
            <div className="text-amber-400 font-bold text-sm">Smart Tech</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform" style={{animationDelay: '0.4s'}}>
            <div className="text-3xl mb-2">💻</div>
            <div className="text-amber-400 font-bold text-sm">Computing</div>
          </div>
        </div>
      </div>
    </div>
  );

  const RegisterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 py-12 sm:py-0 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl top-0 right-0 animate-pulse"></div>
      </div>
      
      <div className="bg-slate-800 border border-amber-500/20 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl"></div>
        <div className="relative z-10">
          <div className="text-center mb-2">
            <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Create Account</h1>
          <p className="text-center text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base">Join us today and start your premium shopping journey</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Full Name</label>
              <input type="text" placeholder="John Doe" className="w-full px-4 py-2 sm:py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg focus:border-amber-500 focus:outline-none text-sm sm:text-base transition" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Email</label>
              <input type="email" placeholder="john@example.com" className="w-full px-4 py-2 sm:py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg focus:border-amber-500 focus:outline-none text-sm sm:text-base transition" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 sm:py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg focus:border-amber-500 focus:outline-none text-sm sm:text-base transition" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 sm:py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg focus:border-amber-500 focus:outline-none text-sm sm:text-base transition" />
            </div>
            <button
              onClick={() => { setUser({ name: 'John Doe', email: 'john@example.com' }); setCurrentPage('home'); }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold py-2 sm:py-3 rounded-lg hover:from-amber-400 hover:to-amber-300 transition transform hover:scale-105 mt-4 sm:mt-6 text-sm sm:text-base shadow-lg shadow-amber-500/50 relative overflow-hidden group"
            >
              <span className="relative z-10">Register</span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-white/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            </button>
            <p className="text-center text-slate-400 text-xs sm:text-sm">Already have an account? <button onClick={() => setCurrentPage('login')} className="text-amber-400 font-semibold hover:underline">Login</button></p>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 py-12 sm:py-0 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl bottom-0 left-0 animate-pulse"></div>
      </div>
      
      <div className="bg-slate-800 border border-amber-500/20 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl"></div>
        <div className="relative z-10">
          <div className="text-center mb-2">
            <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Welcome Back</h1>
          <p className="text-center text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base">Login to your account</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Email</label>
              <input type="email" placeholder="john@example.com" className="w-full px-4 py-2 sm:py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg focus:border-amber-500 focus:outline-none text-sm sm:text-base transition" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 sm:py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg focus:border-amber-500 focus:outline-none text-sm sm:text-base transition" />
            </div>
            <button
              onClick={() => { setUser({ name: 'John Doe', email: 'john@example.com' }); setCurrentPage('home'); }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold py-2 sm:py-3 rounded-lg hover:from-amber-400 hover:to-amber-300 transition transform hover:scale-105 mt-4 sm:mt-6 text-sm sm:text-base shadow-lg shadow-amber-500/50 relative overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-white/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            </button>
            <p className="text-center text-slate-400 text-xs sm:text-sm">Don't have an account? <button onClick={() => setCurrentPage('register')} className="text-amber-400 font-semibold hover:underline">Register</button></p>
          </div>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
            <h1 className="text-3xl sm:text-5xl font-bold text-white">Welcome, <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">{user?.name}</span>! 👋</h1>
          </div>
          <p className="text-base sm:text-xl text-slate-400">Discover exceptional products at exclusive prices</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-amber-500/20 transition transform hover:scale-105 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-amber-400" />
                <h2 className="text-2xl sm:text-3xl font-bold">Best Deals</h2>
              </div>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 text-slate-300">Get up to 50% off on selected products this week!</p>
              <button onClick={() => setCurrentPage('products')} className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-amber-400 hover:to-amber-300 transition text-sm sm:text-base shadow-lg shadow-amber-500/50">Shop Now</button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-amber-500/20 transition transform hover:scale-105 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-amber-400" />
                <h2 className="text-2xl sm:text-3xl font-bold">Free Shipping</h2>
              </div>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 text-slate-300">Free delivery on orders over $50! Fast and secure shipping.</p>
              <button onClick={() => setCurrentPage('about')} className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-amber-400 hover:to-amber-300 transition text-sm sm:text-base shadow-lg shadow-amber-500/50">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent mb-4">Our Premium Collection</h1>
          <p className="text-slate-400">Handpicked products just for you</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-slate-800 border border-amber-500/20 rounded-2xl shadow-2xl hover:shadow-amber-500/30 transition transform hover:scale-105 p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-5xl sm:text-6xl mb-4 text-center transform group-hover:scale-110 transition-transform">{product.image}</div>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-2">{product.name}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-slate-400 text-sm">{product.rating}</span>
                  <span className="text-slate-600 text-sm">• {product.category}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-4">
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold px-4 py-2 rounded-lg hover:from-amber-400 hover:to-amber-300 transition text-sm sm:text-base shadow-lg shadow-amber-500/50 relative overflow-hidden group/btn"
                  >
                    <span className="relative z-10">Add to Cart</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-white/20 to-amber-400/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CartPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent mb-8 sm:mb-12">Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <div className="bg-slate-800 border border-amber-500/20 rounded-2xl p-12 max-w-md mx-auto">
              <ShoppingCart size={48} className="mx-auto text-amber-400 mb-4" />
              <p className="text-xl sm:text-2xl text-white mb-6">Your cart is empty</p>
              <button onClick={() => setCurrentPage('products')} className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold px-6 py-3 rounded-lg hover:from-amber-400 hover:to-amber-300 transition text-sm sm:text-base shadow-lg shadow-amber-500/50">Continue Shopping</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              {cart.map(item => (
                <div key={item.id} className="bg-slate-800 border border-amber-500/20 rounded-xl shadow-xl p-4 sm:p-6 mb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-amber-500/40 transition">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{item.image}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-base sm:text-lg text-white">{item.name}</h3>
                      <p className="text-amber-400 text-sm sm:text-base">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-slate-700 text-white px-2 sm:px-3 py-1 rounded hover:bg-slate-600 text-sm transition">−</button>
                    <span className="font-bold min-w-6 text-center text-white">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-slate-700 text-white px-2 sm:px-3 py-1 rounded hover:bg-slate-600 text-sm transition">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="bg-slate-700 text-white px-3 sm:px-4 py-1 rounded hover:bg-slate-600 text-sm transition">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-800 border-2 border-amber-500/30 rounded-xl shadow-2xl p-6 sm:p-8 h-fit sticky top-20">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">Order Summary</h2>
              <div className="space-y-3 sm:space-y-4 mb-6">
                <div className="flex justify-between text-slate-400 text-sm sm:text-base">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm sm:text-base">
                  <span>Shipping:</span>
                  <span>$10.00</span>
                </div>
                <div className="border-t border-slate-700 pt-3 sm:pt-4 flex justify-between font-bold text-base sm:text-lg">
                  <span className="text-white">Total:</span>
                  <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">${(totalPrice + 10).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => setCurrentPage('payment')} className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold py-2 sm:py-3 rounded-lg hover:from-amber-400 hover:to-amber-300 transition text-sm sm:text-base shadow-lg shadow-amber-500/50 relative overflow-hidden group">
                <span className="relative z-10">Proceed to Checkout</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-white/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const [selectedPayment, setSelectedPayment] = useState('razorpay');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const PaymentPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent mb-8 sm:mb-12">Secure Checkout</h1>
        {paymentCompleted ? (
          <div className="bg-slate-800 border-2 border-amber-500/30 rounded-2xl shadow-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-r from-amber-500 to-amber-400 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/50 animate-pulse">
                <Check size={40} className="text-slate-900" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Payment Successful!</h2>
              <p className="text-slate-400 mb-6 text-sm sm:text-base">Your order has been placed. You'll receive a confirmation email shortly.</p>
              <button onClick={() => { setCurrentPage('home'); setCart([]); setPaymentCompleted(false); }} className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:from-amber-400 hover:to-amber-300 text-sm sm:text-base shadow-lg shadow-amber-500/50">Back to Home</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <div className="bg-slate-800 border border-amber-500/20 rounded-xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">Select Payment Method</h2>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { id: 'razorpay', name: '💳 Razorpay', desc: 'Secure payment gateway' },
                    { id: 'upi', name: '📱 UPI', desc: 'Google Pay, PhonePe, Paytm' },
                    { id: 'netbanking', name: '🏦 Net Banking', desc: 'All major banks' },
                  ].map(method => (
                    <div key={method.id} onClick={() => setSelectedPayment(method.id)} className={`p-4 rounded-lg border-2 cursor-pointer transition ${selectedPayment === method.id ? 'border-amber-500 bg-slate-700 shadow-lg shadow-amber-500/20' : 'border-slate-700 bg-slate-900 hover:border-amber-500/50'}`}>
                      <div className="font-bold text-base sm:text-lg text-white">{method.name}</div>
                      <div className="text-slate-400 text-xs sm:text-sm">{method.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPayment === 'razorpay' && (
                <div className="bg-slate-800 border border-amber-500/20 rounded-xl shadow-xl p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 text-white">Razorpay Payment</h3>
                  <div className="bg-slate-900 border border-amber-500/20 rounded-lg p-4 mb-4 text-sm">
                    <p className="text-amber-400"><strong>✓ Secure & PCI-DSS Compliant</strong></p>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2">This is a secure payment gateway. Your payment information is encrypted and protected.</p>
                  </div>
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-2 sm:py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg mb-4 focus:border-amber-500 focus:outline-none text-sm sm:text-base transition" />
                  <input type="email" placeholder="Email ID" className="w-full px-4 py-2 sm:py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg focus:border-amber-500 focus:outline-none text-sm sm:text-base transition" />
                </div>
              )}

              {selectedPayment === 'upi' && (
                <div className="bg-slate-800 border border-amber-500/20 rounded-xl shadow-xl p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 text-white">UPI Payment</h3>
                  <div className="bg-slate-900 border border-amber-500/20 rounded-lg p-4 mb-4 text-sm">
                    <p className="text-amber-400"><strong>✓ NPCI Registered</strong></p>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2">All UPI payments are processed through NPCI and are 100% secure.</p>
                  </div>
                  <input type="text" placeholder="yourname@upi" className="w-full px-4 py-2 sm:py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg focus:border-amber-500 focus:outline-none text-sm sm:text-base transition" />
                  <p className="text-slate-400 text-xs sm:text-sm mt-4">You'll be redirected to your UPI app to complete the payment</p>
                </div>
              )}

              {selectedPayment === 'netbanking' && (
                <div className="bg-slate-800 border border-amber-500/20 rounded-xl shadow-xl p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 text-white">Net Banking</h3>
                  <div className="bg-slate-900 border border-amber-500/20 rounded-lg p-4 mb-4 text-sm">
                    <p className="text-amber-400"><strong>✓ Bank Verified</strong></p>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2">Your net banking transactions are fully encrypted and secured by your bank.</p>
                  </div>
                  <select className="w-full px-4 py-2 sm:py-3 bg-slate-900 border-2 border-slate-700 text-white rounded-lg focus:border-amber-500 focus:outline-none text-sm sm:text-base transition">
                    <option>Select your bank</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>State Bank of India</option>
                  </select>
                </div>
              )}
            </div>

            <div className="bg-slate-800 border-2 border-amber-500/30 rounded-xl shadow-2xl p-6 sm:p-8 h-fit">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">Order Summary</h2>
              <div className="space-y-2 sm:space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-slate-400 text-sm sm:text-base">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 space-y-3 pt-4 mb-6">
                <div className="flex justify-between text-slate-400 text-sm sm:text-base">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm sm:text-base">
                  <span>Shipping:</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between font-bold text-base sm:text-lg">
                  <span className="text-white">Total:</span>
                  <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">${(totalPrice + 10).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-amber-500/20 rounded-lg p-3 sm:p-4 mb-6">
                <p className="text-xs sm:text-sm text-amber-400"><strong>✓ 100% Secure Checkout</strong></p>
                <p className="text-xs text-slate-400 mt-1">All transactions are encrypted with SSL 256-bit security.</p>
              </div>

              <button onClick={() => setPaymentCompleted(true)} className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold py-3 sm:py-4 rounded-lg hover:from-amber-400 hover:to-amber-300 transition text-sm sm:text-base shadow-lg shadow-amber-500/50 relative overflow-hidden group">
                <span className="relative z-10">Complete Payment</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-white/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent mb-6 sm:mb-8">About ShopHub</h1>
        <div className="bg-slate-800 border border-amber-500/20 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 sm:space-y-8">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-3 sm:mb-4">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">At ShopHub, we're dedicated to bringing you the best selection of products at unbeatable prices. Our mission is to make online shopping convenient, affordable, and enjoyable for everyone.</p>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-3 sm:mb-4">Why Choose Us?</h2>
            <ul className="text-slate-300 space-y-2 text-sm sm:text-base">
              <li className="flex items-center gap-2"><span className="text-amber-400">✅</span> Wide variety of quality products</li>
              <li className="flex items-center gap-2"><span className="text-amber-400">✅</span> Competitive pricing and regular discounts</li>
              <li className="flex items-center gap-2"><span className="text-amber-400">✅</span> Fast and secure checkout process</li>
              <li className="flex items-center gap-2"><span className="text-amber-400">✅</span> Free shipping on orders over $50</li>
              <li className="flex items-center gap-2"><span className="text-amber-400">✅</span> 30-day money-back guarantee</li>
              <li className="flex items-center gap-2"><span className="text-amber-400">✅</span> 24/7 customer support</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-3 sm:mb-4">Secure Payment Methods</h2>
            <div className="bg-slate-900 border border-amber-500/20 rounded-lg p-4 text-sm sm:text-base">
              <p className="text-amber-400 mb-2"><strong>✓ Razorpay Integration</strong></p>
              <p className="text-slate-400 text-xs sm:text-sm">We use Razorpay, a PCI-DSS Level 1 certified payment gateway that complies with all security standards and regulations.</p>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">Supported payment methods: Credit Cards, Debit Cards, UPI, Net Banking, and more.</p>
            </div>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-3 sm:mb-4">Contact Us</h2>
            <p className="text-slate-300 text-sm sm:text-base">Email: support@shophub.com<br />Phone: 1-800-SHOP-HUB<br />Address: 123 Shopping Street, Commerce City, CC 12345</p>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900">
      <NavigationBar />
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'register' && <RegisterPage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'home' && user && <HomePage />}
      {currentPage === 'products' && user && <ProductsPage />}
      {currentPage === 'cart' && user && <CartPage />}
      {currentPage === 'payment' && user && <PaymentPage />}
      {currentPage === 'about' && <AboutPage />}
    </div>
  );
}

export default Homepage;