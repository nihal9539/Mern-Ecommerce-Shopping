import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);

router.post("/all-product", UserController.signUp);

router.post("/add-product", UserController.login);

router.post("/logout", UserController.logout);

export default router;