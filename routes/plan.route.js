import express from "express";
import { addPlan, removePlan , subscribePlan, updatePlan } from "../controllers/plan.controller.js";

const router = express.Router();
router.post("/save",addPlan);
router.post("/update",updatePlan);
router.post("/remove",removePlan);
router.post("/subscribe",subscribePlan);

export default router;