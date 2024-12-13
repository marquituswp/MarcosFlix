"use client"
import Link from "next/link";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export default function NavBar() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false); // Estado para saber si el menú está abierto
    const { token, logout } = useAuth()
    const tokenUser = token ? jwtDecode(token) : null;
    const excludePaths = ["/auth/login", "/auth/signUp"];

    return (
        <nav className="bg-blue-950 flex items-center w-full p-8 justify-between">
            <Link href="/">
                <h1 className="text-yellow-400 text-6xl font-bold ml-12">MarcosFlix</h1>
            </Link>

            {!excludePaths.includes(pathname) && <ul className="flex items-center gap-3 flex-row">
                {token ? ( // Si hay un token, mostrar menú desplegable
                    <li className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)} // Alternar el menú
                            className="btn"
                        >
                            Menu
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-md shadow-lg z-10">
                                <ul>
                                    <li>
                                        <Link
                                            href="/profile/options/edit"
                                            className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                            onClick={() => setMenuOpen(false)} // Cierra el menú
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    {tokenUser.role[0] === "admin" && <li>
                                        <Link
                                            href="/movie/create"
                                            className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                            onClick={() => setMenuOpen(false)} // Cierra el menú
                                        >
                                            Create Movie
                                        </Link>
                                    </li>}
                                    <li>
                                        <Link
                                            href="/movie/favorites"
                                            className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                            onClick={() => setMenuOpen(false)} // Cierra el menú
                                        >
                                            Favorite Movies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/movie/external"
                                            className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                            onClick={() => setMenuOpen(false)} // Cierra el menú
                                        >
                                            More Movies
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-700"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                ) : ( // Si no hay token, mostrar Login y Register
                    <>

                        <Link href="/auth/login" className="btn text-white ml-4"> <p>Login</p> </Link>


                        <Link href="/auth/signUp" className="btn text-white ml-4 mr-12"> <p>Sign Up</p> </Link>

                    </>
                )}
            </ul>}
        </nav>
    );
}