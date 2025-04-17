import React from "react";
import { Route, Routes, } from "react-router-dom";
import Auth from "../Utilities/Auth";
import Dashboard from "../Screens/Admin/AdminScreens/Dashboard/Dashboard";
import MergeComponents from "../Screens/Admin/CommonComponents/MergeComponents";
import { TenantProvider } from "../Utilities/TenantProvider";
import ItemList from "../Screens/Admin/AdminScreens/Items/Itemslist";
import Category from "../Screens/Admin/AdminScreens/Category/CategoryList";
import OrderList from "../Screens/Admin/AdminScreens/Orders/OrderList";
import AddItem from "../Screens/Admin/AdminScreens/Items/AddItem";
import AddCategory from "../Screens/Admin/AdminScreens/Category/AddCategory";
import Home from "../Screens/User/UserScreens/Home/Home";
// import RestaurantLocation from "../Screens/User/UserScreens/Home/RestaurantLocations/RestaurantLocation";
import TableBook from "../Screens/User/UserScreens/Home/TableBooking/TableBooking";
import MyOrderParent from "../Screens/User/UserScreens/AccountSection/MyOrder/MyOrderParent";
import AddressParent from "../Screens/User/UserScreens/AccountSection/MyAddress/AddressParent";
import LoginPage from "../Screens/Admin/CommonComponents/LoginPage";
import TakeAwayParent from "../Screens/User/UserScreens/Home/RestaurantTabs/TakeAway/TakeAwayParent";
import Customization from "../Screens/Admin/AdminScreens/Customization/Customization";
import AddCustomization from "../Screens/Admin/AdminScreens/Customization/AddCustomization";
import Restaurants from "../Screens/Admin/AdminScreens/Restaurants/Restaurants";
import AddRestaurant from "../Screens/Admin/AdminScreens/Restaurants/AddRestaurant";
import AddNewVendor from "../Screens/Admin/AdminScreens/Vendor/AddNewVendor";
import Vendor from "../Screens/Admin/AdminScreens/Vendor/Vendor";
import Login from "../Screens/Admin/Auth/Login";
import AdminBanner from "../Screens/Admin/AdminScreens/AdminBanner/AdminBanner";
import AddAdminBanner from "../Screens/Admin/AdminScreens/AdminBanner/AddAdminBanner";


function Routing() {

    const adminPages = [
        {
            id: 1,
            path: 'dashboard',
            component: Dashboard,
        },
        {
            id: 2,
            path: 'item',
            component: ItemList,
        },
        {
            id: 3,
            path: 'category',
            component: Category,
        },
        {
            id: 4,
            path: 'order',
            component: OrderList,
        },
        {
            id: 5,
            path: 'addItem',
            component: AddItem,
        },
        {
            id: 6,
            path: 'addCategory',
            component: AddCategory,
        },
        {
            id: 7,
            path: 'customization',
            component: Customization,
        },
        {
            id: 8,
            path: 'addCustomization',
            component: AddCustomization,
        },
        {
            id: 9,
            path: 'restaurants',
            component: Restaurants,
        },
        {
            id: 10,
            path: 'addRestaurants',
            component: AddRestaurant,
        },
        {
            id: 11,
            path: "newVendor",
            component: AddNewVendor,
        },
        {
            id: 12,
            path: "vendor",
            component: Vendor,
        },
        {
            id: 13,
            path: "banner",
            component: AdminBanner,
        },
        {
            id: 14,
            path: "addbanner",
            component: AddAdminBanner,
        },
    ]
    return (
        <>
            <Routes>
                <Route path="/adminlogin" element={<LoginPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Auth />}>
                    {
                        adminPages.map((route) => {
                            return (
                                <Route path={route.path} element={<TenantProvider><MergeComponents getComponent={<route.component />} /></TenantProvider>} />
                            )
                        })
                    }
                </Route>
                <Route path="/home" element={<Home />} />
                {/* <Route path="/restaurantlocation" element={<RestaurantLocation />} /> */}
                <Route path="/tablebook" element={<TableBook />} />
                <Route path="/myorder" element={<MyOrderParent />} />
                <Route path="/myaddress" element={<AddressParent />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/" element={<TakeAwayParent />} />
            </Routes>

        </>
    )
};
export default Routing;