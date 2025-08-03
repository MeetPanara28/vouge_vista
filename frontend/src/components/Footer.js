import React from "react";
import '../css/style_index.css'
function Footer() {
    return (
        <>
            <div className="footer-container">
                <div className="footer-1">
                    <a href="/index">
                        <h2>VOGUE-VISTA</h2>
                    </a>
                    <br />
                    <p><b>ONLINE SHOPPING</b></p>
                    <h6>
                        Men<br /><br />
                        Women <br /><br />
                        Kids <br /><br />
                        VOGUE-VISTA Exclusive<br /><br />
                    </h6>
                </div>

                <div className="footer-2">
                    <p><b>USEFUL LINKS</b></p>
                    <h6>
                        Contact Us<br /><br />
                        FAQ<br /><br />
                        T&C<br /><br />
                        Blog<br /><br />
                        Privacy Policy<br /><br />
                    </h6>
                </div>

                <div className="footer-3">
                    <p><b>100% Original</b> guarantee</p>
                    <h6>for all products at VOGUE-VISTA.com</h6>

                    <p><b>Return within 30days</b> of</p>
                    <h6>receiving your order</h6>

                    <p><b>Get free delivery</b> for every</p>
                    <h6>order above Rs.999</h6>
                    <br /><br />
                </div>
            </div>

            <p className="copy-right">
                <a href="/home">VOGUE-VISTA</a> &copy;2025
            </p>
            <br />
        </>
    );
}
export default Footer;