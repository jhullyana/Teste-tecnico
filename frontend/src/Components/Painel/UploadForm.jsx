
import { useState } from 'react'; 
import axios from 'axios';

import './PainelVisual.css'; 

export default function UploadForm() {
    const [file, setFile] = useState(null);
    const [cep, setCep] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [resumeData, setResumeData] = useState(null); 

    const handleUpload = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("token");
        if (!token) {
             setMessage('Erro: Token não encontrado. Faça login novamente.');
             return;
        }

        if (!file || !cep) {
            setMessage('Erro: Selecione um arquivo e informe o CEP.');
            return;
        }

        setLoading(true);
        setMessage('');
        setResumeData(null); 

        const formData = new FormData();
        formData.append('curriculo', file);
        formData.append('cep', cep);

        try {
            const res = await axios.post("http://localhost:8080/resume/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            setMessage("Sucesso: Currículo enviado e processado!");
            
            const data = res.data.data; 
            setResumeData({
                nome_extraido: data.nome_extraido,
                email_extraido: data.email_extraido,
                telefone_extraido: data.telefone_extraido,                
                conteudo_completo: data.conteudo_completo,
                cep: data.cep,
                logradouro: data.logradouro,
                bairro: data.bairro,
                cidade: data.cidade,
                uf: data.uf,
            });

        } catch (error) {
            const errorMsg = error.response?.data?.message || "Erro ao enviar currículo. Verifique a API.";
            setMessage(`Erro: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h3> Envio de Currículo (Apenas PDF)</h3>
            
           
            <form onSubmit={handleUpload} className='upload-form-container'>
                
                
                <div className='form-group'>
                    <label htmlFor="file">Currículo (PDF): </label>
                    <input 
                        type="file" 
                        id="file" 
                        accept=".pdf" 
                        onChange={(e) => setFile(e.target.files[0])} 
                        disabled={loading}
                    />
                </div>
                
                
                <div className='form-group'>
                    <label htmlFor="cep">CEP: </label>
                    <input 
                        type="text" 
                        id="cep" 
                        value={cep} 
                        onChange={(e) => setCep(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="Ex: 80000000"
                        maxLength="8"
                        disabled={loading}
                    />
                </div>
                
                
                <button type="submit" className='submit-button' disabled={loading}>
                    {loading ? 'Processando...' : 'Enviar Currículo'}
                </button>
            </form>
            
            {loading && <p> Aguardando resposta do servidot...</p>}
            
            
            {message && (
                <p className={message.startsWith('Erro') ? 'error-message' : 'success-message'}>
                    {message}
                </p>
            )}

            {resumeData && (
                
                <div className='results-box'>
                    <h4> Dados Salvos e Extraídos</h4>
                    <p>Nome: {resumeData.nome_extraido}</p>
                    <p>Email: {resumeData.email_extraido}</p>
                    <p>Telefone: {resumeData.telefone_extraido}</p>
                    <p>Local: {resumeData.cidade} / {resumeData.uf}</p>
                    
                    <hr/>
                    
                    <h5>Conteúdo Completo do Curriculo:</h5>
                    <div className='full-text-content'>
                        {resumeData.conteudo_completo}
                    </div>
                </div>
            )}
        </>
    );
}