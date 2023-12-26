import express from "express";
import { fetchNotis, saveNotification } from "../controllers/notification.js";

const router = express.Router();

router.post("/", saveNotification);
router.get("/:id", fetchNotis);

export default router;
