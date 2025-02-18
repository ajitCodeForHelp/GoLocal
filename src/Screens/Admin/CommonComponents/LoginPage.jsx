import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const LoginPage = () => {
    return (
        <div className="login-container">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="login-card shadow">

                    <Card.Body>
                        <h3 className="login-title">Login Page</h3>

                        <Form className="form">
                            {/* Email Input */}
                            <Form.Group className="mb-3">
                                <Form.Label className="form-label">Email or Username</Form.Label>
                                <Form.Control type="text" className="input-field" />
                            </Form.Group>

                            {/* Password Input */}
                            <Form.Group className="mb-3">
                                <Form.Label className="form-label">Password</Form.Label>
                                <Form.Control type="password" className="input-field" />
                            </Form.Group>

                            {/* Login Button */}
                            <Button className="login-btn w-100">Login</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LoginPage;