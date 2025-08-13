// src/pages/ShopPage.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs,onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
// import Cart from "../components/Cart";
// import CartPurchasePage from "../components/CartPurchasePage";
import '../App.css'
import { ShoppingCart } from 'lucide-react';


const ShopPage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);

  // 🔑 Add to cart updates App-level cart
  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const productData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productData);
      },
      (error) => {
        console.error("onSnapshot error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className='cards-container' style={{ padding: "20px" }}>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover products you’ll love</h1>
          <p className="hero-subtitle">Quality items, curated for you. Fast shipping, fair prices.</p>
          <a href="#cards" className="hero-cta" aria-label="Buy now and jump to products">Buy now</a>
        </div>
      </section>
      <div id="cards" className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.det}</p>
            <h2>${product.price}</h2>
            <button onClick={() => addToCart(product.id)}>
              <ShoppingCart
                size={25}
                className='Cart-icon-product'
                style={{ cursor: "pointer" }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
