import React from "react";
import { MdDeliveryDining } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { FaBottleWater } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import Header from "../../../CommonComponents/Header";
import Banner from "../../../CommonComponents/Banner";
import Footer from "../../../CommonComponents/Footer";

function Merge({ getComponent }) {
    const location = useLocation(); // Get current path

    const res = [
        { btn: "Delivery", icon: <MdDeliveryDining style={{ fontSize: "22px" }} />, link: "/delivery" },
        { btn: "Take Away", icon: <FaBasketShopping />, link: "/" },
        { btn: "Dine In", icon: <ImSpoonKnife />, link: "/dinein" },
        { btn: "Steal Deals", icon: <FaBottleWater />, link: "/stealdeals" },
    ];

    return (
        <>
            <Header />
            <Banner />
            <div className="">
                <div className="main d-flex justify-content-center">
                    <div className="roww" style={{ paddingTop: "10px", paddingBottom: "15px" }}>
                        <div className="res-tab" style={{
                            borderRadius: "5px",
                            position: "sticky",
                            marginBottom: "10px",
                            top: 86,
                            zIndex: 15,
                        }}>
                            <ul className="res-buttons p-0 d-flex justify-content-around align-items-center">
                                {res.map((itm, index) => (
                                    <Link to={itm.link} className="option-button" style={{ textDecoration: "none" }}>
                                        <li
                                            key={index}
                                            className="d-flex justify-content-center align-items-center m-2"
                                            style={{
                                                minWidth: "120px",
                                                padding: "5px 30px",
                                                backgroundColor: location.pathname === itm.link ? "orange" : "black",
                                                borderRadius: "5px"
                                            }}
                                        >

                                            <h4 className="d-flex align-items-center" style={{ gap: "5px", color: location.pathname === itm.link ? "white" : "orange" }}>
                                                {itm.icon}
                                                {itm.btn}
                                            </h4>

                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>

                        <div className="merge-flex d-flex justify-content-between">
                            {getComponent}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Merge;

