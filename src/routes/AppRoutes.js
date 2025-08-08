import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import CreateBill from '../pages/CreateBill/CreateBill';
import AddProduct from '../pages/AddProduct/AddProduct';
import Login from '../pages/Login/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-bill" element={<CreateBill />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
};

export default AppRoutes;
