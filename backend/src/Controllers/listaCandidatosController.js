import { getResumesService, deleteResumeByIdService, updateResumeService } from "../Services/curriculoService.js"; 


export async function listCandidatos(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filter = req.query.filter || '';

        if (page < 1 || limit < 1) {
            return res.status(400).json({ message: "Parâmetros de paginação inválidos." });
        }

        const data = await getResumesService(page, limit, filter); 

        res.status(200).json({
            message: "Lista de currículos obtida com sucesso",
            data: data.resumes,
            pagination: {
                totalResumes: data.totalResumes,
                totalPages: data.totalPages,
                currentPage: data.currentPage,
                limit: limit
            }
        });

    } catch (error) {
        console.error("[Controller Error] listCandidatos:", error.message);
        res.status(500).json({ error: "Erro interno do servidor ao listar currículos",message: error.message});
    }
}

export async function editCandidato(req, res) {
    try {
        const { id } = req.params;
        const dataToUpdate = req.body; 

        if (!id || isNaN(parseInt(id))) {
             return res.status(400).json({ message: "ID de candidato inválido." });
        }
        
        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ message: "Nenhum campo fornecido para atualização." });
        }

        const updatedResume = await updateResumeService(id, dataToUpdate);

        if (!updatedResume) {
            return res.status(404).json({ message: "Currículo não encontrado para atualização." });
        }

        res.status(200).json({ message: "Currículo atualizado com sucesso", data: updatedResume });

    } catch (error) {
        console.error("[Controller Error] editCandidato:", error.message);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar currículo",message: error.message});
    }
}

export async function deleteCandidato(req, res) {
    try {
        const { id } = req.params; 

        if (!id || isNaN(parseInt(id))) {
             return res.status(400).json({ message: "ID de candidato inválido." });
        }

        const result = await deleteResumeByIdService(id);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Currículo não encontrado para exclusão." });
        }

        res.status(200).json({ message: "Currículo deletado com sucesso", id });

    } catch (error) {
        console.error("[Controller Error] deleteCandidato:", error.message);
        res.status(500).json({ error: "Erro interno do servidor ao deletar currículo",message: error.message});
    }
}