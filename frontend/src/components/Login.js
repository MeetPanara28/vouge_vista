import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
    const navigate = useNavigate()
    const [infoemail, setinfoemail] = useState('')
    const [infopassword, setinfopassword] = useState('')

    const info = {
        email: infoemail,
        password: infopassword
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(info),
            });
            const data = await response.json();
            const data1 = JSON.parse(data);
            const u1 = data1[0];
            if (u1.fields.email === info.email) {
                navigate(`/home?username=${encodeURIComponent(u1.fields.name)}&email=${encodeURIComponent(u1.fields.email)}`);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

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


    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1 className="auth-title">VOGUE-VISTA</h1>
                <p className="auth-subtitle">Login to your account</p>

                <input type="email" placeholder="Email" onChange={(e)=>{setinfoemail(e.target.value)}} required />
                <input type="password" placeholder="Password" onChange={(e)=>{setinfopassword(e.target.value)}} required />

                <button onClick={handlesubmit} >Login</button>

                <div className="auth-toggle">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
