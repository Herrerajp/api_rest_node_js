const Producto = require("../models/productos");
const Usuario = require("../models/usuarios");

const getComprasPorUser = async (req,res)=>{
    const {user_id} = req.params;
    const compras = await Usuario.findOne({where:
        {id:user_id},
        include:[{
            model:Producto,
            attributes: ['nombre_producto','precio_producto']
        }]
    }).then(compras => res.json(compras));
    
}

const crearCompra = async (req,res)=>{
    const {numero_de_lote,user_id} = req.body;
    const usuario = await Usuario.findOne({where:
        {id:user_id},
    });
    const producto = await Producto.findOne({where:
        {Numero_de_lote:numero_de_lote},
    });
    await usuario.addProduct(producto,{through:{selfGranted:false}});
    try {
       
        const compra = await Usuario.findOne({where:
            {id:user_id},
            include:producto
        })
        res.json(compra);
    } catch (error) {
        return res.status(400).json({error});
    }
   
}


module.exports = {getComprasPorUser,crearCompra};