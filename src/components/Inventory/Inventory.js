import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProduct = () =>{
        fetch('http://localhost:3045/addProduct', {
            method: 'POST',
            headers: {
                'CONTENT-Type' : 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
    }
    return (
        <div>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;