import express from "express";
import { confirm, cancel,history, historyRest } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/save", confirm);
router.post("/cancel", cancel);
router.get("/history", history);
router.get("/history/:id", historyRest);

export default router;
