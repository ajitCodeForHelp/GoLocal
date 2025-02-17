import React, { useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";

function AddItem() {
    const navigation = useNavigate();
    const [form, setForm] = useState([
        {
            title: "",
            category: "",
            subCategory: "",
            description: "",
            mrp: "",
            sellingPrice: "",
            startTime: "",
            endTime: "",
            imageUrl: "",
            veg: false,
            nightAvailable: false,
        }
    ]);
    const handleChange = (field, e) => {

    }
    return (
        <>
            <div className="main-form">
                <div className="form-container">
                    <div className="step active" data-step="1">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Add Item</h2>
                            <h2 onClick={() => navigation(-1)} role="button"><ImCancelCircle /></h2>
                        </div>
                        <div className="form-group">
                            <label for="company">Title</label>
                            <input type="text" id="company" required />
                            <div className="error d-none">Please enter your item name</div>
                        </div>
                        <div className="form-group">
                            <label for="contact">Category</label>
                            {/* <input type="text" id="category" required /> */}
                            <select name="" id="">
                                <option value="">Select category</option>
                                <option value="category1">category1</option>
                                <option value="category1">category1</option>
                                <option value="category1">category1</option>
                            </select>
                            <div className="error d-none">Please enter catgory</div>
                        </div>
                        <div className="form-group">
                            <label for="text">Sub category</label>
                            <select name="" id="">
                                <option value="">Select Sub category</option>
                                <option value="category1">category1</option>
                                <option value="category1">category1</option>
                                <option value="category1">category1</option>
                            </select>
                            <div className="error d-none">Please enter a valid email address</div>
                        </div>
                        <div className="form-group d-flex gap-5 justify-content-between align-items-center">
                            <div className="d-flex gap-3 justify-content-start align-items-center">
                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                    <input type="radio" role="button" name="disType" id="nonveg" />
                                    <label className="mb-0" role="button" htmlFor="nonveg">Nonveg</label>
                                </div>
                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                    <input type="radio" name="disType" role="button" id="veg" />
                                    <label className="mb-0" role="button" htmlFor="veg">Veg</label>
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-start align-items-center">
                                <input style={{ width: "20px" }} role="button" type="checkbox" name="" id="night-available" />
                                <label className="mb-0" role="button" htmlFor="night-available">Available In Night</label>
                            </div>
                        </div>
                        <div className="form-group d-flex justify-content-between align-items-center w-100">
                            <div className="form-inner-group w-50">
                                <label htmlFor="">MRP</label>
                                <input type="number" id="mrp" required />
                            </div>
                            <div className="form-inner-group w-50 ms-2">
                                <label htmlFor="">Selling Price</label>
                                <input type="number" id="mrp" required />
                            </div>
                        </div>

                        <div className="form-group d-flex justify-content-between align-items-center w-100">
                            <div className="form-inner-group w-50">
                                <label htmlFor="time">Start Time</label>
                                <input type="time" id="time" />
                            </div>
                            <div className="form-inner-group w-50 ms-2">
                                <label htmlFor="end-time">End Time</label>
                                <input type="time" id="end-time" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea name="" id="description"></textarea>
                        </div>
                        <div className="form-group d-flex gap-5 justify-content-between align-items-center">
                            <div className="form-inner-group w-25">
                                <label>Image</label>
                                <input type="file" id="image" className="d-none" />
                                <label htmlFor="image" role="button" style={{ fontSize: "8rem" }} className="border w-100 border-2 rounded h-25 d-flex justify-content-center align-items-center">
                                    <MdOutlineFoodBank />
                                </label>
                            </div>
                            <div className="d-flex gap-2 justify-content-start align-items-center w-50">
                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                    <input style={{ width: "20px" }} role="button" type="checkbox" name="" id="takeAway" />
                                    <label className="mb-0" role="button" htmlFor="takeAway">Take Away/ Delivery Available</label>
                                </div>
                            </div>
                        </div>


                        <div className="buttons">
                            <div></div>
                            <button className="next">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddItem;