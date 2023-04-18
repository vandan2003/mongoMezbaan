import express from "express";
import { confirm, cancel,history, historyRest } from "../controllers/booking.controller.js";
import { cusTokenVerify, resTokenVerify } from "../middleware/tokenVerification.js";

const router = express.Router();

router.post("/save",cusTokenVerify,confirm);
router.post("/cancel",cusTokenVerify, cancel);
router.get("/history",cusTokenVerify, history);
router.get("/history/:id",resTokenVerify, historyRest);

export default router;
