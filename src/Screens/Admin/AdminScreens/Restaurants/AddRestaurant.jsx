import React, { useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";

function AddRestaurant() {
    const navigation = useNavigate();
    return (
        <div className="main-form">
            <div className="form-container">
                <div className="step active" data-step="1">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Add Restaurant</h2>
                        <h2 onClick={() => navigation(-1)} role="button"><ImCancelCircle /></h2>
                    </div>
                    <div className="form-group">
                        <label for="company">Restaurant Name</label>
                        <input type="text" id="company" required />
                        <div className="error d-none">Please enter your name</div>
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
                            <div className="d-flex gap-2 justify-content-start align-items-center">
                                <input type="radio" name="disType" role="button" id="both" />
                                <label className="mb-0" role="button" htmlFor="both">Both</label>
                            </div>
                        </div>
                        <div className="d-flex gap-2 justify-content-start align-items-center">
                            <input style={{ width: "20px" }} role="button" type="checkbox" name="" id="night-available" />
                            <label className="mb-0" role="button" htmlFor="night-available">Available In Night</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="address">Address</label>
                        <input type="text" id="address" required placeholder="Street Address" />
                        <div className="error d-none">Please enter Address</div>
                        <div className="form-group mt-3 d-flex justify-content-between align-items-center w-100">
                            <div className="form-inner-group w-50">
                                {/* <label htmlFor="">Email</label> */}
                                <input type="text" id="city" required placeholder="City"/>
                            </div>
                            <div className="form-inner-group w-50 ms-2">
                                {/* <label htmlFor="">Phone Number</label> */}
                                <input type="text" id="state" required placeholder="State"/>
                            </div>
                        </div>
                        <div className="form-group mt-3 d-flex justify-content-between align-items-center w-100">
                            <div className="form-inner-group w-50">
                                {/* <label htmlFor="">Email</label> */}
                                <input type="text" id="pin" required placeholder="Zip/pin Code"/>
                            </div>
                            <div className="form-inner-group w-50 ms-2">
                                {/* <label htmlFor="">Phone Number</label> */}
                                <input type="text" id="Country" required placeholder="Country"/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group d-flex justify-content-between align-items-center w-100">
                        <div className="form-inner-group w-50">
                            <label htmlFor="">Email</label>
                            <input type="email" id="email" required />
                        </div>
                        <div className="form-inner-group w-50 ms-2">
                            <label htmlFor="">Phone Number</label>
                            <input type="number" id="number" required />
                        </div>
                    </div>

                    <div className="form-group d-flex justify-content-between align-items-center w-100">
                        <div className="form-inner-group w-50">
                            <label htmlFor="time">Opening Time</label>
                            <input type="time" id="time" />
                        </div>
                        <div className="form-inner-group w-50 ms-2">
                            <label htmlFor="end-time">Closing Time</label>
                            <input type="time" id="end-time" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="" id="description"></textarea>
                    </div>
                    <div className="form-group d-flex gap-5 justify-content-between align-items-center">
                        <div className="form-inner-group w-25">
                            <label>Logo</label>
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
    )
}
export default AddRestaurant