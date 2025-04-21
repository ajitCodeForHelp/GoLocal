import React, { useEffect, useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import ConfirmPopup from "../../CommonComponents/Popups/ConfirmsPopup";
import { IoFastFoodSharp } from "react-icons/io5";
function UpdateItemAddOn() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const navigation = useNavigate();
    const [categoryId, setCategoryId] = useState([]);
    const fetchParentCategoryId = async () => {
        try {
            const token = sessionStorage.getItem('tokenKey');
            const restaurantId = sessionStorage.getItem('restaurantId');
            const res = await fetch(`${BASE_URL}/vendor/v1/${restaurantId}/category/parent-key-value-list`, {
                headers: {
                    'Application': `Bearer ${token}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setCategoryId(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in api");
        }
    };
    useEffect(() => {
        fetchParentCategoryId();
    }, []);

    const [formData, setFormData] = useState({
        title: "",
        categoryId: "",
        sortOrder: 0,
        addOnPrice: 0,
    });

    const apiRes = async () => {
        const payload = {
            title: formData.title,
            categoryId: formData.categoryId,
            sortOrder:formData.sortOrder,
            addOnPrice:formData.addOnPrice,
        };

        try {
            const token = sessionStorage.getItem('tokenKey');
            const restaurantId = sessionStorage.getItem('restaurantId');
            const res = await fetch(`${BASE_URL}/vendor/v1/${restaurantId}/itemAddOn/save`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                btnText(true, "", "", "ok", "Item Added Successfully ");
            }
        } catch (e) {
            console.log(e, "error in add api");
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
        navigation("/admin/item");
        btnText(false, "", "", "", "");
    };
    const handleSubmit = () => {
        const requiredFields = ['title', 'addOnPrice', 'categoryId', 'sortOrder'];
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
                            <select name="parentCategoryId" value={formData.parentCategoryId} onChange={handleChange} id="">
                                {
                                    categoryId.map((item) => {
                                        return (
                                            <option value={item.value}>{item.label}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className="error d-none">Please enter catgory</div>
                        </div>
                        <div className="form-group d-flex justify-content-between align-items-center w-100">
                            <div className="form-inner-group w-50">
                                <label htmlFor="">Sort Order</label>
                                <input type="number" id="mrp" required onChange={handleChange} value={formData.sortOrder} name="sortOrder" />
                            </div>
                            <div className="form-inner-group w-50 ms-2">
                                <label htmlFor="sp">Add On Price</label>
                                <input type="number" value={formData.addOnPrice} name="addOnPrice" onChange={handleChange} id="sp" required />
                            </div>
                        </div>
                        <div className="buttons">
                            <div></div>
                            <button className="next" onClick={handleSubmit}>Submit</button>
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
export default UpdateItemAddOn;