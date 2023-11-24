import { useState } from 'react';
import { useProductos } from '../../context/productoContext';
import { BsCloudDownload } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Agregar_producto = () => {
    const { crearProducto } = useProductos();
    const navigate = useNavigate();
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

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, imagen: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('Nombre', formData.Nombre);
        formDataToSend.append('Marca', formData.Marca);
        formDataToSend.append('Precio', formData.Precio);
        formDataToSend.append('Litro', formData.Litro);
        formDataToSend.append('Tipo', formData.Tipo);
        formDataToSend.append('Cantidad', formData.Cantidad);
        formDataToSend.append('Descripcion', formData.Descripcion);
        formDataToSend.append('imagen', formData.imagen);

        await crearProducto(formDataToSend);

        navigate('/ListaProductos');
    };

    return (
        <div className='fondo w-full  items-center  text-center justify-center  '>
            <div className="sub flex-col flex items-center w-full m-32">
                <div className="h1texto ">
                <h1 className=' text-[1.9rem]'>
                AGREGAR <span className=' text-red-600'>PRODUCTO</span>
                </h1>
                </div>
                    <div className=' flex w-[55%] pt-10  '>
                     <div onSubmit={handleSubmit} className='flex w-full  justify-center '>
                       <form className=' formAgregar flex items-center flex-col w-[65%] min-w-[70%] bg-[#2d2d2d]  '>
                           <h3 className=' text-[1.3rem]'>NOMBRE</h3>
                                <input type='text' id='nombre' name='Nombre' value={formData.Nombre} onChange={handleFormChange} className='  min-w-[90%] h-10 text-black' />
                                    <h3 className=' text-[1.3rem]'>MARCA</h3>
                                    <input type='text' id='marca' name='Marca' value={formData.Marca} onChange={handleFormChange} className=' min-w-[90%] h-10 text-black' />
                                    <h3 className=' text-[1.3rem]'>PRECIO</h3>
                                    <input type='number' id='precio' name='Precio' value={formData.Precio} onChange={handleFormChange} className=' min-w-[90%] h-10 text-black ' />
                                    <div className=' flex w-full  justify-center '>
                                        <div className=' min-w-[33.3%] '>
                                <h3 className='text-[1.3rem]'>ML</h3>
                                <input type='number' id='Litro' name='Litro' value={formData.Litro} onChange={handleFormChange} className='  w-[70%] h-10 text-black' />
                            </div>
                            <div className=' min-w-[33.3%]'>
                                <h3 className='text-[1.3rem]'>TIPO</h3>
                                <input type='text' id='Tipo' name='Tipo' value={formData.Tipo} onChange={handleFormChange} className=' w-[70%] h-10 text-black' />
                            </div>
                            <div className=' min-w-[33.3%]'>
                                <h3 className=' text-[1.3rem]'>CAN</h3>
                                <input type='number' id='Cantidad' name='Cantidad' value={formData.Cantidad} onChange={handleFormChange} className=' w-[70%] h-10 text-black' />
                            </div>
                        </div>
                        <h3 className=' text-[1.3rem]'>DESCRIPCION</h3>
                        <input type='text' id='Descripcion' name='Descripcion' value={formData.Descripcion} onChange={handleFormChange} className='min-w-[90%] h-10 text-black ' />
                        <div className='flex justify-center btn-custom p-8 '>
                        <button type="submit" className=" btn-primary text-[1rem]  items-center justify-center bg-red-600 flex  hover:bg-red-700 text-white font-bold w-48 h-16 
                         rounded-sm">AGREGAR PRODUCTO</button>
                         </div>  
                    </form>
                    <div className=' bg-[#ffffff49] relative min-h-[400px] min-w-[40%] '>
                        <label htmlFor='imagenInput' className=' text-[1.4rem] cursor-pointer '>
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

export default Agregar_producto;
