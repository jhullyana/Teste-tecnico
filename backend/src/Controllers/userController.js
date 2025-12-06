import bcrypt from "bcrypt";
import {deleteUserByIdService, getUserByIdServices, getUsersServices, putUserByIdService, patchUserByIdService} from "../Services/userService.js";

export async function getUsers(req,res) {
    const listUsers = await getUsersServices();
    try {
        
        res.status(200).json(listUsers)
    } catch(error){
        res.status(500).json({error: "Erro ao tentar listar usuários"})
    }
}

export async function getUserById(req,res) {
    try{
    const {id} = req.params;

    if(!id) return res.status(400).json({message: "Erro, usuário não encontrado"});
    const listUserById = await getUserByIdServices(id);
    if(!listUserById){
        return res.status(400).json({message: "Usuário não encontrado"})
    }
    res.status(200).json(listUserById);
    } catch(error) {
        return res.status(500).json({error: "Erro ao tentar listar usuário através do id"});
    }
}

export async function deleteUserById(req,res) {
    try{
        const {id} = req.params;

        if(!id) return res.status(400).json({message: "É preciso de Id para completar essa ação"});

        const deleteUser = await deleteUserByIdService(id);


        if(!deleteUser) {
            return res.status(400).json({message: "Usuário não existe"})
        }


        res.status(200).json({deleteUser})
    } catch(error) {
        res.status(500).json({error: "Erro ao tentar deletar usuário"});
    }

    
}

export async function putUserById(req,res) {
    try{
        const { id } = req.params;
        const { name,email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const putUser =  putUserByIdService(id, name, email, hashPassword);


        if(!putUser) return res.status(400).json({message: "Usuário não existe"});

        res.status(200).json(putUser);

    } catch (error){
        res.status(500).json({error: "Erro ao tentar atualizar informações do usuário"})
    }
}

export async function patchUserById(req,res) {
    try{
        const { id } = req.params;
        const { name, email, password } = req.body

        let hashPassword = null;
        //criptografia da senha
        if(password) {
            const salt = await bcrypt.genSalt(10);
            hashPassword = await bcrypt.hash(password, salt);
        }

        const data = {};
        if(name) data.name = name;
        if(email) data.email = email;
        if(hashPassword) data.password = hashPassword;

        const patchUser = await patchUserByIdService(id, data);

        res.status(200).json(patchUser);

    } catch(error) {
        res.status(500).json({error: "Erro ao tentar atualizar informações do usuário"})
    }
}


