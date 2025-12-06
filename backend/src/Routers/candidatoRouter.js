import express from "express";

import { listCandidatos,editCandidato,deleteCandidato } from "../Controllers/listaCandidatosController.js"; 
import auth from '../middlewares/auth.js'; 
const router = express.Router();

router.get("/", auth, listCandidatos); 

router.put("/:id", auth, editCandidato);

router.delete("/:id", auth, deleteCandidato);

export default router;