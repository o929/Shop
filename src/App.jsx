import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import CartPurchasePage from "./components/CartPurchasePage";
// import './index.css';
import './App.css';
import { ShoppingCart } from "lucide-react";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find((item) => item.id === product.id);
      if (existingItem) {
        return previousCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...previousCart, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((previousCart) => {
      const next = previousCart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0);
      return next;
    });
  };

  const removeItem = (id) => {
    setCart((previousCart) => previousCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <header>
          
        <nav>
        <div className="nav">
          <h1 className="logo">Small Shop</h1>
          <div className="links">
            <Link className="link" to="/shop">Shop</Link>
            <Link className="link" to="/cart" style={{ marginLeft: 16 }}>Cart</Link>
          </div>
        </div>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <ShopPage
              cart={cart}
              addToCart={addToCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeItem}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <ShopPage
              cart={cart}
              addToCart={addToCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeItem}
              clearCart={clearCart}
            />
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
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
