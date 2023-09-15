import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

export const TasksModel = sequelize.define('Task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user: {type: DataTypes.INTEGER, references: {model: 'Users', key: 'id'}},
    tasks: {type: DataTypes.STRING},
    done: {type: DataTypes.BOOLEAN, defaultValue: "FALSE"}
})