import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";
import img from "../../../../../../../Assets/Images/FruitPunch.jpg";

function MenuItems() {
    const [items, setItems] = useState([
        { id: 1, name: "Fruit Punch", description: "Mango Juice + Fruit Chunks & Vanilla Ice Cream", price: 219, oldPrice: 299, image: img, quantity: 1 },
        { id: 2, name: "Evolution", description: "Passion Fruit + Strawberry + Lemon & Pineapple Juice", price: 219, oldPrice: 299, image: img, quantity: 0 },
        { id: 3, name: "Minty Melon", description: "Mint Leaves + Mango Crush + Mint Syrup & Mango Juice", price: 219, oldPrice: 299, image: img, quantity: 0 },
        { id: 4, name: "Evolution", description: "Passion Fruit + Strawberry + Lemon & Pineapple Juice", price: 219, oldPrice: 299, image: img, quantity: 0 },
        { id: 5, name: "Minty Melon", description: "Mint Leaves + Mango Crush + Mint Syrup & Mango Juice", price: 219, oldPrice: 299, image: img, quantity: 0 },
    ]);

    const increment = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };
    const decrement = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 1 } : item
        ));
    };


    // ------- Responsive-category -------

    const categoryData = {
        Beverages: ["Mocktails", "Shakes", "Soft Drinks"],
        "All Day Favourites": ["Sandwiches", "Burgers", "Pasta"],
        International: ["Pizza", "Sushi", "Tacos"],
        Asian: ["Dumplings", "Ramen", "SpringRolls"],
        Indian: ["Biryani", "Dosa", "Paneer Tikka"],
    };

    const [activeCategory, setActiveCategory] = useState("Beverages");
    const [activeSubCategory, setActiveSubCategory] = useState(categoryData["Beverages"][0]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setActiveSubCategory(categoryData[category][0]); // Set first subcategory
    };

    return (
        <>
            <div className="menu-tab" style={{ width: "53%", backgroundColor: "white" }}>
                <div className="" style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 10, borderBottom: "1px solid #eee" }}>
                    <div className="d-flex justify-content-between align-items-center p-3 pt-4" style={{ borderBottom: "1px solid #eee" }}>
                        <h3 className="fw-bold">Mocktails</h3>

                        <InputGroup className="w-50">
                            <Form.Control type="text" placeholder="Search" />
                        </InputGroup>

                        <div className="filter-btn d-flex align-items-center">
                            <span className="fw-bold me-2">Filter</span>
                            <Button variant="outline-success" className="me-2"><MdOutlineFilterList /></Button>
                            <Button variant="outline-warning" className="me-2">🟢</Button>
                            <Button variant="outline-danger">🔺</Button>
                        </div>
                    </div>
                    <div className="res-category container ">
                        {/* Main Category Section */}
                        <div className="category-scroll-container">
                            <div className="category-list d-flex">
                                {Object.keys(categoryData).map((category) => (
                                    <div
                                        key={category}
                                        className={`category-item ${activeCategory === category ? "active" : ""}`}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {category}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Subcategory Section */}
                        <div className="sub-category-container mb-2">
                            {categoryData[activeCategory].map((sub) => (
                                <button
                                    key={sub}
                                    className={`btn sub-category-btn ${activeSubCategory === sub ? "btn-warning" : "btn-outline-secondary"}`}
                                    onClick={() => setActiveSubCategory(sub)}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="container item pt-2">
                    {items.map((item) => (
                        <div key={item.id} className="img d-flex align-items-center p-3 border rounded mb-3 bg-white shadow-sm mb-2">
                            <img src={item.image} alt={item.name} className="rounded" style={{ width: "100px", height: "100px", objectFit: "cover" }} />

                            <div className="ms-3 flex-grow-1">
                                <h5 className="fw-bold">{item.name}</h5>
                                <p className="text-muted small">{item.description}</p>
                                <div className="d-flex justify-content-between align-items-center">


                                    <p className="fw-bold" style={{ margin: "0" }}>₹ {item.price} <span className="text-decoration-line-through text-muted">₹ {item.oldPrice}</span></p>


                                    {item.quantity > 0 ? (
                                        <div className="btn-a d-flex align-items-center">
                                            <Button variant="outline-warning" className="p-1 border-0 me-2">
                                                <FaPencilAlt />
                                            </Button>

                                            <div className="d-flex align-items-center">
                                                <div className="btn-b bg-warning d-flex align-items-center p-1 rounded-pill">
                                                    <Button
                                                        variant="warning"
                                                        className="add border-0 d-flex align-items-center justify-content-center"
                                                        style={{ width: "35px", height: "35px", backgroundColor: "transparent", color: "black", border: "none" }}
                                                        onClick={() => decrement(item.id)}
                                                    >
                                                        −
                                                    </Button>
                                                    <span className="fw-bold text-center" style={{ minWidth: "30px", maxWidth: "30px", display: "inline-block", textAlign: "center" }}>
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="warning"
                                                        className="add border-0 d-flex align-items-center justify-content-center"
                                                        style={{ width: "35px", height: "35px", backgroundColor: "transparent", color: "black", border: "none" }}
                                                        onClick={() => increment(item.id)}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className=" bg-warning d-flex align-items-center p-1 rounded-pill">
                                                <Button
                                                    variant="warning"
                                                    className="animation-h add-now border-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: "100%", height: "35px", backgroundColor: "transparent", color: "black", border: "none", padding:"0px 11px" }}
                                                    onClick={() => decrement(item.id)}
                                                >
                                                    Add Now
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MenuItems;
