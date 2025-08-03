import React from "react";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Contactus() {
    return (
        <>
            <div>
                {/* Head Metadata (put this in index.html or use react-helmet if needed) */}

                <Navbar />

                {/* Contact Info */}
                <div style={{ textAlign: 'center' }}>
                    <div className="contact-info" style={{ paddingTop: '170px' }}>
                        <p className="slogan" style={{ fontFamily: "'Beth Ellen', cursive", color: 'black', fontSize: '36px' }}>
                            VOGUE-VISTA
                        </p>
                        <p className="author" style={{ fontFamily: "'Nova Cut', cursive", color: 'black' }}>
                            Meet Panara
                        </p>
                        <p className="author" style={{ fontFamily: "'Nova Cut', cursive", color: 'black' }}>
                            panarameet116@gmail.com
                        </p>
                    </div>
                </div>

                <br /><br /><br />

                <Footer />
            </div>
        </>
    );
}
export default Contactus;   