import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaPencilAlt, FaShoppingCart } from "react-icons/fa";
import emptyCartImage from "../../../../../../../Assets/Images/empty-cart.png";

function Cart({ show, handleClose }) {
    const [cartItems, setCartItems] = useState([
        { id: 1, text: "Sea Food", price: 219, quantity: 1 },
        { id: 2, text: "Burger", price: 219, quantity: 1 },
        { id: 3, text: "Pizza", price: 219, quantity: 1 },
        { id: 4, text: "Cold Drink", price: 219, quantity: 1 },
        { id: 5, text: "Fruit Punch", price: 219, quantity: 1 },
    ]);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 1000;
            setIsMobile(mobile);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Increase quantity
    const increment = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    // Decrease quantity OR Remove item
    const decrement = (id) => {
        setCartItems(cartItems
            .map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter(item => item.quantity > 0) // Remove item if quantity is 0
        );
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);


    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newName, setNewName] = useState("");

    // Open modal and set selected item
    const handleShowModal = (item) => {
        setSelectedItem(item);
        setNewName(item.name);
        setShowModal(true);
    };

    // Save updated name
    const handleSave = () => {
        setCartItems(cartItems.map(item =>
            item.id === selectedItem.id ? { ...item, name: newName } : item
        ));
        setShowModal(false);
    };
    return (
        <>
            {!isMobile && (
                <div className="cat-tab" style={{ width: "27%" }}>
                    <ul className="p-0 mb-0">
                        <li className="li d-flex align-items-center justify-content-between p-3"
                            style={{ position: "sticky", top: 0, zIndex: 10, borderBottom: "1px solid #ddd" }}>
                            <h4 className="p-0 m-0 fs-3 ml-2">Cart</h4> <FaShoppingCart />
                        </li>
                        <div className="container mt-2 p-3" style={{ maxWidth: "400px", background: "#fff" }}>
                            {cartItems.length === 0 ? (
                                <div className="text-center">
                                    <img src={emptyCartImage} alt="Empty Cart" style={{ width: "100%", maxWidth: "250px" }} />
                                </div>
                            ) : (
                                <>
                                    {cartItems.map((item) => (
                                        <div key={item.id}>
                                            <h5 className="fw-bold">{item.text}</h5>
                                            <div className="d-flex justify-content-between align-items-center w-100"
                                                style={{ marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>
                                                <div>
                                                    <span style={{ color: "#FFA500", fontWeight: "bold", marginRight: "5px" }}>₹ {item.price} </span>
                                                </div>

                                                {/* Edit & Quantity Controls */}
                                                <div className="d-flex align-items-center">
                                                    <Button variant="outline-warning" className="p-1 border-0" style={{ marginRight: "10px" }} onClick={() => handleShowModal(item)}>
                                                        <FaPencilAlt />
                                                    </Button>

                                                    <div className="bg-warning d-flex align-items-center p-1 rounded-pill">
                                                        <Button variant="warning" className="border-0 d-flex align-items-center justify-content-center"
                                                            style={{ width: "35px", height: "30px" }} onClick={() => decrement(item.id)}>
                                                            −
                                                        </Button>
                                                        <span className="fw-bold text-center" style={{ minWidth: "30px", maxWidth: "30px", display: "inline-block", textAlign: "center" }}>
                                                            {item.quantity}
                                                        </span>
                                                        <Button variant="warning" className="border-0 d-flex align-items-center justify-content-center"
                                                            style={{ width: "35px", height: "35px" }} onClick={() => increment(item.id)}>
                                                            +
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button variant="warning" className="w-100 mt-3 fw-bold p-2">Checkout (₹{totalPrice})</Button>
                                </>
                            )}

                        </div>
                    </ul>
                </div>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="bg-black text-white">
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="warning" className="fw-bold text-dark" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* ✅ Mobile View (≤1000px) → Floating Cart Button */}
            {isMobile && (
                <>
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton className="bg-black text-white">
                            <Modal.Title>Your Cart</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                            {cartItems.length === 0 ? (
                                <div className="text-center">
                                    <img src={emptyCartImage} alt="Empty Cart" style={{ width: "100%", maxWidth: "250px" }} />
                                </div>
                            ) : (
                                <>
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="mb-3">
                                            <h5 className="fw-bold">{item.text}</h5>
                                            <div className="d-flex justify-content-between align-items-center w-100"
                                                style={{ marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>
                                                <div>
                                                    <span style={{ color: "#FFA500", fontWeight: "bold", marginRight: "5px" }}>₹ {item.price} </span>
                                                </div>

                                                {/* Edit & Quantity Controls */}
                                                <div className="d-flex align-items-center">
                                                    <Button variant="outline-warning" className="p-1 border-0" style={{ marginRight: "10px" }} onClick={() => handleShowModal(item)}>
                                                        <FaPencilAlt />
                                                    </Button>

                                                    <div className="bg-warning d-flex align-items-center p-1 rounded-pill">
                                                        <Button variant="warning" className="border-0 d-flex align-items-center justify-content-center"
                                                            style={{ width: "35px", height: "30px", backgroundColor: "transparent", color: "black", border: "none" }}
                                                            onClick={() => decrement(item.id)}>
                                                            −
                                                        </Button>
                                                        <span className="fw-bold text-center" style={{ minWidth: "30px", maxWidth: "30px", display: "inline-block", textAlign: "center" }}>
                                                            {item.quantity}
                                                        </span>
                                                        <Button variant="warning" className="border-0 d-flex align-items-center justify-content-center"
                                                            style={{ width: "35px", height: "35px", backgroundColor: "transparent", color: "black", border: "none" }}
                                                            onClick={() => increment(item.id)}>
                                                            +
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Modal.Footer>
                                        <Button variant="warning" className="w-100 fw-bold p-2" onClick={handleClose}>
                                            Checkout (₹{totalPrice})
                                        </Button>
                                    </Modal.Footer>
                                </>
                            )}
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    );
}

export default Cart;



