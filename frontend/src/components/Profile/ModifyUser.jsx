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
            fetch(`http://localhost:3000/users`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((response) => response.ok? response.json(): response.text())
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
        <div className="flex flex-col items-center py-20 gap-10">
            <h2 className="text-2xl font-bold text-yellow-400">Modify your User Data</h2>
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
                            className="flex flex-col gap-4 w-full max-w-lg"
                            onChange={() => {
                                // Restablecer mensajes al cambiar cualquier dato
                                setSuccessMessage("");
                                if (errors.general) {
                                    errors.general = ""; // Limpia el mensaje de error general
                                }
                            }}
                        >
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
                            
                            {successMessage && (
                                <div className="mb-4 text-green-700 font-bold text-2xl text-center">
                                    {successMessage}
                                </div>
                            )}

                            {errors.general && (
                                <div className="mb-4 text-red-600 text-2xl font-bold text-center">
                                    {errors.general}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn w-full"
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
