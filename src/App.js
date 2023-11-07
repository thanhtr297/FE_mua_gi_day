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
import React, {useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";


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
      <Provider store = {store}>
        <BrowserRouter>


          {/*{check && <Header a={test}/>}*/}
          {/*{!isLoginPage && <Sidebar />}*/}
            <Header/>
          <Sidebar />
          <Routes>
            {/* home page route */}
            <Route path = "/" element = {<Home />} />
            {/* single product route */}
            <Route path = "/product/:id" element = {<ProductSingle />} />
            {/* category wise product listing route */}
            <Route path = "/category/:category" element = {<CategoryProduct />} />
            {/* cart */}
            <Route path = "/cart" element = {<Cart />} />
            {/* searched products */}
            <Route path = "/search/:searchTerm" element = {<Search />} />
            {/*<Route path={"/login"} element={<Login b={test1}/>}/>*/}
          </Routes>

          <Footer/>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
