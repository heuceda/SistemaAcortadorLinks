# Sistema Acortador de Links
Aplicación web para acortar URLs largas, usando Next.js con Better Auth, Drizzle ORM y Neon (PostgreSQL)

# Funcionalidades
- Registro e inicio de sesión con email y contraseña 
- Crear enlaces cortos únicos a partir de URLs largas
- Redirección automática al acceder al enlace corto
- Dashboard con lista de enlaces creados
- Contador de clics por enlace
- Botón para copiar el enlace corto
- Página 404 amigable

# Tecnologías
    * Framework: Next.js 16 (App Router)
    * Autenticación: Better Auth
    * Base de datos: Neon (PostgreSQL)
    * ORM: Drizzle ORM
    * Estilos: Tailwind CSS
    * Deploy: Vercel

# Instalación y ejecución local

1. Clona el repositorio:
``` bash
git clone https://github.com/heuceda/SistemaAcortadorLinks  
cd SistemaAcortadorLinks
```

2. Instala las dependencias
```bash
npm install
```

 3. Configurar variables de entorno
 Crea un archivo .env.local en la raíz y copia el contenido de .env.example

4. Completa las variables de entorno en `.env.local` (ver sección abajo)

5. Correo las migraciones:
```bash
npx drizzle-kit push
```

6. Inicia el servidor de desarrollo:
```bash
npm run dev
```

7. Abre [http://localhost:3000](http://localhost:3000)


# Variables de entorno

`DATABASE_URL`                  Conexión a la base de datos. Aquí va la Connection String de Neon
`BETTER_AUTH_SECRET`            Generar con: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
`BETTER_AUTH_URL`               URL de la app (local: `http://localhost:3000`)
`NEXT_PUBLIC_BETTER_AUTH_URL`   Igual que `BETTER_AUTH_URL`, pero su prefijo `NEXT_PUBLIC` hace que Next.js la exponga al navegador

# Deploy en Vercel
[https://sistema-acortador-links.vercel.app](https://sistema-acortador-links.vercel.app)