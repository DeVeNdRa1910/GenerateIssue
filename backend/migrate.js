import { migrate } from "drizzle-orm/postgres-js/migrator"
import { connection, db } from "./src/lib/db/db.js"

(async ()=>{
    await migrate(db, {migrationsFolder: './drizzle'})
    await connection.end();
    console.log('Migration successful')
})()