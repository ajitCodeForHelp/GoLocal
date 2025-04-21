import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Pagination from "../../CommonComponents/Pagination";
import ConfirmPopup from "../../CommonComponents/Popups/ConfirmsPopup";

function Vendor() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('tokenKey');
    const [data, setData] = useState([]);
    const navigation = useNavigate();

    const apiRes = async (which) => {
        try {
            const res = await fetch(`${BASE_URL}/admin/v1/vendor/list/${which}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setData(getRes.responsePacket);
            }
        } catch (e) {
            console.error("Error in apiRes:", e);
        }
    };
    useEffect(() => {
        apiRes("All");
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [firstBtn, setFirstBtn] = useState("");
    const [secondBtn, setSecondBtn] = useState("");
    const popupCancel = () => {
        btnText(false, "", "", "", "");
        setId('');
        setType('');
    };
    const btnText = (toggle, first, second, mess) => {
        setIsOpen(toggle);
        setFirstBtn(first);
        setSecondBtn(second);
        setMessage(mess);
    };
    const [type, setType] = useState("");
    const [id, setId] = useState("");
    const onConfirm = () => {
        handleStatus(type, id)
        btnText(false, "", "", "", "");
    };

    const handleStatus = async (type, id) => {
        let action = ""; // Declare it here
        switch (type) {
            case "Active":
                action = "activate";
                break;
            case "Inactive":
                action = "inactivate";
                break;
            default:
                console.warn("Invalid type passed to handleActive");
                return;
        }
        try {
            const res = await fetch(`${BASE_URL}/admin/v1/vendor/${action}/${id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                btnText(false, "", "", "");
                apiRes("All");
            } else {
                btnText(true, "ok", "", "", getRes.message)
            }
        } catch (e) {
            console.error("Error in handleActive:", e);
        }
    };
    const handleConfirmation = (typ, i) => {
        setType(typ);
        setId(i);
        btnText(true, "cancel", "ok", `Are you sure you want to ${typ} this restuarant ?`);
    };
    const update = (id, item) => {
        navigation(`/admin/vendor/edit/${id}`, { state: item })
    };

    return (
        <>
            <div className="w-100" style={{ padding: "30px" }}>
                <div className="section-header d-flex w-100 justify-content-between align-items-center mb-3" style={{ padding: "24px", borderRadius: "20px" }}>
                    <h3>Vendor</h3>
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <div className="header-input d-flex justify-content-start align-items-center">
                            <input type="text" placeholder='Search..' />
                            <span><FaSearch /></span>
                        </div>
                        <Link className="btn-download" to="/admin/newVendor">
                            <span className="bx"> + Add Vendor</span>
                        </Link>
                    </div>
                </div>
                <div className="section-header d-flex w-100 justify-content-between align-items-center mb-3" style={{ padding: "24px", borderRadius: "20px" }}>
                    <div className="filter d-flex justify-content-between " style={{ width: "20%" }}>
                        <button className="btn btn-outline-secondary">All</button>
                        <button className="btn btn-outline-success">Active</button>
                        <button className="btn btn-outline-danger">Inactive</button>
                    </div>

                    <div className="form-group ">
                        <select
                            id="bannerType"
                            // value={bannerTypeEnum}
                            // onChange={(e) => setBannerTypeEnum(e.target.value)}
                            className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            style={{ padding: "8px", borderRadius: "8px", marginRight: "10px" }} >
                            <option disabled value>Select a banner type</option>
                            <option value="home" className="bg-blue-100 text-blue-900">Home</option>
                            <option value="product" className="bg-green-100 text-green-900">Product</option>
                            <option value="category" className="bg-yellow-100 text-yellow-900">Category</option>
                            <option value="offer" className="bg-pink-100 text-pink-900">Offer</option>
                        </select>
                        <select
                            id="bannerType"
                            // value={bannerTypeEnum}
                            // onChange={(e) => setBannerTypeEnum(e.target.value)}
                            className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            style={{ padding: "8px", borderRadius: "8px" }}  >
                            <option disabled value>Select a banner type</option>
                            <option value="home" className="bg-blue-100 text-blue-900">Home</option>
                            <option value="product" className="bg-green-100 text-green-900">Product</option>
                            <option value="category" className="bg-yellow-100 text-yellow-900">Category</option>
                            <option value="offer" className="bg-pink-100 text-pink-900">Offer</option>
                        </select>
                    </div>
                </div>
                <main style={{ display: 'flex', height: "100%", padding: 0 }}>
                    <div class="table-data mt-0">
                        <div class="order" style={{ overflow: "hidden" }}>
                            <div className="products-area-wrapper tableView">
                                <div className="products-header">
                                    <div className="product-cell image">
                                        Name
                                        <button className="sort-button">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                                        </button>
                                    </div>
                                    <div className="product-cell category">User Name<button className="sort-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                                    </button></div>
                                    <div className="product-cell category">Contact<button className="sort-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                                    </button></div>
                                    <div className="product-cell status-cell">Status<button className="sort-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                                    </button></div>
                                    <div className="product-cell status-cell">Action<button className="sort-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                                    </button></div>
                                </div>
                                {data.map((item, index) => {
                                    return (
                                        <>
                                            <div className="products-row">
                                                <button className="cell-more-button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                                                </button>
                                                <div className="product-cell image">
                                                    {item?.photoImageUrl && <img src={item.photoImageUrl} alt="product" />}
                                                    <span>{item.firstName} {item.lastName}</span>
                                                </div>
                                                <div className="product-cell category"><span className="cell-label">Category:</span>{item.username}</div>
                                                <div className="product-cell category"><span className="cell-label">Category:</span>{item.contactDetail?.contactNumber}</div>
                                                <div className="product-cell status-cell">
                                                    <span className="cell-label">Status:</span>
                                                    {item.active ? <span className={`status ${item.active && "active"}`}>Active</span> : <span className={`status ${!item.active && "disabled"}`}>Inactive</span>}
                                                </div>
                                                <div className="product-cell action">
                                                    {item.active ? <span className={`status ${!item.active && "disabled"}`} onClick={() => handleConfirmation("Inactive", item.id)}>Inactive</span> : <span className={`status ${item.active && "active"}`} onClick={() => handleConfirmation("Active", item.id)}>Active</span>}
                                                    <span className="status bg-blue" style={{ fontSize: "17px", }}><span style={{ marginRight: "10px" }}>Edit </span> <FiEdit /></span>
                                                    {/* <span className="cell">Category</span> */}
                                                    {/* <span className="cell">Category</span> */}
                                                    <span className="status" style={{ fontSize: "15px", color: "red" }}><span style={{ marginRight: "10px" }}>Delete</span> <RiDeleteBin6Fill /></span>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </main>
                <Pagination totalPages={20} />
            </div>
            <ConfirmPopup
                isOpen={isOpen}
                onCancel={popupCancel}
                onConfirm={onConfirm}
                message={message}
                firstBtn={firstBtn}
                secondBtn={secondBtn}
            />
        </>
    )
};
export default Vendor;