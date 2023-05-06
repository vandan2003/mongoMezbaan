import express from 'express';
import { findByName, match ,addBulk} from '../controllers/colony.controller.js';


const router  = express.Router();

router.post("/add-more",addBulk);

router.post("/match",match);

router.post("/find",findByName);

export default router;