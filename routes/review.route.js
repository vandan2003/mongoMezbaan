import express from "express";
import { add ,fetchByRes,fetchByCus,deleteReview} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/add",add);
router.get("/restaurant-reviews/:restaurantId",fetchByRes);
router.get("/customer-reviews/:customerId",fetchByCus);
router.get("/delete/:reviewId",deleteReview);

export default router;