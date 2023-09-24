import { UserDto } from "../dtos/user-dto.js";
import { ApiError } from "../exceptions/api-error.js";
import { UserModel } from "../models/user-model.js";
import bcrypt from 'bcrypt'
import tokenService from "./token-service.js";
import { TaskDto } from "../dtos/task-dto.js";
import taskService from "./task-service.js";

class UserService {
    async registration(email, password){
        const candidate = await UserModel.findOne({where: {email}})
        if(candidate){
            throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({email, password: hashPassword})

        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens, user: userDto
        }
    }

    async login(email, password){
        const user = await UserModel.findOne({where: {email}})
        if(!user){
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens, user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findOne({where: userData.id});
        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async addTask(email, task){
        const user = await UserModel.findOne({where: {email}})
        if(!user){
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const taskDto = new TaskDto(user.id, task)
        const newTask = await taskService.createTask(taskDto)
        return newTask
    }

    async deleteTask(taskId){
        const delTask = await taskService.destroyTask(taskId)
        return delTask
    } 

    async editTask(taskId, newValue){
        const delTask = await taskService.patchTask(taskId, newValue)
        return delTask
    } 

    async editDone(taskId, done){
        const patchDone = await taskService.patchDone(taskId, done)
        return patchDone
    } 

    async getTasks(email){
        const tasks = await taskService.getTasks(email)
        return {tasks: tasks}
    }
}

export default new UserService()