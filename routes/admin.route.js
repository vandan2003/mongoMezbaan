import express from "express";
import { changePassword, editProfile, saveAdmin, signIn, signOut, viewProfile } from "../controllers/admin.controller.js";

const router = express.Router();
router.post("/save",saveAdmin);
router.post("/signin",signIn);
router.get("/signout",signOut);
router.get("/profile/:email",viewProfile);
router.post("/editprofile",editProfile);
router.post("/changepass/:email",changePassword);

export default router;

