import express from "express"
import { deleteUserById, getUserById, getUsers, patchUserById, putUserById } from "../Controllers/userController.js";


const router = express.Router()

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.put("/:id", putUserById);
router.patch("/:id", patchUserById);
export default router;