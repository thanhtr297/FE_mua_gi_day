import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [isFlag, setIsFlag] = useState(false);

    const toggleFlag = () => {
        setIsFlag((prevFlag) => !prevFlag);
    };

    return (
        <AppContext.Provider value={{ isFlag, toggleFlag }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };