import express from "express";
import { changePassword, editProfile, saveAdmin, signIn, signOut, viewProfile } from "../controllers/admin.controller.js";
import { adminTokenVerify } from "../middleware/tokenVerification.js";

const router = express.Router();
router.post("/save",saveAdmin);
router.post("/signin",signIn);
router.get("/signout",signOut);
router.get("/profile/:email",adminTokenVerify,viewProfile);
router.post("/editprofile",adminTokenVerify,editProfile);
router.post("/changepass/:email",adminTokenVerify,changePassword);

export default router;

