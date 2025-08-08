import React from 'react';
import './Dashboard.css';
import { useState } from 'react';
const dummyBills = [
  { id: 'INV001', customer: 'Arun', amount: 1200 },
  { id: 'INV002', customer: 'Kumar', amount: 550 },
  { id: 'INV003', customer: 'Mike Johnson', amount: 3000 },
  { id: 'INV004', customer: 'Sara Lee', amount: 700 },
  { id: 'INV005', customer: 'David Brown', amount: 1500 },
   { id: 'INV006', customer: 'John Doe', amount: 1200 },
];

const Dashboard = () => {
  const totalProfit = dummyBills.reduce((sum, b) => sum + b.amount, 0);

   const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredBills = dummyBills.filter((bill) => {
    const matchesSearch = bill.customer.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'below1000' && bill.amount < 1000) ||
      (filter === '1000to2000' && bill.amount >= 1000 && bill.amount <= 2000) ||
      (filter === 'above2000' && bill.amount > 2000);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dashboard-container p-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">Total Profit</h5>
              <p className="fs-4 text-success">₹ {totalProfit}</p>
            </div>
          </div>
        </div>
      </div>

      <h5 className="mb-3">Recent Bills</h5>
       <div className="card  rounded-4 p-4">
      <div className="d-flex flex-column flex-md-row justify-content-end align-items-md-center mb-4 gap-3">
        <div className="d-flex gap-2 flex-wrap flex-lg-nowrap">
          <input
            type="text"
            className="form-control"
            placeholder="Search by customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ border: '1px solid #000' }}
          >
            <option value="all">All Amounts</option>
            <option value="below1000">Below ₹1000</option>
            <option value="1000to2000">₹1000 - ₹2000</option>
            <option value="above2000">Above ₹2000</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>S.No</th>
              <th>Invoice No.</th>
              <th>Customer</th>
              <th>Bill Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.length > 0 ? (
              filteredBills.map((bill, index) => (
                <tr key={bill.id}>
                  <td>{index + 1}</td>
                  <td>{bill.id}</td>
                  <td>{bill.customer}</td>
                  <td>₹ {bill.amount.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-muted">
                  No bills found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
