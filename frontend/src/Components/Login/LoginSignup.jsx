import '../Login/LoginSignup.css'
import user_icon from '../Assets/perfil.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/senha.png'



const LoginSignup = ({ 
    name,
    setName,
    email, 
    setEmail, 
    password, 
    setPassword, 
    handleSubmit, 
    action,
    setAction,
    
}) => {
    
    
    return (

        <form onSubmit= {handleSubmit}>
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                
                {action === "Cadastro" ? (
                    <div className="input">
                        <img src={user_icon} alt="User Icon" />
                        <input 
                        type="text" 
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        />
                    </div>
                ) : null}
                
                
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password"
                     placeholder="senha"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="submit-container">
                <button
                type={action=== "Cadastro" ? "submit" : "button"}
                className={action == "Login" ? "submit gray" : "submit"} onClick={action === "Login" ? () => setAction("Cadastro") : undefined}>
                    Criar conta
                </button>

                <button
                type={action === "Login" ? "submit" : "button"}
                    className={action === "Cadastro" ? "submit gray" : "submit" }
                    onClick={action === "Cadastro" ? () => setAction("Login") : undefined}>
                        Login
                    </button>
                
            </div>
        </div>
        </form>
    )
}


export default LoginSignup