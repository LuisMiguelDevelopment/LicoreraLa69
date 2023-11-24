const Pedido = require( '../models/Pedido' );

exports.obtenerPedidos = async (req , res) =>{
    try {
        const userId = req.params.userId;
        const pedidos = await Pedido.find({ user: userId });
        res.status(200).json({ pedidos });
    } catch (error) {

        console.log(error)
        res.status(500).send('Error aca')
    }
}


exports.todosLosPedidos = async (req , res )=>{
    try {
        const pedidos = await Pedido.find();
        console.log(pedidos)
        res.status(200).json({pedidos});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error aca');
    }
}




