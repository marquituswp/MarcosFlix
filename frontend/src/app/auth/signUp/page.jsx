"use client";
import { useState } from "react";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import handleUploadProfilePicture from "@/lib/handleUploadImage";

export default function SignUpFormik() {
    const { login } = useAuth(); // Hook para iniciar sesión
    const [imageFile, setImageFile] = useState(null); // Almacena el archivo seleccionado

    // Esquema de validación de los campos del formulario
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "Name at least 3 characters")
            .max(99, "Name at most 99 characters")
            .required("Name is required"),
        lastName: Yup.string()
            .min(3, "Name at least 3 characters")
            .max(99, "Name at most 99 characters")
            .required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(8, "At least 8 characters")
            .max(16, "At most 16 characters")
            .required("Password is required"),
        dateOfBirth: Yup.date().required("Date is required"),
        image: Yup.mixed().required("Image is required"),
    });

    // Función que envía los datos del formulario al servidor
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const body = { ...values };
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.token) {
                    login(data.token); // Inicia sesión
                    handleUploadProfilePicture(data.token, imageFile)
                    
                } else {
                    setErrors({ general: "Unexpected response from the server." });
                }
            } else {
                const errorText = await response.text();
                setErrors({ general: errorText || "Registration failed." });
            }
        } catch (error) {
            setErrors({ general: "An unexpected error occurred. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file); // Almacena el archivo en el estado
            setFieldValue("image", file); // Pasa el archivo al formulario
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center bg-gray-900 bg-opacity-90 p-10 rounded-2xl shadow-xl max-w-lg w-full">
                <h1 className="text-4xl font-extrabold text-yellow-400 mb-6 text-center">
                    Create an Account
                </h1>
                <p className="text-yellow-200 text-center mb-4">
                    Join us and explore endless possibilities.
                </p>

                <Formik
                    initialValues={{
                        name: "",
                        lastName: "",
                        email: "",
                        password: "",
                        dateOfBirth: "",
                        image: "", // Inicializa el campo de la imagen
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, isSubmitting, errors }) => (
                        <Form className="flex flex-col gap-4 items-center w-full">
                            <div className="flex flex-row items-center w-full">
                                <label className="text-white w-1/4">Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="w-64 h-10 border-b-2 text-white border-transparent bg-transparent rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                            <div className="flex flex-row items-center w-full">
                                <label className="text-white w-1/4">Last Name</label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="w-64 h-10 border-b-2 text-white border-transparent bg-transparent rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <ErrorMessage
                                name="lastName"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                            <div className="flex flex-row items-center w-full">
                                <label className="text-white w-1/4">Date of Birth</label>
                                <Field
                                    type="date"
                                    name="dateOfBirth"
                                    placeholder="Date of Birth"
                                    className="w-64 h-10 border-b-2 text-white border-transparent bg-transparent rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <ErrorMessage
                                name="dateOfBirth"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                            <div className="flex flex-row items-center w-full">
                                <label className="text-white w-1/4">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="w-64 h-10 border-b-2 text-white border-transparent bg-transparent rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                            <div className="flex flex-row items-center w-full">
                                <label className="text-white w-1/4">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-64 h-10 border-b-2 text-white border-transparent bg-transparent rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                            <div>
                                <label className="text-white w-1/4 mb-2">Upload Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm sm:text-sm text-yellow-400"
                                    onChange={(event) => handleFileChange(event, setFieldValue)}
                                />
                            </div>
                            <ErrorMessage
                                name="image"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                            {errors.general && (
                                <div className="text-red-600 font-semibold text-center">
                                    {errors.general}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn w-full"
                            >
                                {isSubmitting ? "Creating Account..." : "Sign Up"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <Link href="/auth/login">
                    <p className="mt-4 text-sm text-yellow-200">
                        Already have an account?{" "}
                        <span className="text-indigo-500 hover:underline">Log In</span>
                    </p>
                </Link>
            </div>
        </div>
    );
}

