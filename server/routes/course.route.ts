import express from "express";
import { editCourse, uploadCourse } from "../controllers/course/set.course";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getAllCourses, getCourseByUser, getSingleCourse } from "../controllers/course/get.course";
import { addAnswer, addQuestion } from "../controllers/course/add.question";
import { addReplyToReview, addReview } from "../controllers/course/add.reviews";

const router = express.Router();

// courses
router.post("/create-course", isAuthenticated, authorizeRoles("admin"), uploadCourse);
router.put("/edit-course/:id", isAuthenticated, authorizeRoles("admin"), editCourse);
//everyone can see course details so no authentication
router.get("/course/:id", getSingleCourse);
router.get("/all-courses", getAllCourses);
router.get("/my-course/:id", isAuthenticated, getCourseByUser);

// questions
router.put("/add-question", isAuthenticated, addQuestion);
router.put("/add-answer", isAuthenticated, addAnswer);

// reviews
router.put("/add-review/:id", isAuthenticated, addReview);
router.put("/add-reply", isAuthenticated, authorizeRoles("admin"), addReplyToReview);

export default router;