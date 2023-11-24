const User = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const { createToeknAccess } = require('../libs/jwt.js');
const jwt = require ('jsonwebtoken');
const { TOKEN_SECRET } = require ('../config/config.js');

exports.register = async (req , res)=>{
  const {Email,Contrasena, Nombre , Fecha}= req.body;

  try {
      const userFound = await User.findOne({Email})
      if(userFound) return res.status(400).json(["The email is already in use"])

      const passwordHash = await bcrypt.hash(Contrasena, 10)
      const newUser = new User({
         Nombre,
         Email,
         Contrasena:passwordHash ,
         Fecha
      });
      const userSaved = await newUser.save();
      const token = await createToeknAccess({id:userSaved._id});
      res.cookie('token',token)
      res.status(201).json({
          id:userSaved._id,
          Nombre:userSaved.Nombre,
          Email :userSaved.Email
      });
  } catch (error) {
      res.status(500).json({message:error.message})
  }

};


exports.login = async (req , res)=>{
  const {Email,Contrasena}= req.body;
  try {
      const userFound = await User.findOne({Email})
       if(!userFound) return res.status(400).json({message : "User not found"});

      const isMatch = await bcrypt.compare(Contrasena , userFound.Contrasena);
      if(!isMatch) return res.status(400).json({message: "Error in Credentials"});

      
      const token = await createToeknAccess({id:userFound._id});
      res.cookie('token',token)
      res.status(201).json({
          id:userFound._id,
          Nombre:userFound.Nombre,
          Email :userFound.Email,
          Tipo : userFound.Tipo
      });
  } catch (error) {
      res.status(500).json({message:error.message})
  }

};



exports.logout = (req, res)=>{
  res.cookie('token','',{
      expires : new Date(0),
  });
  return res.sendStatus(200);
}

exports.editarPerfil = async (req, res) => {
  try {
    const userId = req.params.id;

    // Recopila los datos del formulario enviado por el cliente
    const { Nombre, Email, Contrasena, Telefono , Tipo} = req.body;

    // Verifica si el campo 'imagen' está presente en la solicitud
    const urlImagen = req.file ? req.file.filename : undefined;

    // Realiza la lógica para actualizar la información del perfil del usuario en la base de datos
    let updatedData = {
      Nombre,
      Email,
      Telefono,
      Tipo
    };

    // Si se proporciona una nueva contraseña, aplica hash
    if (Contrasena) {
      const passwordHash = await bcrypt.hash(Contrasena, 10);
      updatedData.Contrasena = passwordHash;
    }

    // Actualiza la URL de la imagen solo si se proporciona una nueva imagen
    if (urlImagen) {
      updatedData.UrlImagen = urlImagen;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log(updatedData, "Se actualizo");

    res.status(200).json({ message: 'Perfil actualizado con éxito', user });
  } catch (error) {
    console.error(error);
    res.status(500).json("Error al editar el perfil");
  }
};



  



exports.verifyToken = async (req , res)=>{
  const {token} = req.cookies
  if(!token) return res.status(401).json({message:"Unauthorized"})

  jwt.verify(token ,TOKEN_SECRET , async(err,user)=>{
      if(err)return res.status(401).json({message:"Unauthorized"})

      const userFound = await User.findById(user.id)
      if(!userFound) return res.status(401).json({message:"Unauthorized"})

      return res.json({
          id:userFound.id,
          Nombre: userFound.Nombre,
          Email: userFound.Email,
          Tipo : userFound.Tipo,
          UrlImagen : userFound.UrlImagen,
          Telefono: userFound.Telefono
      })
  })
}


exports.profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

  res.status(201).json({
    id: userFound._id,
    Nombre: userFound.Nombre,
    Email: userFound.Email,
    Tipo: userFound.Tipo,
    UrlImagen: userFound.UrlImagen,
    Telefono: userFound.Telefono
  });
};


