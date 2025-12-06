import dotenv from "dotenv";
dotenv.config();
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING
});

pool.connect()
    .then(() => console.log("Conectado ao banco!"))
    .catch(err => console.error("Erro ao conectar no banco:", err));

export default pool;
