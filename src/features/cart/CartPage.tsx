import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "./CartSlice";
import "../../styles/CartPage.css";
import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const email = useSelector((state: RootState) => state.auth.email);

if (!email) {
  return <div className="center-message">Please log in to view your cart.</div>;
}

  const handleRemove = (id: string) => {
    dispatch(removeFromCart({ email, itemId: id }));
  };

  const handleClear = () => {
    dispatch(clearCart({ email }));
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity({ email, itemId: id }));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity({ email, itemId: id }));
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty 🛒</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">Price: ₹{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(item._id)} className="qty-btn">-</button>
                    <span>{item.quantity} kg</span>
                    <button onClick={() => handleIncrease(item._id)} className="qty-btn">+</button>
                  </div>
                  <p className="cart-item-total">
                    Total: ₹{item.quantity * item.price}
                  </p>
                  <button onClick={() => handleRemove(item._id)} className="remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="buttons">
            <button onClick={handleClear} className="back-btn">
              Clear Cart
            </button>
            <Link to="/payment"><button className="order-btn">Place Order</button></Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
