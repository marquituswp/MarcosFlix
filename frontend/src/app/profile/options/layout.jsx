"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext"; // Importar el hook useUser

// Función para obtener los datos del usuario
const getUserData = async (token) => {
    try {
        const { _id } = jwtDecode(token);
        const response = await fetch(`https://marcosflix.onrender.com/users/`);
        if (!response.ok) throw new Error("Error fetching users");
        const users = await response.json();
        const user = users.find((user) => user._id === _id);
        return user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

// Layout para el perfil del usuario
export default function ProfileLayout({ children }) {
    const { token } = useAuth(); // Obtener token desde el contexto
    const { updateUserData } = useUser(); // Obtener updateUserData desde el contexto
    const [loading, setLoading] = useState(true); // Estado local para el loading
    const [user, setUser] = useState(null); // Estado local para el usuario
    const pathname = usePathname(); // Obtener la ruta actual

    useEffect(() => {
        if (token) {
            getUserData(token).then((user) => {
                setUser(user); // Seteamos el usuario localmente
                updateUserData(user); // Actualizamos los datos del usuario en el contexto
                setLoading(false);
            });
        }
    }, [token, updateUserData]); // Dependencia de updateUserData

    // Si está cargando, mostramos un mensaje de carga
    if (loading) return <p className="text-center text-lg">Loading Profile...</p>;

    // Si no hay usuario, mostramos un mensaje de error
    if (!user) {
        return <p className="text-center text-red-500 text-lg">User not found</p>;
    }

    return (
        <div className="flex flex-col lg:flex-row h-auto lg:h-screen">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 bg-blue-950 p-6 flex flex-col items-center mb-6 lg:mb-0">
                <div className="relative w-[100px] h-[100px] mb-4">
                    <Image
                        src={user.profilePicture || "/default-profile.png"} // Imagen por defecto si no existe
                        alt={`${user.name}'s Profile Picture`}
                        className="rounded-full object-cover"
                        fill // Asegura que la imagen llena el contenedor
                    />
                </div>
                <h2 className="text-xl font-semibold text-yellow-400 text-center">{user.name}</h2>
                <p className="text-yellow-200 mb-4 text-center">{user.email}</p>

                <div className="w-full flex flex-col gap-4">
                    {/* Enlaces para editar y eliminar la cuenta */}
                    <Link
                        href="/profile/options/edit"
                        className={`${
                            pathname === "/profile/options/edit"
                                ? "btn bg-gray-300 text-black"
                                : "btn"
                        }`}
                    >
                        Edit Profile
                    </Link>
                    <Link
                        href="/profile/options/delete"
                        className={`${
                            pathname === "/profile/options/delete"
                                ? "btn bg-gray-300 text-black"
                                : "btn bg-red-500 hover:bg-red-600"
                        }`}
                    >
                        Delete Account
                    </Link>
                </div>
            </aside>

            {/* Contenido principal */}
            <main className="w-full lg:w-3/4 p-2">{children}</main>
        </div>
    );
}
