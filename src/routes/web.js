const router =require('express').Router();
const UserController = require("../controllers/UserController");
const ProductController = require("../controllers/ProductController");
const CompraController = require("../controllers/compraController")
const Usuario = require('../models/usuarios');


//listar los productos que existen en el inventario
router.get("/products",ProductController.getAllProducts);

// crear un nuevo producto 
router.post("/create-product",ProductController.createProduct);

//actualizar o editar un producto
router.put("/update-product",ProductController.ProductUpdate);

// eliminar un producto del inventario
router.delete("/delete-product/:Numero_de_lote",ProductController.ProductDelete);

//obtener los detalles de un producto
router.get("/product/:Numero_de_lote",ProductController.product_get);

//registrar un nuevo usuario 
router.post("/create-user/",UserController.createUser);

//validar las creedenciales de un usuario
router.post("/login",UserController.validateUser);

//listar todas las compras hechas
router.get("/compras/:user_id", CompraController.getComprasPorUser)

router.post("/create-shop/",CompraController.crearCompra);
//exportar las rutas
module.exports= router;