import {NextResponse } from "next/server";
import { db } from "@/database/index";
import { links } from "@/database/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import {nanoid} from "nanoid";

// GET - obtener links del usuario autenticado
export async function GET(request) {
    const session = await auth.api.getSession({
        headers: request.headers,
    }); 

    if(!session) {
        return NextResponse.json({error: "No autorizado" }, {status: 401});
    }

    const userLinks = await db
        .select()
        .from(links)
        .where(eq(links.userId, session.user.id));

    return NextResponse.json(userLinks);
}


// POST - crear un nuevo link para el usuario autenticado
export async function POST(request) {
    const session = await auth.api.getSession({
        headers: request.headers,
    }); 

    if(!session){
        return NextResponse.json({error: "No autorizado"}, {status: 401})
    }

    const {url} = await request.json();
    if(!url) {
        return NextResponse.json({error: "URL requerida"}, {status: 400});
    }

    // Validación para comprobar si la URL es válida
    try {
        new URL(url);
    } catch (error) {
        return NextResponse.json({error: "URL inválida"}, {status: 400});
    }

    const slug = nanoid(6); // Genera un slug único de 6 carácteres

    const [newLink] = await db
        .insert(links)
        .values({
            id: nanoid(),
            url,
            slug,
            userId: session.user.id,
        })
        .returning();

    return NextResponse.json(newLink, {status: 201});

}