import express from "express";
import { getUsers, login, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/getUsers", getUsers);

export default router;
