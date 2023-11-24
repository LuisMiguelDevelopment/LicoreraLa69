const Producto = require("../models/Productos");



exports.crearProducto = async (req, res) => {
    try {
      const producto = new Producto({
        Nombre: req.body.Nombre,
        Descripcion: req.body.Descripcion,
        Urlimagen: req.file ? req.file.filename : '', 
        Marca: req.body.Marca,
        Tipo: req.body.Tipo,
        Cantidad: req.body.Cantidad,
        Encart: req.body.Encart,
        Precio: req.body.Precio,
        Litro: req.body.Litro,
      });
  
      await producto.save();
      res.send(producto);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error');
    }
  };
exports.obtenerProductos = async (req , res) =>{
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error)
        res.status(500).send('Error aca')
    }
}

exports.editarProductos = async (req, res) => {
  try {
    const productoId = req.params.id;
    const { Nombre, Marca, Precio, Litro, Tipo, Cantidad, Descripcion } = req.body;

    // Verifica si se proporcionó una nueva imagen
    const urlImagen = req.file ? req.file.filename : undefined;

    // Construye el objeto actualizado con los datos del formulario y, si es necesario, la nueva imagen
    const updatedData = {
      Nombre,
      Marca,
      Precio,
      Litro,
      Tipo,
      Cantidad,
      Descripcion,
      // Asegúrate de que el nombre del campo coincide con el modelo de Producto
      Urlimagen: urlImagen,
    };

    // Actualiza el producto
    const producto = await Producto.findByIdAndUpdate(
      productoId,
      updatedData,
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    console.log(updatedData, "Producto actualizado exitosamente");

    res.status(200).json({ message: 'Producto actualizado con éxito', producto });
  } catch (error) {
    console.error(error);
    res.status(500).json("Error al editar el producto");
  }
};

exports.eliminarProductos = async (req, res)=>{
  try {
    const product = await Producto.findByIdAndDelete(req.params.id);
    if(!product) return res.status(404).json({message:"No se encontro el producto"});
    res.status(200).json("Se elimino correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error al eliminar el producto");
  }
}


exports.verificarEstadoProductos = async (req, res) => {
  try {
    const productos = await Producto.find({ Cantidad: { $lte: 10 } });

    if (productos.length > 0) {
      const alertMessage = 'Quedan pocos productos en inventario (menos de 10).';

      // Actualiza el estado AvisoAdmi a true para todos los productos en la lista
      await Producto.updateMany({ _id: { $in: productos.map((p) => p._id) }, AvisoAdmi: false }, { AvisoAdmi: true });

      res.status(200).json({ message: alertMessage, productos });
    } else {
      // Actualiza el estado AvisoAdmi a false para todos los productos
      await Producto.updateMany({}, { AvisoAdmi: false });

      res.status(200).json({ message: 'Estado verificado exitosamente. No hay productos con cantidad menor a 10.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error' });
  }
};
