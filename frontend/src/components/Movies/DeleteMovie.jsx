"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation";
import { useState } from "react"
export default function DeleteMovie({ movieId }) {
    const { token } = useAuth()
    const router = useRouter()
    const [errorMessage, setErroreMessage] = useState(null); // Mensaje de error
    const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito
    const handleClick = (event) => {
        try {
            event.preventDefault();
            fetch(`http://localhost:3000/movie/${movieId}?hard=true`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        setSuccessMessage("MOVIE DELETED SUCCESFULLY");
                        setErroreMessage(null);

                        // Esperamos 1 segundo antes de hacer el logout
                        setTimeout(() => {
                            router.push("/")
                        }, 1000);
                    } else {
                        setErroreMessage(data.error);
                        setSuccessMessage(null);
                    }
                })
                .catch(() => {
                    setErroreMessage("ERROR_DELETING_MOVIE");
                    setSuccessMessage(null);
                })
        } catch {
            setErroreMessage("Something went wrong. Please try again.");
            setSuccessMessage(null);
        }
    }

    return (
        <div className="flex justify-center items-center py-20 gap-10">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
                    Delete Movie
                </h2>
                <form onSubmit={handleClick} className="space-y-4">
                    <p className="text-yellow-200 text-center">
                        Are you sure you want to delete the movie from your list?
                    </p>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            onClick={handleClick}
                            className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
                        >
                            Delete Movie
                        </button>
                    </div>
                </form>

                {/* Mostrar mensaje de éxito*/}
                {successMessage && (
                    <div className="mb-4 mt-6 text-red-700 text-2xl font-bold text-center">
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