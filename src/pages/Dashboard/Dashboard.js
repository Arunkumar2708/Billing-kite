import React from 'react';
import './Dashboard.css';

const dummyBills = [
  { id: 1, customer: 'John Doe', amount: 250 },
  { id: 2, customer: 'Jane Smith', amount: 430 },
  { id: 3, customer: 'Alice', amount: 190 },
  { id: 4, customer: 'Bob', amount: 360 },
  { id: 5, customer: 'Eve', amount: 220 },
  { id: 6, customer: 'Tom', amount: 310 },
  { id: 7, customer: 'Sara', amount: 150 },
  { id: 8, customer: 'Mike', amount: 490 },
  { id: 9, customer: 'Ana', amount: 210 },
  { id: 10, customer: 'Leo', amount: 350 }
];

const Dashboard = () => {
  const totalProfit = dummyBills.reduce((sum, b) => sum + b.amount, 0);

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
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {dummyBills.map((bill, index) => (
              <tr key={bill.id}>
                <td>{index + 1}</td>
                <td>{bill.customer}</td>
                <td>₹ {bill.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
