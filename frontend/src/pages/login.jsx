import { useState } from "react"
import axios from "axios"
import LoginSignup from "../Components/Login/LoginSignup";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword] = useState("");
  const [ action, setAction ] = useState("Login");
  
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      
      let res;

        if (action === "Login" ) {
          res = await axios.post("http://localhost:8080/login", {
            email,
            password
          });

        const token = res.data.token;

        localStorage.setItem("token", token);
        navigate("/painel");
        
      } else if (action === "Cadastro"){

        res = await axios.post("http://localhost:8080/register", {
          name,
          email,
          password
        });

        alert(res.data.message || "Cadastro realizado com sucesso! Faça login para continuar");
          
        setName("");
        setEmail("");
        setPassword("");
        setAction("Login");

      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Ocorreu um erro na requisição.");
    }
  }
  return(

    <LoginSignup
      
      name= {name}
      setName={setName}
      email={email}
      setEmail={setEmail} 
      password={password}
      setPassword={setPassword}
      
      
      handleSubmit={handleSubmit} 
      action={action}
      setAction= {setAction}

      
     
    />
)

}