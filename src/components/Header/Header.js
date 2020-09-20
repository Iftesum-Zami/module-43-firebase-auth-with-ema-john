import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png'
import './header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order review</Link>
                <Link to="/inventory">Manage Inventor</Link>
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;