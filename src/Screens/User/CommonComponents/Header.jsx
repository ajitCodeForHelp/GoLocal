import React, { useEffect, useRef, useState } from "react";
import { Offcanvas, Navbar, Nav, Button, Form } from "react-bootstrap";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { SlArrowDown } from "react-icons/sl";
import { Link } from "react-router-dom";
import TableBook from "../UserScreens/Home/TableBooking/TableBooking";


function Header() {
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
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

    const [selected, setSelected] = useState("Pyramid Amayra");
    const [showDropdown, setShowDropdown] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef(null);

    const filteredLocations = locations.filter((loc) =>
        loc.toLowerCase().includes(search.toLowerCase())
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {/* Navbar */}
            <Navbar expand="lg" className=" navbar bg-dark py-3 d-flex justify-content-center" style={{
                position: "sticky ",
                top: 0,
                zIndex: 20,
            }}>
                <div className="roww d-flex justify-content-between ">
                    {/* Menu Button for Mobile */}
                    <div className="nav-res">


                        <Button
                            variant="outline-light"
                            className="d-lg-none"
                            onClick={() => setShow(true)}
                        >
                            ☰
                        </Button>

                        {/* Logo */}
                        {/* <Navbar.Brand href="#" className="text-warning ms-3"> */}
                        <Link to="/" className="text-warning"><h2>Better Think</h2></Link>
                        {/* </Navbar.Brand> */}
                    </div>
                    <div className="search-bar position-relative" style={{ width: "40%" }} ref={dropdownRef}>
                        <div
                            className="bg-white px-3 py-1 rounded d-flex justify-content-between align-items-center"
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
                            <div className="position-absolute w-100 bg-white shadow rounded mt-1" style={{ zIndex: 1000 }}>
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
                    <div className="d-none d-lg-flex align-items-center gap-3">
                        {/* Book Table Button - Triggers Modal */}
                        <Button variant="warning" onClick={() => setShowModal(true)}>Book a Table</Button>
                        <Link to="/restaurantlocation">
                            <span className="text-warning fs-5"><FaMapMarkerAlt /> Location</span>
                        </Link>
                        <Link to="/myorder">
                            <FaUser className="text-warning fs-5" />
                        </Link>
                    </div>
                </div>
            </Navbar>

            {/* Sidebar Menu */}
            <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#">Menu</Nav.Link>
                        <Nav.Link href="#">Reservations</Nav.Link>
                        <Nav.Link href="#">Contact</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Table Booking Modal */}
            <TableBook show={showModal} handleClose={() => setShowModal(false)} />
        </>
    );
};

export default Header;
