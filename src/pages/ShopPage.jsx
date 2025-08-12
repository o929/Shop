// src/pages/ShopPage.jsx
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CartPurchasePage from "../components/CartPurchasePage";
import '../App.css'
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  const getQtyInCart = (productId) => {
    const item = cart.find((i) => i.id === productId);
    return item ? item.qty : 0;
  };

  return (
    <div className='cards-container' style={{ padding: "20px" }}>
      <h1 className='head-text'>Shop Page</h1>
      <div className="product-list">
        {products.map((product) => {
          const qty = getQtyInCart(product.id);
          return (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.det}</p>
              <h2>${product.price}</h2>
              {qty === 0 ? (
                <button onClick={() => addToCart(product)}>
                  <ShoppingCart
                    size={25}
                    className='Cart-icon-product'
                    style={{ cursor: "pointer" }}
                  />
                </button>
              ) : (
                <div className="qty-inline">
                  <button className="qty-btn" onClick={() => decreaseQty(product.id)}>-</button>
                  <span className="qty">{qty}</span>
                  <button className="qty-btn" onClick={() => increaseQty(product.id)}>+</button>
                </div>
              )}
            </div>
          );
        })}

        <div className="cart" onClick={() => navigate('/cart')}>
          <ShoppingCart
            size={28}
            color="#333"
            className='Cart-icon'
            style={{ cursor: "pointer" }}
          />
          <span className='cart-badge'>{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
        </div>
      </div>

      {/* Hidden inline drawer removed; cart now lives at /cart */}
      <CartPurchasePage
        showWhiteBackground={false}
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
