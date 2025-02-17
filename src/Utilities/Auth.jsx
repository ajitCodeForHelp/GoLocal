import React from 'react';
import { Outlet } from 'react-router-dom';

function Auth() {
    const token = true
    return (
        <>
            {
                token ? <Outlet /> : ""
            }
        </>
    )
}
export default Auth;