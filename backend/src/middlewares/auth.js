import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    try {
        console.log(req);

        const token = req.headers.authorization.replace("Bearer ", "");

        console.log(token)

        if(!token) return res.status(400).json({message: "Acesso negado"});

        const decoded = jwt.verify(token, JWT_SECRET );

        console.log(decoded);

        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({message: "Token inválido"});
    }
}

export default auth;