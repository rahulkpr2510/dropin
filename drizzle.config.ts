import {defineConfig} from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({path: ".env"})

if(!process.env.DATABASE_URL){
    throw new Error("Database URL is not set properly in .env")
}

export default defineConfig({
    schema: "./lib/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    migrations: {
        table: "__drizzle_migrations",
        schema: "public",
    },
    verbose: true,
    strict: true,
})