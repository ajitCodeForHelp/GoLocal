import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaPencilAlt, FaShoppingCart } from "react-icons/fa";

function Cart({ show, handleClose }) {
    const [quantity, setQuantity] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
    const [showModal, setShowModal] = useState(false);
    const price = 219;
    const totalPrice = price * quantity;

    const increment = () => setQuantity(quantity + 1);
    const decrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const category = [
        { text: "Sea Food", price: 219 },
        { text: "Burger", price: 219 },
        { text: "Pizza", price: 219 },
        { text: "Cold Drink", price: 219 },
        { text: "Fruit Punch", price: 219 },
    ];

    // Detect screen resize and hide modal when screen size changes
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 1000;
            setIsMobile(mobile);
            if (!mobile) setShowModal(false); // Force close modal if screen is large
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
     

    return (
        <>
            {/* ✅ Desktop Sidebar Cart (Visible Only When Screen >1000px) */}
            {!isMobile && (
                <div className="cat-tab" style={{ width: "27%" }}>
                    <ul className="p-0 mb-0">
                        <li className="li d-flex align-items-center justify-content-between p-3"
                            style={{ position: "sticky", top: 0, zIndex: 10, borderBottom: "1px solid #ddd" }}>
                            <h4 className="p-0 m-0 fs-3 ml-2">Cart</h4> <FaShoppingCart />
                        </li>
                        <div className="container mt-2 p-3" style={{ maxWidth: "400px", background: "#fff" }}>
                            {category.map((itm, index) => (
                                <div key={index}>
                                    <h5 className="fw-bold">{itm.text}</h5>
                                    <div className="d-flex justify-content-between align-items-center w-100"
                                        style={{ marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>
                                        <div>
                                            <span style={{ color: "#FFA500", fontWeight: "bold", marginRight: "5px" }}>₹ {price} </span>
                                            <span className="fw-bold"> ₹ {itm.price} </span>
                                        </div>

                                        {/* Edit & Quantity Controls */}
                                        <div className="d-flex align-items-center">
                                            <Button variant="outline-warning" className="p-1 border-0" style={{ marginRight: "10px" }}>
                                                <FaPencilAlt />
                                            </Button>

                                            <div className="bg-warning d-flex align-items-center p-1 rounded-pill">
                                                <Button variant="warning" className="border-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: "35px", height: "30px" }} onClick={decrement}>
                                                    −
                                                </Button>
                                                <span className="fw-bold text-center" style={{ minWidth: "30px", maxWidth: "30px", display: "inline-block", textAlign: "center" }}>
                                                    {quantity}
                                                </span>
                                                <Button variant="warning" className="border-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: "35px", height: "35px" }} onClick={increment}>
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="warning" className="w-100 mt-3 fw-bold p-2">Checkout (₹{totalPrice})</Button>
                        </div>
                    </ul>
                </div>
            )}

            {/* ✅ Mobile View (≤1000px) → Floating Cart Button */}
            {isMobile && (
                <>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        centered
                        style={{
                            maxHeight: "600px",
                            marginTop: "5vh", // To give a little spacing from the top
                            marginBottom: "5vh" // To give some space at the bottom as well
                        }} // ✅ Modal height
                    >
                        <Modal.Header closeButton className="bg-black text-white">
                            <Modal.Title>Your Cart</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}> {/* ✅ Scrollable body */}
                            {category.map((itm, index) => (
                                <div key={index} className="mb-3">
                                    <h5 className="fw-bold">{itm.text}</h5>
                                    <div className="d-flex justify-content-between align-items-center w-100"
                                        style={{ marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>
                                        <div>
                                            <span style={{ color: "#FFA500", fontWeight: "bold", marginRight: "5px" }}>₹ {price} </span>
                                            <span className="fw-bold"> ₹ {itm.price} </span>
                                        </div>

                                        {/* Edit & Quantity Controls */}
                                        <div className="d-flex align-items-center">
                                            <Button variant="outline-warning" className="p-1 border-0" style={{ marginRight: "10px" }}>
                                                <FaPencilAlt />
                                            </Button>

                                            <div className="bg-warning d-flex align-items-center p-1 rounded-pill">
                                                <Button variant="warning" className="border-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: "35px", height: "30px", backgroundColor: "transparent", color: "black", border: "none" }} onClick={decrement}>
                                                    −
                                                </Button>
                                                <span className="fw-bold text-center" style={{ minWidth: "30px", maxWidth: "30px", display: "inline-block", textAlign: "center" }}>
                                                    {quantity}
                                                </span>
                                                <Button variant="warning" className="border-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: "35px", height: "35px", backgroundColor: "transparent", color: "black", border: "none" }} onClick={increment}>
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="warning" className="w-100 fw-bold p-2" onClick={handleClose}>
                                Checkout (₹{totalPrice})
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}


        </>
    );
}

export default Cart;


