// src/pages/ShopPage.jsx
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CartPurchasePage from "../components/CartPurchasePage";
import '../App.css'
import { ShoppingCart } from 'lucide-react';

const ShopPage = ({
  cart,
  addToCart,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
}) => {
  const [products, setProducts] = useState([]);
  const [showWhiteBackground, setShowWhiteBackground] = useState(false);

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
      <h1 className='head-text'>Shop Page</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.det}</p>
            <h2>${product.price}</h2>
            <button onClick={() => addToCart(product)}>
              <ShoppingCart
                size={25}
                className='Cart-icon-product'
                style={{ cursor: "pointer" }}
              />
            </button>
          </div>
        ))}

        <div className="cart">
          <ShoppingCart
            size={28}
            color="#333"
            className='Cart-icon'
            style={{ cursor: "pointer" }}
            onClick={() => setShowWhiteBackground((prev) => !prev)}
          />
          <span className='cart-badge'>{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
        </div>
      </div>

      <CartPurchasePage
        showWhiteBackground={showWhiteBackground}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeItem={removeItem}
        clearCart={clearCart}
      />
    </div>
  );
};

export default ShopPage;
