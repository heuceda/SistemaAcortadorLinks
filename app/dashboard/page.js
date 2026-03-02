"use client";
import { useState, useEffect, use } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Dashboard() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [links, setLinks] = useState([]);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        if (session) fetchLinks();
    }, [session]);

    const fetchLinks = async () => {
        const res = await fetch("/api/links");
        const data = await res.json();
        setLinks(data);
    };

    const handleCreateLink = async () => {
        setError("");
        setLoading(true);

        const res=await fetch("/api/links", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({url}),
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.error || "Error al crear el enlace");
            setLoading(false);
            return;
        }
        
        setUrl("");
        setLoading(false);
        fetchLinks();
    };

    const handleCopy = (slug) => {
        const shortUrl = `${window.location.origin}/${slug}`;
        navigator.clipboard.writeText(shortUrl);
        setCopied(slug);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleSignOut = async () => {
        await signOut();
        router.push("/login");
    };

    if (isPending) return <div className ="min-h-screen flex items-center justify-center">Cargando...</div>;
    if (!session) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className ="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-700">Acortador de Links</h1>
                <div className="flex items-center gap-4">
                    <button onClick={handleSignOut}
                        className="flex items-center gap-2 text-sm text-blue-900 hover:underline">
                        <LogOut size={16}/>
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-6">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Hola, {session.user.name} 
                </h2>
                {/* Formulario crear link */}
                <div className = "bg-white p-6 rounded-xl shadow-sm mb-6">
                    <h2 className="text-lg font-semibold mb-4">Acortar un enlace</h2>
                    {error && (
                        <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</p>
                    )}
                    <div className="flex gap-2">
                        <input type="url" placeholder="Pega tu URL aquí" value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={handleCreateLink} disabled={loading}
                            className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition disabled:opacity-50">
                            {loading ? "..." : "Acortar"}
                        </button>
                    </div>
                </div>

                {/* Lista de links */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Mis enlaces</h2>
                    {links.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center">Aún no has tienes enlaces creados.</p>
                    ) : (
                        <div className = "flex flex-col gap-3">
                            {links.map((link) => (
                                <div key={link.id} className="border rounded-lg p-4 flex items-center justify-between gap-4">
                                    <div className = "min-w-0">
                                        <p className="text-sm text-blue-600 font-medium truncate">
                                            {window.location.origin}/{link.slug}
                                        </p>
                                        <p className = "text-gray-400 text-xs truncate">{link.url}</p>
                                        <p className = "text-gray-300 text-xs mt-1">
                                            {link.clicks} {link.clicks === 1 ? "clic" : "clics"}
                                        </p>
                                    </div>

                                    <button onClick={() => handleCopy(link.slug)}
                                    className = "shrink-0 text-sm text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition"
                                    >
                                    {copied === link.slug ? "Copiado" : "Copiar"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}