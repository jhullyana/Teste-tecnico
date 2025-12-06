import pool from './connection.js';

async function createTables() {
  try {
    // Apaga as tabelas antigas (se existirem) para recriar do zero
    await pool.query(`DROP TABLE IF EXISTS curriculos;`);
    await pool.query(`DROP TABLE IF EXISTS users;`);

    // Cria tabela de usuários
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
      );
    `);

    // Cria tabela de currículos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS curriculos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        nome_extraido VARCHAR(255),
        email_extraido VARCHAR(255),
        telefone_extraido VARCHAR(255),
        cep VARCHAR(10),
        logradouro VARCHAR(255),
        bairro VARCHAR(255),
        cidade VARCHAR(255),
        uf VARCHAR(2),
        conteudo_completo TEXT,
        data_envio TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tabelas criadas com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
    process.exit(1);
  }
}

createTables();
