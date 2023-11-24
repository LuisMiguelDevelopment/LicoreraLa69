const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    Nombre:{
        type:String,
        require: true,
        trim: true
    },
    Email:{
        type:String,
        require:true,
        trim: true,
        unique : true
    },
    Contrasena:{
        type:String,
        require:true,
        trim: true
    },
    UrlImagen:{
        typr:String
    },
    Tipo:{
        type:String, 
    },
    Direccion:{
        type:String,
        require: true
    },
    Telefono:{
        type:String
    },
    Fecha:{
        type:Date,
        require: true
    },
    AccesToken:{
        type:String,
        require: true,
        trim: true
    }
    

},{
    timestamps: true
})

module.exports = mongoose.model("Usuario" ,userSchema)