import express from "express";
import { saveChat, getChats, accessChat } from "../controllers/chat.js";

const router = express.Router();

router.post("/saveChat/:chatId", saveChat);


router.get("/:id", getChats);
router.post("/with", accessChat);

export default router;
