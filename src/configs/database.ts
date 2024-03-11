import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { DATABASE_URL } from '../utils/constants';

export const db = drizzle(new Database(DATABASE_URL));