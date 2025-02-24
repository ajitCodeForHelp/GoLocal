import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaBoxOpen, FaMapMarkerAlt, FaWallet, FaGift, FaComment, FaCog, FaSignOutAlt } from "react-icons/fa";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";

function Profile() {
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation(); // Get current route

  const menuItems = [
    { name: "My Orders", icon: <FaBoxOpen />, link: "/myorder" },
    { name: "Locations", icon: <FaMapMarkerAlt />, link: "/restaurantlocation" },
    { name: "Wallet Money", icon: <FaWallet />, link: "/wallet" },
    { name: "Offers & Rewards", icon: <FaGift />, link: "/offers" },
    { name: "Feedback", icon: <FaComment />, link: "/feedback" },
  ];

  const SettingItems = [
    { name: "Notifications", link: "/notifications" },
    { name: "Notification Setting", link: "/notification-settings" },
    { name: "My Address", link: "/myaddress" },
    { name: "Delete Account", link: "/delete-account", className: "text-danger fw-bold text-center" },
  ];

  return (
    <div className="profile container" style={{ width: "30%" }}>
      <div>
        {/* Profile Header */}
        <div className=" profile-header d-flex btn align-items-center mb-3 pb-3" style={{ padding: "15px", borderRadius: "5px 5px 0px 0px", boxShadow: "0 4px 14px #0000000f" }}>
          <BsPersonCircle size={50} className="" />
          <div className="ms-3">
            <h6 className="mb-0">+91-9982236403</h6>
          </div>
        </div>

        {/* Menu Items */}
        <div className="list-group">
          {menuItems.map((item) => (
            <Link to={item.link} key={item.name} className="text-decoration-none">
              <button
                className={`list-group-item btn list-group-item-action d-flex align-items-center mb-2 ${
                  location.pathname === item.link ? "bg-warning text-dark fw-bold" : "bg-white"
                }`}
                style={{ padding: "15px" }}
              >
                {item.icon} <span className="ms-2">{item.name}</span>
              </button>
            </Link>
          ))}

          {/* Settings Dropdown */}
          <div className="btn mb-2" style={{ padding: "0px" }}>
            <button
              className="list-group-item list-group-item-action d-flex align-items-center "
              onClick={() => setShowSettings(!showSettings)}
              style={{ padding: "15px" }}
            >
              <FaCog className="me-2" /> Settings 
              <span className="ms-auto">{showSettings ? <SlArrowUp /> : <SlArrowDown />}</span>
            </button>

            {showSettings && (
              <div className="list-group">
                {SettingItems.map((item) => (
                  <Link to={item.link} key={item.name} className="text-decoration-none">
                    <button
                      className={`list-group-item list-group-item-action d-flex align-items-center ${
                        location.pathname === item.link ? "bg-warning text-dark fw-bold" : "bg-white"
                      } ${item.name === "Delete Account" ? "text-danger fw-bold text-center" : ""}`}
                      style={{ padding: "15px" }}
                    >
                      {item.name}
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button className="list-group-item btn list-group-item-action d-flex align-items-center bg-white text-danger" style={{ padding: "15px" }}>
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;


