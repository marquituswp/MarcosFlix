"use client";
// Componente para el formulario de reseña de una movie
import React, { useState } from "react";
import StarRating from "../StarRating";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ReviewMovie({ movieId }) {
    const router = useRouter();
    const { token } = useAuth()
    const [successMessage, setSuccessMessage] = useState("");

    // Valores iniciales
    const initialValues = {
        review: "",
        scoring: "",
    };

    // Esquema de validación del formulario
    const validationSchema = Yup.object({
        review: Yup.string()
            .required("Comment is required")
            .max(500, "Comment at most 500 characters"),
        scoring: Yup.number()
            .required("Rating is required")
            .min(0.5, "Minimum rating is 0.5")
            .max(5, "Maximum rating is 5"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {

            const response = await fetch(
                `http://localhost:3000/users/reviewMovie/${movieId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.message) {
                    setSuccessMessage(data.message);

                    // Redirige a la página de la película después de 1 segundo
                    setTimeout(() => {
                        router.push(`/movie/${movieId}`);
                    }, 1000);
                } else {
                    setErrors({
                        general: "ERROR REVIEWING",
                    });
                }
            } else {
                setErrors({ general: "Invalid values" });
            }
        } catch {
            setErrors({
                general: "An unexpected error occurred. Please try again.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-950">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg">
                <Link href={`/movie/${movieId}`}>
                    <p className="text-yellow-400 font-medium text-lg mb-4 block hover:underline">
                        Back to Movie Details
                    </p>
                </Link>
                <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
                    Leave a Review
                </h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, setFieldValue, errors }) => (
                        <Form className="space-y-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="review"
                                    className="block text-sm font-medium text-yellow-300"
                                >
                                    Comment
                                </label>
                                <Field
                                    as="textarea"
                                    name="review"
                                    id="review"
                                    rows="4"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 text-white placeholder-gray-400"
                                    placeholder="Write your review here"
                                />
                                <ErrorMessage
                                    name="review"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="scoring" className="block text-sm font-medium text-yellow-400">
                                    Rating
                                </label>
                                <StarRating
                                    value={values.scoring}
                                    onChange={(value) => setFieldValue("scoring", value)}
                                />
                                <ErrorMessage
                                    name="scoring"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {successMessage && (
                                <div className="mb-4 text-green-500 font-bold text-center">
                                    {successMessage}
                                </div>
                            )}

                            {errors.general && (
                                <div className="mb-4 text-red-500 font-bold text-center">
                                    {errors.general}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn w-full"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Review"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
