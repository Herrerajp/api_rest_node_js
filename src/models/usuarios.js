const { DataTypes } = require("sequelize");
const database = require("../database/database");

const Usuario = database.define("Usuario",{
    "id":{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    "nombre":{
        type:DataTypes.STRING,

    },
    "email":{
        type:DataTypes.STRING,
        unique: true,
    },
    "password":{
        type:DataTypes.STRING,
    },
    "status":{
        type:DataTypes.BOOLEAN,
        defaultValue: true,

    },
    "rol":{
        type:DataTypes.BOOLEAN,
        defaultValue: false,

    },
});


module.exports = Usuario;