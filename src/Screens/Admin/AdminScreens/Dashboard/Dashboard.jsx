import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../../AdminStyle.css";
import { FaCalendarCheck } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { LiaRupeeSignSolid } from "react-icons/lia";

function Dashboard() {


    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Dashboard</h1>
                        <ul className="breadcrumb">
                            <li>
                                <a href="#">Dashboard</a>
                            </li>
                            <li><i className='bx bx-chevron-right' ></i></li>
                            <li>
                                <a className="active" href="#">Home</a>
                            </li>
                        </ul>
                    </div>
                    {/* <a href="#" className="btn-download">
                        <i className='bx bxs-cloud-download bx-fade-down-hover' ></i>
                        <span className="text">Get PDF</span>
                    </a> */}
                </div>

                <ul className="box-info">
                    <li>
                        <span className="bx bxs-calendar-check"><FaCalendarCheck /></span>
                        <span className="text">
                            <h3>1020</h3>
                            <p>New Order</p>
                        </span>
                    </li>
                    <li>
                        <span className="bx bxs-group"><MdPeopleAlt /></span>
                        <span className="text">
                            <h3><LiaRupeeSignSolid />2834</h3>
                            <p>Cart</p>
                        </span>
                    </li>
                    <li>
                        <span className="bx bxs-dollar-circle"><FaMoneyBillTrendUp /></span>
                        <span className="text">
                            <h3><LiaRupeeSignSolid />2543.00</h3>
                            <p>Total Sales</p>
                        </span>
                    </li>
                </ul>


                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Recent Orders</h3>
                            <i className='bx bx-search' ></i>
                            <i className='bx bx-filter' ></i>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Date Order</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="https://placehold.co/600x400/png" />
                                        <p className="m-0">Micheal John</p>
                                    </td>
                                    <td>18-10-2021</td>
                                    <td><span className="status completed">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="https://placehold.co/600x400/png" />
                                        <p className="m-0">Ryan Doe</p>
                                    </td>
                                    <td>01-06-2022</td>
                                    <td><span className="status pending">Pending</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="https://placehold.co/600x400/png" />
                                        <p className="m-0">Tarry White</p>
                                    </td>
                                    <td>14-10-2021</td>
                                    <td><span className="status process">Process</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="https://placehold.co/600x400/png" />
                                        <p className="m-0">Selma</p>
                                    </td>
                                    <td>01-02-2023</td>
                                    <td><span className="status pending">Pending</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="https://placehold.co/600x400/png" />
                                        <p className="m-0">Andreas Doe</p>
                                    </td>
                                    <td>31-10-2021</td>
                                    <td><span className="status completed">Completed</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="todo">
                        <div className="head">
                            <h3>Carts</h3>
                            <i className='bx bx-plus icon'></i>
                            <i className='bx bx-filter' ></i>

                        </div>
                        <ul className="todo-list">
                            <li className="completed">
                                <p className="m-0">Check Inventory</p>
                                <i className='bx bx-dots-vertical-rounded' ></i>
                            </li>
                            <li className="completed">
                                <p className="m-0">Manage Delivery Team</p>
                                <i className='bx bx-dots-vertical-rounded' ></i>
                            </li>
                            <li className="not-completed">
                                <p className="m-0">Contact Selma: Confirm Delivery</p>
                                <i className='bx bx-dots-vertical-rounded' ></i>
                            </li>
                            <li className="completed">
                                <p className="m-0">Update Shop Catalogue</p>
                                <i className='bx bx-dots-vertical-rounded' ></i>
                            </li>
                            <li className="not-completed">
                                <p className="m-0">Count Profit Analytics</p>
                                <i className='bx bx-dots-vertical-rounded' ></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Dashboard;