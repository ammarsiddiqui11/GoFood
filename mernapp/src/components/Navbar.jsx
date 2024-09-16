import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge'; // Updated import for Badge
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Updated import for ShoppingCartIcon
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer'; // Ensure this is correctly set up

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const items = useCart(); // Custom hook to get cart items

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky" style={{ boxShadow: '0px 10px 20px black', filter: 'blur(20)', position: 'fixed', zIndex: '10', width: '100%' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5 text-white" aria-current="page" to="/">Home</Link>
            </li>
            {localStorage.getItem('authToken') && (
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem('authToken') ? (
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
            </div>
          ) : (
            <div>
              <div className="btn bg-white text-success mx-2" onClick={loadCart}>
                <Badge color="secondary" badgeContent={items.length}>
                  <ShoppingCartIcon />
                </Badge>
                Cart
              </div>
              {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
              <button onClick={handleLogout} className="btn bg-white text-danger mx-2">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
