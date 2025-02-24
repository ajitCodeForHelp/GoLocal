import React from "react";
// import { FaShoppingCart } from "react-icons/fa";

function MyOrder() {
    return (
        <>
            <div className="w-100 d-flex justify-content-between ">
                <div className="my-order" style={{ width: "63%", backgroundColor: "white" }}>
                        <div className="d-flex justify-content-between align-items-center p-3 mb-3" style={{
                            position: "sticky",
                            top: 0,
                            backgroundColor: "white",
                            zIndex: 10,
                            borderBottom: "1px solid #eee"
                        }}>
                            <h3 className="m-0 p-0">My Order</h3>

    
                        </div>
                    </div>
                <div className="my-order" style={{ width: "35%", backgroundColor: "white", }}>
                    <ul className="p-0 mb-0" >
                        <li className="li d-flex align-item-center justify-content-between p-2 text-white fs-4" style={{
                            borderRadius: "5px 5px 0px 0px", 
                            position: "sticky",
                            top: 0,
                            backgroundColor: "black",
                            zIndex: 10,
                            borderBottom: "1px solid #ddd"
                        }}>Order Details</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default MyOrder;