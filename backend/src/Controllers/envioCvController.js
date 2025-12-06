import { uploadCvService,getCvByUserIdService } from "../Services/envioCvService.js";


export async function uploadCv(req, res) {
    const userId = req.user.id;
    const cep = req.body.cep;
    const fileBuffer = req.file?.buffer; 

    if (!cep || !fileBuffer) {
        return res.status(400).json({ message: "CEP e arquivo PDF são obrigatórios." });
    }

    try {
        const cvData = await uploadCvService(userId, fileBuffer, cep);
        
        res.status(201).json({ 
            message: "Currículo processado e salvo com sucesso!", 
            data: cvData 
        });
        
    } catch (error) {
        console.error("[Controller Error] uploadCv:", error.message);
        
     res.status(500).json({error: "Erro interno do servidor ao processar o currículo",message: error.message });
    }
}

export async function getCv(req, res) {
        const userId = req.user.id; 
    
    try {
        
        const cv = await getCvByUserIdService(userId);
        
        if (!cv) {
            return res.status(404).json({ message: "Currículo não encontrado para este usuário." });
        }
        
        res.status(200).json(cv);
        
    } catch (error) {
        console.error("[Controller Error] getCv:", error.message);
        res.status(500).json({ error: "Erro interno do servidor ao buscar currículo", message: error.message });
    }
}