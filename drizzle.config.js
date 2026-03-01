import { config } from 'dotenv';
config({ path: '.env.local' , override: true});

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: "./database/schema.js",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});