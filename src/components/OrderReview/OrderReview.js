import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import "./OrderReview.css";
import Confirmation from "../../images/giphy.gif";
import { useHistory } from 'react-router-dom';

const OrderReview = () => {
  const [orderPlace, setOrderPlace] = useState(false);

  const [cart, setCart] = useState([]);
  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push('/shipment');
  };

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    //cart
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    fetch('http://localhost:3045/productsByKeys', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCart(data))
  }, []);

  let confirmOrder;
  if (orderPlace) {
    confirmOrder = (
      <div className="confirmation-message">
        <h1>Order Confirm</h1>
        <img src={Confirmation} alt=""></img>
      </div>
    );
  }
  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem key={pd.key} removeProduct={removeProduct} product={pd} />
        ))}
        {confirmOrder}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button className="btn-regular" onClick={handleProceedCheckout}>
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};
export default OrderReview;
