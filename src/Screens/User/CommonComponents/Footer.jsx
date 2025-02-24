import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1000) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isVisible) return null; // Hide footer when condition is met

    return (
        <footer className="footer pt-5 pb-4 d-flex justify-content-center">
            <div className="roww">
                <Row>
                    <Col md={3}>
                        <h2>GoLocal</h2>
                    </Col>
                    <Col md={2}>
                        <ul className="list-unstyled">
                            <li className="pb-2"><a href="/" className="">Get Franchisee</a></li>
                            <li className="pb-2"><a href="/" className="">CEO Speaks</a></li>
                            <li className="pb-2"><a href="/" className="">Chat With Us</a></li>
                            <li className="pb-2"><a href="/" className="">Contact Us</a></li>
                        </ul>
                    </Col>
                    <Col md={2}>
                        <ul className="list-unstyled">
                            <li className="pb-2"><a href="/" className="">Apply For Job</a></li>
                            <li className="pb-2"><a href="/" className="">Privacy Policy</a></li>
                            <li className="pb-2"><a href="/" className="">Terms & Conditions</a></li>
                            <li className="pb-2"><a href="/" className="">Book a Table</a></li>
                        </ul>
                    </Col>
                    <Col md={3} className="text-center">
                        <h5>Download Our App</h5>
                        <div className="d-flex justify-content-center">
                            <h3 className="pe-3 fs-4">App Store</h3>
                            <h3 className="fs-4">Play Store</h3>
                        </div>
                    </Col>
                    <Col md={2} className="text-center">
                        <h6>Follow Us On</h6>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="/" className="text-warning fs-4"><FaFacebookF /></a>
                            <a href="/" className="text-warning fs-4"><FaInstagram /></a>
                            <a href="/" className="text-warning fs-4"><FaLinkedinIn /></a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3 text-center" style={{ borderTop: "2px solid white" }}>
                    <Col className="pt-3">
                        <p className="mb-1" style={{ fontSize: "15px" }}>&copy; 2023 Company All rights reserved</p>
                        <p style={{ fontSize: "15px" }}>Version 0.0.78</p>
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;

