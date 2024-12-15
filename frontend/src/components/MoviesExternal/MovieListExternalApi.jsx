"use client";
import { useEffect, useState, useCallback } from "react";
import handleAdaptMovie from "@/lib/handleAdaptMovie";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import StarRating from "../StarRating";
export default function MovieListExternalApi() {
    const { token } = useAuth();
    const [movies, setMovies] = useState(null);
    const [options, setOptions] = useState({
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_apiKeyTMDB}`
        }
    });
    const [messageError, setMessageError] = useState("");
    const [genreList] = useState([
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ])


    const [addedMovies, setAddedMovies] = useState([]);

    const fetchMovies = useCallback(async (values) => {
        try {
            const filters = {
                sort_by: values ? values.sort_by : "popularity.desc",
                with_genres: values ? values.with_genres : "",
                vote_average: values ? (values.vote_average * 10) / 5 : 0,
                page: values ? values.page : 1,
            };

            const url = filters.with_genres
                ? `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${filters.page}&sort_by=${filters.sort_by}&vote_average.gte=${filters.vote_average}&with_genres=${filters.with_genres}`
                : `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${filters.page}&sort_by=${filters.sort_by}&vote_average.gte=${filters.vote_average}`;

            const response = await fetch(url, options);
            const data = await response.json();

            if (data.results) {
                setMessageError("");
                setMovies(data.results);
            } else {
                setMessageError("NO MOVIES");
            }
        } catch (error) {
            setMessageError("ERROR FETCHING DATA");
        }
    }, [options]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <>

            <div className="flex flex-col items-center justify-center my-6 w-full bg-blue-950">
                <Formik
                    initialValues={{
                        sort_by: "popularity.desc",
                        with_genres: "",
                        vote_average: "",
                        page: 1, // Estado inicial de la página
                    }}
                    onSubmit={(values) => {
                        // Llama al backend con los filtros aplicados
                        fetchMovies(values);
                    }}
                >
                    {({ handleSubmit, values, setFieldValue, resetForm }) => (
                        <>
                            <Form
                                onSubmit={handleSubmit}
                                onChange={handleSubmit}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-1/2 max-w-6xl"
                            >
                                <div className="flex flex-col items-center">
                                    <label className="text-yellow-400 font-semibold text-sm">Genre</label>
                                    <Field
                                        as="select"
                                        name="with_genres"
                                        className="w-full sm:w-40 p-2 rounded-md border border-gray-700 bg-gray-900 text-white text-sm focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="">All Genres</option>
                                        {genreList.map((genre) => (
                                            <option key={genre.id} value={genre.id}>
                                                {genre.name}
                                            </option>
                                        ))}
                                    </Field>
                                </div>

                                <div className="flex flex-col items-center">
                                    <label className="text-yellow-400 font-semibold text-sm">Popularity</label>
                                    <Field
                                        as="select"
                                        name="sort_by"
                                        className="w-full sm:w-40 p-2 rounded-md border border-gray-700 bg-gray-900 text-white text-sm focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="popularity.desc">Descendent</option>
                                        <option value="popularity.asc">Ascendent</option>
                                    </Field>
                                </div>

                                <div className="flex flex-col items-center">
                                    <label className="text-yellow-400 font-semibold text-sm">Min Scoring</label>
                                    <StarRating
                                        value={values.vote_average}
                                        onChange={(value) => {
                                            setFieldValue("vote_average", value);
                                            handleSubmit();
                                        }}
                                    />
                                </div>

                                {/* Campo oculto para la página */}
                                <Field type="hidden" name="page" />

                                {/* Botón para borrar los filtros */}
                                <div className="flex gap-2 col-span-full justify-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFieldValue("page", 1); // Reinicia la página al limpiar filtros
                                            resetForm(); // Resetea los valores del formulario
                                            fetchMovies(); // Llama a fetchMovies sin filtros
                                        }}
                                        className="btn bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </Form>

                            <div className="my-16 mx-4 sm:mx-10 lg:mx-40">
                                {movies && (
                                    <ul className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                                        {movies.map((movie) => {
                                            const addedMovie = addedMovies.find((entry) => entry.movieId === movie.id); // Encuentra si la película ya fue añadida

                                            return (
                                                <li
                                                    key={movie.id}
                                                    className="flex flex-col items-center w-full bg-gray-900 p-6 rounded-lg transition-global relative"
                                                >
                                                    <div className="block w-full">
                                                        <div
                                                            className="relative w-full"
                                                            style={{ paddingBottom: "150%" }}
                                                        >
                                                            <Image
                                                                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                                                                alt={`${movie.original_title} poster`}
                                                                fill
                                                                className="rounded-md object-cover"
                                                            />
                                                        </div>
                                                        <h2 className="mt-4 text-center lg:text-2xl md:text-lg sm:text-m font-bold text-yellow-400">
                                                            {movie.original_title}
                                                        </h2>
                                                    </div>
                                                    <button
                                                        className="btn mt-2"
                                                        onClick={async () => {
                                                            const result = await handleAdaptMovie(movie, token); // Esperamos que la promesa se resuelva

                                                            setAddedMovies((prev) => {
                                                                const existing = prev.find((entry) => entry.movieId === movie.id);
                                                                if (existing) {
                                                                    // Si ya hay un mensaje para esta película, actualiza el mensaje
                                                                    return prev.map((entry) =>
                                                                        entry.movieId === movie.id
                                                                            ? { ...entry, message: result }
                                                                            : entry
                                                                    );
                                                                } else {
                                                                    // Si no existe, añade una nueva entrada
                                                                    return [...prev, { movieId: movie.id, message: result }];
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        Add to List
                                                    </button>
                                                    <div
                                                        className="mt-4 text-center min-h-[24px]" // Establece una altura mínima para el mensaje
                                                    >
                                                        {addedMovie && (
                                                            <span
                                                                className={`${addedMovie.message === "MOVIE ADDED"
                                                                    ? "text-green-700 font-bold"
                                                                    : "text-red-600 font-semibold"
                                                                    }`}
                                                            >
                                                                {addedMovie.message}
                                                            </span>
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}

                                {messageError && (
                                    <div className="flex justify-center">
                                        <h2 className="text-3xl text-yellow-400 font-bold">{messageError}</h2>
                                    </div>
                                )}

                                <div className="flex justify-between items-center mt-8">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (values.page > 1) {
                                                setFieldValue("page", values.page - 1); // Actualiza la página en Formik
                                                handleSubmit(); // Envía los valores actualizados
                                            }
                                        }}
                                        disabled={values.page === 1}
                                        className={`btn ${values.page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        Previous Page
                                    </button>

                                    <span className="text-xl font-semibold text-yellow-400">Page {values.page}</span>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFieldValue("page", values.page + 1); // Actualiza la página en Formik
                                            handleSubmit(); // Envía los valores actualizados
                                        }}
                                        className="btn"
                                    >
                                        Next Page
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </Formik>
            </div>

        </>
    );
}
