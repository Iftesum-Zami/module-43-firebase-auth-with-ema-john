//-----------------------------making an individual product--------------------------------------

import React from 'react';
import './product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    console.log(props);
    const {img, name, seller, price, stock, key} = props.product;   // for not repeating props.product every time

    return (
        <div className="product">
            <div>
                <img src={img} alt="" srcset=""/>
            </div>
            <div className="product-description">
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <p><small>By: {seller}</small></p>
                <p>Price: ${price}</p>
                <p><small>Only {stock} left in stock</small></p>

                {props.showAddToCart && <button className="main-btn" onClick={() => props.clickAddProduct(props.product)}>
                    Add to Cart
                </button>}  {/* shortcut of if condition */}
            </div>
        </div> 
    );
};

export default Product;

// npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome