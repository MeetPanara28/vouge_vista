import React, { useEffect, useState } from "react";
import "../css/products.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ProductPage = () => {
    const [categoryImages, setCategoryImages] = useState({});
    const [alertVisible, setAlertVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const [showBuyForm, setShowBuyForm] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [buyerData, setBuyerData] = useState({ name: "", email: "", address: "" });

    const handleBuyNow = (products) => {
        setSelectedProducts(products); // array of items from cart
        setShowBuyForm(true);
    };

    const handleBuySubmit = async (e) => {
        e.preventDefault();

        for (const product of selectedProducts) {
            const formData = new FormData();
            formData.append("name", buyerData.name);
            formData.append("email", buyerData.email);
            formData.append("address", buyerData.address);
            formData.append("product_name", product.name);
            formData.append("price", product.price);

            try {
                const response = await fetch("http://localhost:8000/api/buy_product/", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    alert(`Failed to purchase: ${product.name}`);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        alert("Purchase successful!");
        setShowBuyForm(false);
        setBuyerData({ name: "", email: "", address: "" });
        setCartItems([]);
    };

    const categories = [
        "WOMEN_KURTIS",
        "WOMEN_WESTERN",
        "WOMEN_SHOES",
        "WOMEN_HEELS",
        "MEN_SHIRTS",
        "MEN_JEANS",
        "MEN_JOGGERS",
        "MEN_SHOES",
    ];

    useEffect(() => {
        const fetchImages = (category) => {
            const formData = new FormData();
            formData.append("categorie", category);

            fetch("http://localhost:8000/api/get_product/", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) =>
                    setCategoryImages((prev) => ({
                        ...prev,
                        [category]: data,
                    }))
                )
                .catch((error) =>
                    console.error(`Error fetching ${category} images:`, error)
                );
        };

        categories.forEach(fetchImages);
    }, []);

    const addToCart = (product) => {
        setCartItems((prev) => [...prev, product]);
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 2000);
    };

    const renderSection = (title, categoryKey) => (
        <section className="category-section" key={categoryKey}>
            <h2 className="section-title">{title}</h2>
            <div className="product-grid">
                {(categoryImages[categoryKey] || []).map((product) => (
                    <div className="product-card" key={product.id}>
                        <img
                            src={`http://localhost:8000${product.image}`}
                            alt={product.name}
                            className="product-img"
                        />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">₹{product.price}</p>
                        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                            🛒 Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );

    return (
        <div>
            <Navbar />

            {/* Hero Text */}
            <h2 className="main-head-of-products">
                Everyone Has A Style Statement<br />
                <span className="colored-word-bigger-size">FIND YOURS HERE!</span>
            </h2>
            <center>
                <p className="msg-ps">
                    <span className="colored-word">Click</span> on Add to Cart to keep your favorites.<br />
                    Go below and check <span className="colored-word">YOUR CART</span> for details.
                </p>
            </center>

            {/* Product Sections */}
            {renderSection("Women Kurtis", "WOMEN_KURTIS")}
            {renderSection("Women Western", "WOMEN_WESTERN")}
            {renderSection("Women Shoes", "WOMEN_SHOES")}
            {renderSection("Women Heels", "WOMEN_HEELS")}
            {renderSection("Men Shirts", "MEN_SHIRTS")}
            {renderSection("Men Jeans", "MEN_JEANS")}
            {renderSection("Men Joggers", "MEN_JOGGERS")}
            {renderSection("Men Shoes", "MEN_SHOES")}

            {/* Cart Display */}
            <div className="cart-details">
                <h2 className="head-of-cart">🛒 Your Cart</h2>
                <hr className="hr-of-cart-head" />

                {cartItems.length === 0 ? (
                    <p className="empty-cart">Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="cart-item-list">
                            {cartItems.map((item, idx) => (
                                <li key={idx} className="cart-item">
                                    <div className="item-info">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-price">₹{item.price}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-actions">
                            <button className="buy-now-btn" onClick={() => handleBuyNow(cartItems)}>
                                🛍 Buy Now
                            </button>
                            <button className="btn-clear-list" onClick={() => setCartItems([])}>
                                🗑 <span className="colored-word">Clear My List</span>
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Alert Box */}
            {alertVisible && (
                <div className="alert-box">
                    <p>Your item added successfully to the cart.</p>
                    <button onClick={() => setAlertVisible(false)}>OK</button>
                </div>
            )}

            {/* Buy Now Popup Form */}
            {showBuyForm && selectedProducts.length > 0 && (
                <div className="popup-form-container">
                    <div className="popup-form">
                        <h3 className="popup-title">🛒 Buy Now</h3>
                        <form onSubmit={handleBuySubmit}>
                            {selectedProducts.map((product, index) => (
                                <div key={index}>
                                    <p><strong>Product:</strong> {product.name}</p>
                                    <p><strong>Price:</strong> ₹{product.price}</p>
                                    <hr />
                                </div>
                            ))}

                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                value={buyerData.name}
                                onChange={(e) => setBuyerData({ ...buyerData, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={buyerData.email}
                                onChange={(e) => setBuyerData({ ...buyerData, email: e.target.value })}
                            />
                            <textarea
                                placeholder="Address"
                                required
                                value={buyerData.address}
                                onChange={(e) => setBuyerData({ ...buyerData, address: e.target.value })}
                            ></textarea>

                            <div className="popup-actions">
                                <button type="submit" className="btn-submit">✅ Submit</button>
                                <button type="button" className="btn-cancel" onClick={() => setShowBuyForm(false)}>❌ Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ProductPage;