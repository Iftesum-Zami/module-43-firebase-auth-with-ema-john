import React, { useEffect } from 'react';
import './review.css';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);

    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        // console.log('remove product', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => { // for cart
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);  // how coming the full object?
            product.quantity = savedCart[key];  // setting a property to object
            return product;
        });
        setCart(cartProducts);
    }, [])

    return (
        <div>
            <h1 style={{marginLeft: '200px'}}>Cart Items: {cart.length}</h1>
            <div className="shop-container">
                <div className="product-container">
                {
                    cart.map(pd => <ReviewItem product={pd} removeProduct = {removeProduct} key={pd.key}></ReviewItem>)
                }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart> <br/>
                    <button onClick={handleProceedCheckout} className="main-btn" >Proceed to checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Review;