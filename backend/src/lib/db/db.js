import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import config from '../../utils/conf.js'

const db_uri = config.db_uri;
export const connection = postgres(db_uri);

export const db = drizzle(connection);
