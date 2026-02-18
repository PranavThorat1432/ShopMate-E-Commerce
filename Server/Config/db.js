import pkg from 'pg';

const { Client } = pkg;

const database = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ShopMate_Ecommerce',
    password: 'mern',
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