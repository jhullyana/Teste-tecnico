import express from "express"
import { userRegister } from "../../Controllers/registerController.js";

const router = express.Router();

router.post("/", userRegister);

export default router;
