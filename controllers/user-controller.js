import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error.js";
import userService from "../service/user-service.js";

class UserController{
    async registration(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (err){
            next(err)
        }
    }

    async login(req,res, next){
        try{
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (err){
            next(err)
        }
    }

    async logout(req,res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next){
        try{
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (err){
            next(err)
        }
    }

    async addTask(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, task} = req.body
            const taskData = await userService.addTask(email, task)
            return res.json(taskData)
        } catch (err){
            next(err)
        }
    }

    async deleteTask(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {taskId} = req.body
            const taskData = await userService.deleteTask(taskId)
            return res.json(taskData)
        } catch (err){
            next(err)
        }
    }

    async editTask(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {taskId, newValue} = req.body
            const taskData = await userService.editTask(taskId, newValue)
            return res.json(taskData)
        } catch (err){
            next(err)
        }
    }

    async editDone(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {taskId, done} = req.body
            const taskData = await userService.editDone(taskId, done)
            return res.json(taskData)
        } catch (err){
            next(err)
        }
    }

    async getTasks(req, res, next){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email} = req.body
            const tasks = await userService.getTasks(email)
            return res.json(tasks)
        } catch (err){
            return next(err)
        }
    }
}

export default new UserController()