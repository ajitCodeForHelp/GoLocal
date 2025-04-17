import React, { useEffect, useState } from "react";

function Vendor() {
    const BASE_URL = process.env.REACT_APP_BASR_URL;
    const [data, setData] = useState([]);
    
    const apiRes = async (which) => {
        try {
            const res = await fetch(`${BASE_URL}/admin/v1/vendor/list/${which}`)
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setData(getRes.responsePacket);
            }
        } catch (e) {
            console.group(e, "error in apiRes")
        }
    };
    useEffect(() => {
        apiRes("All");
    }, []);

    return (
        <div className="">

        </div>
    )
};
export default Vendor;