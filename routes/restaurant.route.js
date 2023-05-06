
import express, { request, response } from "express";
import { active, addBulk, addCuisines, addFacilities, addImage, addMenu, atYourCity, block, changePassword, deny, dropCollection, list, profile, rate, removeCuisine, removeFacility, removeImage, removeMenu, searchRest, signIn, signUp, signuppage, topRatedFour } from "../controllers/restaurant.controller.js";

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

restRouter.get("/block/:id",block);

restRouter.get("/deny/:id",deny);

restRouter.get("/active/:id",active);

restRouter.post("/search",searchRest);

restRouter.post("/rate",rate);

restRouter.get("/profile/:id",profile);

restRouter.post("/remove-image/:img",removeImage);

restRouter.post("/remove-menu/:img",removeMenu);

restRouter.post("/remove-facility/:fac",removeFacility);

restRouter.post("/remove-cuisine/:cuisine",removeCuisine);


restRouter.post("/change-password",changePassword);

restRouter.post("/add-image",upload.any("pictures"),addImage);

restRouter.post("/add-menu",upload.any("pictures"),addMenu);

restRouter.post("/add-facilities",addFacilities);

restRouter.post("/add-cuisines",addCuisines);

restRouter.post("/add-bulk",addBulk);

restRouter.post("/at-your-city",atYourCity);

restRouter.get("/drop",dropCollection);

restRouter.get("/top-rated-four",topRatedFour);

export default restRouter;
