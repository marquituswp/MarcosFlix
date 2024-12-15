"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import StarRating from "../StarRating";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { useAuth } from "@/context/AuthContext";

export default function MoviesList() {
    const [movies, setMovies] = useState(null);
    const [favoriteChanged, setFavoriteChanged] = useState(false);
    const { token } = useAuth();
    const [genreList] = useState([
        "Action", "Adventure", "Comedy", "Drama", "Horror", "Thriller",
        "Romance", "Science Fiction", "Fantasy", "Documentary", "Animation",
        "Musical", "Crime", "Mystery", "Western", "Historical", "Biographical",
        "War", "Family", "Sports", "Teen", "Superhero",
    ]);
    const [platformList] = useState([
        "Netflix", "Amazon Prime Video", "Disney Plus", "MAX", "Apple TV", "Movistar +", "Crunchyroll", "Tio Anime"
    ]);
    const [isOrderedByScoring, setIsOrderedByScoring] = useState(false);
    const [messageError, setMessageError] = useState("");

    const fetchMovies = async (filters = {}) => {
        try {
            const validFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => value !== "" && value !== null)
            );
            const queryParams = new URLSearchParams(validFilters).toString();

            fetch(`https://marcosflix.onrender.com/movie?${queryParams}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.ok ? response.json() : response.text())
                .then(data => {
                    if (typeof data === "string") {
                        setMessageError("NO MOVIES");
                        setMovies(null);
                    } else {
                        setMessageError("");
                        setMovies(data);
                    }
                })
                .catch(() => setMessageError("ERROR FETCHING DATA"));
        } catch {
            setMessageError("ERROR FETCHING DATA");
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [favoriteChanged]);

    const handleAddToFavorites = (id, isFavorite) => {
        try {
            fetch(`https://marcosflix.onrender.com/movie/favorite/${id}?isFavorite=${!isFavorite}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.ok ? response.json() : response.text())
                .then(() => {
                    setFavoriteChanged(!favoriteChanged);
                })
                .catch(error => console.log(error));
        } catch {
            console.log("ERROR SETTING FAVORITE");
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center my-6 w-full bg-blue-950">
                <Formik
                    initialValues={{
                        title: "",
                        date: "",
                        genre: "",
                        platforms: "",
                        minScoring: "",
                    }}
                    onSubmit={(values) => {
                        const filters = {
                            title: values.title,
                            date: values.date,
                            genre: values.genre,
                            platforms: values.platforms,
                            order: isOrderedByScoring ? true : false,
                            minScoring: values.minScoring,
                        };
                        fetchMovies(filters);
                    }}
                >
                    {({ handleSubmit, values, resetForm, setFieldValue }) => (
                        <Form
                            onSubmit={handleSubmit}
                            onChange={handleSubmit}
                            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 w-fit mx-8 max-w-6xl"
                        >
                            <div className="flex flex-col items-center">
                                <label className="text-yellow-400 font-semibold text-sm">Title</label>
                                <Field
                                    type="text"
                                    name="title"
                                    placeholder="Search title"
                                    className="w-full sm:w-40 p-2 rounded-md border border-gray-700 bg-gray-900 text-white text-sm focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <label className="text-yellow-400 font-semibold text-sm">Date</label>
                                <Field
                                    type="date"
                                    name="date"
                                    className="w-full sm:w-40 p-2 rounded-md border border-gray-700 bg-gray-900 text-white text-sm focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <label className="text-yellow-400 font-semibold text-sm">Genre</label>
                                <Field
                                    as="select"
                                    name="genre"
                                    className="w-full sm:w-40 p-2 rounded-md border border-gray-700 bg-gray-900 text-white text-sm focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option value="">All Genres</option>
                                    {genreList.map((genre) => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className="flex flex-col items-center">
                                <label className="text-yellow-400 font-semibold text-sm">Platform</label>
                                <Field
                                    as="select"
                                    name="platforms"
                                    className="w-full sm:w-40 p-2 rounded-md border border-gray-700 bg-gray-900 text-white text-sm focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option value="">All Platforms</option>
                                    {platformList.map((platform) => (
                                        <option key={platform} value={platform}>{platform}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className="flex flex-col items-center col-span-2">
                                    <label className="text-yellow-400 font-semibold text-sm">Min Scoring</label>
                                    <StarRating
                                        value={values.minScoring}
                                        onChange={(value) => {
                                            setFieldValue("minScoring", value);
                                            handleSubmit();
                                        }}
                                    />
                                </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-full justify-center w-full">
                                {/* Order by Scoring */}
                                
                                <button
                                    type="submit"
                                    onClick={() => {
                                        setIsOrderedByScoring(true);
                                        handleSubmit();
                                    }}
                                    disabled={isOrderedByScoring}
                                    className="btn rounded-lg p-3 disabled:bg-gray-500 w-full"
                                >
                                    Order by Scoring
                                </button>

                                {/* Order by Most Recent */}
                                <button
                                    type="submit"
                                    onClick={() => {
                                        setIsOrderedByScoring(false);
                                        handleSubmit();
                                    }}
                                    disabled={!isOrderedByScoring}
                                    className="btn rounded-lg p-3 disabled:bg-gray-500 w-full"
                                >
                                    Order by Most Recent
                                </button>

                                {/* Clear Filters */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetForm();
                                        setIsOrderedByScoring(false);
                                        fetchMovies();
                                    }}
                                    className="btn bg-red-500 hover:bg-red-600 w-full"
                                >
                                    Clear Filters
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>

            <div className="my-16 mx-4 sm:mx-10 lg:mx-40">
                {movies && (
                    <ul className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-6">
                        {movies.map((movie, index) => (
                            <li
                                key={index}
                                className="flex flex-col items-center w-full bg-gray-900 p-6 rounded-lg transition-global relative"
                            >
                                <Link href={`/movie/${movie._id}`} className="block w-full">
                                    <div
                                        className="relative w-full"
                                        style={{ paddingBottom: "150%" }}
                                    >
                                        <Image
                                            src={movie.poster}
                                            alt={`${movie.title} poster`}
                                            fill
                                            objectFit="cover"
                                            className="rounded-md"
                                        />
                                    </div>
                                    <h2 className="mt-4 text-center lg:text-2xl md:text-lg sm:text-m font-bold text-yellow-400 w-5/6">
                                        {movie.title}
                                    </h2>
                                </Link>
                                {token && <button
                                    className="mt-4 w-10 h-10 flex items-center justify-center rounded-full shadow-md shadow-blue-500 ease-in duration-100 active:translate-y-1 absolute bottom-4 right-4"
                                    onClick={() => handleAddToFavorites(movie._id, movie.isFavorite)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white transition-transform duration-200"
                                        fill={movie.isFavorite ? "currentColor" : "none"}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.797 5.521a1 1 0 00.95.69h5.793c.968 0 1.371 1.24.588 1.81l-4.717 3.428a1 1 0 00-.364 1.118l1.797 5.52c.3.921-.755 1.688-1.54 1.118l-4.717-3.428a1 1 0 00-1.176 0l-4.717 3.428c-.785.57-1.84-.197-1.54-1.118l1.797-5.52a1 1 0 00-.364-1.118L2.862 10.95c-.783-.57-.38-1.81.588-1.81h5.793a1 1 0 00.95-.69l1.797-5.521z"
                                        />
                                    </svg>
                                </button>}
                            </li>
                        ))}
                    </ul>
                )}
                {messageError && <div className="flex justify-center">
                    <h2 className="text-3xl text-yellow-400 font-bold">{messageError}</h2>
                </div>
                }
            </div>
        </>
    );
}
