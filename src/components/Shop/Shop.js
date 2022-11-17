import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";

const Shop = () => {
  document.title = "sohojdotcom - shop";
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3045/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  },[search]);

  useEffect(() => {
    //cart
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    fetch("http://localhost:3045/productsByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  const handelAddProduct = (product) => {
    const productToBeAdded = product.key;

    const sameProduct = cart.find(
      (sameProductInc) => sameProductInc.key === product.key
    );
    var sameProductCount = 1;
    let newCart;
    if (sameProduct) {
      sameProductCount = sameProduct.quantity + 1;
      sameProduct.quantity = sameProductCount;
      const others = cart.filter((pd) => pd.key !== productToBeAdded);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    //const sameProductCount = sameProduct.length;

    //const newCart = [ ...cart, product]
    setCart(newCart);
    addToDatabaseCart(product.key, sameProductCount);
  };

  const handleSearch = (event) => {
    const searchText = event.target.value;
    // const matchedProducts = products.filter((product) =>
    //   product.name.toLowerCase().includes(searchText.toLowerCase()));
      setSearch(searchText);
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          onBlur={handleSearch}
          placeholder="Search Product"
        />
      </div>
      <div className="shop-container">
        <div className="product-container">
          {products.length === 0 && (
            <>
              <button
                className="btn btn-primary text-center"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </button>
            </>
          )}
          {products.map((product) => (
            <Product
              key={product.key}
              product={product}
              handelAddProduct={handelAddProduct}
              showAddToCart={true}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart}>
            <Link to="/orders">
              <button className="btn-regular">Review Order</button>
            </Link>
          </Cart>
        </div>
      </div>
    </>
  );
};
export default Shop;
