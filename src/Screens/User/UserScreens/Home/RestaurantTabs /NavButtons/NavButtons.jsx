import React from "react";
import { MdDeliveryDining } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { FaBottleWater } from "react-icons/fa6";
import { BiSolidCalendarEvent } from "react-icons/bi";

function NavButtons() {
    const res = [
        {
            btn: "Delivery",
            icon: <MdDeliveryDining />
        },
        {
            btn: "Take Away",
            icon: <FaBasketShopping />
        },
        {
            btn: "Din In",
            icon: <ImSpoonKnife />
        },
        {
            btn: "Steal Deals",
            icon: <FaBottleWater />
        },
        {
            btn: "Events",
            icon: <BiSolidCalendarEvent />
        },
    ]
    return (
        <>
            <div className="res-tab" style={{
                backgroundColor: "white", borderRadius: "5px", position: "sticky",
                top: 86,
                backgroundColor: "white",
                zIndex: 15,
            }}

            >
                <ul className=" p-0 d-flex justify-content-center align-item-center">
                    {res.map((itm, index) => (
                        <li key={index} className=" d-flex justify-content-center align-item-center bg-black  m-2" style={{ width: "20%", padding: "7px" }}>
                            <h4 className="d-flex align-item-center text-warning">
                                {itm.icon}
                                {itm.btn}
                            </h4>
                        </li>
                    ))}
                </ul>
            </div>


        </>
    )
}
export default NavButtons 