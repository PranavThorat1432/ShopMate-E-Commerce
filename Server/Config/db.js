import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pkg;

const database = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        required: true
    }
});

try {
    await database.connect();
    console.log('Database Connected!');

} catch (error) {
    console.log("Database Connection Failed: ", error);
    process.exit(1);
}

export default database;