const Product = require("../models/productos");
const Usuario = require("../models/usuarios");

//listar los productos existentes en el inventario
const getAllProducts= async (req,res) => {
    const products = await Product.findAll();
    res.json(products);
}

//crear un nuevo producto
const createProduct = async (req,res) => {
    const {email,password,nombre_producto,precio_producto,cantidad_disponible,fecha_de_ingreso}=req.body;
    //validar que los datos no sean nulos
    if(!email || !password  ||  !nombre_producto || !precio_producto || !cantidad_disponible ||  !fecha_de_ingreso)
    {   
      //si alguno es nulo devolver un error con el estado de cammpo nulo
        return res.status(400).json({
            "error":"error al enviar datos nulos"
        })
    }
        //encriptar la contraseña recibida por medio de la libreria encript pasando el usuario que será el identificador y la password
        const pass_encript= encript(email,password);
        //validar si existe el usuario en la bd
        usr=await Usuario.findOne({where:{email:email}});
        //validar si la consulta es nula
        if(usr){
            //validar si la password es valida para el usuario ingresado
            if(usr.password == pass_encript){
                //validar el rol del usuario como admin
                if(!usr.rol){
                    return res.status(400).json({
                        "error": "no tienes privilegios para realizar este proceso"
                    });
                }
                else
                {
                    //crear un nuevo producto en la bd
                    Product.create({nombre_producto,precio_producto,cantidad_disponible,fecha_de_ingreso});
                    res.send("el producto fué creado correctamente");
                }
                
            }
            //la password es invalida
            else{res.send('contraseña incorrecta');}
        }
        else
        {
            //al no encontrar el usuario ingresado retorna mensaje de que el usuario no existe
            res.send('usuario no existe');
        }
}
//función para encriptar la password 
function  encript(user, pass){
    const crypto = require('crypto');
    // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
    const hmac =  crypto.createHmac('sha1', user).update(pass).digest('hex');
    return hmac;
 }

//actualiza o modifica los detalles de un producto
 const ProductUpdate = async ( req, res) =>{
    //requiere los parametros que se pasan por medio del body
    const {email,password,nombre_producto,precio_producto,cantidad_disponible,fecha_de_ingreso}=req.body;
  // valida que los parametros no sean nulos
    if(!email || !password  ||  !nombre_producto || !precio_producto || !cantidad_disponible ||  !fecha_de_ingreso)
    {
      //retorna mensaje de error al recibir campos nulos
        return res.status(400).json({
            "error":"error al enviar datos nulos"
        })
    }
    //encripta la password recibida para validarla con la del usuario
    const pass_encript= encript(email,password);
    //valida si existe ese usuario
        usr=await Usuario.findOne({where:{email:email}});
        //valida que la consulta no retorne nulo
        if(usr){
          //valida que la password coincida con la ingresada por el usuario
            if(usr.password == pass_encript){
              //valida el rol del usuario como admin
                if(!usr.rol){
                  //retorna mensaje de error con estado de no tiene permisos para hacer el proceso 
                    return res.status(400).json({
                        "error": "no tienes privilegios para realizar este proceso"
                    });
                }
                else
                {
                    try {
                        //pasa los campos del producto a actualizar 
                        const response = await Product.update({
                          nombre_producto:nombre_producto,
                          precio_producto:precio_producto,
                          precio_producto:precio_producto,
                          cantidad_disponible:cantidad_disponible,
                          fecha_de_ingreso:fecha_de_ingreso
                        },{
                          //hace la consulta por medio del nombre del producto
                          where: { nombre_producto: nombre_producto}
                        })
                        .then(function(data){
                          //la actulización se realizó correctamente
                          const res = { success: true, data: data, message:"actualización hecha correctamente" }
                          return res;
                        })
                        .catch(error=>{
                          //errores ejecutando la consulta
                          const res = { success: false, error: error }
                          return res;
                        })
                        res.json(response);
                    
                      } catch (e) {
                        console.log(e);
                      }
                }
                
            }
            //mensaje cuando la password no es valida
            else{res.send('contraseña incorrecta');}
        }
        else
        {
           //mensaje cuando el usuario no existe
            res.send('usuario no existe');
        }
    
  }
  //obtiene los datos de un producto por medio de su numero de lote
const product_get = async ( req, res) =>{
  
    try {
      //obtiene el parametro pasado 
      const { Numero_de_lote } = req.params;
      //hace la consulta del producto por numero de lote
      const response = await Customers.findAll({
        where: { Numero_de_lote: Numero_de_lote}
      })
      .then( function(data){
        //si se realizó correctamente la consulta devolviendo el mensaje junto con la información del producto
        const res = { success: true, data: data }
        return res;
      })
      .catch(error => {
        //devuelve el error al ejecutar la consulta 
        const res = { success: false, error: error }
        return res;
      })
      //retorna en un json el producto que consultó
      res.json(response);
  
    } catch (e) {
      //imprime en consola el error 
      console.log(e);
    }
  }
  
  //elimina el producto por medio de su 
  const ProductDelete = async ( req, res) =>{
  
    const {email,password}=req.body;
    if(!email || !password )
    {
        return res.status(400).json({
            "error":"error al enviar datos nulos"
        })
    }
        const pass_encript= encript(email,password);
        usr=await Usuario.findOne({where:{email:email}});
        if(usr){
            if(usr.password == pass_encript){
                if(!usr.rol){
                    return res.status(400).json({
                        "error": "no tienes privilegios para realizar este proceso"
                    });
                }
                else
                {
                    try {
  
                        const { Numero_de_lote } = req.params;
                    
                        const response = await Product.destroy({
                          where: { Numero_de_lote: Numero_de_lote }
                        })
                        .then( function(data){
                          const res = { success: true, data: data, message:"el producto se eliminó correctamente" }
                          return res;
                        })
                        .catch(error => {
                          const res = { success: false, error: error }
                          return res;
                        })
                        res.json(response);
                    
                      } catch (e) {
                        console.log(e);
                      }
                }
                
            }
            else{res.send('contraseña incorrecta');}
        }
        else
        {
            res.send('usuario no existe');
        }
    
  }

module.exports = {
    getAllProducts,
    createProduct,
    product_get,
    ProductUpdate,
    ProductDelete
}
