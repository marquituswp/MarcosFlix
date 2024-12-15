"use client"
import Link from "next/link";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false); // Estado para saber si el menú está abierto
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Menú de hamburguesa
    const { token, logout } = useAuth();
    const tokenUser = token ? jwtDecode(token) : null;
    const excludePaths = ["/auth/login", "/auth/signUp"];

    return (
        <nav className="bg-blue-950 flex items-center w-full p-4 justify-between relative">
            <Link href="/">
                <h1 className="text-yellow-400 text-3xl font-bold ml-4">MarcosFlix</h1>
            </Link>

            {!excludePaths.includes(pathname) && (
                <>
                    {/* Ícono de hamburguesa para móvil */}
                    <button
                        className="text-yellow-400 text-2xl md:hidden mr-4"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Menú principal para escritorio */}
                    <ul className={`hidden md:flex items-center gap-3 flex-row`}>
                        {token ? (
                            <li className="relative">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="text-yellow-400 text-2xl mr-4"
                                >
                                    {menuOpen ? <FaTimes /> : <FaBars />}
                                </button>
                                {menuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-md shadow-lg z-10">
                                        <ul>
                                            <li>
                                                <Link
                                                    href="/profile/options/edit"
                                                    className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                            {tokenUser.role[0] === "admin" && (
                                                <li>
                                                    <Link
                                                        href="/movie/create"
                                                        className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                                        onClick={() => setMenuOpen(false)}
                                                    >
                                                        Create Movie
                                                    </Link>
                                                </li>
                                            )}
                                            <li>
                                                <Link
                                                    href="/movie/favorites"
                                                    className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    Favorite Movies
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/movie/external"
                                                    className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                                    onClick={() => setMenuOpen(false)}
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
                        ) : (
                            <>
                                <Link href="/auth/login" className="btn text-white ml-4"> <p>Login</p> </Link>
                                <Link href="/auth/signUp" className="btn text-white ml-4 mr-12"> <p>Sign Up</p> </Link>
                            </>
                        )}
                    </ul>

                    {/* Menú desplegable para móvil */}
                    {mobileMenuOpen && (
                        <div className="absolute top-16 right-0 w-fit bg-gray-900 border border-gray-800 rounded-md shadow-lg md:hidden z-10">
                            <ul className="flex flex-col  py-4">
                                {token ? (
                                    <>
                                        <li>
                                            <Link
                                                href="/profile/options/edit"
                                                className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        {tokenUser.role[0] === "admin" && (
                                            <li>
                                                <Link
                                                    href="/movie/create"
                                                    className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Create Movie
                                                </Link>
                                            </li>
                                        )}
                                        <li>
                                            <Link
                                                href="/movie/favorites"
                                                className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Favorite Movies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/movie/external"
                                                className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                                onClick={() => setMobileMenuOpen(false)}
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
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                href="/auth/login"
                                                className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/auth/signUp"
                                                className="block px-4 py-2 text-yellow-400 hover:bg-gray-700"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Sign Up
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </nav>
    );
}
