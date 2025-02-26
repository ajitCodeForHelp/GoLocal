import React, { useEffect, useRef, useState } from "react";
import { Offcanvas, Navbar, Nav, Button, Form } from "react-bootstrap";
import { FaBriefcase, FaComments, FaFileContract, FaLock, FaMapMarkerAlt, FaPhone, FaStore, FaUser, FaUserTie, FaArrowLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { SlArrowDown } from "react-icons/sl";
import { Link } from "react-router-dom";
import TableBook from "../UserScreens/Home/TableBooking/TableBooking";
import tablebook from "../../../Assets/Images/book_a_table.gif"
import Login from "../UserScreens/LoginPage/Login";

function Header() {
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selected, setSelected] = useState("Pyramid Amayra");
    const [showDropdown, setShowDropdown] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef(null);


    const handleLoginClick = () => {
        setShowLoginModal(!showLoginModal);
        console.log("hey click");
        
    };

    const locations = [
        "Pyramid Amayra",
        "Pyramid Chandigarh",
        "Pyramid Ambala",
        "Pyramid Express Shimla",
        "Pyramid Ludhiana",
        "Pyramid Yamunanagar",
        "Pyramid Eastwood",
        "Pyramid Karnal"
    ];

    const filteredLocations = locations.filter((loc) =>
        loc.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { name: "Locations", icon: <FaMapMarkerAlt /> },
        { name: "CEO Speaks", icon: <FaUserTie /> },
        { name: "Chat With Us", icon: <FaComments /> },
        { name: "Contact Us", icon: <FaPhone /> },
        { name: "Apply For Job", icon: <FaBriefcase /> },
        { name: "Get Franchisee", icon: <FaStore /> },
        { name: "Privacy Policy", icon: <FaLock /> },
        { name: "Terms And Conditions", icon: <FaFileContract /> }
    ];



   
    return (
        <>
            {/* Navbar */}
            <Navbar expand="lg" className="navbar py-4 d-flex justify-content-center" style={{ position: "sticky", top: 0, zIndex: 100, width: "100%" }}>

                <div className="roww d-flex justify-content-between align-items-center">
                    {/* Menu Button for Mobile */}
                    <div className="nav-res">
                        <Button
                            variant="outline-light"
                            className="slide d-lg-none"
                            onClick={() => setShow(true)}
                        >
                            ☰
                        </Button>

                        {/* Logo */}
                        <Link to="/" className="text-warning">
                            <h2 >GoLocal</h2>
                        </Link>
                        <div className="tablebook-img" onClick={() => setShowModal(true)}>

                            <img src={tablebook} alt="img" />
                        </div>

                    </div>

                    {/* Search Bar */}
                    <div className="search-bar position-relative" style={{ width: "40%" }} ref={dropdownRef}>
                        <div
                            className="input px-3 py-1 rounded d-flex justify-content-between align-items-center"
                            style={{ cursor: "pointer", border: "1px solid #ccc" }}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <Form.Control
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border-0 rounded-0"
                            />
                            <span><SlArrowDown /></span>
                        </div>

                        {showDropdown && (
                            <div className="drop position-absolute w-100 shadow rounded mt-1" style={{ zIndex: 1000 }}>
                                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                                    {filteredLocations.map((loc, index) => (
                                        <div
                                            key={index}
                                            className="px-3 py-2 border-bottom"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setSelected(loc);
                                                setShowDropdown(false);
                                                setSearch(""); // Reset search after selection
                                            }}
                                        >
                                            {loc}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Buttons (Hidden in Mobile) */}
                    <div className="btn d-none d-lg-flex align-items-center gap-3">
                        <Button  onClick={() => setShowModal(true)}>Book a Table</Button>
                        {/* <Link to="/restaurantlocation">
                            <span className="fs-5"><FaMapMarkerAlt /> Location</span>
                        </Link> */}
                        <Link to="/myorder">
                            <FaUser className="fs-5" />
                        </Link>
                        <Button onClick={handleLoginClick}>Login</Button>
                    </div>
                </div>
            </Navbar>

            {/* Sidebar Menu */}
            <Offcanvas show={show} onHide={() => setShow(false)} placement="start" className="res-header custom-sidebar">
                <Offcanvas.Header className="slider-header" style={{ padding: "20px, 5px" }}>
                    <FaArrowLeft className="fs-4" role="button" onClick={() => setShow(false)} />
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        {menuItems.map((item, index) => (
                            <Nav.Link
                                key={index}
                                className="menu-item d-flex align-items-center p-3"
                                onClick={() => setShow(false)}
                                style={{
                                    margin: "10px",
                                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow effect
                                    borderRadius: "5px",
                                    background: "#fff" // Ensuring contrast
                                }}
                            >
                                <span className="me-2">{item.icon}</span>
                                {item.name}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Offcanvas.Body>

            </Offcanvas>

            {/* Table Booking Modal */}
            <TableBook show={showModal} handleClose={() => setShowModal(false)} />

            <Login show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
        </>
    );
}

export default Header;

