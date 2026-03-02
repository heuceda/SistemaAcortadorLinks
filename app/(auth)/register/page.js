"use client";
import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const fullName = `${firstName} ${lastName}`.trim();

        const {error} = await signUp.email({name: fullName, email, password});

        if (error) {
            setError(error.message || JSON.stringify(error));
            setLoading(false);
            return;
        }

        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">

            {/* Iconos de fondo */}
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                    {[
                        { top: "5%", left: "8%" },
                        { top: "10%", left: "45%" },
                        { top: "8%", right: "10%" },
                        { top: "30%", left: "5%" },
                        { top: "45%", right: "6%" },
                        { top: "60%", left: "8%" },
                        { top: "75%", left: "35%" },
                        { top: "80%", right: "12%" },
                        { top: "88%", left: "15%" },
                        { top: "25%", right: "20%" },
                        { top: "35%", left: "22%" },
                        { top: "70%", right: "30%" },
                    ].map((pos, i) => (
                        <svg key={i} style={{ position: "absolute", ...pos, opacity: 0.08, width: "48px", height: "48px" }}
                            viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                        </svg>
                    ))}
                </div>

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h1>

                {error && (
                    <p className = "bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>
                )}
                    
                <div className="flex flex-col gap-8">

                    <div className="grid grid-cols-2 gap-3"> 
                        <div className="flex flex-col gap-1">
                            <label className="flex flex-col font-bold">Nombre</label>
                            <input type="text" placeholder="ej. Helen" value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} 
                            className="border rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="flex flex-col font-bold">Apellido</label>
                            <input type="text" placeholder="ej. Euceda" value={lastName}
                            onChange={(e) => setLastName(e.target.value)} 
                            className="border rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="flex flex-col gap-1 font-bold">Correo electrónico</label>
                        <input type="email" placeholder="Correo electrónico" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="flex flex-col gap-1 font-bold">Contraseña</label>
                        <input type="password" placeholder="Contraseña" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>
                    </div>

                    <button
                    onClick={handleSubmit} disabled={loading}
                    className="bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition disabled:opacity-50"
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
