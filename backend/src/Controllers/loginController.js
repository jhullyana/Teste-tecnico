import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userLoginService } from "../Services/loginService.js";

export async function userLogin(req,res) {
    try {
        const {email, password} = req.body;

        const login = await userLoginService(email);
 
        if(!login) return res.status(400).json({message: "Usuário não encontrado"});

        const isMatch = await bcrypt.compare(password, login.password);

        if(!isMatch) return res.status(400).json({message: "Senha incorreta!"});  

        const JWT_SECRET = process.env.JWT_SECRET;

        const token = jwt.sign(
            {
                id: login.id,
                email: login.email,
                name: login.name
            }, JWT_SECRET,
            { expiresIn: "1h"}
        )

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({error: "Erro ao tentar fazer login", message: error.message})
    }
}