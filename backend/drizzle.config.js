import { defineConfig } from 'drizzle-kit';
import conf from './src/utils/conf';

export default defineConfig({
    schema: './src/lib/db/schema.js',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: conf.db_url,
    }
})