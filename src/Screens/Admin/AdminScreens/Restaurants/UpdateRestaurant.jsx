import React, { useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmPopup from "../../CommonComponents/Popups/ConfirmsPopup";

function UpdateRestaurant() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigation = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const product = location && location.state;
    const [hour, min] = product?.restaurantClosingTime.split(":").map(Number);
    const [formData, setFormData] = useState({
        orderPrefix: product ? product?.orderPrefix : "",
        restaurantTitle: product ? product?.restaurantTitle : "",
        restaurantDescription: product ? product?.restaurantDescription : "",
        restaurantLicenseNumber: product ? product?.restaurantLicenseNumber : "",
        iconImageUrl: product ? product?.iconImageUrl : "",
        autoAcceptOrder: product ? product?.autoAcceptOrder ? true : false : false,
        restaurantAddress: {
            street: product ? product?.restaurantAddress?.street : "",
            city: product ? product?.restaurantAddress?.city : "",
            pincode: product ? product?.restaurantAddress?.pincode : "",
            state: product ? product?.restaurantAddress?.state : "",
            country: product ? product?.restaurantAddress?.country : "",
        },
        restaurantClosingTime: {
            hour: product ? hour : "",
            minute: product ? min : "",
        },
        restaurantClosedMessage: product ? product?.restaurantClosedMessage : "",
    });
    console.log(formData, "products");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleCheckBox = () => {
        setFormData((prev) => ({
            ...prev,
            autoAcceptOrder: formData.autoAcceptOrder ? false : true
        }))
    };
    // const handleClosingTimeChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         restaurantClosingTime: {
    //             ...prev.restaurantClosingTime,
    //             [name]: Number(value),
    //         },
    //     }));
    // };
    const formatTime = (hour, minute) => {
        const pad = (n) => n?.toString()?.padStart(2, "0");
        return `${pad(hour)}:${pad(minute)}`;
    };
    const handleTime = (e) => {
        const val = e.target.value;
        const [hour, min] = val.split(":").map(Number);
        setFormData((prev) => ({
            ...prev,
            restaurantClosingTime: {
                hour: hour,
                minute: min
            },
        }));
    };
    const handleAddress = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            restaurantAddress: {
                ...prev.restaurantAddress,
                [name]: value
            }
        }))
    };

    const apiRes = async (id) => {
        const payload = {
            orderPrefix: formData.orderPrefix,
            restaurantTitle: formData.restaurantTitle,
            restaurantDescription: formData.restaurantDescription,
            restaurantLicenseNumber: formData.restaurantLicenseNumber,
            iconImageUrl: formData.iconImageUrl,
            autoAcceptOrder: formData.autoAcceptOrder,
            restaurantAddress: formData.restaurantAddress,
            restaurantClosingTime: {
                hour: formData.restaurantClosingTime.hour,
                minute: formData.restaurantClosingTime.minute,
            },
            restaurantClosedMessage: formData.restaurantClosedMessage
        }
        try {
            const token = sessionStorage.getItem('tokenKey');
            const res = await fetch(`${BASE_URL}/vendor/v1/restaurant/get/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                btnText(true, "", "", "ok", "Restaurant updated Successfully ");
            }else{
                btnText(true, "ok", "", "", "Something went wrong !");
            }
        } catch (e) {
            console.log(e, "error in addd restuarant");
        }
    };


    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [firstBtn, setFirstBtn] = useState("");
    const [secondBtn, setSecondBtn] = useState("");
    const [thirdBtn, setThirdBtn] = useState("");
    const popupCancel = () => {
        btnText(false, "", "", "", "");
    };
    const btnText = (toggle, first, second, third, mess) => {
        setIsOpen(toggle);
        setFirstBtn(first);
        setSecondBtn(second);
        setThirdBtn(third);
        setMessage(mess);
    };
    const onConfirm = () => {
        apiRes(id);
        btnText(false, "", "", "", "");
    };
    const OnThirdBtn = () => {
        navigation("/admin/restaurant");
        btnText(false, "", "", "", "");
    };
    const handleSubmit = () => {
        if (!formData.restaurantTitle || !formData.orderPrefix || !formData.restaurantDescription || !formData.restaurantLicenseNumber || !formData.autoAcceptOrder || !formData.restaurantClosedMessage) {
            btnText(true, "ok", "", "", "Kindly fill all Inputs!");
            return;
        } else {
            btnText(true, "cancel", "ok", "", "Confirm the Submit")
        }
    };

    return (
        <>
            <div className="main-form">
                <div className="form-container">
                    <div className="step active" data-step="1">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Update Restaurant</h2>
                            <h2 onClick={() => navigation(-1)} role="button"><ImCancelCircle /></h2>
                        </div>
                        <div className="form-group">
                            <label for="company">Restaurant Name</label>
                            <input type="text" id="company" required value={formData.restaurantTitle} name="restaurantTitle" onChange={handleChange} />
                            <div className="error d-none">Please enter your name</div>
                        </div>


                        {/* <div className="form-group d-flex gap-5 justify-content-between align-items-center">
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
                        </div> */}

                        <div className="form-group">
                            <label for="address">Address</label>
                            <input type="text" id="address" required placeholder="street" value={formData.restaurantAddress.street} onChange={handleAddress} />
                            <div className="error d-none">Please enter Address</div>
                            <div className="form-group mt-3 d-flex justify-content-between align-items-center w-100">
                                <div className="form-inner-group w-50">
                                    {/* <label htmlFor="">Email</label> */}
                                    <input type="text" id="city" required placeholder="City" name="city" onChange={handleAddress} value={formData.restaurantAddress.city} />
                                </div>
                                <div className="form-inner-group w-50 ms-2">
                                    {/* <label htmlFor="">Phone Number</label> */}
                                    <input type="text" id="state" required placeholder="State" name="state" onChange={handleAddress} value={formData.restaurantAddress.state} />
                                </div>
                            </div>
                            <div className="form-group mt-3 d-flex justify-content-between align-items-center w-100">
                                <div className="form-inner-group w-50">
                                    {/* <label htmlFor="">Email</label> */}
                                    <input type="text" id="pin" required placeholder="Zip/pin Code" name="pincode" onChange={handleAddress} value={formData.restaurantAddress.pincode} />
                                </div>
                                <div className="form-inner-group w-50 ms-2">
                                    {/* <label htmlFor="">Phone Number</label> */}
                                    <input type="text" id="Country" required placeholder="Country" name="country" onChange={handleAddress} value={formData.restaurantAddress.country} />
                                </div>
                            </div>
                        </div>

                        <div className="form-group d-flex justify-content-between align-items-center w-100">
                            <div className="form-inner-group w-50">
                                <label htmlFor="">Order Prefix</label>
                                <input type="text" name="orderPrefix" value={formData.orderPrefix} onChange={handleChange} required />
                            </div>
                            <div className="form-inner-group w-50 ms-2">
                                <label htmlFor="">Restaurant License Number</label>
                                <input type="text" name="restaurantLicenseNumber" value={formData.restaurantLicenseNumber} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-group d-flex justify-content-between align-items-center w-100">
                            <div className="form-inner-group w-50">
                                <label htmlFor="time">Closing Time</label>
                                <input type="time" value={formatTime(formData.restaurantClosingTime.hour, formData.restaurantClosingTime.minute)} onChange={handleTime} id="time" />
                            </div>
                            <div className="form-inner-group w-50 ms-2 d-flex align-items-center justify-content-center">
                                <div className="d-flex gap-2 justify-content-end align-items-center mt-4">
                                    <input style={{ width: "20px" }} role="button" type="checkbox" checked={formData.autoAcceptOrder} onChange={handleCheckBox} name="" id="night-available" />
                                    <label className="mb-0" role="button" htmlFor="night-available">Auto Accept Order</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="company">Restaurant Closed Message</label>
                            <input type="text" name="restaurantClosedMessage" required value={formData.restaurantClosedMessage} onChange={handleChange} />
                            {/* <div className="error d-none">Please enter your name</div> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea name="restaurantDescription" value={formData.restaurantDescription} onChange={handleChange} id="description"></textarea>
                        </div>
                        <div className="form-group d-flex gap-5 justify-content-between align-items-center">
                            <div className="form-inner-group w-25">
                                <label>Logo</label>
                                <input type="file" id="image" className="d-none" />
                                <label htmlFor="image" role="button" style={{ fontSize: "8rem" }} className="border w-100 border-2 rounded h-25 d-flex justify-content-center align-items-center">
                                    <MdOutlineFoodBank />
                                </label>
                            </div>
                            {/* <div className="d-flex gap-2 justify-content-start align-items-center w-50">
                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                    <input style={{ width: "20px" }} role="button" type="checkbox" name="" id="takeAway" />
                                    <label className="mb-0" role="button" htmlFor="takeAway">Take Away/ Delivery Available</label>
                                </div>
                            </div> */}
                        </div>

                        <div className="buttons">
                            <div></div>
                            <button className="next" type="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmPopup
                isOpen={isOpen}
                firstBtn={firstBtn}
                secondBtn={secondBtn}
                thirdBtn={thirdBtn}
                onCancel={popupCancel}
                onConfirm={onConfirm}
                message={message}
                onThird={OnThirdBtn}
            />
        </>
    )
}
export default UpdateRestaurant