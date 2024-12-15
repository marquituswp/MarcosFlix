"use client"
// Componente para modificar un usuario
import { useUser } from "@/context/UserContext"; 
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ModifyUser() {
    const { userData, updateUserData } = useUser(); // Obtener los datos del usuario y la función para actualizarlos
    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
    const { token } = useAuth();  // Token del usuario

    // Validación de los campos del formulario
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "At least 3 characters")
            .max(99, "At most 99 characters"),
        email: Yup.string().email("Invalid email"),
        password: Yup.string()
            .min(8, "At least 8 characters")
            .max(16, "At most 16 characters")
            .nullable()
            .notRequired(),
        age: Yup.number()
            .min(1, "Age must be greater than 0"),
        city: Yup.string(),
        allowOffers: Yup.boolean(),
    });

    // Función para enviar los datos del formulario
    const HandleSubmit = (values, { setSubmitting, setErrors }) => {
        try {
            const body = {
                ...values,
            };
            // Si la contraseña no está vacía, añadirla al cuerpo del request
            if (values.password !== "") {
                body.password = values.password;
            } else {
                delete body.password;
            }
            fetch(`https://marcosflix.onrender.com/users`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((response) => response.ok ? response.json() : response.text())
                .then((data) => {
                    setSubmitting(false);
                    if (data.message) {
                        setSuccessMessage("User modified successfully");
                        updateUserData({ ...userData, ...body });
                    } else {
                        setSuccessMessage("");
                        setErrors({ general: "Invalid values" });
                    }
                })
                .catch((error) => {
                    setSuccessMessage("");
                    setErrors({ general: "An error occurred while updating" });
                    setSubmitting(false);
                });
        } catch (e) {
            setSuccessMessage("");
            setErrors({ general: "An error occurred while updating" });
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center py-10 sm:py-20 gap-6 sm:gap-10 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-8">
                Modify your User Data
            </h2>
            {userData && (
                <Formik
                    initialValues={{
                        name: userData.name,
                        lastName: userData.lastName,
                        email: userData.email,
                        password: "",
                        dateOfBirth: new Date(userData.dateOfBirth).toISOString().split('T')[0],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={HandleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form
                            className="flex flex-col gap-6 sm:gap-8 w-full max-w-3xl px-4 sm:px-8 py-6 "
                            onChange={() => {
                                // Restablecer mensajes al cambiar cualquier dato
                                setSuccessMessage("");
                                if (errors.general) {
                                    errors.general = ""; // Limpia el mensaje de error general
                                }
                            }}
                        >
                            {/* Nombre */}
                            <div className="flex flex-col sm:flex-row w-full">
                                <label className="text-yellow-400 font-semibold ml-3 sm:w-1/4 mb-2 sm:mb-0">Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="w-full sm:w-64 h-12 border-b-2 text-white border-transparent bg-transparent rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition duration-300 ease-in-out"
                                />
                            </div>
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />

                            {/* Apellido */}
                            <div className="flex flex-col sm:flex-row w-full">
                                <label className="text-yellow-400 font-semibold ml-3 sm:w-1/4 mb-2 sm:mb-0">Last Name</label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="w-full sm:w-64 h-12 border-b-2 text-white border-transparent bg-transparent rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition duration-300 ease-in-out"
                                />
                            </div>
                            <ErrorMessage
                                name="lastName"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />

                            {/* Fecha de nacimiento */}
                            <div className="flex flex-col sm:flex-row w-full">
                                <label className="text-yellow-400 font-semibold ml-3 sm:w-1/4 mb-2 sm:mb-0">Date of Birth</label>
                                <Field
                                    type="date"
                                    name="dateOfBirth"
                                    placeholder="Date of Birth"
                                    className="w-full sm:w-64 h-12 border-b-2 text-white border-transparent bg-transparent rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition duration-300 ease-in-out"
                                />
                            </div>
                            <ErrorMessage
                                name="dateOfBirth"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />

                            {/* Correo electrónico */}
                            <div className="flex flex-col sm:flex-row w-full">
                                <label className="text-yellow-400 font-semibold ml-3 sm:w-1/4 mb-2 sm:mb-0">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="w-full sm:w-64 h-12 border-b-2 text-white border-transparent bg-transparent rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition duration-300 ease-in-out"
                                />
                            </div>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />

                            {/* Contraseña */}
                            <div className="flex flex-col sm:flex-row w-full">
                                <label className="text-yellow-400 font-semibold ml-3 sm:w-1/4 mb-2 sm:mb-0">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full sm:w-64 h-12 border-b-2 text-white border-transparent bg-transparent rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition duration-300 ease-in-out"
                                />
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />

                            {/* Mensaje de éxito */}
                            {successMessage && (
                                <div className="mb-4 text-green-700 font-bold text-xl sm:text-2xl text-center">
                                    {successMessage}
                                </div>
                            )}

                            {/* Mensaje de error */}
                            {errors.general && (
                                <div className="mb-4 text-red-600 text-xl sm:text-2xl font-bold text-center">
                                    {errors.general}
                                </div>
                            )}

                            {/* Botón de envío */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn"
                            >
                                {isSubmitting ? "Modifying User" : "Submit"}
                            </button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}
