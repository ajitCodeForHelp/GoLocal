import React from "react";
import './PopupStyle.css';

const ConfirmPopup = ({ onCancel, onConfirm, onThird, message, firstBtn, secondBtn, isOpen, thirdBtn, isLoading }) => {

    if (!isOpen) return null;
    return (
        <div className="popup-overlay d-flex align-items-center justify-content-center">
            <div className="popup-container position-relative bg-white rounded-4 p-5 text-center shadow">
                {!isLoading && (
                    <>
                       {firstBtn && <button
                            className="btn-close position-absolute top-0 end-0 m-3"
                            onClick={onCancel}
                        ></button>}
                        <h5 className="fw-semibold mb-4">{message}</h5>
                        {/* <p className="text-muted mb-4">This action cannot be undone.</p> */}
                        <div className="d-flex justify-content-center gap-3">
                            {firstBtn && <button className="btn btn-primary rounded-pill px-4" onClick={onCancel}>
                                {firstBtn}
                            </button>}
                            {secondBtn && <button className="btn btn-outline-secondary rounded-pill px-4" onClick={onConfirm}>
                                {secondBtn}
                            </button>}
                            {thirdBtn && <button className="btn btn-outline-secondary rounded-pill px-4" onClick={onThird}>
                                {thirdBtn}
                            </button>}
                        </div>
                    </>
                )}
                {isLoading && (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100px" }}>
                        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmPopup;
