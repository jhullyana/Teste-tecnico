import PDFParser from "pdf2json";
import axios from "axios";
import pool from "../database/connection.js";

async function extractDataFromPdfText(pdfBuffer) {
    return new Promise((resolve, reject) => {
        
        const pdfParser = new PDFParser(null, 1); 

        pdfParser.on("pdfParser_dataError", (err) => {
            console.error("Erro do PDF2JSON:", err.parserError);
            reject(err.parserError);
        });
        
        pdfParser.on("pdfParser_dataReady", () => {
            const text = pdfParser.getRawTextContent();
            
            
            const nameRegex = /^[\s\n]*([A-Za-zÀ-ÿ\s'-]{2,}(?:\s+[A-Za-zÀ-ÿ\s'-]{2,}){1,3})[\s\n]*/; 
            
            const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6})/;
            
            const phoneRegex = /(\(?\d{2}\)?\s?\d{4,5}[-.\s]?\d{4})/g; 

            const nome_extraido = text.match(nameRegex)?.[1]?.trim() || "Não Encontrado";
            const email_extraido = text.match(emailRegex)?.[1] || "Não Encontrado";
            
            const phoneMatches = [...text.matchAll(phoneRegex)];
            const telefone_extraido = phoneMatches.length > 0 ? phoneMatches[0][1] : "Não Encontrado";

            resolve({
                nome_extraido,
                email_extraido,
                telefone_extraido,
                conteudo_completo: text
            });
        });

        pdfParser.parseBuffer(pdfBuffer);
    });
}


export async function uploadCvService(userId, pdfBuffer, cep) {
    try {
        const {
            nome_extraido,
            email_extraido,
            telefone_extraido,
            conteudo_completo
        } = await extractDataFromPdfText(pdfBuffer);

        // API DO ViaCEP
        let logradouro = "", bairro = "", cidade = "", uf = "";

        try {
            const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (!res.data.erro) {
                logradouro = res.data.logradouro;
                bairro     = res.data.bairro;
                cidade     = res.data.localidade;
                uf         = res.data.uf;
            }
        } catch (error) {
            console.error("Erro ViaCEP:", error.message);
        }

        const query = `
            INSERT INTO curriculos (
                user_id,
                nome_extraido,
                email_extraido,
                telefone_extraido,
                cep,
                logradouro,
                bairro,
                cidade,
                uf,
                conteudo_completo
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *;
        `;

        const result = await pool.query(query, [
            userId,
            nome_extraido,
            email_extraido,
            telefone_extraido,
            cep,
            logradouro,
            bairro,
            cidade,
            uf,
            conteudo_completo
        ]);

        return result.rows[0];

    } catch (error) {
        console.error("Erro no Service de Upload de CV:", error);
        throw error;
    }
}


export async function getCvByUserIdService(userId) {
    const result = await pool.query(
        "SELECT * FROM curriculos WHERE user_id = $1",
        [userId]
    );
    return result.rows[0];
}


export { extractDataFromPdfText };