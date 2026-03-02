import Link from "next/link";
import { Search, Monitor, Settings } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="relative w-full max-w-md text-center">
        
        <Settings className="absolute -top-12 -right-8 text-slate-200 animate-spin-slow w-20 h-20 -z-10 opacity-50" />
        <Settings className="absolute top-24 -left-12 text-slate-100 w-14 h-14 -z-10 opacity-50" />

        <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
          
          {/* Ícono Laptop */}
          <div className="relative inline-block mb-8">
            <Monitor size={140} strokeWidth={1} className="text-slate-200" />
            <div className="absolute inset-0 flex items-center justify-center pb-4">
               <span className="text-5xl font-black text-slate-800 tracking-tighter">404</span>
            </div>
            
            {/* Ícono de lupa animada */}
            <div className="absolute bottom-2 right-0 bg-blue-600 p-3 rounded-full shadow-lg animate-bounce">
              <Search size={24} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-3">Página no encontrada</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Parece que el recurso que buscas se ha movido o se ha eliminado. 
            ¡No te preocupes, te ayudamos a volver!
          </p>

          {/* Botón para volver al inicio*/}
          <Link 
            href="/" 
            className="inline-block bg-blue-800 text-white font-semibold py-3 px-10 rounded-xl hover:bg-blue-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mt-8 text-slate-400 text-xs tracking-widest uppercase">Error Code: 404_NOT_FOUND</p>
      </div>
    </div>
  );
}