const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    Nombre: {
        type:String,
        required:true
    },
    Descripcion: {
        type:String,
        required:true
    },
    Urlimagen: {
        type:String,
        required:true
    },
     Litro:{
        type:Number,
        required:true
     },  
    Marca: {
        type:String,
        required:true
    },
    Tipo: {
        type:String,
        require:true
    },
    Cantidad:{
        type:Number,
        required:true
    },
    EnCart: {
        type:Boolean,
        default: false
    },
    Precio: {
        type:Number,
        required:true
    },
    FechaCreacion: {
        type:Date,
        default : Date.now()
    },
    AvisoAdmi:{
        type:Boolean,
        default:false
    },
    VentasRealizadas: {
        type: Number,
        default: 0,
    },
    CantidadDisponible: {
        type: Number,
        
    },

    
})

module.exports = mongoose.model('Producto',productoSchema)