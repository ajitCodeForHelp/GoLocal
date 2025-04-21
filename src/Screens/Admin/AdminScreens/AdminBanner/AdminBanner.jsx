import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Pagination from "../../CommonComponents/Pagination";
import ConfirmPopup from "../../CommonComponents/Popups/ConfirmsPopup";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";

function AdminBanner() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('tokenKey');
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigation = useNavigate();
    const fetchItems = async (all) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/admin/v1/banner/list/${all}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log("Data:", res.data);
            const data = await res.json();
            if (data.errorCode === 0) {
                setList(data.responsePacket);
            }
        } catch (e) {
            console.log(e, 'Error fetching items');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const scrollRef = useRef(null);
    useEffect(() => {
        fetchItems("All").then(() => {
            const scrollTop = sessionStorage.getItem('scrollTop');
            if (scrollTop && scrollRef.current) {
                scrollRef.current.scrollTop = parseInt(scrollTop, 10);
            };
        });
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
            const res = await fetch(`${BASE_URL}/admin/v1/banner/${action}/${id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                btnText(false, "", "", "");
                // fetchItems("All")
                setList(prevList =>
                    prevList.map(item =>
                        item.id === id ? { ...item, active: item.active ? false : true } : item
                    )
                );
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
        btnText(true, "cancel", "ok", `Are you sure you want to ${typ} this Banner ?`);
    };

    const update = async (id, item) => {
        if (scrollRef.current) {
            sessionStorage.setItem('scrollTop', scrollRef.current.scrollTop);
        }
        navigation(`/admin/banner/edit/${id}`, { state: item });
    };

    return (
        <>
            <div className="w-100" style={{ padding: "30px" }}>
                <div className="section-header d-flex w-100 justify-content-between align-items-center mb-3" style={{ padding: "24px", borderRadius: "20px" }}>
                    <h3>Banner</h3>
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <form>
                            <div className="header-input d-flex justify-content-start align-items-center">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <span><FaSearch /></span>
                            </div>
                        </form>
                        <Link className="btn-download" to="/admin/addbanner">
                            <span className="bx">+ Add Banner</span>
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
                            style={{ padding: "8px", borderRadius: "8px", marginRight:"10px" }} >
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
                    <div className="table-data mt-0">
                        <div className="order" style={{ overflow: "hidden" }}>
                            <div className="products-area-wrapper tableView" ref={scrollRef}>
                                <div className="products-header">
                                    <div className="product-cell sales">S.NO.</div>
                                    <div className="product-cell image">Image</div>
                                    <div className="product-cell image">Title</div>
                                    <div className="product-cell category">Banner Type</div>
                                    <div className="product-cell status-cell">Status</div>
                                    <div className="product-cell price">Action</div>
                                </div>

                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    list.map((item, index) => (
                                        <div className="products-row" key={index}>
                                            <button className="cell-more-button">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="12" cy="5" r="1" />
                                                    <circle cx="12" cy="19" r="1" />
                                                </svg>
                                            </button>
                                            <div className="product-cell sales">{index + 1}</div>
                                            <div className="product-cell image">
                                                <img src={item.imageUrl} alt="product" />
                                            </div>
                                            <div className="product-cell image">{item.title}</div>
                                            <div className="product-cell category">{item.bannerType}</div>
                                            <div className="product-cell status-cell">  {item.active ? <span className={`status ${item.active && "active"}`}>Active</span> : <span className={`status ${!item.active && "disabled"}`}>Inactive</span>}</div>
                                            <div className="product-cell price">
                                                {item.active ? <span className={`status ${!item.active && "disabled"}`} onClick={() => handleConfirmation("Inactive", item.id)}>Inactive</span> : <span className={`status ${item.active && "active"}`} onClick={() => handleConfirmation("Active", item.id)}>Active</span>}
                                                <button onClick={() => { update(item.id, item) }}>Edit</button>
                                            </div>
                                        </div>
                                    ))
                                )}

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </div>
                    </div>
                </main>
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
    );
}

export default AdminBanner;
