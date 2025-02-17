import React, { useState } from "react";
import { FaHome, FaMapMarkerAlt, FaPlus, FaTrash } from "react-icons/fa";
import AddressModal from "./AddressModal";

function Address() {
    const [showModal, setShowModal] = useState(false);
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            type: "Home",
            address: "TDI City, Chajju Majra Rd, Sector 117, Sahibzada Ajit Singh Nagar, Punjab 140301, India",
        },
    ]);

    // const addAddress = () => {
    //     const newAddress = {
    //         id: addresses.length + 1,
    //         type: "Work",
    //         address: "New Address Placeholder",
    //     };
    //     setAddresses([...addresses, newAddress]);
    // };

    const deleteAddress = (id) => {
        setAddresses(addresses.filter((addr) => addr.id !== id));
    };
    return (
        <>
            {/* <div className="w-100"> */}
            <div className="my-order" style={{ width: "100%", backgroundColor: "white" }}>
                <div className="p-3 " style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 10,
                    borderBottom: "1px solid #eee"
                }}>
                    <h3 className="m-0 p-0">My Order</h3>
                </div>
                <div className="container p-3" >
                    {/* Add Current Location Button */}
                    <button className="btn btn-light w-100 d-flex align-items-center justify-content-start p-3 border mb-3">
                        <FaMapMarkerAlt className="text-warning me-2" />
                        <span className="fw-bold">Add Current Location</span>
                    </button>

                    {/* Address List */}
                    <div className="list-group">
                        {addresses.map((addr) => (
                            <div key={addr.id} className="list-group-item d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <FaHome className="text-warning me-2" />

                                    <div className="">
                                        <h6 className="mb-1">
                                            {addr.type}
                                        </h6>
                                        <p className="mb-0 text-muted">{addr.address}</p>
                                    </div>

                                </div>
                                <FaTrash className="text-warning" role="button" onClick={() => deleteAddress(addr.id)} />
                            </div>
                        ))}
                    </div>

                    {/* Add New Address Button */}
                   <div className="d-flex justify-content-center w-100">
                   <button onClick={() => setShowModal(true)} className="btn btn-warning d-flex text-center justify-content-center align-items-center w-25 mt-3 p-3">
                        <FaPlus className="me-2" />
                        Add New Address
                    </button>
                   </div>
                </div>

            </div>
            {/* </div> */}

            <AddressModal show={showModal} handleClose={() => setShowModal(false)} />
        </>
    )
}
export default Address;