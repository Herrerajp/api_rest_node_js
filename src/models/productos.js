const { DataTypes } = require("sequelize");
const database = require("../database/database");
const Usuario = require("./usuarios");

const Producto = database.define("Producto",{
    "Numero_de_lote":{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    "nombre_producto":{
        type:DataTypes.STRING,

    },
    "precio_producto":{
        type:DataTypes.INTEGER,

    },
    "cantidad_disponible":{
        type:DataTypes.INTEGER,

    },
    "fecha_de_ingreso":{
        type:DataTypes.DATE,
    },
});

Producto.belongsToMany(Usuario,{through:'User_Product'});
Usuario.belongsToMany(Producto,{through:'User_Product'});

module.exports = Producto;
