"use client"
import Image from "next/image"
import HandlePoints from "@/components/Rating"
import Link from "next/link"
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"

export default function MovieDetails({ movieId }) {
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        try {

            fetch(`https://marcosflix.onrender.com/movie/${movieId}`)
                .then(response => response.ok ? response.json() : response.text())
                .then(data => {
                    setMovie(data)
                })
        } catch {
            return ("ERROR FETCHING DATA")
        }
    }, [movieId])

    const { token } = useAuth()
    if (!movie) {
        return (
            <div className="flex justify-center items-center min-h-screen text-white">
                <p className="text-2xl">Error fetching data</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-gray-900 text-white relative w-[1500px]">

            <div className="lg:col-span-1 flex flex-col justify-start items-center">
                <div className="relative w-full max-w-md mb-20">
                    <Image
                        src={movie.poster}
                        alt={`${movie.title} poster`}
                        layout="responsive"
                        width={300}
                        height={450}
                        className="rounded-lg shadow-lg"
                    />
                </div>

            </div>

            <div className="lg:col-span-2 space-y-6">
                {token && (
                    <div className="flex items-center">
                        {/* Título con ancho ajustado al tamaño del texto */}
                        <h1 className="text-5xl font-bold drop-shadow-lg text-yellow-400 w-2/4">
                            {movie.title}
                        </h1>
                        {/* Espaciador para separar el título de los botones */}
                        <div className="flex-grow"></div>
                        {/* Contenedor de botones que ocupa el espacio sobrante */}
                        <div className="flex gap-2 items-end self-start">
                            <Link href={`/movie/${movie._id}/leaveReview`} className="btn">
                                Leave a review
                            </Link>
                            <Link href={`/movie/${movie._id}/delete`} className="btn bg-red-500 hover:bg-red-600">
                                Delete Movie
                            </Link>
                        </div>
                    </div>
                )}


                <div>
                    <h3 className="text-2xl font-semibold">Actors</h3>
                    {movie.actors.map((actor, index) => {
                        return <span key={index} className="text-lg text-gray-300">{actor} </span>
                    })}

                </div>

                <div>
                    <h3 className="text-2xl font-semibold">Genre</h3>
                    {movie.filmGenre.map((genre, index) => {
                        return <span key={index} className="text-lg text-gray-300">{genre}, </span>
                    })}
                </div>

                <div>
                    <h3 className="text-2xl font-semibold">Platforms</h3>
                    {movie.platforms.map((platform, index) => {
                        return <span key={index} className="text-lg text-gray-300">{platform}, </span>
                    })}
                </div>

                <div>
                    <h3 className="text-2xl font-semibold">Date</h3>
                    <p className="text-lg text-gray-300">{new
                        Date(movie.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}</p>
                </div>

                <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-semibold">Rating</h3>
                    <div className="text-lg text-gray-500 flex items-center">
                        <HandlePoints points={movie.points} />
                    </div>
                </div>

                <div className="space-y-6 h-80 overflow-y-auto p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-yellow-400">Reviews</h2>
                    <ul className="space-y-4">
                        {movie.reviews.map((review, index) => (
                            <li
                                key={index}
                                className="p-6 flex gap-6"
                            >
                                <h3 className="text-lg font-bold text-white">{review.review}</h3>
                                <div className="text-lg text-gray-500 flex items-center">
                                    <HandlePoints points={review.scoring} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}