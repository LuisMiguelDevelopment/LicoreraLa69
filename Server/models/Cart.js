const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    Nombre: {type: String, required:true},
    Urlimagen: {type: String , require: true},
    Cantidad: {type: Number , require: true},
    Precio: {type: Number , require:true},
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Usuario',
        required: true
    }
});

module.exports = mongoose.model('Cart',CartSchema)