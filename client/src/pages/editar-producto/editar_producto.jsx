import { useState, useEffect } from 'react';
import { BsCloudDownload } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import "../editar-producto/Editar_producto.css";
import { useProductos } from '../../context/productoContext';
import { useNavigate } from 'react-router-dom';

const EditarProducto = () => {
    const { productos, editarProducto } = useProductos();
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Nombre: '',
        Marca: '',
        Precio: 0,
        Litro: '',
        Tipo: '',
        Cantidad: 0,
        Descripcion: '',
        imagen: null,
    });

    useEffect(() => {
        const productoAEditar = productos.find(producto => producto._id === id);

        if (productoAEditar) {
            setFormData(productoAEditar);
        }
    }, [productos, id]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('Imagen seleccionada:', file);
        setFormData({ ...formData, imagen: file });
     };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        // Agrega los valores del formulario al FormData
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        await editarProducto(id, formDataToSend);
        navigate('/ListaProductos');
    };

    return (
        <div className='fondo w-full  items-center  text-center justify-center'>
            <div className=" sub flex-col flex items-center w-full m-32 ">
                <div className="h1texto2 ">
                <h1 className='text-[1.9rem] '>
                EDITAR <span className='text-red-600'>PRODUCTO</span>
            </h1>
                </div>
            <div className='flex w-[55%] min-w m-10 '>
                <div onSubmit={handleSubmit} className='flex w-full justify-center'>
                    <form onSubmit={handleSubmit} className='formAgregar flex items-center flex-col  min-w-[70%] bg-[#2d2d2d]'>
                        <h3 className='text-[1.3rem] text-white'>NOMBRE</h3>
                        <input type='text' id='nombre' name='Nombre' value={formData.Nombre} onChange={handleFormChange} className='min-w-[90%] h-10 text-black' />
                        <h3 className='text-[1.3rem] text-white'>MARCA</h3>
                        <input type='text' id='marca' name='Marca' value={formData.Marca} onChange={handleFormChange} className='min-w-[90%] h-10 text-black' />
                        <h3 className='text-[1.3rem] text-white'>PRECIO</h3>
                        <input type='number' id='precio' name='Precio' value={formData.Precio} onChange={handleFormChange} className='min-w-[90%] h-10 text-black' />
                        <div className='flex w-full'>
                            <div className='min-w-[33.3%]'>
                                <h3 className='text-[1.3rem] text-white'>ML</h3>
                                <input type='number' id='Litro' name='Litro' value={formData.Litro} onChange={handleFormChange} className='w-[70%] h-10 text-black' />
                            </div>
                            <div className='min-w-[33.3%]'>
                                <h3 className='text-[1.3rem] text-white'>TIPO</h3>
                                <input type='text' id='Tipo' name='Tipo' value={formData.Tipo} onChange={handleFormChange} className='w-[70%] h-10 text-black' />
                            </div>
                            <div className='min-w-[33.3%]'>
                                <h3 className='text-[1.3rem] text-white'>CAN</h3>
                                <input type='number' id='Cantidad' name='Cantidad' value={formData.Cantidad} onChange={handleFormChange} className='w-[70%] h-10 text-black' />
                            </div>
                        </div>
                        <h3 className='text-[1.3rem] text-white'>DESCRIPCION</h3>
                        <input type='text' id='Descripcion' name='Descripcion' value={formData.Descripcion} onChange={handleFormChange} className='min-w-[90%] h-10 text-black' />
                        <div className='flex justify-center btn-custom p-8'>
                            <button type="submit" className="btn-primary text-[1rem] items-center justify-center bg-red-600 flex hover-bg-red-700 text-white font-bold w-48 h-16 rounded-sm">
                                EDITAR PRODUCTO
                            </button>
                        </div>
                    </form>
                    <div className='bg-[#ffffff49] relative min-h-[400px] min-w-[40%]'>
                        <label htmlFor='imagenInput' className='text-[1.4rem] cursor-pointer'>
                            <h1>IMAGEN</h1>
                            <input type='file' id='imagenInput' name='imagen' className='agregar-img hidden' onChange={handleImageChange} />
                            <BsCloudDownload id='icon' className='text-[120px] absolute' />
                        </label>
                    </div>
                </div>
            </div>
            </div>
      
        </div>
    );
};

export default EditarProducto;
