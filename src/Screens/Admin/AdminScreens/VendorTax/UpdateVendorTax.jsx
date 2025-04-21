import React, { useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import ConfirmPopup from "../../CommonComponents/Popups/ConfirmsPopup";

function UpdateVendorTax() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const navigation = useNavigate();
    const [restaurantTitle, setRestaurantTitle] = useState();
    const [formData, setFormData] = useState({
        title: "",
        taxPercentage: "",
    });

    const apiRes = async () => {
        const payload = {
            title: formData.title,
            taxPercentage: formData.taxPercentage,
        }
        try {
            const token = sessionStorage.getItem('tokenKey');
            const res = await fetch(`${BASE_URL}/vendor/v1/restaurant/save`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                btnText(true, "", "", "ok", "Tax Added Successfully ");
            }
        } catch (e) {
            console.log(e, "error in addd restuarant");
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
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
        navigation("/admin/vendorTax");
        btnText(false, "", "", "", "");
    };
    const handleSubmit = () => {
        const requiredFields = ['title', 'taxPercentage'];
        const isAnyEmpty = requiredFields.some(field => !formData[field]);
        if (isAnyEmpty) {
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
                            <h2>Add Vendor Tax</h2>
                            <h2 onClick={() => navigation(-1)} role="button"><ImCancelCircle /></h2>
                        </div>
                        <div className="form-group">
                            <label for="company">Title</label>
                            <input type="text" id="company" required value={formData.title} onChange={handleChange} />
                            <div className="error d-none">Please enter title</div>
                        </div>
                        <div className="form-group">
                            <label for="company">Tax Percentage</label>
                            <input type="text" id="company" required value={formData.taxPercentage} onChange={handleChange} />
                            <div className="error d-none">Please enter tax Percentage</div>
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
export default UpdateVendorTax;