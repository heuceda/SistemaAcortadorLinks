import { redirect, notFound } from "next/navigation";
import { db } from "@/database/index";
import { links } from "@/database/schema";
import { eq } from "drizzle-orm";

export default async function SlugPage({ params }) {
  const { slug } = await params;

  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.slug, slug));

  if (!link) {
    notFound();
  }

  // Incrementar clics
  await db
    .update(links)
    .set({ 
      clicks: link.clicks + 1,
      updatedAt: new Date()
    })
    .where(eq(links.slug, slug));

  redirect(link.url);
}