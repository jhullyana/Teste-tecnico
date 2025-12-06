

# 📝 Desafio Técnico – Cadastro de Candidato com Análise de CV

Bem-vindo ao meu desenvolvimento do desafio técnico!
Este repositório contém a aplicação desenvolvida para cadastro de candidatos, envio e análise de currículos em PDF, integração com API externa, filtros, busca, e manipulação de dados com segurança.

---

# 📌 Sumário

- [Objetivo do Projeto](#-objetivo-do-projeto)

- [Funcionalidades Implementadas](#-funcionalidades-implementadas)

- [Diferenciais e Arquitetura](#-diferenciais-e-arquitetura)

- [Principais Desafios](#-principais-desafios)

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)

- [Como Rodar o Projeto](#-como-rodar-o-projeto)

- [Possíveis Atualizações Futuras](#-possiveis-atualizacoes-futuras)

# 🎯 Objetivo do Projeto

Construir uma aplicação web onde o usuário possa:

-  Criar conta e fazer login
-  Enviar um currículo em PDF
-  Informar um CEP
-  Ter o endereço preenchido automaticamente pela API ViaCEP
-  Ter nome, e-mail e telefone extraídos automaticamente do PDF
-  Gravar todos os dados no banco de dados, incluindo texto completo extraído do PDF
-  Visualizar lista de candidatos cadastrados com:
    -  Paginação
    -  Filtros
    -  Busca por conteúdo do currículo
-  Editar e excluir currículos

O sistema busca simular um ambiente real de integração de múltiplos serviços e manipulação de dados.
---

# 🧩 Funcionalidades Implementadas

## Autenticação

   - Cadastro de usuário
   - Login com JWT para autenticação segura
   - Proteção das rotas privadas
   - Criptografia de senhas com bcrypt

## Upload de PDF

   - Aceita apenas arquivos PDF
   - Extração de:
      -  Nome
      -  E-mail
      -  Telefone
   - Armazena o conteúdo completo do PDF no banco de dados

## Consulta ViaCEP

  -  Busca endereço a partir do CEP informado
  -  Preenche logradouro, bairro, cidade e UF automaticamente

## Listagem de Candidatos

  -  Paginação
  -  Filtros combinados (nome, e-mail, telefone)
  -  Busca textual no currículo
  -  Edição e exclusão de registros

# ⭐ Diferenciais e Arquitetura

##  Arquitetura modular com separação de responsabilidades:

  -  Controllers-> lógica de rotas
  -  Database -> conexão e queries
  -  Services -> lógica de negócios e manipulação de dados
  -  Tratamento de erros e validações
  -  Frontend baseado em Vite, com React Hooks, Axios, React Query e componentização
  -  Inspirado nas cores do site da Luto Curitiba

# Principais Desafios

### ✔ Extração confiável de dados do PDF usando Regex

### ✔ Integração segura entre frontend, backend e banco de dados

### ✔ Garantir criptografia de senhas e autenticação com JWT

### ✔ Normalização de texto extraído de PDFs


# 🛠️ Tecnologias Utilizadas

### Backend
-Node.js
-Express
-PostgreSQL
-bcrypt
-JWT

### Frontend
-React (via Vite)
-Axios
-React Query
-React Hooks (useState, useEffect)

### Banco de Dados
- PostgreSQL 

### Integrações
-API ViaCEP
-Regex para extração de PDF


---

# 🚀 Como Rodar o Projeto

## Utilize esses comandos no seu terminal (Lembrando que há a necessidade de especificar o backend e o frontend)

# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev  

Acesse http://localhost:5173 (ou a porta exibida pelo Vite) para visualizar o frontend.

# Possíveis Atualizações Futuras

    -Tornar o frontend totalmente responsivo para dispositivos móveis
    -Suporte a PDFs escaneados via OCR
    -Dashboard administrativo para análise de candidatos
    -Filtros avançados (data de envio, cidade, etc.)
    -Melhorias visuais no frontend

