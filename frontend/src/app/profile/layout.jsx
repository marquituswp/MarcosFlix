"use client"
import { UserProvider } from "@/context/UserContext";

export default function Layout({ children }) {
    return (
        <UserProvider>
            <div className="min-h-screen">
                {children}
            </div>
        </UserProvider>
    );
}
