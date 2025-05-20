const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require('../utils/db-connnection');


// Values for this table will be automatically created
const studentCourses = sequelize.define('studentCourses', {
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    }
})

module.exports = studentCourses;