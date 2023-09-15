import { TasksModel } from "../models/tasks-model.js"
import { UserModel } from "../models/user-model.js"


class TaskService{
    async createTask(task){
        const {id, body, done} = task
        const taskData = await TasksModel.create({user: id, tasks: body, done})
        return taskData
    }

    async destroyTask(id){
        const taskData = await TasksModel.destroy({where: {id}})
        return taskData
    }

    async patchTask(id, newValue){
        const taskData = await TasksModel.update({tasks: newValue}, {where: {id}})
        return taskData
    }

    async patchDone(id, done){
        const taskData = await TasksModel.update({done: done}, {where: {id}})
        return taskData
    }

    async getTasks(email){
        const findUser = await UserModel.findOne({where: {email}})
        const user = findUser.dataValues.id
        const userTasks = await TasksModel.findAll({where:{user}})
        console.log(userTasks)
        return userTasks
    }
}

export default new TaskService()