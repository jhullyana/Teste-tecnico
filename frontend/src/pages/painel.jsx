import  { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import PainelVisual from '../Components/Painel/PainelVisual';

export default function Painel() {
    const [userName, setUserName] = useState('');
    const [view, setView] = useState('upload'); 
    
    const [isLoading, setIsLoading] = useState(true); 
    
    const navigate = useNavigate();

   
    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (!token) {
             navigate("/login");
             return;
        }
        
        try {
            const decoded = jwtDecode(token);
            setUserName(decoded.name || 'Usuário');
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
            
            localStorage.removeItem("token");
            navigate("/login");
        } finally {
            
            setIsLoading(false);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleSetView = (newView) => {
        setView(newView);
    };

    if (isLoading) {
        return <div style={{ padding: '20px' }}>Carregando dados do usuário...</div>;
    }

    return (
        <PainelVisual
            userName={userName}
            currentView={view}

            handleSetView={handleSetView}
            handleLogout={handleLogout}
        />
    );
}