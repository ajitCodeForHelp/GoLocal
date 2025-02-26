import React from "react";
import qrcode from "../../../../../../Assets/Images/qr_code.png";

function DineIn() {
    return (
        <div className="dine-in w-100 justify-content-center">
            <div className=" container d-flex flex-column mb-5  mt-5 align-items-center justify-content-center text-center">
                <h2 className="fw-bold">Scan And Continue</h2>
                <p className="text-muted">Please Scan QR Code on your table to place an Order</p>
                <div className="qr-code my-4">
                    <img
                        src={qrcode}
                        alt="QR Code"
                        className="img-fluid"
                    />
                </div>
                <button className="btn btn-warning fw-bold px-4 py-2">Scan And Continue</button>
            </div>
        </div>
    );
}

export default DineIn;
