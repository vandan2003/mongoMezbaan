import express from "express";
import { addToFavourite, block, fetch, removeFavourite, signin, signup, update, updatePassword } from "../controllers/customer.controller.js";
import { body } from "express-validator";
import { adminTokenVerify, cusTokenVerify, resTokenVerify} from "../middleware/tokenVerification.js"

const router = express.Router();

router.post("/sign-up",
body("name","Empty").notEmpty(),
body("name","Name doesn't have Numeric value").isAlpha(),
body("email","Email cannot be null").notEmpty(),
body("email","Incorrect email pattern").isEmail(),
body("contact","Contact can not have null").notEmpty(),
body("contact",).isNumeric(),
body("contact").isLength({min:10,max:10}),
body("password").notEmpty(),
body("password").isLength({min:6,max:6}),
signup);//
router.post("/signin",signin);
router.get("/profile/:custId",cusTokenVerify,fetch);
router.get("/block/:custId",adminTokenVerify,block);
router.post("/edit-profile",cusTokenVerify,update);
router.post("/change-password",updatePassword);//newPassword,custId,password
router.get("/add-to-favourite/:resId/:cusId",cusTokenVerify,addToFavourite);//crection
router.get("/remove-favourite/:resId/:cusId",cusTokenVerify,removeFavourite);//crection


export default router;