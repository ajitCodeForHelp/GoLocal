import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import user from "../../../Assets/Images/Logo.png";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar({ toggleSidebar }) {
    // State to track dark mode
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle dark mode
    const handleToggle = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // Apply or remove 'dark' class on body when the state changes
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [isDarkMode]);

    const [toggleProfileMenu, setToggleProfileMenu] = useState(false);

    const profileMenuRef = useRef();
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!profileMenuRef?.current?.contains(event.target)) {
                setToggleProfileMenu(false)
            }
        }
        document.addEventListener("mousedown", handleOutsideClick)
    }, [profileMenuRef])

    return (
        <>
            <nav>
                <span className='bx bx-menu bx-sm' onClick={toggleSidebar}><GiHamburgerMenu/></span>
                <div className="profile-status" ref={profileMenuRef}>
                    <input type="checkbox" className="checkbox" id="switch-mode" hidden checked={isDarkMode} onChange={handleToggle} />
                    <label className="swith-lm" for="switch-mode">
                        <span className="bx bxs-moon"><FaMoon/></span>
                        <span className="bx bx-sun"><IoSunny/></span>
                        <div className="ball"></div>
                    </label>
                    <Link className="profile" id="profileIcon" onClick={() => {
                        setToggleProfileMenu(!toggleProfileMenu)
                    }}>
                        <img src={user} alt="Profile" />
                    </Link>
                    <div className={`profile-menu ${toggleProfileMenu ? "show" : ""}`} id="profileMenu" >
                        <ul>
                            <li><Link>My Profile</Link></li>
                            <li><Link>Settings</Link></li>
                            <li><Link>Log Out</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar