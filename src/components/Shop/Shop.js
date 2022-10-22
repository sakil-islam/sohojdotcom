import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
//import { addToDb, getStoredCart } from '../../utilities/fakedb';
import "./Shop.css";
import { Link } from "react-router-dom";
import fakeData from "../../fakeData";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";

// const Shop = () => {
//     const [products, setProducts] = useState([]);
//     const [cart, setCart] = useState([]);
//     // products to be rendered on the UI
//     const [displayProducts, setDisplayProducts] = useState([]);

//     useEffect(() => {
//         fetch('./products.JSON')
//             .then(res => res.json())
//             .then(data => {
//                 setProducts(data);
//                 setDisplayProducts(data);
//             });
//     }, []);

//     useEffect(() => {
//         if (products.length) {
//             const savedCart = getStoredCart();
//             const storedCart = [];
//             for (const key in savedCart) {
//                 const addedProduct = products.find(product => product.key === key);
//                 if (addedProduct) {
//                     const quantity = savedCart[key];
//                     addedProduct.quantity = quantity;
//                     storedCart.push(addedProduct);
//                 }
//             }
//             setCart(storedCart);
//         }
//     }, [products])

//     const handleAddToCart = (product) => {
//         const newCart = [...cart, product];
//         setCart(newCart);
//         // save to local storage (for now)
//         addToDb(product.key);
//     }

//     const handleSearch = event => {
//         const searchText = event.target.value;

//         const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));

//         setDisplayProducts(matchedProducts);
//     }

//     return (
//         <>
//             <div className="search-container">
//                 <input
//                     type="text"
//                     onChange={handleSearch}
//                     placeholder="Search Product" />
//             </div>
//             <div className="shop-container">
//                 <div className="product-container">
//                     {
//                         displayProducts.map(product => <Product
//                             key={product.key}
//                             product={product}
//                             handleAddToCart={handleAddToCart}
//                         >
//                         </Product>)
//                     }
//                 </div>
//                 <div className="cart-container">
//                     <Cart cart={cart}></Cart>
//                 </div>
//             </div>
//         </>
//     );
// };
const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    //cart
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = saveCart[key];
      return product;
    });
    setCart(cartProducts);
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

  return (
    <>
      {/* <div className="search-container">
                        <input
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search Product" />
                    </div> */}
      <div className="shop-container">
        <div className="product-container">
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
