import React from "react";
import Merge from "../Merge";
import TakeAway from "./TakeAway";

function TakeAwayParent (){
    return(
        <>
         <Merge getComponent={<TakeAway/>} />
        </>
    )
}
export default TakeAwayParent