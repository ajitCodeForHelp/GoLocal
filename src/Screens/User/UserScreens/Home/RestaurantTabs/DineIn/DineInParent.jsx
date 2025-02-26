import React from "react";
import Merge from "../Merge";
import DineIn from "./DineIn";

function DineInParent (){
    return(
        <>
         <Merge getComponent={<DineIn/>} />
        </>
    )
}
export default DineInParent