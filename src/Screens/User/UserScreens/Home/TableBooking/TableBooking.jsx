import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

function TableBook({ show, handleClose }) {

    const [formData, setFormData] = useState({
        restaurant: "",
        name: "",
        mobile: "",
        email: "",
        time: "",
        occasion: "",
        people: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="table-book" style={{ maxHeight: "600px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                {/* Sticky Header */}
                <Modal.Header className="modal-head d-flex justify-content-between align-items-center" 
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                        borderBottom: "1px solid #eee"
                    }}>
                    <Modal.Title>Book A Table</Modal.Title>
                    <span onClick={handleClose} className="fs-2" style={{ cursor: "pointer" }}>
                        <IoClose />
                    </span>
                </Modal.Header>

                {/* Scrollable Body */}
                <Modal.Body style={{ overflowY: "auto", flex: 1 }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Restaurants</Form.Label>
                            <Form.Select name="restaurant" onChange={handleChange}>
                                <option>Select...</option>
                                <option>Restaurant A</option>
                                <option>Restaurant B</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" name="mobile" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="datetime-local" name="time" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Occasion</Form.Label>
                            <Form.Select name="occasion" onChange={handleChange}>
                                <option>Select...</option>
                                <option>Birthday</option>
                                <option>Anniversary</option>
                                <option>Casual</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>No of People</Form.Label>
                            <Form.Control type="number" name="people" onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                {/* Sticky Footer */}
                <Modal.Footer style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "white",
                    zIndex: 10,
                    borderTop: "1px solid #eee"
                }}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => alert("Table Booked!")}>Book</Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default TableBook;
