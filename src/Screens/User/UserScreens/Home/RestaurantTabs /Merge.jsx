import React from "react";
import NavButtons from "./NavButtons/NavButtons";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
import MenuItems from "./MenuItems/MenuItems";
import Cart from "./Cart/Cart";

function Merge() {
    return (
        <>
            <div className="main d-flex justify-content-center" >
                <div className="roww" style={{paddingTop:"10px", paddingBottom:"15px" ,}}>
                    <NavButtons />
                    <div className="merge-flex d-flex justify-content-between ">
                        <CategoryMenu />
                        <MenuItems />
                        <Cart />
                    </div>

                </div>
            </div>

        </>
    )
}
export default Merge;