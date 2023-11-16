import { createContext, useState } from "react";

export const CheckedContext = createContext();

export const CheckedProvider = ({ children }) => {
    const [checked, setChecked] = useState([]);

    return (
        <CheckedContext.Provider value={{ checked, setChecked }}>
            {children}
        </CheckedContext.Provider>
    );
};