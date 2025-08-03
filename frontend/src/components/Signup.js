import { Link } from 'react-router-dom';
import '../css/login.css';
import {useNavigate} from "react-router-dom";
import React,{useState,useEffect} from 'react'

const Signup = () => {

    const navigate = useNavigate();
    const [infoname, setinfoname] = useState('')
    const [infoemail, setinfoemail] = useState('')
    const [infopassword, setinfopassword] = useState('')
    const [infonumber, setinfonumber] = useState('')

    const info = {
        name: infoname,
        email: infoemail,
        password: infopassword,
        number: infonumber
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(info),
            });
            const data = await response.json();
            if (data.name === info.name) {
                navigate(`/home?username=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}`);
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
                <p className="auth-subtitle">Create a new account</p>

                <input type="text" placeholder="Full Name" onChange={(e)=>{setinfoname(e.target.value)}} required />
                <input type="text" placeholder="Phone Number" onChange={(e)=>{setinfonumber(e.target.value)}} required />
                <input type="email" placeholder="Email" onChange={(e)=>{setinfoemail(e.target.value)}} required />
                <input type="password" placeholder="Password" onChange={(e)=>{setinfopassword(e.target.value)}} required />
                <input type="password" placeholder="Confirm Password" onChange={(e)=>{setinfoname(e.target.value)}} required />

                <button onClick={handlesubmit}>Sign Up</button>

                <div className="auth-toggle">
                    Already have an account? <Link to="/">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
