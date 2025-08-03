import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminNavbar from './admin_navbar';
import Footer from '../components/Footer';
import ProductTable from './ProductTable';
import BuyerTable from './BuyerTable';
import '../css/style_index.css';
import '../css/adminDashboard.css'; // (New CSS file for admin styling)

function AdminDashboard() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const username = query.get('username');
  const email = query.get('email');

  return (
    <>
      <AdminNavbar />
      <div className="admin-dashboard">
        <h2 className="admin-heading">Admin Dashboard</h2>

        <button
          className="add-product-btn"
          onClick={() =>
            navigate(`/admin/product?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)
          }
        >
          ➕ Add Product
        </button>

        <section className="dashboard-section">
          <h3 className="section-heading">All Products</h3>
          <ProductTable />
        </section>

        <section className="dashboard-section">
          <h3 className="section-heading">All Buyers</h3>
          <BuyerTable />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
