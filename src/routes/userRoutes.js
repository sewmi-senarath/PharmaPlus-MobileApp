import express from "express";
import { logoutController, loginController, verifyEmailController, registerUserController} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// router.get("/", getUsers);
router.post("/register", registerUserController);
router.post("/verify-email", verifyEmailController);
router.post("/login", loginController);
router.get("/logout",auth,logoutController);
export default router;
