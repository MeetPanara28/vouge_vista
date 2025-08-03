import React from "react";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../css/categories.css'

import { useLocation, useNavigate } from 'react-router-dom';

import cat1 from '../images/categories-img/nordwood-themes-Nv4QHkTVEaI-unsplash (1).jpg';
import cat2 from '../images/categories-img/category1.png';
import cat3 from '../images/categories-img/category2.png';
import cat4 from '../images/categories-img/category3.png';
import cat5 from '../images/categories-img/category4.png';
import cat6 from '../images/categories-img/category5.png';
import cat7 from '../images/categories-img/category6.png';

import for1 from '../images/categories-img/for-her1.png';
import for2 from '../images/categories-img/for-her2.png';

import him1 from '../images/categories-img/brands-for-him1.png';
import him2 from '../images/categories-img/brands-for-him2.png';
import him3 from '../images/categories-img/brands-for-him3.png';
import him4 from '../images/categories-img/brands-for-him4.png';
import him5 from '../images/categories-img/brands-for-him5.png';

function Categories() {

    const navigate = useNavigate()
    const query = new URLSearchParams(useLocation().search);
    const username = query.get('username');
    const email = query.get('email');

    return (
        <>
            <Navbar />
            <div className="categories-section">
                <h1 className="main-head-of-color-gold">Unskippable Categories</h1>
                <div className="centered-line" >
                    <hr />
                </div>

                <div className="product-img">
                    <img
                        className="product-center-img"
                        src={cat1}
                        alt="Main Category Banner"
                    />
                </div>

                <div className="section-block">
                    <h2 className="trends-header">TRENDING NOW</h2>
                    <div className="trends-categories">
                        {[cat2,cat3,cat4,cat5,cat6,cat7].map((cat, idx) => (
                            <a key={idx} href="" onClick={()=>{navigate(`/products?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>
                                <img src={cat} alt={`Trending ${idx + 1}`} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="section-block">
                    <h2 className="trends-header">+For Her</h2>
                    <div className="for-her">
                        {[for1,for2].map((img, idx) => (
                            <a key={idx} href="" onClick={()=>{navigate(`/products?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>
                                <img src={img} alt={`For Her ${idx + 1}`} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="section-block">
                    <h2 className="trends-header">+For Him</h2>
                    <div className="for-him">
                        {[him1,him2,him3,him4,him5].map(
                            (img, idx) => (
                                <a key={idx} href="" onClick={()=>{navigate(`/products?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>
                                    <img src={img} alt={`For Him ${idx + 1}`} />
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Categories;