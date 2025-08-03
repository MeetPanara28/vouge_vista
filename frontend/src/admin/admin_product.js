import React, { useEffect, useState } from 'react';
import AdminNavbar from './admin_navbar';
import Footer from '../components/Footer';
import '../css/style_index.css';
import '../css/addProduct.css'; // New CSS file

function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    categorie: '',
    image: null,
  });

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const getCsrfToken = async () => {
      const response = await fetch('http://localhost:8000/api/get-csrf-token/', {
        method: 'GET',
        mode: 'cors',
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };
    getCsrfToken();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    fetch('http://localhost:8000/api/up_product/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Upload failed');
        return res.json();
      })
      .then((data) => {
        alert('✅ Product added successfully!');
        console.log(data);
      })
      .catch((err) => {
        alert('❌ Error: ' + err.message);
        console.error(err);
      });
  };

  return (
    <>
      <AdminNavbar />
      <div className="add-product-container">
        <h2 className="add-product-heading">Add New Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <input
            name="name"
            placeholder="Product Name"
            required
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="price"
            placeholder="Price"
            required
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="categorie"
            placeholder="Category"
            required
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={handleChange}
            className="form-input file-input"
          />
          <button type="submit" className="submit-btn">➕ Add Product</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AddProduct;
