import express from "express";
import { add ,fetchByRes,fetchByCus,deleteReview} from "../controllers/review.controller.js";
import { adminTokenVerify, cusTokenVerify } from "../middleware/tokenVerification.js";

const router = express.Router();

router.post("/add",cusTokenVerify,add);
router.get("/restaurant-reviews/:restaurantId",fetchByRes);
router.get("/customer-reviews/:customerId",fetchByCus);
router.get("/delete/:reviewId",adminTokenVerify,deleteReview);

export default router;