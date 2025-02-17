import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
// import logo from "../../../Assets/Images/logo.png"; // Adjust the path
// import appStore from "../../../Assets/Images/app-store.png";
// import playStore from "../../../Assets/Images/play-store.png";

const Footer = () => {

    const footer1 = [
        {
            text: "Get Franchisee"
        },
        {
            text: "CEO Speaks"
        },
        {
            text: "Chat With Us"
        },
        {
            text: "Contact Us"
        },
    ]

    const footer2 = [
        {
            text: "Apply For Job"
        },
        {
            text: "Privacy Policy"
        },
        {
            text: "Terms & Conditions"
        },
        {
            text: "Book a Table"
        },
    ]

    return (
        <footer className="footer bg-dark text-light pt-5 pb-4 d-flex justify-content-center">
            <div className="roww">
                <Row className="">
                    {/* Left Column - Logo & Links */}
                    <Col md={3}>
                        <h2>Better Think</h2>
                    </Col>
                    <Col md={2}>
                        {/* <img src={logo} alt="Pyramid" className="mb-3" width="150" /> */}

                        <ul className="list-unstyled">
                            {
                                footer1.map((itm) => (
                                    <li className="pb-2">
                                        <a href="/" className="text-light">{itm.text}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </Col>

                    {/* Middle Column - Other Links */}
                    <Col md={2} className="">
                        <ul className="list-unstyled">
                            {
                                footer2.map((itm) => (
                                    <li className="pb-2"><a href="/" className="text-light">{itm.text}</a></li>
                                )
                                )}
                        </ul>
                    </Col>

                    {/* Right Column - App Download */}
                    <Col md={3} className=" text-center">
                        <h5>Download Our App</h5>
                        <div className="d-flex justify-content-center">
                            <h3 className="pe-3 fs-4">App Store</h3>
                            <h3 className=" fs-4">Play store</h3>
                            {/* <img src={appStore} alt="App Store" className="me-2" width="120" />
              <img src={playStore} alt="Play Store" width="120" /> */}
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

                {/* Bottom Copyright */}
                <Row className="mt-3 text-center" style={{ borderTop: "2px solid white" }}>
                    <Col className="pt-3">
                        <p className="mb-1" style={{ fontSize: "15px" }}>&copy; 2023 Company All rights reserved</p>
                        <p style={{ fontSize: "15px" }} >  Version 0.0.78</p>
                    </Col>
                </Row>
            </div >
        </footer>
    );
};

export default Footer;
