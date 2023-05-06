import express from "express";
import { addPlan, planList, removePlan , subscribePlan, updatePlan } from "../controllers/plan.controller.js";
import { adminTokenVerify, resTokenVerify } from "../middleware/tokenVerification.js";

const router = express.Router();
router.post("/save",addPlan);
router.post("/update",adminTokenVerify,updatePlan);  
router.post("/remove",adminTokenVerify,removePlan);  
router.post("/subscribe",resTokenVerify,subscribePlan);
router.get("/plans-list",planList);

export default router;