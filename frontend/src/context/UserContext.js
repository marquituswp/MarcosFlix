// context/UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

// Hook para usar el contexto de usuario
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

// Proveedor del contexto de usuario
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null); // Datos del usuario

    // Funcion para actualizar los datos del usuario
    const updateUserData = (newUserData) => {
        setUserData(newUserData);
    };

    // Pasar los datos del usuario y la función de actualizar al contexto
    return (
        <UserContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
};
