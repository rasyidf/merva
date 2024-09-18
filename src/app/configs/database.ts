import { DATABASE_URL } from "@/shared/utils/constants";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3"; 

export const db = drizzle(new Database(DATABASE_URL));
