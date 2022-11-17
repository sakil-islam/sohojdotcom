import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {

    const {productKey} = useParams();
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({});
    document.title = "sohojdotcom /product Details"

    useEffect(() => {
        fetch('http://localhost:3045/product/' + productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
            setLoading(false)
        })
    },[productKey])

    return (
        <div> 
            <h1>Product Details </h1>

            {
                loading ? <button className="btn btn-primary text-center" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </button> : <Product product={product} showAddToCart={false} />
            }
            
        </div>
    );
};

export default ProductDetails;