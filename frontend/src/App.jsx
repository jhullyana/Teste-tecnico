import { BrowserRouter, Routes, Route} from "react-router-dom"
import VerifyToken from "./pages/VerifyToken"
import Login from "./pages/login"
import Painel from "./pages/painel"


export default function App() {

  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={<VerifyToken/>} />
      
      <Route path="/login" element={<Login/>}/>

      <Route path="/painel" element={<Painel/>}/>

      

    </Routes>
    </BrowserRouter>    
    </>
  )
}