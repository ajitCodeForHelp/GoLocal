// import React, { useState } from "react";
// import { MdOutlineFoodBank } from "react-icons/md";
// import { ImCancelCircle } from "react-icons/im";
// import { useNavigate } from "react-router-dom";

// function AddNewVendor() {
//     const navigation = useNavigate();
//     return (
//         <div className="main-form">
//             <div className="form-container">
//                 <div className="step active" data-step="1">
//                     <div className="d-flex justify-content-between align-items-center">
//                         <h2>Add Vendor</h2>
//                         <h2 onClick={() => navigation(-1)} role="button"><ImCancelCircle /></h2>
//                     </div>
//                     <div className="form-group d-flex justify-content-between align-items-center w-100">
//                         <div className="form-inner-group w-50">
//                             <label htmlFor="firstName">First Name</label>
//                             <input type="text" id="firstName" required />
//                         </div>
//                         <div className="form-inner-group w-50 ms-2">
//                             <label htmlFor="lastName">Last Name</label>
//                             <input type="text" id="lastName" required />
//                         </div>
//                     </div>
//                     <div className="form-group d-flex justify-content-between align-items-center w-100">
//                         <div className="form-inner-group w-50">
//                             <label htmlFor="userName">User Name</label>
//                             <input type="text" id="userName" required />
//                         </div>
//                         <div className="form-inner-group w-50 ms-2">
//                             <label htmlFor="pass">Password</label>
//                             <input type="text" id="pass" required />
//                         </div>
//                     </div>
//                     <label>Contact Detail</label>
//                     <div className="form-group d-flex justify-content-between align-items-center w-100">
//                         <div className="form-inner-group w-50">
//                             <input type="text" placeholder="Contact Name" required />
//                         </div>
//                         <div className="form-inner-group w-50 ms-2">
//                             <input type="number" placeholder="Contact Number" required />
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="email">Email</label>
//                         <input type="email" placeholder="Email" id="email" required />
//                     </div>

//                     <div className="form-group d-flex gap-5 justify-content-start align-items-center">
//                         <div className="form-inner-group w-25">
//                             <label>Image</label>
//                             <input type="file" id="image" className="d-none" />
//                             <label htmlFor="image" role="button" style={{ fontSize: "8rem" }} className="border w-100 border-2 rounded h-25 d-flex justify-content-center align-items-center">
//                                 <MdOutlineFoodBank />
//                             </label>
//                         </div>
//                     </div>
//                     <div className="buttons">
//                         <div></div>
//                         <button className="next">Submit</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };
// export default AddNewVendor;

import React, { useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddNewVendor() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem('tokenKey');
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const location = useLocation();
    const dataToUpdate = location && location.state

    const [formData, setFormData] = useState({
        firstName: isEditMode ? dataToUpdate?.firstName : "",
        lastName: isEditMode ? dataToUpdate?.lastName : "",
        ...(!isEditMode && { username: "" }),
        ...(!isEditMode && { password: "" }),
        contactName: isEditMode ? dataToUpdate?.contactDetail?.contactName : "",
        contactNumber: isEditMode ? dataToUpdate?.contactDetail?.contactNumber : "",
        contactEmail: isEditMode ? dataToUpdate?.contactDetail?.contactEmail : "",
        photoImageUrl: isEditMode ? dataToUpdate?.photoImageUrl : "",
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleContactChange = (e) => {
        const { placeholder, value } = e.target;
        const key =
            placeholder === "Contact Name"
                ? "contactName"
                : placeholder === "Contact Number"
                    ? "contactNumber"
                    : "contactEmail";
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, photoImageUrl: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            ...(!isEditMode && { password: formData.password }),
            photoImageUrl: "", // will be replaced by uploaded URL if needed
            contactDetail: {
                contactName: formData.contactName,
                contactNumber: formData.contactNumber,
                contactEmail: formData.contactEmail,
            },
        };

        // // If image needs to be uploaded separately, do it here first
        // if (formData.photoImageUrl) {
        //     const imageData = new FormData();
        //     imageData.append("file", formData.photoImageUrl);

        //     try {
        //         const imgRes = await fetch(``, {
        //             method: "POST",
        //             body: imageData,
        //         });
        //         const imgData = await imgRes.json();
        //         payload.photoImageUrl = imgData.url; // adjust based on your response
        //     } catch (err) {
        //         console.error("Image upload failed", err);
        //     }
        // }

        try {
            const res = await fetch(`${BASE_URL}/admin/v1/vendor/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                alert("Vendor added successfully!");
                navigate(-1);
            } else {
                const error = await res.json();
                console.error("Error:", error);
                alert("Failed to add vendor");
            }
        } catch (err) {
            console.error("Submit Error:", err);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            photoImageUrl: "", // will be replaced by uploaded URL if needed
            contactDetail: {
                contactName: formData.contactName,
                contactNumber: formData.contactNumber,
                contactEmail: formData.contactEmail,
            },
        };

        // // If image needs to be uploaded separately, do it here first
        // if (formData.photoImageUrl) {
        //     const imageData = new FormData();
        //     imageData.append("file", formData.photoImageUrl);

        //     try {
        //         const imgRes = await fetch(``, {
        //             method: "POST",
        //             body: imageData,
        //         });
        //         const imgData = await imgRes.json();
        //         payload.photoImageUrl = imgData.url; // adjust based on your response
        //     } catch (err) {
        //         console.error("Image upload failed", err);
        //     }
        // }

        try {
            const res = await fetch(`${BASE_URL}/admin/v1/vendor/update/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                alert("Vendor updated successfully!");
                navigate(-1);
            } else {
                const error = await res.json();
                console.error("Error:", error);
                alert("Failed to add vendor");
            }
        } catch (err) {
            console.error("Submit Error:", err);
        }
    };

    return (
        <form className="main-form" onSubmit={() => { isEditMode ? handleEdit() : handleSubmit() }}>
            <div className="form-container">
                <div className="step active" data-step="1">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>{isEditMode ? "Update Vendor" : "Add Vendor"}</h2>
                        <h2 onClick={() => navigate(-1)} role="button">
                            <ImCancelCircle />
                        </h2>
                    </div>

                    <div className="form-group d-flex justify-content-between align-items-center w-100">
                        <div className="form-inner-group w-50">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" required value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="form-inner-group w-50 ms-2">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" required value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>

                    {!isEditMode && <div className="form-group d-flex justify-content-between align-items-center w-100">
                        <div className="form-inner-group w-50">
                            <label htmlFor="username">User Name</label>
                            <input type="text" id="username" required value={formData.username} onChange={handleChange} />
                        </div>
                        <div className="form-inner-group w-50 ms-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required value={formData.password} onChange={handleChange} />
                        </div>
                    </div>}

                    <label>Contact Detail</label>
                    <div className="form-group d-flex justify-content-between align-items-center w-100">
                        <div className="form-inner-group w-50">
                            <input
                                type="text"
                                placeholder="Contact Name"
                                required
                                value={formData.contactName}
                                onChange={handleContactChange}
                            />
                        </div>
                        <div className="form-inner-group w-50 ms-2">
                            <input
                                type="number"
                                placeholder="Contact Number"
                                required
                                value={formData.contactNumber}
                                onChange={handleContactChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactEmail">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            id="contactEmail"
                            required
                            value={formData.contactEmail}
                            onChange={handleContactChange}
                        />
                    </div>

                    <div className="form-group d-flex gap-5 justify-content-start align-items-center">
                        <div className="form-inner-group w-25">
                            <label>Image</label>
                            <input type="file" id="image" className="d-none" onChange={handleImageChange} />
                            <label
                                htmlFor="image"
                                role="button"
                                style={{
                                    fontSize: "8rem",
                                    height: "150px",
                                    overflow: "hidden",
                                    objectFit: "cover",
                                    padding: "10px",
                                }}
                                className="border w-100 border-2 rounded d-flex justify-content-center align-items-center"
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                ) : (
                                    <MdOutlineFoodBank />
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="buttons d-flex justify-content-end mt-4">
                        <button type="submit" className="next btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddNewVendor;
