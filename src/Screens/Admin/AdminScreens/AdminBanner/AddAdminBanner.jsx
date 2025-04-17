import React, { useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";

function AddAdminBanner() {
    const navigation = useNavigate();

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    // const token = sessionStorage.getItem('tokenKey');
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IkRldiIsInUtaWQiOiI2ODAwYTIxMDJhYTA3NzRiYzliYzVmZTMiLCJ1LXR5IjoiUk9MRV9WRU5ET1IiLCJ0b2tlbiI6ImU3ZDIxMjgwNmY1YjhkM2IxNTM5NjIzNzQ4YmY2ZTE4NWQ0OTA1ZTk1ODg5MTJmNWYyMjI5ZjA0MjhjNmJjNjUiLCJ2ZW5kb3JJZCI6IiIsInN1YiI6IkRldiIsImlhdCI6MTc0NDg4MDMzMCwiZXhwIjoxNzQ1NDg1MTMwfQ.HUk180fPsVr16cS2C_8jO0qd_Z5fzaCcJBhJU-yBlMHWUk1wfbjxzOtcnhTbUxUl8NxAYs-BrBJiHzS7sb0UHQ";


    const [isloading, setisLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [bannerTypeEnum, setBannerTypeEnum] = useState('');
    const [imagePreviews, setImagePreviews] = useState([]);
    const [onclickRedirectUrl, setOnclickRedirectUrl] = useState('');

   

    const Save = async () => {
        if (!title || !bannerTypeEnum || !onclickRedirectUrl) {
            alert("Please fill in all fields and upload an image.");
            return;
        }

        setisLoading(true);

        const content = {
            title: title,
            bannerTypeEnum: bannerTypeEnum,
            bannerImageUrl: String(imagePreviews[0]),
            onclickRedirectUrl: onclickRedirectUrl
        };

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
            console.log("Response:", getRes);
            alert("Banner saved successfully!");
            navigation(-1); // Navigate back
        } catch (e) {
            console.error(e, 'Error saving banner');
            alert("Something went wrong while saving the banner.");
        } finally {
            setisLoading(false);
        }
    };

   
    return (
        <div className="main-form">
            <div className="form-container">
                <div className="step active" data-step="1">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Add Banner</h2>
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
                        <button className="next" onClick={Save} disabled={isloading}>
                            {isloading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddAdminBanner;
