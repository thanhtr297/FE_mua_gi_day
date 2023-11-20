import React, { createContext, useState } from 'react';
import {showCart} from "../service/CartService";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [isFlag, setIsFlag] = useState(true);
    const [carts, setCarts] = useState([])
    const idAccount = localStorage.getItem("account")
    const toggleFlag = () => {
        setIsFlag((prevFlag) => !prevFlag);
    };
    const [checkLogin, setCheckLogin] = useState(false);
    const login = () => {
        setCheckLogin(false);
    };
    const logout = () => {
        setCheckLogin(true);
    };

    const showCarts1 = () => {
        showCart(idAccount).then((response) => {
            setCarts(response);
    })
    }





    return (
        <AppContext.Provider value={{ isFlag,toggleFlag ,checkLogin, login, logout , carts,showCarts1}}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };