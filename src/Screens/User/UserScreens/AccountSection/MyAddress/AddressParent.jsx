import React from "react";
import AccountMerge from "../AccountMerge";
import Address from "./Address";

function AddressParent (){
    return(
        <>
        <AccountMerge getComponent={<Address/>}/>
        </>
    )
}
export default AddressParent ;