import pool from "../database/connection.js"

export async function getUsersServices(){
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
}

export async function getUserByIdServices(id){
    const result = await pool.query("SELECT * FROM users WHERE id = $1",[id] )
    return result.rows[0];
}

export async function deleteUserByIdService(id) {
    return await pool.query("DELETE FROM users WHERE id = $1", [id])
}

export async function putUserByIdService(id, name, email, hashPassword) {
    const result = await pool.query("UPDATE users SET name = $1, email = $2,password = $3 WHERE id = $4 RETURNING *",
         [name,email, hashPassword, id]);

    return result.rows[0];
    
}

export async function patchUserByIdService(id, data) {
    
    const campos = Object.keys(data); 
    const values = Object.values(data);

    const setClause = campos.map((campo, i) => `${campo} = $${i+1}` ).join(","); //aqi estou utilizando o map

    const query = `UPDATE users SET ${setClause} WHERE id = $${campos.length + 1} RETURNING *`; 

    const result = await pool.query(query, [...values, id]);

    return result.rows[0];

}

export async function createUserService(name, email, hashPassword) {
    const result = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email"
        [name, email, hashPassword]
    );

    return result.rows[0];
}