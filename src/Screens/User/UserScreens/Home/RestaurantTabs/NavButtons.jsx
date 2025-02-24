// import React from "react";
// import { MdDeliveryDining } from "react-icons/md";
// import { FaBasketShopping } from "react-icons/fa6";
// import { ImSpoonKnife } from "react-icons/im";
// import { FaBottleWater } from "react-icons/fa6";

// function NavButtons() {
//     const res = [
//         { btn: "Delivery", icon: <MdDeliveryDining />  },
//         { btn: "Take Away", icon: <FaBasketShopping /> },
//         { btn: "Dine In", icon: <ImSpoonKnife /> },
//         { btn: "Steal Deals", icon: <FaBottleWater /> },
//     ];

//     return (
//         <div className="res-tab" style={{
//             backgroundColor: "white",
//             borderRadius: "5px",
//             position: "sticky",
//             marginBottom:"10px",
//             top: 86,
//             zIndex: 15,
//         }}>
//             <ul className="res-buttons p-0 d-flex justify-content-around align-items-center">
//                 {res.map((itm, index) => (
//                     <li key={index} className="d-flex justify-content-center align-items-center bg-black m-2"
//                         style={{ minWidth: "120px", padding: "5px 30px",  }}>
//                         <h4 className="d-flex align-items-center text-warning" style={{ gap: "10px" }}>
//                             {itm.icon}
//                             {itm.btn}
//                         </h4>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default NavButtons;
