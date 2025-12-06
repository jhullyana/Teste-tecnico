import UploadForm from './UploadForm';        
import ListaCandidatos from '../../pages/ListaCandidatos'; 
import './PainelVisual.css'; 

const PainelVisual = ({ 
    userName, 
    currentView, 
    handleSetView, 
    handleLogout 
}) => {
    
    
    const getButtonClass = (viewName) => {

        let classes = 'nav-button nav-button-default'; 
        
    
        if (currentView === viewName) {
            classes += ' nav-button-active';
        }
        return classes;
    };

    return (
        <div className='VisualPainel'>
            
            
            <div className='painel-header-container'>
                <div className="headerP">
                <h2>Bem-vindo(a), {userName}! </h2>
                <div className="underlineP"></div>
                </div>

                <div>
                    
                    <button 
                        onClick={() => handleSetView('upload')} 
                        
                        className={getButtonClass('upload')} 
                    >
                         Enviar Currículo
                    </button>
                    
                    
                    <button 
                        onClick={() => handleSetView('listagem')}
                        
                        className={getButtonClass('listagem')}
                    >
                         Ver Candidatos
                    </button>
                    
                    <button 
                        onClick={handleLogout} 
                        
                        className='nav-button nav-button-logout'
                    >
                         Sair
                    </button>
                </div>
            </div>

            
            {currentView === 'upload' && <UploadForm />}
            {currentView === 'listagem' && <ListaCandidatos />}

        </div>
    );
};

export default PainelVisual;