import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Pagination from "../../CommonComponents/Pagination";
import ConfirmPopup from "../../CommonComponents/Popups/ConfirmsPopup";

function Coupon() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('tokenKey');
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigation = useNavigate();

    const fetchRestaurantId = async () => {
        const token = sessionStorage.getItem('tokenKey');
        try {
            const res = await fetch(`${BASE_URL}/vendor/v1/restaurant/get-my-restaurant-id`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                sessionStorage.setItem("restaurantId", getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in api");
        }
    };
    useEffect(() => {
        fetchRestaurantId();
    });

    const fetchItems = async (data) => {
        setIsLoading(true);
        const restaurantId = sessionStorage.getItem("restaurantId");
        try {
            const res = await fetch(`${BASE_URL}/vendor/v1/${restaurantId}/coupon-code/list/${data}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setList(getRes.responsePacket);
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
        };
        const restaurantId = sessionStorage("restaurantId")
        try {
            const res = await fetch(`${BASE_URL}/vendor/v1/${restaurantId}/coupon-code/${action}/${id}`, {
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
        btnText(true, "cancel", "ok", `Are you sure you want to ${typ} this Code ?`);
    };

    const update = async (id, item) => {
        if (scrollRef.current) {
            sessionStorage.setItem('scrollTop', scrollRef.current.scrollTop);
        }
        navigation(`/admin/coupon/edit/${id}`, { state: item });
    };

    return (
        <>
            <div className="w-100" style={{ padding: "30px" }}>
                <div className="section-header d-flex w-100 justify-content-between align-items-center mb-3" style={{ padding: "24px", borderRadius: "20px" }}>
                    <h3>Coupon</h3>
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
                        <Link className="btn-download" to="/admin/addCoupon">
                            <span className="bx">+ Add Coupon</span>
                        </Link>
                    </div>
                </div>
                <main style={{ display: 'flex', height: "100%", padding: 0 }}>
                    <div className="table-data mt-0">
                        <div className="order" style={{ overflow: "hidden" }}>
                            <div className="products-area-wrapper tableView" ref={scrollRef}>
                                <div className="products-header">
                                    <div className="product-cell sales">S.NO.</div>
                                    <div className="product-cell image">Coupon Code</div>
                                    <div className="product-cell image">Start Date</div>
                                    <div className="product-cell category">End Date</div>
                                    <div className="product-cell category">Discount Value</div>
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
                                            <div className="product-cell image">{item.couponCode}</div>
                                            <div className="product-cell category">{item.startDate}</div>
                                            <div className="product-cell category">{item.endDate}</div>
                                            <div className="product-cell category">{item.discountValue}</div>
                                            <div className="product-cell status-cell">  {item.active ? <span className={`status ${item.active && "active"}`}>Active</span> : <span className={`status ${!item.active && "disabled"}`}>Inactive</span>}</div>
                                            <div className="product-cell price">
                                                {item.active ? <span className={`status ${!item.active && "disabled"}`} onClick={() => handleConfirmation("Inactive", item.id)}>Inactive</span> : <span className={`status ${item.active && "active"}`} onClick={() => handleConfirmation("Active", item.id)}>Active</span>}
                                                <button onClick={() => { update(item.id, item) }}>Edit</button>
                                            </div>
                                        </div>
                                    ))
                                )}

                            </div>
                        </div>
                    </div>
                </main>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
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

export default Coupon;
