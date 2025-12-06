import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function VerifyToken() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token) {
            navigate("/painel");
        } else {
            navigate("/login");
        }
    })
    return (
        <>VerifyToken</>
    )
}