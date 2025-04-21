import React, { useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import ConfirmPopup from "../../CommonComponents/Popups/ConfirmsPopup";

function AddUpdateCoupon() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const navigation = useNavigate();
    const [restaurantTitle, setRestaurantTitle] = useState();
    const [formData, setFormData] = useState({
        title: "",
        startDate: "",
        endDate: "",
        discountValue: "",
    });

    const apiRes = async () => {
        const payload = {
            title: formData.title,
            startData: formData.startDate,
            endDate: formData.endDate,
            discountValue: formData.discountValue
        }
        try {
            const token = sessionStorage.getItem('tokenKey');
            const restaurantId = sessionStorage.getItem('restaurantId');
            const res = await fetch(`${BASE_URL}/vendor/v1/${restaurantId}/coupon-code/save`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                btnText(true, "", "", "ok", "Coupon Added Successfully ");
            }
        } catch (e) {
            console.log(e, "error in addd coupon");
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => (
            { ...prev, [name]: value }
        ));
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
        navigation("/admin/coupon");
        btnText(false, "", "", "", "");
    };
    const handleSubmit = () => {
        if (!formData.title || !formData.endDate || !formData.startDate || !formData.discountValue) {
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
                            <h2>Add Coupon</h2>
                            <h2 onClick={() => navigation(-1)} role="button"><ImCancelCircle /></h2>
                        </div>
                        <div className="form-group d-flex justify-content-between align-items-center w-100">
                            <div className="form-inner-group w-50">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" name="title" required value={formData.title} onChange={handleChange} />
                            </div>
                            <div className="form-inner-group w-50 ms-2">
                                <label htmlFor="discountValue">Discount Value</label>
                                <input type="number" id="discountValue" name="discountValue" required value={formData.discountValue} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group d-flex justify-content-between align-items-center w-100">
                            <div className="form-inner-group w-50">
                                <label htmlFor="startDate">Start Date</label>
                                <input type="date" id="startDate" name="startDate" required value={formData.startDate} onChange={handleChange} />
                            </div>
                            <div className="form-inner-group w-50 ms-2">
                                <label htmlFor="endDate">End Date</label>
                                <input type="date" id="endDate" name="endDate" required value={formData.endDate} onChange={handleChange} />
                            </div>
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
export default AddUpdateCoupon