import express from 'express';
import registerRoute from "./Routers/Public/registerRouter.js"
import getUsers from "./Routers/userRouter.js"
import cors from 'cors';
import loginRoute from "./Routers/Public/loginRouter.js"
import auth from './middlewares/auth.js';
import resumeRouter from "./Routers/envioCvRouter.js"
import candidatoRoute from "./Routers/candidatoRouter.js";




const PORT= 8080;
const app = express();
app.use(express.json()); 

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use("/users", getUsers);


//PUBLIC
app.use("/register", registerRoute);
app.use("/login", loginRoute);

//PRIVATE
app.use("/users", auth, getUsers);
app.use("/resume", auth, resumeRouter);
app.use("/candidatos", candidatoRoute);





app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

