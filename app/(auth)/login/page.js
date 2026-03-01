"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const {error} = await signIn.email({email, password});

        if (error) {
            setError("Correo o contraseña incorrectos");
            setLoading(false);
            return;
        }

        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className = "bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className = "text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
                {error && (
                    <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>
                )}

                <div className = "flex flex-col gap-4">
                    { /* Correo electrónico */ }
                    <input type = "email" placeholder = "Correo electrónico" value={email} 
                           onChange={(e) => setEmail(e.target.value)} 
                           className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {/* Contraseña */}
                    <input type = "password" placeholder = "Contraseña" value={password} 
                           onChange={(e) => setPassword(e.target.value)} 
                           className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {/* Botón de iniciar sesión */}
                    <button onClick={handleSubmit} disabled={loading} 
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                        {loading ? "Cargando..." : "Entrar"}
                    </button>
                </div>

                <p className="text-center text-sm mt-4 text-gray-500">
                    ¿No tienes una cuenta?{" "} 
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Regístrate
                    </Link>
                </p>

            </div>
        </div>
    );
}