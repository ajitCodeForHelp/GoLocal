import React from "react";
import AccountMerge from "../AccountMerge";
import MyOrder from "./MyOrder";

function MyOrderParent() {
    return (
        <>
            <AccountMerge getComponent={<MyOrder />} />
        </>
    )
}
export default MyOrderParent;