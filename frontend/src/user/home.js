import React from "react";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../css/style_index.css'

import c1 from '../images/index-img/anton-levin-P8prss71psk-unsplash.jpg';
import c2 from '../images/index-img/bogdan-glisik-2WgOPYJuPsU-unsplash (1).jpg';
import c3 from '../images/index-img/calvin-lupiya--yPg8cusGD8-unsplash.jpg';

import s1 from '../images/index-img/shirt.jpg';
import s2 from '../images/index-img/Off-the-Wall.jpg';
import s3 from '../images/index-img/black.jpg';

import v1 from '../images/index-img/ethan-haddox-QHGcADeeT00-unsplash.jpg';
import v2 from '../images/index-img/andres-jasso-PqbL_mxmaUE-unsplash (1).jpg';
import v3 from '../images/index-img/shoe.png';
import v4 from '../images/index-img/nike.png';
import v5 from '../images/index-img/my-shoes2.png';
import v6 from '../images/index-img/my-shoes3.png';

import g1 from '../images/index-img/girl1.png';
import g2 from '../images/index-img/girl2.png';
import g3 from '../images/index-img/girl3.png';
import g4 from '../images/index-img/girl4.png';

import i1 from '../images/index-img/1.png';
import i2 from '../images/index-img/2.png';
import i3 from '../images/index-img/3.png';
import i4 from '../images/index-img/4.png';


import { useLocation,useNavigate } from 'react-router-dom';

function Home() {

    const navigate=useNavigate()
    const query = new URLSearchParams(useLocation().search);
    const username = query.get('username');
    const email = query.get('email');

    const sliderImages = [
        s1, s2, s3
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [sliderImages.length]);


    return (
        <>
            <Navbar />

            <div className="section">
                <div className="index-main-img wrapper">
                    {sliderImages.map((src, index) => (
                        <a href="" onClick={()=>{navigate(`/home?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}} key={index}>
                            <img
                                className={`image ${index === currentIndex ? 'show' : ''}`}
                                src={src}
                                alt={`Slide ${index + 1}`}
                                id="main-index-img"
                            />
                        </a>
                    ))}
                </div>
            </div>


            <div className="section">
                <div className="index-offers-img">
                    {[i1, i2, i3, i4].map((n) => (
                        <a href="" onClick={()=>{navigate(`/categories?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}} key={n}>
                            <img src={n} alt={`Offer ${n}`} />
                        </a>
                    ))}
                </div>
            </div>

            <div className="section">
                <div className="index-grid-img-1">
                    {[
                        c1,
                        c2,
                        c3,
                    ].map((img, i) => (
                        <a href="" onClick={()=>{navigate(`/categories?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}} key={i}>
                            <img src={`${img}`} alt={`Grid 1 - ${i}`} />
                        </a>
                    ))}

                    {[
                        'For the Young, Wild & Stylish',
                        'Just like your way to Conquer',
                        'Stands out like the Sun',
                    ].map((text, i) => (
                        <a href="" onClick={()=>{navigate(`/categories?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}} key={`txt-${i}`}>
                            <h4 className="info-of-img-below">{text}</h4>
                        </a>
                    ))}
                </div>
            </div>

            <div className="section section-header">
                <h2 className="head-of-offer">TRENDING NOW</h2>
                <p className="para-of-offer">From the runway to your wardrobe</p>
            </div>

            <div className="section">
                <div className="index-grid-img-2">
                    {[
                        v1,
                        v2,
                        v3,
                        v4,
                        v5,
                        v6
                    ].map((img, i) => (
                        <a href="" onClick={()=>{navigate(`/products?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}} key={i}>
                            <img src={img} alt={`Product ${i}`} />
                        </a>
                    ))}

                </div>
            </div>

            <div className="section section-header">
                <h2 className="head-of-offer">STYLES TO STEAL</h2>
                <p className="para-of-offer">Inspired by influencer</p>
            </div>

            <div className="section">
                <div className="index-grid-img-3">
                    {[g1,g2,g3,g4].map((img, i) => (
                        <a href="" onClick={()=>{navigate(`/products?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}} key={i}>
                            <img src={img} alt={`Style ${i}`} />
                        </a>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Home;