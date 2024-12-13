"use client"
// Componente para eliminar un usuario
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function DeleteUser() {
    const [errorMessage, setErroreMessage] = useState(null); // Mensaje de error
    const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito
    const { logout, token } = useAuth(); // Token del usuario y función para hacer logout

    // Petición DELETE a la API para eliminar un usuario
    const handleClick = (event) => {
        try {
            event.preventDefault();
            fetch(`http://localhost:3000/users/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message) {
                        setSuccessMessage(data.message); // Si se ha eliminado el usuario, mostramos un mensaje de éxito
                        setErroreMessage(null);

                        // Esperamos 1 segundo antes de hacer el logout
                        setTimeout(() => {
                            logout();
                        }, 1000); 
                    } else {
                        setErroreMessage(data.error);
                        setSuccessMessage(null);
                    }
                })
                .catch(() => {
                    setErroreMessage("Something went wrong. Please try again.");
                    setSuccessMessage(null);
                });
        } catch {
            setErroreMessage("Invalid values");
            setSuccessMessage(null);
        }
    };

    return (
        <div className="flex justify-center items-center py-20 gap-10">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
                    Remove Account
                </h2>
                <form onSubmit={handleClick} className="space-y-4">
                    <p className="text-yellow-200 text-center">
                        Are you sure you want to delete your account? This action cannot be undone.
                    </p>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            onClick={handleClick}
                            className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
                        >
                            Delete Account
                        </button>
                    </div>
                </form>

                {/* Mostrar mensaje de éxito*/}
                {successMessage && (
                    <div className="mb-4 mt-6 text-red-600 text-2xl font-bold text-center">
                        {successMessage}
                    </div>
                )}

                {/* Mostrar mensaje de error */}
                {errorMessage && (
                    <div className="mb-4 mt-6 text-green-700 font-bold text-2xl text-center">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
