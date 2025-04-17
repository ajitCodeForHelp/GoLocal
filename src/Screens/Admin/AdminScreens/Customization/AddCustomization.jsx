import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineFoodBank } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

function AddCustomization() {
    const navigation = useNavigate();
    const [options, setOptions] = useState([
        { name: "", price: 0 }
    ]);

    const addOptions = () => {
        setOptions([
            ...options, { name: "", price: 0 }
        ])
    };
    const handleChange = (e, index) => {
        const { value, name } = e.target
        setOptions(prev => prev.map((itm, i) =>
            i === index ? { ...itm, [name]: value } : itm
        ))
    }

    const delOptions = (index) => {
        setOptions(options.filter((_, i) => i !== index))
    }

    return (
        <div className="main-form">
            <div className="form-container">
                <div className="step active" data-step="1">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Add Item Customization</h2>
                        <h2 onClick={() => navigation(-1)} role="button"><ImCancelCircle /></h2>
                    </div>


                    <div className="form-group">
                        <label for="company">Title</label>
                        <input type="text" id="company" required />
                        <div className="error d-none">Please enter your Title</div>
                    </div>

                    <div className="form-group">
                        <label for="contact">Customization Type</label>
                        {/* <input type="text" id="category" required /> */}
                        <select name="" id="">
                            <option value="">Select</option>
                            <option value="category1">MultiSelect</option>
                            <option value="category1">Single Selction</option>
                        </select>
                        <div className="error d-none">Please enter Customization Type</div>
                    </div>

                    <label htmlFor="">Options</label>
                    {options.map((itm, index) => {
                        return (
                            <div className="form-group d-flex justify-content-between align-items-center w-100">
                                <div className="form-inner-group" style={{ width: "42%" }}>
                                    <input type="text" name="name" onChange={(e) => handleChange(e, index)} value={itm.name} required placeholder="Name" />
                                </div>
                                <div className="form-inner-group ms-2" style={{ width: "42%" }}>
                                    <input type="number" name="price" onChange={(e) => handleChange(e, index)} value={itm.price} required placeholder="Price" />
                                </div>
                                <div className="form-inner-group ms-2" style={{ width: "10%" }}>
                                    {index === 0 ? <div className="addbtn text-center rounded" onClick={addOptions}>+</div> : <div className="delbtn text-center rounded" onClick={() => delOptions(index)}>X</div>}
                                </div>
                            </div>
                        )
                    })}


                    <div className="buttons">
                        <div></div>
                        <button className="next">Submit</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default AddCustomization;