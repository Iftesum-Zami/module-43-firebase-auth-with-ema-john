import React from 'react';
import './cart.css'
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const finalCart = props.cart;
    // console.log(finalCart);

    // const total = finalCart.reduce((total, prd) => total + prd.price, 0); // here we get the #PRICE
    
    let total = 0;
    for (let i = 0; i < finalCart.length; i++) {
        const product = finalCart[i];
        total = total + product.price * product.quantity ; // (?)didn't understand properly
    }
    
    return (
        <div>
            <h2>your cart</h2>
            <p>items ordered {finalCart.length}</p>
            <p>Price: {total}</p>
            <Link to="/review">
                <button className="main-btn">Review Order</button>
            </Link>
        </div>
    );
};

export default Cart;