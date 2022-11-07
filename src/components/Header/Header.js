import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img className="logo" src={logo} alt="" />
            <nav>
                <Link to="/">Shop</Link>
                <Link to="/orders">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {loggedInUser.email && <Link to="/profile" style={{backgroundColor: '#878762'}}>Welcome, {loggedInUser.displayName}</Link>}
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;