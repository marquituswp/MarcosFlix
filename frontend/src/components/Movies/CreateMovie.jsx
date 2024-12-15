"use client";
import Image from "next/image";
import StarRating from "../StarRating";
import handleAutoReview from "@/lib/handleAutoReview";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import handleUploadMoviePoster from "@/lib/handleUploadMoviePoster";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const CreateMovieSchema = Yup.object().shape({
    title: Yup.string().required("Title is required").min(3, "Title too short"),
    filmGenre: Yup.array()
        .min(1, "At least one genre is required")
        .required("Genre is required"),
    actors: Yup.string()
        .required("Actors are required")
        .matches(/^[a-zA-Z0-9 ,]+$/, "Invalid characters"),
    date: Yup.date().required("date is required"),
    platforms: Yup.array()
        .min(1, "At least one platform is required")
        .required("Platform is required"),
    poster: Yup.mixed().required("Poster is required"),
});

export default function CreateMovie() {
    const [previewImage, setPreviewImage] = useState(null);
    const [genreList] = useState([
        "Action", "Adventure", "Comedy", "Drama", "Horror", "Thriller",
        "Romance", "Science Fiction", "Fantasy", "Documentary", "Animation",
        "Musical", "Crime", "Mystery", "Western", "Historical", "Biographical",
        "War", "Family", "Sports", "Teen", "Superhero",
    ]);
    const [platformList] = useState([
        "Netflix", "Amazon Prime Video", "Disney Plus", "MAX", "Apple TV", "Movistar +", "Crunchyroll", "Tio Anime"
    ]);
    const [imageFile, setImageFile] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(""); 
    const { token } = useAuth();
    const router = useRouter();

    const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
        try {
            const body = {
                title: values.title,
                date: values.date,
                platforms: values.platforms,
                actors: values.actors.split(",").map((actor) => actor.trim()),
                filmGenre: values.filmGenre,
            };
            const response = await fetch("https://marcosflix.onrender.com/movie", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage("MOVIE CREATED");
                handleUploadMoviePoster(imageFile, token, data._id);
                setTimeout(() => {
                    handleAutoReview(values.scoring, token, data._id);
                    resetForm();
                    setPreviewImage(null);
                    router.push("/");
                }, 5000);
            } else {
                setSuccessMessage("");
                const errorText = await response.text();
                setErrors({ general: errorText || "Registration failed." });
            }
        } catch {
            setSuccessMessage("");
            setErrors({ general: "An unexpected error occurred. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file); 
            setFieldValue("poster", file); 
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
            <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Create a Movie</h1>
                <Formik
                    initialValues={{
                        title: "",
                        filmGenre: "",
                        platforms: "",
                        actors: "",
                        date: "",
                        scoring: 0,
                        poster: "",
                    }}
                    validationSchema={CreateMovieSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values, isSubmitting, errors }) => (
                        <Form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {/* Imagen de la película */}
                            <div className="flex flex-col justify-center items-center sm:col-span-1">
                                <label htmlFor="poster" className="block font-semibold mb-2">
                                    Poster
                                </label>
                                <input
                                    id="poster"
                                    name="poster"
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-gray-500 file:bg-yellow-400 file:border-none file:rounded-lg file:px-4 file:py-2"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        handleFileChange(event, setFieldValue);
                                        setPreviewImage(URL.createObjectURL(file));
                                    }}
                                />
                                {previewImage && (
                                    <div className="relative w-full mb-6">
                                        <Image
                                            src={previewImage}
                                            alt={`${values.title} poster`}
                                            layout="responsive"
                                            width={300}
                                            height={450}
                                            className="rounded-lg shadow-lg"
                                        />
                                    </div>
                                )}
                                <ErrorMessage name="poster" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Detalles de la película */}
                            <div className="sm:col-span-1 lg:col-span-2 space-y-6">
                                <div>
                                    <Field
                                        name="title"
                                        type="text"
                                        className="border-b-2 text-3xl font-bold text-yellow-400 bg-transparent border-transparent p-2 focus:outline-none focus:border-blue-500 w-full"
                                        placeholder="Movie title"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label htmlFor="actors" className="block text-xl font-semibold">
                                        Actors (comma-separated)
                                    </label>
                                    <Field
                                        name="actors"
                                        type="text"
                                        className="border-b-2 font-semibold text-lg text-gray-300 bg-transparent border-transparent p-2 focus:outline-none focus:border-blue-500 w-full"
                                        placeholder="Actor1, Actor2, Actor3"
                                    />
                                    <ErrorMessage name="actors" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label htmlFor="filmGenre" className="block text-xl font-semibold mb-2">
                                        Genre
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {genreList.map((genre) => (
                                            <label
                                                key={genre}
                                                className="flex items-center space-x-2 text-lg text-white hover:text-gray-200 cursor-pointer"
                                            >
                                                <Field
                                                    type="checkbox"
                                                    name="filmGenre"
                                                    value={genre}
                                                    className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                                />
                                                <span>{genre}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <ErrorMessage name="filmGenre" component="div" className="text-red-500 text-sm mt-2" />
                                </div>

                                <div>
                                    <label htmlFor="platforms" className="block text-xl font-semibold mb-2">
                                        Platforms
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {platformList.map((platform) => (
                                            <label
                                                key={platform}
                                                className="flex items-center space-x-2 text-lg text-white hover:text-gray-200 cursor-pointer"
                                            >
                                                <Field
                                                    type="checkbox"
                                                    name="platforms"
                                                    value={platform}
                                                    className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                                />
                                                <span>{platform}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <ErrorMessage name="platforms" component="div" className="text-red-500 text-sm mt-2" />
                                </div>

                                <div>
                                    <label htmlFor="date" className="block text-xl font-semibold">
                                        Release Date
                                    </label>
                                    <Field
                                        name="date"
                                        type="date"
                                        className="border-b-2 font-semibold text-lg text-gray-300 bg-transparent border-transparent p-2 focus:outline-none focus:border-blue-500 w-full"
                                    />
                                    <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label htmlFor="scoring" className="block text-xl font-semibold">
                                        Rating
                                    </label>
                                    <StarRating
                                        value={values.scoring}
                                        onChange={(value) => setFieldValue("scoring", value)}
                                    />
                                    <ErrorMessage name="scoring" component="div" className="text-red-500 text-sm" />
                                </div>

                                {successMessage && (
                                    <div className="mb-4 text-green-700 font-bold text-xl text-center">
                                        {successMessage}
                                    </div>
                                )}

                                {errors.general && (
                                    <div className="text-red-600 font-semibold text-center">
                                        {errors.general}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn bg-yellow-400 hover:bg-yellow-500 w-full py-2 text-black font-bold rounded-lg"
                                >
                                    {isSubmitting ? "Submitting..." : "Create Movie"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
