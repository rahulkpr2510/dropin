import { migrate } from "drizzle-orm/neon-http/migrator";
import {drizzle} from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless";

import * as dotenv from "dotenv"

// load environment variables from .env
dotenv.config({path: ".env"})

// validate environment variables
if(!process.env.DATABASE_URL){
    throw new Error("Database URL is not set properly in the .env")
}

// Main migrate function
async function runMigration() {
    try {
        // Create a Neon SQL Connection
        const sql = neon(process.env.DATABASE_URL!)

        // Initialize Drizzle with the Connection
        const db = drizzle(sql)

        // Run migrations from the drizzle folder
        console.log("📂 Running migrations from ./drizzle folder");
        await migrate(db, {migrationsFolder: "./drizzle"})
        console.log("✅ Database migration completed successfully!");
    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1)
    }
}

// Run the migration
runMigration()