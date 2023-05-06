
import express from "express";
import { adminTokenVerify, cusTokenVerify, resTokenVerify } from "../middleware/tokenVerification.js";
import {activeList, active, addCuisines, addFacilities, addImage, addMenu, block, changePassword, deny, list, pendingList, profile, rate, removeFacility, removeImage, removeMenu, restCount, searchRest, signIn, signUp, signuppage } from "../controllers/restaurant.controller.js";
import multer from "multer";
import { body } from "express-validator";

const restRouter = express.Router();

const upload = multer({dest:"public/restImage"});

restRouter.get("/signup",signuppage);

restRouter.post("/signup",upload.any('pictures'),body("name","Not Aplhabet").isAlpha(),
body("name","Empty").notEmpty(),
body("contact").notEmpty(),
body("contact").isNumeric(),
body("contact").isLength({min:10,max:10}),
body("email").notEmpty(),
body("email").isEmail(),
body("password").notEmpty(),
// body("password","Not Strong").isStrongPassword(),
body("openingTime").notEmpty(),
body("closingTime").notEmpty(),
body("fssai").notEmpty(),
body("type").notEmpty(),
body("lattitude").notEmpty(),
body("lattitude").isDecimal(),
body("lattitude").isLength({min:9}),
body("longitude").notEmpty(),
body("longitude").isDecimal(),
body("longitude").isLength({min:9}),
body("totalTables").notEmpty(),
body("totalTables").isNumeric(),
body("type").notEmpty()
,signUp);

restRouter.post("/signin",
body("email").isEmail(),
body("password").notEmpty(),
signIn)

restRouter.get("/list",list);

restRouter.get("/block/:id",adminTokenVerify,block);

restRouter.get("/deny/:id",adminTokenVerify,deny);

restRouter.get("/active/:id",adminTokenVerify,active);

restRouter.post("/search",searchRest);

restRouter.post("/rate",cusTokenVerify,rate);

restRouter.get("/profile/:id",profile);

restRouter.post("/remove-image/:img",resTokenVerify,removeImage);

restRouter.post("/remove-menu/:img",resTokenVerify,removeMenu);

restRouter.post("/remove-facility/:cuisine",resTokenVerify,removeFacility);

restRouter.post("/change-password",resTokenVerify,changePassword);

restRouter.post("/add-image",upload.any("pictures"),resTokenVerify,addImage);

restRouter.post("/add-menu",upload.any("pictures"),resTokenVerify,addMenu);

restRouter.post("/add-facilities",resTokenVerify,addFacilities);

restRouter.post("/add-cuisines",resTokenVerify,addCuisines);

restRouter.get("/requested-restaurant",pendingList);

restRouter.get("/count",restCount);

restRouter.get("/active-restaurant",activeList);

export default restRouter;
