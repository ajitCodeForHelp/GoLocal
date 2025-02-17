import React, { useState } from "react";
import Header from "../../../CommonComponents/Header";
import Banner from "../../../CommonComponents/Banner";
import Footer from "../../../CommonComponents/Footer";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

function RestaurantLocation() {
    const [locations, setLocations] = useState([
        {
            id: 1,
            name: "Pyramid Amayra",
            address: "Ropar-Kurali Road, Centre, near Amayra City, Greater, Sahibzada Ajit Singh Nagar",
            distance: "6.058 Kms away",
        },
        {
            id: 2,
            name: "Pyramid Chandigarh",
            address: "Divine Hospitality, 310, Level III, Elante Mall, Industrial Area Phase-1",
            distance: "12.421 Kms away",
        },
        {
            id: 3,
            name: "Atmosphere Skybar",
            address: "Hotel Puran Palace, 167, Vijay Rattan Chowk, Ambala Cant, Ambala, Haryana",
            distance: "46.871 Kms away",
        },
        {
            id: 4,
            name: "Hotel Puran Palace",
            address: "Hotel Puran Palace, 167, Vijay Rattan Chowk, Ambala Cantt, Haryana, India.",
            distance: "46.891 Kms away",
        },
        {
            id: 5,
            name: "Pyramid Ambala",
            address: "Railway Station Road, Palledar Mohalla, Football chowk, Ambala Cantt",
            distance: "46.901 Kms away",
        },
    ]);
    return (
        <>
            <Header />
            <Banner />

            <div className="main d-flex justify-content-center" >
                <div className="roww" style={{ paddingBottom: "15px", backgroundColor: "white", marginTop: "15px", marginBottom: "15px" }}>

                    {/* Search Bar */}
                    <div className="d-flex justify-content-center" style={{
                        paddingTop: "40px", paddingBottom: "30px", borderBottom: "1px solid #eee", position: "sticky",
                        top: 87,
                        backgroundColor: "white",
                        zIndex: 10,
                    }}>
                        <InputGroup className="w-50">
                            <Form.Control type="text" placeholder="Search for your location" />
                            <Button variant="warning">
                                <MdLocationOn /> Detect location
                            </Button>
                        </InputGroup>
                    </div>

                    {/* Locations Grid */}
                    <Row xs={1} md={2} lg={2} className="g-4" style={{ padding: "15px" }}>
                        {locations.map((location) => (
                            <Col key={location.id}>
                                <Card className="p-3 shadow-sm border-0 position-relative">
                                    {/* Yellow left border */}
                                    <div className="position-absolute start-0 top-0 bottom-0 bg-warning" style={{ width: "5px", borderRadius: "5px" }}></div>

                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Card.Title className="fw-bold">{location.name}</Card.Title>
                                            {/* Call & Location Buttons */}
                                            <div className="d-flex justify-content-end gap-2">
                                                <Button variant="warning" className="rounded-circle" style={{ padding: "5px 10px" }}>
                                                    <FaPhoneAlt />
                                                </Button>
                                                <Button variant="warning" className="rounded-circle " style={{ padding: "5px 10px" }}>
                                                    <FaMapMarkerAlt />
                                                </Button>
                                            </div>
                                        </div>

                                        <p className="text-success fw-bold">Open Now</p>
                                        <Card.Text className="text-muted small">{location.address}</Card.Text>
                                        <p className="fw-bold d-flex justify-content-end">{location.distance}</p>


                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>


                </div>
            </div>



            <Footer />
        </>
    )
}
export default RestaurantLocation