import { useState, useEffect, useCallback } from 'react'; 
import axios from 'axios';
import ListaCandidatosVisual from '../Components/Candidatos/ListaCandidatosVisual.jsx'; 

export default function ListaCandidatos() {
    
    const [resumes, setResumes] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(''); 
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterInput, setFilterInput] = useState(''); 
    const [currentFilter, setCurrentFilter] = useState(''); 
    const limit = 10; 

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ 
        id: null, 
        nome_extraido: '', 
        email_extraido: '', 
        telefone_extraido: '' 
    });
    
    const fetchResumes = useCallback(async () => {
        setLoading(true);
        setError('');
        
        const token = localStorage.getItem("token");
        if (!token) {
            setError('Token não encontrado. Faça login novamente.');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get(
                `http://localhost:8080/candidatos?page=${currentPage}&limit=${limit}&filter=${currentFilter}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setResumes(res.data.data);
            setTotalPages(res.data.pagination.totalPages);
            
        } catch (err) {
            console.error("Erro ao buscar currículos:", err);
            setError(err.response?.data?.message || 'Erro ao carregar a lista de candidatos.');
            setResumes([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [currentPage, currentFilter, limit]); 

    useEffect(() => {
        fetchResumes();
    }, [currentPage, currentFilter, fetchResumes]); 

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setCurrentFilter(filterInput); 
        setCurrentPage(1); 
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja DELETAR este candidato?")) return;
        const token = localStorage.getItem("token");
        if (!token) return setError('Token não encontrado.');

        setLoading(true);
        try {
            await axios.delete(`http://localhost:8080/candidatos/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
            alert("Candidato deletado com sucesso!");
            fetchResumes(); 
        } catch (err) {
            console.error("Erro ao deletar:", err);
            setError(err.response?.data?.message || 'Falha ao deletar candidato.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (resume) => {
        setIsEditing(true);
        setEditData({
            id: resume.id,
            nome_extraido: resume.nome_extraido || '',
            email_extraido: resume.email_extraido || '',
            telefone_extraido: resume.telefone_extraido || '',
        });
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return setError('Token não encontrado.');

        setLoading(true);
        try {
            
            await axios.put(`http://localhost:8080/candidatos/${editData.id}`, editData, { headers: { 'Authorization': `Bearer ${token}` } });
            alert("Candidato atualizado com sucesso!");
            setIsEditing(false); 
            setEditData({ id: null, nome_extraido: '', email_extraido: '', telefone_extraido: '' });
            fetchResumes(); 
        } catch (err) {
            console.error("Erro ao salvar edição:", err);
            setError(err.response?.data?.message || 'Falha ao atualizar candidato.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <ListaCandidatosVisual
            
            resumes={resumes}
            loading={loading}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            filterInput={filterInput}
            setFilterInput={setFilterInput}
            currentFilter={currentFilter}
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
            setIsEditing={setIsEditing}
            
            
            handleFilterSubmit={handleFilterSubmit}
            handlePageChange={handlePageChange}
            handleDelete={handleDelete}
            handleEditClick={handleEditClick}
            handleEditSave={handleEditSave}
        />
    );
}