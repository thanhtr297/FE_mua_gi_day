import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [isFlag, setIsFlag] = useState(false);
    const toggleFlag = () => {
        setIsFlag((prevFlag) => !prevFlag);
    };
    const [checkLogin, setCheckLogin] = useState(false);
    const login = () => {
        setCheckLogin(true);
    };
    const logout = () => {
        setCheckLogin(false);
    };


    return (
        <AppContext.Provider value={{ isFlag,toggleFlag ,checkLogin, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };