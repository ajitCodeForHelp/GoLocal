import React, { useEffect, useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import ConfirmPopup from "../../CommonComponents/Popups/ConfirmsPopup";

function AddUpdateAppCode() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const navigation = useNavigate();
    const [vendorId, setVendorId] = useState([]);
    const [restaurantId, setRestaurantId] = useState([]);
    const fetchVendorId = async () => {
        const token = sessionStorage.getItem('tokenKey');
        try {
            const res = await fetch(`${BASE_URL}/admin/v1/vendor/vendor-key-list`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setVendorId(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in Fetching Vendor Id");
        }
    };
    const fetchRestaurant = async () => {
        const token = sessionStorage.getItem('tokenKey');
        try {
            const res = await fetch(`${BASE_URL}/vendor/v1/restaurant/get-my-restaurant-id`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setRestaurantId(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in fetching restaurant");
        }
    };
    useEffect(() => {
        fetchVendorId();
        fetchRestaurant();
    }, []);

    const [restaurant, setRestaurant] = useState();
    const [vendor, setVendor] = useState();
    const [appCode, setAppCode] = useState();

    const apiRes = async () => {
        try {
            const token = sessionStorage.getItem('tokenKey');
            const res = await fetch(`${BASE_URL}/admin/v1/app-code/save`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    vendorId:vendor,
                    restaurantId:restaurant,
                    appCodeId:appCode
                })
            })
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                btnText(true, "", "", "ok", "App Code Added Successfully ");
            }
        } catch (e) {
            console.log(e, "error in add app code");
        }
    };
    const handleChange = (e) => {
        const {name,value} = e.target;
        if(name === "appCodeId" && value){
            setAppCode(value)
        }else if(name === "restaurantId" && value){
            setRestaurant(value);
        }else if(name === "vendorId" && value){
            setVendor(value);
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
        apiRes();
        btnText(false, "", "", "", "");
    };
    const OnThirdBtn = () => {
        navigation("/admin/appCode");
        btnText(false, "", "", "", "");
    };
    const handleSubmit = () => {
        if (!appCode) {
            btnText(true, "ok", "", "", "Kindly fill the Input!");
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
                            <h2>Save App Code</h2>
                            <h2 onClick={() => navigation(-1)} role="button"><ImCancelCircle /></h2>
                        </div>
                        <div className="form-group">
                            <label for="company">Restaurant Id</label>
                            {/* <input type="text" id="company" required value={restaurantTitle} onChange={handleChange} /> */}
                            <select id=""name="restaurantId" value={restaurant} onChange={handleChange}>
                                {
                                    restaurantId.map((itm) => {
                                        return (
                                            <option value={itm.key}>{itm.label}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className="error d-none">Please select Restaurant</div>
                        </div>
                        <div className="form-group">
                            <label for="company">Vendor Id</label>
                            {/* <input type="text" id="company" required value={restaurantTitle} onChange={handleChange} /> */}
                            <select id="" name="vendorId" onChange={handleChange} value={vendor}>
                                {
                                    vendorId.map((itm) => {
                                        return (
                                            <option value={itm.key}>{itm.label}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className="error d-none">Please select vendor name</div>
                        </div>
                        <div className="form-group">
                            <label for="company">App Code</label>
                            <input type="text" id="company" name="appCodeId" required value={restaurant} onChange={handleChange} />

                            <div className="error d-none">Please enter app code</div>
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
};
export default AddUpdateAppCode;