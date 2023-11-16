import './App.scss';
// react router v6
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// pages
import {Home, CategoryProduct, ProductSingle, Cart, Search} from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import {Provider} from "react-redux";
// import Login from "./components/Login/Login";

import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import React from "react";

import DisplayAddress from "./components/Shop/address/DisplayAddress";
import DashBoard from "./pages/ShopManagement";
import ListProduct from "./pages/ShopManagement/ListProduct";
import OrderManagement from "./pages/ShopManagement/OrderManagement";
import Report from "./pages/ShopManagement/Report";
import Profile from "./pages/ShopManagement/Profile";
import UpdateProduct from "./pages/ShopManagement/UpdateProduct";
import Images from "./pages/ShopManagement/Images";
import CreateProduct from "./pages/ShopManagement/CreateProduct";
import Pending from "./components/Order/Pending";
import AllOrder from "./components/Order/AllOrder";
import Shipping from "./components/Order/Shipping";
import Reject from "./components/Order/Reject";
import Cancel from "./components/Order/Cancel";
import Done from "./components/Order/Done";
import UserManagement from "./pages/UserManagement";
import ProfileUser from "./pages/UserManagement/ProfileUser";
import ChangePassword from "./pages/UserManagement/ChangePassword";
import {AppProvider} from "./Context/AppContext";
import Info from "./pages/BillPage/Info";
import Bill from "./pages/BillPage/Bill";
import ShopProfile from "./pages/ShopManagement/ShopProfile";

import OrderUser from "./pages/BillPage/OrderUser";
import PendingUser from "./components/OrderUser/PendingUser";
import ShippingUser from "./components/OrderUser/ShippingUser";
import CancelUser from "./components/OrderUser/CancelUser";
import DoneUser from "./components/OrderUser/DoneUser";

import {ForgotPass} from "./pages/UserManagement/ForgotPass";
import {PasswordNew} from "./pages/UserManagement/PasswordNew";



function App() {
    // const [check, setCheck] = useState(true)
    // const test = () => {
    //     setCheck(false)
    // }
    // const test1 = () => {
    //     setCheck(true)
    // }

    return (
        <div className="App">
            <Provider store={store}>
                <AppProvider>
                <BrowserRouter>


                    {/*{check && <Header a={test}/>}*/}
                    {/*{!isLoginPage && <Sidebar />}*/}
                    <Header/>
                    <Sidebar/>
                    <Routes>
                        {/* home page route */}
                        <Route path="/" element={<Home/>}/>
                        <Route path="/address" element={<DisplayAddress/>}/>
                        <Route path="/images" element={<Images/>}/>

            {/* single product route */}
            <Route path = "/product/:id" element = {<ProductSingle />} />
            {/* category wise product listing route */}
            <Route path = "/category/:category" element = {<CategoryProduct />} />
            {/* cart */}
            <Route path = "/cart" element = {<Cart />} />
            <Route path = "/cart/info" element = {<Info/>} />
            <Route path = "/bill" element = {<Bill />} />

            {/* searched products */}
            <Route path = "/search/:searchTerm" element = {<Search />} />
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/forgotPass"} element={<ForgotPass/>}/>
            <Route path={"/password-new"} element={<PasswordNew/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path = "/profile" element = {<Profile />} />
                        {/* single product route */}
                        <Route path="/product/:id" element={<ProductSingle/>}/>
                        {/* category wise product listing route */}
                        <Route path="/category/:category" element={<CategoryProduct/>}/>
                        {/* cart */}
                        <Route path="/cart" element={<Cart/>}/>
                        {/* searched products */}
                        <Route path="/search/:searchTerm" element={<Search/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/register"} element={<Register/>}/>
                        <Route path="/profile" element={<Profile/>}/>


                        <Route path="/user-management" element={<UserManagement/>}>
                            <Route index element={<div>Chọn chức năng</div>}/>
                            <Route path="/user-management/profile" element={<ProfileUser/>}/>
                            <Route path="/user-management/change-password" element={<ChangePassword/>}/>
                            <Route path="/user-management/order" element={<OrderUser/>}>
                                <Route index element={<PendingUser/>}/>
                                <Route path="/user-management/order/confirm" element={<PendingUser/>}/>
                                <Route path="/user-management/order/shipping" element={<ShippingUser/>}/>
                                <Route path="/user-management/order/cancel" element={<CancelUser/>}/>
                                <Route path="/user-management/order/done" element={<DoneUser/>}/>
                            </Route>
                        </Route>
                        <Route path="/shop-management" element={<DashBoard/>}>
                            <Route index element={<div>Chọn chức năng</div>}/>
                            <Route path="/shop-management/list-product" element={<ListProduct/>}/>
                            <Route path="/shop-management/create" element={<CreateProduct/>}/>
                            <Route path="/shop-management/order-management" element={<OrderManagement/>}>
                                <Route index element={<AllOrder/>}/>
                                <Route path="/shop-management/order-management/allOrder" element={<AllOrder/>}/>
                                <Route path="/shop-management/order-management/confirm" element={<Pending/>}/>
                                <Route path="/shop-management/order-management/shipping" element={<Shipping/>}/>
                                <Route path="/shop-management/order-management/cancel" element={<Cancel/>}/>
                                <Route path="/shop-management/order-management/reject" element={<Reject/>}/>
                                <Route path="/shop-management/order-management/done" element={<Done/>}/>
                            </Route>
                            <Route path="/shop-management/report" element={<Report/>}/>
                            <Route path="/shop-management/profile" element={<Profile/>}/>
                            <Route path="/shop-management/:id" element={<UpdateProduct/>}/>
                            <Route path="/shop-management/shop-profile/:id" element={<ShopProfile/>}/>

                        </Route>


                        {/*<Route path={"/login"} element={<Login b={test1}/>}/>*/}

                    </Routes>

                    <Footer/>
                </BrowserRouter></AppProvider>
            </Provider>
        </div>
    );
}

export default App;
