import React from "react";
import Merge from "../Merge";
import Delivery from "./Delivery";

function DeliveryParent (){
    return(
        <>
         <Merge getComponent={<Delivery/>} />
        </>
    )
}
export default DeliveryParent