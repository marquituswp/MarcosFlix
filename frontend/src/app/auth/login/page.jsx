"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
    const router = useRouter(); // Hook para redirigir a otras páginas
    const { login } = useAuth(); // Hook para iniciar sesión

    // Esquema de validación de los campos del formulario
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password at least 8 characters"),
    });

    // Función que envía los datos del formulario al servidor
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        const { email, password } = values;

        try {
            const response = await fetch("https://marcosflix.onrender.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.token) {
                    login(data.token); // Inicia sesión
                    router.push("/"); // Redirige al home o dashboard
                } else {
                    setErrors({ general: "Unexpected response from the server." });
                }
            } else {
                setErrors({ general: "Invalid email or password." });
            }
        } catch (error) {
            console.error("Login Error:", error);
            setErrors({ general: "An unexpected error occurred. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="flex flex-col items-center bg-gray-900 bg-opacity-90 p-10 rounded-2xl shadow-xl max-w-md w-full">
                <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">
                    Welcome Back!
                </h1>
                <p className="text-yellow-200 text-center mb-4">
                    Enter your credentials to access your account.
                </p>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}

                >
                    {({ isSubmitting, errors }) => (
                        <Form className="flex flex-col gap-4 items-center w-full">
                            <div className="flex flex-row items-center w-full">
                                <label className="text-white w-1/4">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-64 h-10 border-b-2 text-white border-transparent bg-transparent rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                />

                            </div>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm"
                            />

                            <div className="flex flex-row items-center w-full">
                                <label className="text-white w-1/4">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-64 h-10 border-b-2 text-white border-transparent bg-transparent rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm"
                            />

                            {errors.general && (
                                <div className="text-red-500 text-sm font-bold">{errors.general}</div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn w-full"
                            >
                                {isSubmitting ? "Submitting..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <Link href="/auth/signUp">
                    <p className="mt-4 text-sm text-yellow-200">
                        Dont have an account?{" "}
                        <span className="text-indigo-500 font-medium hover:underline">
                            Sign Up
                        </span>
                    </p>
                </Link>
            </div>
        </div>
    );
}
