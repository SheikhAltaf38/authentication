import express from "express";
import {signUp ,login ,checkAuth} from "../controller/auth.controller.js"
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/signup",signUp)
router.post("/login",login)
// router.post("/logout")
router.get("/check-auth",authMiddleware,checkAuth)

export default router