import React, { useState } from "react";
import "./LoginStyle.css";

const Login = () => {
    const BASE_URL = process.env.REACT_APP_BASR_URL;
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call your login API here
        const res = await fetch(`${BASE_URL}/auth/vendor-login`, {
            method: "POST",
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        });
        const getRes = await res.json();
        if (getRes.errorCode === 0) {
            alert("login");
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>
                <input
                    type="text"
                    placeholder="email address"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="password"
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
