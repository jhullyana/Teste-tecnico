create database teste;

create table if not exists users(
	id SERIAL primary key,
	name VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255)
);

create table if not exists curriculos(
    id SERIAL primary key,
    user_id INTEGER not null REFERENCES users(id) ON DELETE CASCADE, 
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