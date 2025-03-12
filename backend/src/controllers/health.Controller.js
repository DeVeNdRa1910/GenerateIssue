import { sql } from "drizzle-orm";

async function healthCheck(req, res){
    try {
        // Check database connection
        await sql`SELECT 1`;
        res.status(200).json({
            status: 'UP',
            database: 'UP',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({
            status: 'DOWN',
            database: 'DOWN',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
}

export default healthCheck;