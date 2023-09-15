import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

export const TokenModel = sequelize.define('Token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user: {type: DataTypes.INTEGER, references: {model: 'Users', key: 'id'}},
    refreshToken: {type: DataTypes.STRING, required: true}
})