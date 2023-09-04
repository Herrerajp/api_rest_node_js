// Importamos paquete
const bcrypt = require("bcryptjs");// Importamos paquete
const Usuario = require("../models/usuarios");

const getAllUsers = async (req,res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
}

const validateUser = async(req, res)=>{
    const {email,password}=req.body;
    const Pass_encript= encript(email,password);
    usr=await Usuario.findOne({where:{email:email}});
    if(usr){
        if(usr.password == Pass_encript){
            if(!usr.rol){
                res.send('login sucessfull  as user');
            }
            else
            {
                res.send('login sucessfull  as administrator');
            }
            
        }
        else{res.send('contraseña incorrecta')}
    }
    else
    {
        res.send('usuario no existe');
    }
}


const createUser = async(req,res) =>{
    const {nombre,email,password}=req.body;

    if(!nombre || !email || !password)
    {
        return res.status(400).json({
            "error":"error al enviar datos nulos"
        })
    }
        const pass_encript= encript(email,password);
        usr=await Usuario.findOne({where:{email:email}});
        if(!usr){
            const user = Usuario.create({nombre, email,password:pass_encript});
            res.send("se creó correctamente el usuario")
        }
        else {
            res.json("el usuario ya existe");
        }
    
}


function  encript(user, pass){
    const crypto = require('crypto');
    // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
    const hmac =  crypto.createHmac('sha1', user).update(pass).digest('hex');
    return hmac;
 }

module.exports = {
    getAllUsers,
    encript,
    createUser,
    validateUser
    
}

