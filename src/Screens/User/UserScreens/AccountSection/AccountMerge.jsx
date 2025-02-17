import React from "react";
import { GrFormNext } from "react-icons/gr";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import Header from "../../CommonComponents/Header";
import Banner from "../../CommonComponents/Banner";
import Footer from "../../CommonComponents/Footer";

function AccountMerge({ getComponent }) {
    return (
        <>
        <Header/>
        <Banner/>
            <div className="main d-flex justify-content-center" >
                <div className="roww" style={{ paddingTop: "10px", paddingBottom: "15px", }}>
                    <div className=" btn p-3">
                        <Link to="/">
                            <button style={{ border: "none" }}>Home <span><GrFormNext /></span></button>
                        </Link>
                        <Link to="/myorder">
                            <button style={{ border: "none" }}>Account <span><GrFormNext /></span></button>
                        </Link>
                        <Link to="/myorder">
                            <button style={{ border: "none" }}>My Order <span><GrFormNext /></span></button>
                        </Link>
                    </div>
                    {/* <NavButtons /> */}

                    <div className="merge-flex d-flex justify-content-between ">
                        <Profile />
                        {getComponent}
                        {/* <CategoryMenu />
                        <MenuItems />
                        <Cart /> */}
                    </div>

                </div>
            </div>
<Footer/>
        </>
    )
}
export default AccountMerge;