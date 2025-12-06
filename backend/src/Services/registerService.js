import pool from "../database/connection.js"

export async function registerVerifyService(email){
    const result = await pool.query("SELECT * FROM users WHERE email= $1", 
        [email]);

        return result;
}

export async function registerService(name, email, hashPassword) {
    const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name,email, hashPassword]);

    return result.rows[0];
}