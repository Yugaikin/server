import { Router } from "express";
import userController from "../controllers/user-controller.js";
import { body } from "express-validator";
import { authMiddleware } from "../midddlewares/auth-middleware.js";


const router = new Router()

router.post('/registration', body('email').isEmail(),
body('password').isLength({min: 4, max: 16}), userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/addTask', authMiddleware, userController.addTask)
router.delete('/delTask', authMiddleware, userController.deleteTask)
router.patch('/editTask', authMiddleware, userController.editTask)
router.patch('/editDone', authMiddleware, userController.editDone)
router.get('/getTasks', authMiddleware, userController.getTasks)
router.get('/refresh', userController.refresh)

export default router