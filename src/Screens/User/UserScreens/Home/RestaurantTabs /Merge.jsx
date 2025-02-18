import React, { useState } from "react";
import NavButtons from "./NavButtons";
import CategoryMenu from "./TakeAway/CategoryMenu/CategoryMenu";
import MenuItems from "./TakeAway/MenuItems/MenuItems";
import Cart from "./TakeAway/Cart/Cart";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaShoppingBasket } from "react-icons/fa";

function Merge() {
    const [showModal, setShowModal] = useState(false); // ✅ Modal state

    return (
        <>
            <div className="">


                <div className="main d-flex justify-content-center">
                    <div className="roww" style={{ paddingTop: "10px", paddingBottom: "15px" }}>
                        <NavButtons />
                        <div className="merge-flex d-flex justify-content-between">
                            <CategoryMenu />
                            <MenuItems />
                            <Cart show={showModal} handleClose={() => setShowModal(false)} /> {/* ✅ Passing state */}
                        </div>
                    </div>
                </div>

                {/* ✅ Floating Cart Button */}
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
            </div>
        </>
    );
}

export default Merge;
