import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LoginPage from '../Screens/Admin/CommonComponents/LoginPage';

function Auth() {
    const token = true;
    const navigation = useNavigate();
    return (
        <>
            {
                token ? <Outlet /> : navigation("/login")
            }
        </>
    )
}
export default Auth;