const express = require('express');
const cors = require('cors');
const usuarios = require('./routes/web');
const database = require('./database/database');
const app = express();
const port = process.env.PORT ||  3030;

    try {
        database.authenticate();
        database.sync();
        console.log("estas conectado a la base de datos");
    } catch (error) {
        throw new Error(error)
    }



app.use(express.json());
app.use(cors());

app.use("/api",usuarios);



app.listen(port,()=>{
    console.log("servidor ejecutandose en el puerto",port  );

});
