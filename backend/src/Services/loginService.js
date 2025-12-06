import pool from "../database/connection.js"

export async function userLoginService(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1",
    [email]);

    return result.rows[0];
}