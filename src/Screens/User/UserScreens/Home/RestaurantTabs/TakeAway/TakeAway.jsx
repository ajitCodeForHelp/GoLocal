import React, { useState } from "react";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
import MenuItems from "./MenuItems/MenuItems";
import Cart from "./Cart/Cart";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaShoppingBasket } from "react-icons/fa";

function TakeAway() {
     const [showModal, setShowModal] = useState(false); // ✅ Modal state
    return (
        <>
            <CategoryMenu />
            <MenuItems />
            <Cart show={showModal} handleClose={() => setShowModal(false)} /> {/* ✅ Passing state */}


            <div className="res-cart">
                    <Container fluid className="cart-container p-3">
                        <Row className="align-items-center justify-content-between">
                            {/* Left Side: Total Items & Price */}
                            <Col xs={6} md={6} className="cart-text">
                                <span className="cart-items">2 Total</span> | <span className="cart-price">₹ 438</span>
                            </Col>

                            {/* Right Side: View Cart Button */}
                            <Col xs={6} md={6} className="text-end">
                                <Button
                                    variant="outline-warning"
                                    className="cart-btn"
                                    onClick={() => setShowModal(true)} // ✅ Open modal on click
                                >
                                    View Cart <FaShoppingBasket className="ms-1" />
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
        </>
    )
}
export default TakeAway