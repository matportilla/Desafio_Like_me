import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    allowExitOnIdle: true,
});

// Manejo de errores usando .catch
pool.query("SELECT NOW()")
    .then(() => {
        console.log("Database connected");
    })
    .catch(error => {
        console.error("Error connecting to database:", error);
    });

// Cerrar el pool de conexiones al salir de la aplicación
process.on('exit', () => {
    pool.end();
});

export default pool;
