import express from "express";
import { add ,fetchByRes,fetchByCus} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/add",add);
router.get("/restaurant-reviews/:restaurantId",fetchByRes);
router.get("/customer-reviews/:customerId",fetchByCus);

export default router;