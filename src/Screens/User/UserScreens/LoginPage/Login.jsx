import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../../../../Assets/Images/login-img.png";

function Login({ show, handleClose }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = Phone input, 2 = OTP input
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");

  // Validate and restrict phone number input
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Allow only numbers & max 10 digits
    setPhone(value);
    setPhoneError(value.length === 10 ? "" : "Please enter a valid 10-digit phone number");
  };

  // Validate and restrict OTP input
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6); // Allow only numbers & max 6 digits
    setOtp(value);
    setOtpError(value.length === 6 ? "" : "OTP must be 6 digits");
  };

  // Handle "Get OTP" button click
  const handleNext = () => {
    if (phone.length === 10) {
      setStep(2);
    }
  };

  // Handle "Verify OTP" button click (this will close the modal)
  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="login modern-modal">
      <Modal.Body className="rounded shadow-lg position-relative">
        <button
          className="btn-close position-absolute top-4 m-3"
          style={{ right: "15px", zIndex: "1000" }}
          onClick={handleClose}
        ></button>

        <div className="img mb-3 position-relative text-center">
          <img src={img} alt="Welcome" className="welcome-image" />
          <div className="overlay-text text-warning fs-1">GoLocal</div>
        </div>

        <div className="modern-login-container text-center">
          {step === 1 ? (
            <>
              <h3 className="mb-3 slide-down">Welcome to GoLocal</h3>
              <p className="text-muted">Enter your phone number to continue</p>
              <Form>
                <Form.Group controlId="phoneInput" className="mb-3">
                  <Form.Control
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    className="form-control-lg"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  {phoneError && <p className="text-danger mt-2">{phoneError}</p>}
                </Form.Group>
                <Button
                  // variant="warning"
                  className="w-100 py-2 fs-4"
                  onClick={handleNext}
                  disabled={phone.length !== 10} // Disable button if phone is invalid
                >
                  Get OTP
                </Button>
              </Form>
            </>
          ) : (
            <>
              <h3 className="mb-3 slide-down">Welcome to GoLocal</h3>
              <p className="text-muted">An OTP has been sent to +91 {phone}</p>
              <Form>
                <Form.Group controlId="otpInput" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    className="form-control-lg"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                  {otpError && <p className="text-danger mt-2">{otpError}</p>}
                </Form.Group>
                <Button
                  variant="warning"
                  className="w-100 py-2 fs-4"
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6} // Disable button if OTP is invalid
                >
                  Verify OTP
                </Button>
              </Form>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Login;



