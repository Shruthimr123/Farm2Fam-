import React, { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { signOut } from '../auth/AuthSlice';
import '../../styles/Header.css';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const cart = useSelector((state: RootState) => state.cart.items);
  const cartCount = cart.length > 0 ? cart.length : '';

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    dispatch(signOut());
    navigate('/login');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleNavigate = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo-search">
        <h2 className="logo">Farm2Fam</h2>
        <input
          type="text"
          placeholder="Search Your Fruits and Vegetables"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="/products" onClick={handleNavigate}>
              Home
            </Link>
          </li>

          <li>
            <select
              className="products"
              onChange={(e) => {
                const selected = e.target.value;
                if (selected === 'Vegetables') navigate('/vegetables');
                else if (selected === 'Fruits') navigate('/fruits');
                setMenuOpen(false);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Products
              </option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </li>

          {!isAuthenticated ? (
            <li>
              <select
                className="products"
                onChange={(e) => {
                  const selected = e.target.value;
                  if (selected === 'User') navigate('/login');
                  else if (selected === 'Farmer') navigate('/farmerlogin');
                  setMenuOpen(false);
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Login
                </option>
                <option value="User">User</option>
                <option value="Farmer">Farmer</option>
              </select>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}

          <li>
            <Link to="/orders" onClick={handleNavigate}>
              Orders
            </Link>
          </li>

          <li>
            <Link to="/farmer" onClick={handleNavigate}>
              FarmerSite
            </Link>
          </li>

          <li>
            <Link to="/cart" onClick={handleNavigate}>
              <div className="cart-logo">
                <span className="cart-count">{cartCount}</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
