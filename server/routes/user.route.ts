import express from "express";
import { activateUser, registerUser } from "../controllers/user/register";
import { getUserInfo, loginUser, updateAccessToken } from "../controllers/user/login";
import { logoutUser } from "../controllers/user/logout";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const router= express.Router();

router.post('/registration', registerUser);
router.post('/activate-user', activateUser);
router.post('/login-user', loginUser)
router.get('/logout', isAuthenticated, logoutUser);
router.get('/refresh', updateAccessToken);
router.get("/me",isAuthenticated, getUserInfo);

export default router;