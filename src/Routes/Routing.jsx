import React from "react";
import { Route, Routes,} from "react-router-dom";
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
import DineInParent from "../Screens/User/UserScreens/Home/RestaurantTabs/DineIn/DineInParent";
import DeliveryParent from "../Screens/User/UserScreens/Home/RestaurantTabs/Delivery/DeliveryParent";
// import Login from "../Screens/User/UserScreens/LoginPage/Login";


function Routing() {


    return (
        <>
            <Routes>
                <Route path="/adminlogin" element={<LoginPage />} />
                <Route path="/admin" element={<Auth />}>
                    <Route path="dashboard" element={
                        <TenantProvider><MergeComponents getComponent={<Dashboard />} /></TenantProvider>} />
                    <Route path="item" element={
                        <TenantProvider><MergeComponents getComponent={<ItemList />} /></TenantProvider>} />
                    <Route path="category" element={
                        <TenantProvider><MergeComponents getComponent={<Category />} /></TenantProvider>} />
                    <Route path="order" element={
                        <TenantProvider><MergeComponents getComponent={<OrderList />} /></TenantProvider>} />
                    <Route path="addItem" element={
                        <TenantProvider><MergeComponents getComponent={<AddItem />} /></TenantProvider>} />
                    <Route path="addCategory" element={
                        <TenantProvider><MergeComponents getComponent={<AddCategory />} /></TenantProvider>} />
                </Route>
                

                <Route path="/home" element={<Home />} />
                {/* <Route path="/restaurantlocation" element={<RestaurantLocation />} /> */}
                <Route path="/tablebook" element={<TableBook />} />
                <Route path="/myorder" element={<MyOrderParent />} />
                <Route path="/myaddress" element={<AddressParent />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/" element={<TakeAwayParent />} />
                <Route path="/dinein" element={<DineInParent />} />
                <Route path="/delivery" element={<DeliveryParent />} />
            </Routes>

        </>
    )
};
export default Routing;