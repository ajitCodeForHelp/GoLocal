import React, { useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmPopup from "../../CommonComponents/Popups/ConfirmsPopup";

function AddAdminBanner() {
    const navigation = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const location = useLocation();
    const dataToUpdate = location && location.state

    const [isloading, setisLoading] = useState(false);
    const [title, setTitle] = useState(isEditMode ? dataToUpdate?.title : '');
    const [bannerTypeEnum, setBannerTypeEnum] = useState(isEditMode ? dataToUpdate?.bannerTypeEnum : '');
    const [imagePreviews, setImagePreviews] = useState(isEditMode ? dataToUpdate?.bannerImageUrl : "");
    const [onclickRedirectUrl, setOnclickRedirectUrl] = useState(isEditMode ? dataToUpdate?.onclickRedirectUrl : '');

    const Save = async () => {
        setisLoading(true);
        const content = {
            title: title,
            bannerTypeEnum: bannerTypeEnum,
            bannerImageUrl: String(imagePreviews[0]),
            onclickRedirectUrl: onclickRedirectUrl
        };
        const token = sessionStorage.getItem('tokenKey');
        try {
            const res = await fetch(`${BASE_URL}/admin/v1/banner/save`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(content)
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                // navigation(-1);
                btnText(true, "", "", "ok", "Banner Added Successfully !");
            } else {
                btnText(true, "ok", "", "", "Banner Added Successfully !");
            }
        } catch (e) {
            console.error(e, 'Error saving banner');
            alert("Something went wrong while saving the banner.");
        } finally {
            setisLoading(false);
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
        Save();
        btnText(false, "", "", "", "");
    };
    const OnThirdBtn = () => {
        navigation("/admin/banner");
        btnText(false, "", "", "", "");
    };
    const handleSubmit = () => {
        if (!title || !bannerTypeEnum || !onclickRedirectUrl) {
            btnText(true, "ok", "", "", "Kindly fill the Input!");
            return;
        } else {
            btnText(true, "cancel", "ok", "", "Confirm the Submit")
        }
    };

    const handleEdit = async () => {
        setisLoading(true);
        const content = {
            title: title,
            bannerTypeEnum: bannerTypeEnum,
            bannerImageUrl: String(imagePreviews[0]),
            onclickRedirectUrl: onclickRedirectUrl
        };
        const token = sessionStorage.getItem('tokenKey');
        try {
            const res = await fetch(`${BASE_URL}/admin/v1/banner/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(content),
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                alert("Vendor updated successfully!");
                navigation("/admin/banner");
            } else {
                const error = await res.json();
                console.error("Error:", error);
                alert("Failed to add vendor");
            }
        } catch (err) {
            console.error("Submit Error:", err);
        }finally {
            setisLoading(false);
        }
    };

    return (
        <>
            <div className="main-form">
                <div className="form-container">
                    <div className="step active" data-step="1">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>{isEditMode ? "Update Banner" : "Add Banner"}</h2>
                            <h2 onClick={() => navigation(-1)} role="button">
                                <ImCancelCircle />
                            </h2>
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bannerType">Banner Type</label>
                            <input
                                type="text"
                                id="bannerType"
                                required
                                value={bannerTypeEnum}
                                onChange={(e) => setBannerTypeEnum(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="redirectUrl">Redirect URL</label>
                            <input
                                type="text"
                                id="redirectUrl"
                                required
                                value={onclickRedirectUrl}
                                onChange={(e) => setOnclickRedirectUrl(e.target.value)}
                            />
                        </div>

                        <div className="form-group d-flex gap-5 justify-content-between align-items-center">
                            <div className="form-inner-group w-25">
                                <label>Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    className="d-none"
                                // onChange={handleImageChange}
                                />
                                <label
                                    htmlFor="image"
                                    role="button"
                                    style={{ fontSize: "8rem" }}
                                    className="border w-100 border-2 rounded h-25 d-flex justify-content-center align-items-center"
                                >
                                    <MdOutlineFoodBank />
                                </label>
                                {imagePreviews.length > 0 && (
                                    <img
                                        src={imagePreviews[0]}
                                        alt="Preview"
                                        className="mt-3"
                                        style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="buttons mt-4">
                            <div></div>
                            <button className="next" onClick={() => { isEditMode ? handleEdit() : handleSubmit() }} disabled={isloading}>
                                {isloading ? "Submitting..." : "Submit"}
                            </button>
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
    );
}

export default AddAdminBanner;
