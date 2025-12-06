import bcrypt from "bcrypt"
import { userLoginService } from "../Services/loginService.js";
import { registerService } from "../Services/registerService.js"

export async function userRegister(req,res) {
    try{
        const {name, email, password} = req.body;

        const existingUser = await userLoginService(email);
        if(existingUser){
            return res.status(400).json({message: "email já cadastrado"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await registerService(name, email, hashPassword);

        res.status(201).json({message: "Uusuário registrado com sucesso!",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        })



    } catch (error){
        console.error(error);
        res.status(500).json({error: "Erro ao tentar registrar usuário \n"});
    }
}