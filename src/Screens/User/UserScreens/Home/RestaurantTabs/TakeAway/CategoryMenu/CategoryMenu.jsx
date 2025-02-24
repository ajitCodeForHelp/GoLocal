import React from "react";
import { TbCategory } from "react-icons/tb";

function CategoryMenu() {
    const category = [
        {
            text: "Sea Food "
        },
        {
            text: "International"
        },
        {
            text: "Asian "
        },
        {
            text: "Indian"
        },
        {
            text: "Combo's"
        },
        {
            text: "Sup & Salad"
        },
        {
            text: "Dessert's"
        },
        {
            text: "Beverage"
        },
    ]
    return (
        <>
            <div className="cat-tab" style={{ width: "18%"}}>
                <ul className="p-0 mb-0">
                    <li className="li d-flex align-items-center p-3"
                        style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                            borderBottom: "1px solid #ddd"
                        }}>
                        <TbCategory style={{fontSize:"2.2rem"}} />
                        <h5 className="p-0 m-0 fs-3 ml-2">Category</h5>
                    </li>
                    {
                        category.map((itm) => {
                            return <li key={itm.id} className="p-3 fs-5 li-a">{itm.text}</li>;
                        })
                    }
                </ul>
            </div>
        </>
    )
}
export default CategoryMenu;