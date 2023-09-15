import { DataTypes } from 'sequelize'
import sequelize from '../db.js'
import { TasksModel } from './tasks-model.js'
import { TokenModel } from './token-model.js'

export const UserModel = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING, required: true}
})

UserModel.hasOne(TasksModel)
TasksModel.belongsTo(UserModel)
UserModel.hasOne(TokenModel)
TokenModel.belongsTo(UserModel)