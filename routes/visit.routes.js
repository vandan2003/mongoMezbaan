import express from "express";
import { findByCustomer, findByRestaurant  , add} from "../controllers/visit.controller.js";

const router = express.Router();

router.post("/add",add);

router.post("/get-by-customer",findByCustomer);

router.post("/get-by-restaurant",findByRestaurant);

export default router;