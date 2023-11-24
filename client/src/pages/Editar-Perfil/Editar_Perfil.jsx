import React, { useState, useEffect } from "react";
import './editar_perfil.css';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom'

const Editar_Perfil = () => {
    const { editarImagenPerfil, user, getImageUrl } = useAuth();
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(getImageUrl(user)); // Nuevo estado para la imagen de vista previa
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Actualiza la URL de la imagen de vista previa cuando cambia el usuario
        setPreviewImage(getImageUrl(user));
        // Actualiza los estados locales con los datos actuales del usuario
        setNombre(user.Nombre || '');
        setEmail(user.Email || '');
        setTelefono(user.Telefono || '');
        // Asegúrate de que la contraseña no se muestre por razones de seguridad
        setContrasena('');
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);

        // Actualiza la vista previa de la imagen
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(getImageUrl(user));
        }
    }

    const handleEditClick = async () => {
        const formData = new FormData();
    
        // Verifica si se seleccionó una nueva imagen
        if (selectedImage) {
            formData.append('imagen', selectedImage);
        } else {
            // Si no hay una nueva imagen, agrega la imagen actual al FormData
            // Esto evita que la imagen existente se borre si no se selecciona una nueva
            formData.append('imagen', getImageUrl(user));
        }
    
        // Agrega los valores actuales de los campos de entrada al FormData
        formData.append('Nombre', nombre);
        formData.append('Email', email);
        formData.append('Telefono', telefono);
        formData.append('Contrasena', contrasena);
    
        // Verifica que al menos un campo (imagen o datos) se esté enviando
        if (formData.has('imagen') || formData.has('Nombre') || formData.has('Email') || formData.has('Telefono') || formData.has('Contrasena')) {
            try {
                await editarImagenPerfil(formData);
                console.log("Perfil editado exitosamente");
                navigate('/');
            } catch (error) {
                console.error("Error al editar el perfil:", error);
            }
        } else {
            console.log("No se realizaron cambios, nada que enviar");
        }
    }
    
    return (
        <div className='general__perfil'>
            <form className="card__perfil">
                <div className="card__header-perfil">
                    <h1 className='card__header--h1'>EDITAR <span className='card__header--span'>PERFIL</span></h1>
                    <label htmlFor="imagen" className="image-label">
                        <img className='card__header--img' src={previewImage} alt="" />
                    </label>
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="card__body-perfil">
                    <label className='card__label' htmlFor="Nombre">NOMBRE</label>
                    <input className='card__input' id="Nombre" name="Nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                    <label className='card__label' htmlFor="Email">CORREO</label>
                    <input className='card__input' id="Email" name="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label className='card__label' htmlFor="Telefono">TELEFONO</label>
                    <input className='card__input' id="Telefono" name="Telefono" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

                    <label className='card__label' htmlFor="Contrasena">CONTRASEÑA</label>
                    <input className='card__input' id="Contrasena" name="Contrasena" type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                </div>
                <button className="button__perfil" type="button" onClick={handleEditClick}>EDITAR</button>
            </form>
        </div>
    );
}

export default Editar_Perfil;
