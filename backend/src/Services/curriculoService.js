import pool from '../database/connection.js';

export async function uploadResumeService(userId, fileBuffer, cep) {
    const nome_extraido = null;
    const email_extraido = null;
    const telefone_extraido = null;
    const cidade = null;
    const uf = null;
    const logradouro = null;
    const bairro = null;
    const conteudo_completo = null;

    const query = `
        INSERT INTO curriculos (user_id, nome_extraido, email_extraido, telefone_extraido, cidade, uf, cep, logradouro, bairro, conteudo_completo)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
    `;

    const result = await pool.query(query, [
        userId, nome_extraido, email_extraido, telefone_extraido, cidade, uf, cep, logradouro, bairro, conteudo_completo
    ]);

    return result.rows[0];
}

export async function getResumeByUserIdService(userId) {
    const query = 'SELECT * FROM curriculos WHERE user_id = $1;';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
}

export async function getResumesService(page, limit, filter) {
    const offset = (page - 1) * limit;

    let params = [limit, offset]; 
    let whereClause = '';
    let countParams = [];

    if (filter && filter.trim() !== '') {
        const filterValue = `%${filter}%`;
        whereClause = `
            WHERE 
                nome_extraido ILIKE $3 OR
                email_extraido ILIKE $3 OR
                cidade ILIKE $3 OR
                uf ILIKE $3 OR
                conteudo_completo ILIKE $3
        `;
        params.push(filterValue); 
        countParams.push(filterValue);
    }

    const query = `
        SELECT id, nome_extraido, email_extraido, telefone_extraido, cidade, uf, data_envio
        FROM curriculos
        ${whereClause}
        ORDER BY data_envio DESC
        LIMIT $1
        OFFSET $2;
    `;

    const countQuery = filter && filter.trim() !== ''
        ? `
            SELECT COUNT(*) FROM curriculos
            ${whereClause.replace(/\$3/g, '$1')}
        `
        : `SELECT COUNT(*) FROM curriculos`;

    const finalCountParams = filter && filter.trim() !== '' ? [params[2]] : [];

    const [resumesResult, countResult] = await Promise.all([
        pool.query(query, params),
        pool.query(countQuery, finalCountParams)
    ]);

    const totalResumes = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalResumes / limit);

    return {
        resumes: resumesResult.rows,
        totalResumes,
        totalPages,
        currentPage: page
    };
}

export async function deleteResumeByIdService(id) {
    const result = await pool.query("DELETE FROM curriculos WHERE id = $1 RETURNING id", [id]);
    return result.rows[0];
}


export async function updateResumeService(id, data) {
    const { nome_extraido, email_extraido, telefone_extraido } = data;

    const query = `
        UPDATE curriculos
        SET nome_extraido = $1, email_extraido = $2, telefone_extraido = $3
        WHERE id = $4
        RETURNING *;
    `;

    const result = await pool.query(query, [nome_extraido, email_extraido, telefone_extraido, id]);
    return result.rows[0];
}
