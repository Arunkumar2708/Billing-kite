import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { Menu } from 'lucide-react';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // <-- Add this
  const sidebarRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    if (window.innerWidth <= 767.98) {
      setIsOpen(false);
    }
  };

  // Logout logic
  const handleLogout = () => {
    setShowConfirm(true);
  };

  const handleConfirmYes = () => {
    setShowConfirm(false);
    setIsOpen(false);
    navigate('/');
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
  };

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth <= 767.98
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="sidebar-toggle d-md-none p-2 bg-white shadow-sm sticky-top">
        <button className="btn btn-outline-primary" onClick={handleToggle}>
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar shadow-sm bg-dark p-3 d-flex flex-column ${isOpen ? 'open' : ''}`}
        style={{ minHeight: '100vh' }}
      >
        <button
          type="button"
          className="btn-close btn-close-white d-md-none ms-auto mb-3"
          aria-label="Close"
          onClick={() => setIsOpen(false)}
          style={{ float: 'right' }}
        ></button>
        <h3 className="text-white mb-4 text-center">Billing</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link
              to="/dashboard"
              className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/create-bill"
              className={`nav-link ${pathname === '/create-bill' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Create Bill
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/add-product"
              className={`nav-link ${pathname === '/add-product' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Product List
            </Link>
          </li>
        </ul>
        {/* Logout button at the bottom */}
        <div className="mt-auto pt-3">
          <button className="btn btn-outline-light w-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
        {/* Confirmation Dialog */}
        {showConfirm && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{background: 'rgba(0,0,0,0.4)', zIndex: 2000}}>
            <div className="bg-white p-4 rounded shadow text-center" style={{minWidth: 250}}>
              <p className="mb-3">Are you sure you want to logout?</p>
              <button className="btn btn-danger me-2" onClick={handleConfirmYes}>Yes</button>
              <button className="btn btn-secondary" onClick={handleConfirmNo}>No</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;