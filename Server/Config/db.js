import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pkg;

const database = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ShopMate_Ecommerce',
    password: process.env.DB_PASS,
    port: 5432,
});

try {
    await database.connect();
    console.log('Database Connected!');

} catch (error) {
    console.log("Database Connection Failed: ", error);
    process.exit(1);
}

export default database;