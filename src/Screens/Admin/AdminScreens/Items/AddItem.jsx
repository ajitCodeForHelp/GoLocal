import React, { useEffect, useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import ConfirmPopup from "../../CommonComponents/Popups/ConfirmsPopup";
import { IoFastFoodSharp } from "react-icons/io5";
function AddItem() {
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
        parentCategoryId: "",
        subCategoryId: "",
        description: "",
        vegNonVeg: "",
        itemImageUrl: "",
        sticker: "",
        maximumRetailPrice: "",
        salePrice: 0,
        requiredAddOnIdList: [],
        optionalAddOnIdList: [],
    });

    const apiRes = async () => {
        const payload = {
            title: formData.title,
            parentCategoryId: formData.parentCategoryId,
            subCategoryId: formData.subCategoryId,
            description: formData.description,
            vegNonVeg: formData.vegNonVeg,
            itemImageUrl: formData.itemImageUrl,
            sticker: formData.sticker,
            maximumRetailPrice: formData.maximumRetailPrice,
            salePrice: formData.salePrice,
            requiredAddOnIdList: formData.requiredAddOnIdList,
            optionalAddOnIdList: formData.optionalAddOnIdList,
        }
        try {
            const token = sessionStorage.getItem('tokenKey');
            const restaurantId = sessionStorage.getItem('restaurantId');
            const res = await fetch(`${BASE_URL}/vendor/v1/${restaurantId}/item/save`, {
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
    const handleVegNonveg = (e) => {
        const id = e.target.id
        setFormData((prev) => ({
            ...prev, vegNonVeg: id
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
        const requiredFields = ['description', 'itemImageUrl', 'maximumRetailPrice', 'title', 'salePrice'];
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
                        <div className="form-group">
                            <label for="text">Sub category</label>
                            <select name="subCategoryId" value={formData.subCategoryId} onChange={handleChange}>
                                <option value="">Select Sub category</option>
                                <option value="category1">category1</option>
                                <option value="category1">category1</option>
                                <option value="category1">category1</option>
                            </select>
                            <div className="error d-none">Please select subcategory</div>
                        </div>
                        <div className="form-group d-flex gap-5 justify-content-between align-items-center">
                            <div className="d-flex gap-3 justify-content-start align-items-center">
                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                    <input type="radio" role="button" value={formData.vegNonVeg} checked={formData.vegNonVeg === "Nonveg"} onChange={handleVegNonveg} name="vegNonveg" id="Nonveg" />
                                    <label className="mb-0" role="button" htmlFor="Nonveg">Nonveg</label>
                                </div>
                                <div className="d-flex gap-2 justify-content-start align-items-center">
                                    <input type="radio" name="vegNonveg" value={formData.vegNonVeg} checked={formData.vegNonVeg === "Veg"} onChange={handleVegNonveg} role="button" id="Veg" />
                                    <label className="mb-0" role="button" htmlFor="Veg">Veg</label>
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-start align-items-center">
                                {/* <input style={{ width: "20px" }} role="button" type="checkbox" name="" id="night-available" />
                                <label className="mb-0" role="button" htmlFor="night-available">Available In Night</label> */}
                            </div>
                        </div>
                        <div className="form-group d-flex justify-content-between align-items-center w-100">
                            <div className="form-inner-group w-50">
                                <label htmlFor="">MRP</label>
                                <input type="number" id="mrp" required onChange={handleChange} value={formData.maximumRetailPrice} name="maximumRetailPrice" />
                            </div>
                            <div className="form-inner-group w-50 ms-2">
                                <label htmlFor="sp">Selling Price</label>
                                <input type="number" value={formData.salePrice} name="salePrice" onChange={handleChange} id="sp" required />
                            </div>
                        </div>

                        {/* <div className="form-group d-flex justify-content-between align-items-center w-100">
                            <div className="form-inner-group w-50">
                                <label htmlFor="time">Start Time</label>
                                <input type="time" id="time" />
                            </div>
                            <div className="form-inner-group w-50 ms-2">
                                <label htmlFor="end-time">End Time</label>
                                <input type="time" id="end-time" />
                            </div>
                        </div> */}
                        {/* <div className="form-group">
                            <label for="text">Customization</label>
                            <select name="" id="">
                                <option value="">Select</option>
                                <option value="category1">category1</option>
                                <option value="category1">category1</option>
                                <option value="category1">category1</option>
                            </select>
                            <div className="error d-none">Please enter a valid email address</div>
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} id="description"></textarea>
                        </div>
                        <div className="form-group d-flex gap-5 justify-content-between align-items-center">
                            <div className="form-inner-group w-25">
                                <label>Image</label>
                                <input type="file" onChange={handleChange} value={formData.itemImageUrl} name="itemImageUrl" id="image" className="d-none" />
                                <label htmlFor="image" role="button" style={{ fontSize: "8rem" }} className="border w-100 border-2 rounded h-25 d-flex justify-content-center align-items-center">
                                    <MdOutlineFoodBank />
                                </label>
                            </div>
                            <div className="form-inner-group w-25">
                                <label>Sticker</label>
                                <input type="file" name="sticker" value={formData.sticker} onChange={handleChange} id="sticker" className="d-none" />
                                <label htmlFor="sticker" role="button" style={{ fontSize: "6rem", padding: "1rem" }} className="border w-100 border-2 rounded h-25 d-flex justify-content-center align-items-center">
                                    <IoFastFoodSharp />
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
export default AddItem;