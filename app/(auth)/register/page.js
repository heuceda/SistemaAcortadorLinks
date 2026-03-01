"use client";
import { use, useState } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const fullName = `${firstName} ${lastName}`.trim();

        const {error} = await signUp.email({name: fullName, email, password});

        if (error) {
            setError("Error al crear la cuenta. Intenta nuevamente.");
            setLoading(false);
            return;
        }

        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h1>

                {error && (
                    <p className = "bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>
                )}
                    
                <div className="flex flex-col gap-4">

                    <div className="grid grid-cols-2 gap-3"> 
                        <div className="flex flex-col gap-1">
                            <label className="flex flex-col gap-1 font-bold">Nombre</label>
                            <input type="text" placeholder="ej. Helen" value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} 
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="flex flex-col gap-1 font-bold">Apellido</label>
                            <input type="text" placeholder="ej. Euceda" value={lastName}
                            onChange={(e) => setLastName(e.target.value)} 
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="flex flex-col gap-1 font-bold">Correo electrónico</label>
                        <input type="email" placeholder="Correo electrónico" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="flex flex-col gap-1 font-bold">Contraseña</label>
                        <input type="password" placeholder="Contraseña" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                    onClick={handleSubmit} disabled={loading}
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                     {loading ? "Cargando..." : "Registrarse"}
                    </button>
                </div>

                <p className="text-center text-sm mt-4 text-gray-500">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
