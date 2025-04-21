import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { RiAlignItemLeftFill } from "react-icons/ri";
import { GiCometSpark } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { useTenant } from "../../../Utilities/TenantProvider";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { FaPeopleGroup } from "react-icons/fa6";
import { TfiLayoutSlider } from "react-icons/tfi";

function Slider({ isSidebarHidden }) {
    const { tenant } = useTenant();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const menuItems = [
        { icon: <AiFillDashboard />, text: "Dashboard", path: `/admin/dashboard` },
        { icon: <FaPeopleGroup />, text: "Vendor", path: `/admin/vendor` },
        { icon: <FaPeopleGroup />, text: "Restaurants", path: `/admin/restaurants` },
        { icon: <TfiLayoutSlider />, text: "Banner", path: `/admin/banner` },
        { icon: <TfiLayoutSlider />, text: "App Code", path: `/admin/appCode` },
        { icon: <TfiLayoutSlider />, text: "Coupon", path: `/admin/coupon` },
        { icon: <MdCategory />, text: "Category", path: `/admin/category` },
        { icon: <RiAlignItemLeftFill />, text: "Items", path: `/admin/item` },
        { icon: <RiAlignItemLeftFill />, text: "Item Add on", path: `/admin/itemAddOn` },
        { icon: <TfiLayoutListThumb />, text: "Vendor Customer", path: `/admin/customer` },
        { icon: <TfiLayoutListThumb />, text: "Vendor Tax", path: `/admin/vendorTax` },
        { icon: <GiCometSpark />, text: "Orders", path: `/admin/order` },
        { icon: <TfiLayoutListThumb />, text: "Customization", path: `/admin/customization` },
    ];

    return (
        <>
            <section id="sidebar" className={isSidebarHidden ? "hide" : "show"}>
                <Link className="brand">
                    <span className='bx bxs-smile  bx-lg'><BsFillEmojiSmileFill /></span>
                    <span className="text">BTRTHINK</span>
                </Link>
                <ul className="side-menu top">
                    {menuItems.map((item, index) => (
                        <li key={index} className={isActive(item?.path) ? "active" : ""}>
                            <Link to={item.path}>
                                <span className="bx">{item.icon}</span>
                                <span className="text">{item.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* <ul className="side-menu bottom">
                    <li>
                        <Link>
                            <span className="bx"><IoSettingsSharp /></span>
                            <span className="text">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="logout">
                            <span className="bx"><TbLogout2 /></span>
                            <span className="text">Logout</span>
                        </Link>
                    </li>
                </ul> */}
            </section >
        </>
    )
}
export default Slider;