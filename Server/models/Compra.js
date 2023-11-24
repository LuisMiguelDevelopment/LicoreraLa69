const mongoose = require("mongoose");


const CompraSchema = new mongoose.Schema({
    Nombre : {type: String , require: true},
    Urlimagen: {type: String , require: true},
    Cantidad: {type: Number , require: true},
    Precio: {type: Number , require:true},
    Direccion:{type:String},
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Usuario',
        required: true
    }
    
});

module.exports = mongoose.model("Compra",CompraSchema);




