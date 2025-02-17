import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPencilAlt, FaShoppingCart } from "react-icons/fa";


function Cart() {

    const [quantity, setQuantity] = useState(1);
    const price = 219;
    const totalPrice = price * quantity;

    const increment = () => setQuantity(quantity + 1);
    const decrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const category = [
        {
            text: "Sea Food ",
            price: 219
        },
        {
            text: "Burger",
            price: 219
        },
        {
            text: "Pizza",
            price: 219
        },
        {
            text: "Cold Drink",
            price: 219
        },
        {
            text: "Fruit Punch",
            price: 219
        },
    ]
    return (
        <>
            <div className="cat-tab" style={{ width: "27%", backgroundColor: "white" }} >
                <ul className="p-0 mb-0">
                    <li className="li d-flex align-item-center justify-content-between p-3" style={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "black",
                        zIndex: 10,
                        borderBottom: "1px solid #ddd"
                    }}><h4 className="p-0 m-0 fs-3 ml-2">Cart</h4> <FaShoppingCart /> </li>


                    <div className="container mt-2 p-3 " style={{ maxWidth: "400px", background: "#fff" }}>
                        {/* Product Info */}
                        {
                            category.map((itm) => {
                                return (
                                    <>
                                        <h5 className="fw-bold">{itm.text}</h5>
                                        <div className="d-flex justify-content-between align-items-center w-100" style={{ marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>
                                            <div>

                                                <span style={{ color: "#FFA500", fontWeight: "bold", marginRight: "5px" }}>₹ {price} </span>
                                                <span className="fw-bold"> ₹ {itm.price} </span>
                                            </div>

                                            {/* Edit Button */}
                                            <div className="d-flex align-items-center">
                                                <Button variant="outline-warning" className="p-1 border-0" style={{ marginRight: "10px" }}>
                                                    <FaPencilAlt />
                                                </Button>

                                                <div className="d-flex align-items-center">

                                                    {/* Quantity Selector */}
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="bg-warning d-flex align-items-center p-1 rounded-pill">
                                                            {/* Decrease Button */}
                                                            <Button
                                                                variant="warning"
                                                                className="border-0 d-flex align-items-center justify-content-center"
                                                                style={{ width: "35px", height: "30px" }}
                                                                onClick={decrement}
                                                            >
                                                                −
                                                            </Button>

                                                            {/* Quantity Display with Fixed Width */}
                                                            <span
                                                                className="fw-bold text-center"
                                                                style={{
                                                                    minWidth: "30px",  // Ensures space for 2-digit numbers
                                                                    maxWidth: "30px",
                                                                    display: "inline-block",
                                                                    textAlign: "center"
                                                                }}
                                                            >
                                                                {quantity}
                                                            </span>

                                                            {/* Increase Button */}
                                                            <Button
                                                                variant="warning"
                                                                className="border-0 d-flex align-items-center justify-content-center"
                                                                style={{ width: "35px", height: "35px" }}
                                                                onClick={increment}
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </>
                                )
                            })
                        }

                        {/* <h5 className="fw-bold">Fruit Punch</h5> */}


                        {/* Quantity Control */}


                        {/* Checkout Button */}
                        <Button variant="warning" className="w-100 mt-3 fw-bold p-2">
                            Checkout (₹{totalPrice})
                        </Button>
                    </div>
                    {/* {
                        category.map((itm) => {
                            return <li key={itm.id} className="p-3 fs-5 li-a">{itm.text}</li>;
                        })
                    } */}
                </ul>
            </div>
        </>
    )
}
export default Cart;