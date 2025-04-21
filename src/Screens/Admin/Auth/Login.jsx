import React, { useState } from "react";
import "./LoginStyle.css";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const fetchRestaurantId = async () => {
        const token = sessionStorage.getItem('tokenKey');
        console.log(token, "token");
        try {
            const res = await fetch(`${BASE_URL}/vendor/v1/restaurant/get-my-restaurant-id`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                sessionStorage.setItem("restaurantId", getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in api");
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isVendor = location.pathname.includes("vendorLogin");
        const url = isVendor ? '/auth/vendor-login' : '/auth/admin-login'
        // Call your login API here
        try {
            const res = await fetch(`${BASE_URL}${url}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: userName,
                    password: password,
                })
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                alert("login");
                sessionStorage.setItem("tokenKey", getRes.responsePacket?.secretKey);
                fetchRestaurantId();
                navigate('/admin/dashboard')
            }
        } catch (e) {
            console.log(e, "error in login")
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>
                <input
                    type="text"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit" className="login-btn">LOGIN</button>
            </form>
        </div>
    );
};

export default Login;
