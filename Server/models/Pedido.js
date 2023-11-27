const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pedidoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nombreUsuario: {
        type: String,  
        required: true
    },
    telefono: {
        type: String,  
        require: true
    },
    productos: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto',
                required: true,
            },
            cantidad: {
                type: Number,
                required: true,
            },
            precio: {
                type: Number,
                required: true
            },
            nombre: {
                type: String,
                required: true
            },
            urlimagen: {
                type: String
            },
        },

    ],
    direccion: {
        type: String
    },
    tipoPago: {
        type: String,
        required: true
    },
    total: {
        type: Number
    },
    estado: {
        type: String,
        enum: ['pagado', 'pendiente'],
        default: 'pagado'
    },
    fechaCompra: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Pedido", pedidoSchema);
