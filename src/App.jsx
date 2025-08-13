import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
// import Cart from "./components/Cart";
// import './index.css';
import './App.css';
import { ShoppingCart } from "lucide-react";
import CartPurchasePage from "./components/CartPurchasePage";

function App() {
  const [cart, setCart] = useState([]);

  const clearCart = () => setCart([]);

  const increaseQty = (id) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decreaseQty = (id) => {
    setCart(prev => prev.map(item => (
      item.id === id ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 } : item
    )));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Router>
      <header>
          
        <nav>
        <div className="nav">
          <h1 className="logo">Small Shop</h1>
          <div className="links" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link className="link" to="/shop">Shop</Link>
            <Link className="link" to="/cart" aria-label="Cart">
              <ShoppingCart size={22} style={{ verticalAlign: 'middle' }} />
              {cartCount > 0 && (
                <span style={{
                  marginLeft: 6,
                  backgroundColor: '#b32806',
                  color: '#fff',
                  borderRadius: 999,
                  padding: '2px 8px',
                  fontSize: 12,
                  verticalAlign: 'middle'
                }}>{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <ShopPage cart={cart} setCart={setCart} clearCart={clearCart} />
          }
        />
        <Route
          path="/shop"
          element={
            <ShopPage  cart={cart} setCart={setCart} clearCart={clearCart} />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPurchasePage
              cart={cart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeItem}
              clearCart={clearCart}
              showWhiteBackground={true}
            />
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
