import React, { useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import ConfirmPopup from "../../CommonComponents/Popups/ConfirmsPopup";

function AddRestaurant() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('tokenKey');

    const navigation = useNavigate();
    const [restaurantTitle, setRestaurantTitle] = useState();

    const apiRes = async () => {
        try {
            const res = await fetch(`${BASE_URL}/vendor/v1/restaurant/save`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    restaurantTitle: restaurantTitle
                })
            })
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                btnText(true, "", "", "ok", "Restaurant Added Successfully ");
            }
        } catch (e) {
            console.log(e, "error in addd restuarant");
        }
    };
    const handleChange = (e) => {
        const get = e.target.value;
        setRestaurantTitle(get);
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
        navigation("/admin/restaurant");
        btnText(false, "", "", "", "");
    };
    const handleSubmit = () => {
        if (!restaurantTitle) {
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
                            <h2>Add Restaurant</h2>
                            <h2 onClick={() => navigation(-1)} role="button"><ImCancelCircle /></h2>
                        </div>
                        <div className="form-group">
                            <label for="company">Restaurant Name</label>
                            <input type="text" id="company" required value={restaurantTitle} onChange={handleChange} />
                            <div className="error d-none">Please enter your name</div>
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
export default AddRestaurant