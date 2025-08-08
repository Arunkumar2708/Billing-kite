import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { Menu } from 'lucide-react';

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    // Close sidebar after clicking on a menu item (on mobile only)
    if (window.innerWidth <= 767.98) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="sidebar-toggle d-md-none p-2 bg-white shadow-sm sticky-top">
        <button className="btn btn-outline-primary" onClick={handleToggle}>
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar shadow-sm bg-light p-3 ${isOpen ? 'open' : ''}`}>
        <h5 className="text-primary mb-4">BillingPro</h5>
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
      </div>
    </>
  );
};

export default Sidebar;
