import "./ListaCandidatosVisual.css"

const ListaCandidatosVisual = ({

    resumes, loading, error, currentPage, totalPages,
    filterInput, setFilterInput, currentFilter,
    isEditing, editData, setEditData,

    handleFilterSubmit, handlePageChange, handleDelete, 
    handleEditClick, handleEditSave, setIsEditing
}) => {

    if (loading && resumes.length === 0) return <p className="loading-message">Carregando candidatos...</p>;

    return (
        <div className="listagem-container">
            <div className="listagem-header">
                <div className='text'>Listagem de Candidatos</div>
                <div className="underline"></div>
            </div>
            
            {error && <p className="error-message">Erro: {error}</p>}
            <form onSubmit={handleFilterSubmit} className='filtro-form'>
                <div className='form-group-filtro'>
                    <label htmlFor="filter">Buscar (Nome, Email, Cidade): </label>
                    <input 
                        type="text" 
                        id="filter" 
                        value={filterInput} 
                        onChange={(e) => setFilterInput(e.target.value)} 
                        placeholder="Digite o termo de busca"
                        className='input-filtro'
                        disabled={loading}
                    />
                    <button type="submit" className='submit-button' disabled={loading}>
                        {loading && currentFilter === filterInput ? 'Buscando...' : 'Buscar'}
                    </button>
                    {currentFilter && (
                         <button 
                            type="button" 
                            onClick={() => {setFilterInput(''); handleFilterSubmit({ preventDefault: () => {} });}} 
                            className='limpar-filtro-button'
                            disabled={loading}
                        >
                            Limpar Filtro
                        </button>
                    )}
                </div>
            </form>
            
            {isEditing && (
                <div className="modal-overlay">
                    <form onSubmit={handleEditSave} className="modal-content">
                        <h4>Editar Candidato ID: {editData.id}</h4>
                        <div className='form-group'>
                            <label>Nome:</label>
                            <input 
                                type="text" 
                                value={editData.nome_extraido} 
                                onChange={(e) => setEditData({...editData, nome_extraido: e.target.value})}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input 
                                type="email" 
                                value={editData.email_extraido} 
                                onChange={(e) => setEditData({...editData, email_extraido: e.target.value})}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Telefone:</label>
                            <input 
                                type="text" 
                                value={editData.telefone_extraido} 
                                onChange={(e) => setEditData({...editData, telefone_extraido: e.target.value})}
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className='modal-actions'>
                            <button type="submit" className='submit-button' disabled={loading}>
                                {loading ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                            <button 
                                type="button" 
                                className='cancel-button' 
                                onClick={() => setIsEditing(false)} 
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            
            {resumes.length > 0 ? (
                <>
                    <table className="candidate-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Local</th>
                                <th>Ações</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {resumes.map(resume => (
                                <tr key={resume.id}>
                                    <td>{resume.nome_extraido}</td>
                                    <td>{resume.email_extraido}</td>
                                    <td>{resume.telefone_extraido}</td>
                                    <td>{resume.cidade} / {resume.uf}</td>
                                    <td className='acoes-coluna'>
                                        <button 
                                            onClick={() => handleEditClick(resume)} 
                                            className="action-button edit-button" 
                                            disabled={loading}
                                        >
                                             Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(resume.id)} 
                                            className="action-button delete-button" 
                                            disabled={loading}
                                        >
                                             Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination-controls">
                        <p>Página {currentPage} de {totalPages}</p>
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1 || loading}
                            className='page-button'
                        >
                            &larr; Anterior
                        </button>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages || loading}
                            className='page-button'
                        >
                            Próxima &rarr;
                        </button>
                    </div>
                </>
            ) : (
                
                <p className='no-results'>Nenhum candidato encontrado {currentFilter ? `com o filtro "${currentFilter}"` : 'na base de dados'}.</p>
            )}
        </div>
    );
}

export default ListaCandidatosVisual;