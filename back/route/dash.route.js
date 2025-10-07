import express from "express"
import dashBoard from "../controller/dashboard.js ";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
// router.use(authMiddleware)

router.get("/dash",authMiddleware,dashBoard)

export default router