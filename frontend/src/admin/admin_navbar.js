import { React } from "react";
import '../css/nav.css';
import { useLocation,useNavigate } from 'react-router-dom';
function AdminNavbar() {
    const navigate=useNavigate()
    const query = new URLSearchParams(useLocation().search);
    const username = query.get('username');
    const email = query.get('email');
    return (
        <div className="navbar">
            <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1 }}>
                <div className="logo">
                    <h3><a href="vogue-vista.html" className="logo-name">VOGUE-VISTA</a></h3>
                </div>

                <ul className="nav-links">
                    <li><a href="" onClick={()=>{navigate(`/admin/dashboard?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>Home</a></li>
                    <li><a href="" onClick={()=>{navigate(`/admin/product?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>Products</a></li>
                </ul>
                <div className="burger">
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        </div>
    );
}
export default AdminNavbar;