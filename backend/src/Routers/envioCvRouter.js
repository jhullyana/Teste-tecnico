import express from "express";
import { uploadCv, getCv } from "../Controllers/envioCvController.js"; 
import upload from "../middlewares/upload.js"; 

const router = express.Router();

router.post("/upload", upload.single('curriculo'), uploadCv); 


router.get("/", getCv); 


export default router;