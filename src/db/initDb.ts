import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function initDb() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS protein (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                grams INTEGER DEFAULT 150
            );

            CREATE TABLE IF NOT EXISTS carbohydrates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                grams INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS vegetables (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                grams INTEGER NOT NULL
            );
        `);

        console.log('Database structure initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

initDb().catch(console.error); 