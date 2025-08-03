import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './user/home';
import Contactus from './user/contactus'; 
import Categories from './user/categories';
import ProductPage from './user/product';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminSignup from './admin/admin_signup'
import AdminLogin from './admin/admin_login'
import AdminDashboard from './admin/dashboard';
import AdminProduct from './admin/admin_product';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path='/admin/product' element={<AdminProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
