import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import * as usersController from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/logout", authMiddleware, usersController.logout);
router.get("/current", authMiddleware, usersController.getCurrentUser);
router.patch("/", authMiddleware, usersController.updateSubscription);

export default router;
