import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">iNotebook</NavLink>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link custom-navlink ${isActive ? "active-link" : ""}`} 
                to="/"
                end
              >
                Home
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => `nav-link custom-navlink ${isActive ? "active-link" : ""}`} 
                to="/about"
              >
                About
              </NavLink>
            </li>

            {/* ✅ Show Account only if logged in */}
            {localStorage.getItem('token') && (
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => `nav-link custom-navlink ${isActive ? "active-link" : ""}`} 
                  to="/account"
                >
                  Account
                </NavLink>
              </li>
            )}
          </ul>

          {!localStorage.getItem('token') ? (
            <div className="d-flex">
              <NavLink className="btn btn-outline-light mx-1" to='/login'>Login</NavLink>
              <NavLink className="btn btn-primary mx-1" to='/signup'>Signup</NavLink>
            </div>
          ) : (
            <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
