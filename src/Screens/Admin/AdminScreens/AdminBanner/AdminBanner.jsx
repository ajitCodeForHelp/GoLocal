import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../CommonComponents/Pagination";
import { FaSearch } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";

function AdminBanner() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('tokenKey');
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [totalPages, setTotalPages] = useState(1); // Total pages for pagination

    // Fetch banner items
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
                // setTotalPages(data.responsePacket); // Set total pages for pagination
            }
        } catch (e) {
            console.log(e, 'Error fetching items');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems("All"); // Initial fetch
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchItems("All");
    };

    return (
        <>
            <div className="w-100" style={{ padding: "30px" }}>
                <div className="section-header d-flex w-100 justify-content-between align-items-center mb-3" style={{ padding: "24px", borderRadius: "20px" }}>
                    <h3>Banner</h3>
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <form onSubmit={handleSearchSubmit}>
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
                            <div className="products-area-wrapper tableView">
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
                                            <div className="product-cell status-cell">{item.status}</div>
                                            <div className="product-cell price">
                                                <span className="status bg-blue" style={{ fontSize: "17px", }}><span style={{ marginRight: "10px" }}>Edit </span> <FiEdit /></span>
                                                {/* <span className="cell">Category</span> */}
                                                {/* <span className="cell">Category</span> */}
                                                <span className="status" style={{ fontSize: "15px", color: "red" }}><span style={{ marginRight: "10px" }}>Delete</span> <RiDeleteBin6Fill /></span>
                                            </div>
                                        </div>
                                    ))
                                )}

                                {/* Pagination */}
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
        </>
    );
}

export default AdminBanner;
