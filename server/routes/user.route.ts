import express from "express";
import { activateUser, registerUser } from "../controllers/user/register";
import { loginUser } from "../controllers/user/login";
import { logoutUser } from "../controllers/user/logout";
import { isAuthenticated } from "../middleware/auth";

const router= express.Router();

router.post('/registration', registerUser);
router.post('/activate-user', activateUser);
router.post('/login-user', loginUser)
router.get('/logout', isAuthenticated, logoutUser);

export default router;