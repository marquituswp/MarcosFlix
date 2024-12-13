"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Obtener el token al montar el componente
        const storedToken = Cookies.get("token");
        setToken(storedToken || null);
    }, []);

    // Función para hacer login
    const login = (newToken) => {
        Cookies.set("token", newToken);
        setToken(newToken);
    };

    // Función para hacer logout
    const logout = () => {
        Cookies.remove("token");
        setToken(null);
        router.push("/"); // Redirigir a la página principal
    };

    // Pasar el token y las funciones de login y logout al contexto
    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
