import express from "express";
import { addPlan, removePlan , subscribePlan, updatePlan } from "../controllers/plan.controller.js";
import { adminTokenVerify, resTokenVerify } from "../middleware/tokenVerification.js";

const router = express.Router();
router.post("/save",adminTokenVerify,addPlan);
router.post("/update",adminTokenVerify,updatePlan);
router.post("/remove",adminTokenVerify,removePlan);
router.post("/subscribe",resTokenVerify,subscribePlan);

export default router;