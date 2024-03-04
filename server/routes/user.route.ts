import express from "express";
import { activateUser, registerUser } from "../controllers/user/register";
import { getUserInfo, loginUser, socialAuth } from "../controllers/user/login";
import { deleteProfilePicture, updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo } from "../controllers/user/update";
import { logoutUser } from "../controllers/user/logout";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const router= express.Router();

router.post('/registration', registerUser);
router.post('/activate-user', activateUser);
router.post('/login-user', loginUser)
router.get('/logout', isAuthenticated, logoutUser);
router.get('/refresh', updateAccessToken);
router.get("/me",isAuthenticated, getUserInfo);
router.post("/socialAuth", socialAuth);
router.post("/update-user-info",isAuthenticated,  updateUserInfo);
router.put("/update-user-password", isAuthenticated, updatePassword);
router.put("/update-user-avatar", isAuthenticated, updateProfilePicture);
router.put("/delete-user-avatar", isAuthenticated, deleteProfilePicture);

export default router;