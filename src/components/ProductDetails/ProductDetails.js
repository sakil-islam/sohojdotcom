import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {

    const {productKey} = useParams();

    const product =  fakeData.find( singleProduct => singleProduct.key === productKey);

    //console.log(product);

    return (
        <div> 
            <h1>Product Details </h1>

            <Product product={product} showAddToCart={false} />
        </div>
    );
};

export default ProductDetails;