import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/';

  return (
    <div>
      {!hideSidebar && <Sidebar />}
      <main className={hideSidebar ? '' : 'main-content'}>
        <AppRoutes />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
