import React from 'react';

const ReviewItem = (props) => {

    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    };

    return (
        <div style={reviewItemStyle}>
            <h3>{name}</h3>
            <p>Quantity: {quantity}</p>
            <p><small>{price}$</small></p>
            <br/>
            <button className='btn-regular' onClick={() => props.removeProduct(key) }>Remove</button>
        </div>
    );
};

export default ReviewItem;