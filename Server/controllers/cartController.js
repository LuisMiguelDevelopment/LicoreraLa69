const Cart =  require("../models/Cart");
const Productos = require("../models/Productos");


exports.getProductoCart = async (req , res)=>{
    const productosCart = await Cart.find({
        user:req.user.id
    }).populate('user')

    if(productosCart){
        res.json({ productosCart })
    }else{
        res.json({ msg : "No hay productos en el carritoo" })
    }

};

exports.addProductoCart = async (req, res) => {
  const { Nombre, Urlimagen, Precio } = req.body;

  const estaEnProductos = await Productos.findOne({ Nombre });

  if (!estaEnProductos) {
      res.status(400).json({
          msg: "Este producto no se encuentra en la base de datos",
      });
  } else {
      const existingCartItem = await Cart.findOne({
          Nombre,
          user: req.user.id,
      });

      if (existingCartItem) {
          existingCartItem.Cantidad += 1;
          await existingCartItem.save();

          estaEnProductos.EnCart = true;
          await estaEnProductos.save();

          res.json({
              msg: 'La cantidad del producto en el carrito se ha incrementado',
              producto: existingCartItem,
          });
      } else {
          const newProductoCart = new Cart({
              Nombre,
              Urlimagen,
              Precio,
              Cantidad: 1,
              user: req.user.id
          });

          estaEnProductos.EnCart = true;
          await estaEnProductos.save();

          await newProductoCart.save();

          res.json({
              msg: 'El Producto fue agregado al carrito',
              producto: newProductoCart,
          });
      }
  }
};

  exports.putProducto = async (req, res) => {
    const { productoId } = req.params;
    const { query } = req.query;
  
    const productoBuscado = await Cart.findById(productoId);
  
    if (!query) {
      res.status(404).json({ msg: "Debes enviar una query" });
    } else if (productoBuscado && (query === "add" || query === "del")) {
      const incremento = query === "add" ? 1 : -1;
  
      productoBuscado.Cantidad += incremento;
  
      if (productoBuscado.Cantidad <= 0) {
       
        await Cart.findByIdAndRemove(productoId);
        res.json({
          msg: `El producto ${productoBuscado.Nombre} fue eliminado del carrito`,
        });
      } else {
      
        await productoBuscado.save();
  
       
        const productoEnDB = await Productos.findOne({ Nombre: productoBuscado.Nombre });
        const precioProducto = productoEnDB.Precio;
  
       
        const precioTotal = productoBuscado.Cantidad * precioProducto;
  
        res.json({
          msg: `El producto ${productoBuscado.Nombre} fue actualizado`,
          producto: productoBuscado,
          precioTotal: precioTotal,
        });
      }
    } else {
      res.status(400).json({ msg: "Ocurrió un error" });
    }
  };

exports.deleteProducto = async (req , res)=>{
    const { productoId } = req.params;

    const productoEnCart = await Cart.findById(productoId);

    const { Nombre , Urlimagen , Precio , _id} = await Productos.findOne({
        Nombre : productoEnCart.Nombre
    });

    await Cart.findByIdAndDelete(productoId)

    await Productos.findByIdAndUpdate(
        _id,
        {EnCart: false, Nombre , Urlimagen , Precio},
        {new: true}
    )
    .then((producto)=>{
        res.json({
            msg: `El producti ${producto.Nombre} fue eliminado del carrito`,
        });
    })
    .catch((error)=> res.json({msg:"Hubo un error"}))

}