
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/authContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import "../crear-cuenta/register.css"


function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate])

    const onSubmited = handleSubmit(async (values) => {
        signup(values)
    })
    return (

        <div className="container-principal flex-row items-center  justify-center header w-full">
            <div className=' container-secundario h-[30%] w-[30%] '></div>
            <div className='container-terciario min-h-min m-32 bg-[#ffffff49] max-w-xl mx-auto p-10 w-[60%] '>
               
                <form onSubmit={onSubmited} className=''>
                    <h1 className=' titulo text-[1.9rem] text-center'>CREAR <span className='text-red-600 text-[1.9rem]'>CUENTA</span>
                    </h1>
                    <h3 className=' subtitulos text-center my-4 text-[1.1rem]'>NOMBRE DE USUARIO</h3>
                    <input type="text" {...register("Nombre", { required: true })} placeholder='UserName' className='w-full bg-white  text-black  px-4 py-4 ' />
                    {errors.Nombre && <p className='alertas'>UserName is required</p>}
                    <h3 className=' subtitulos text-center text-[1.1rem]'>CORREO ELECTRONICO</h3>
                    <input type="email" {...register("Email", { required: true })} placeholder='email' className='w-full  bg-white text-black px-4 py-4 ' />
                    {errors.Email && <p className='alertas'>Email is required</p>}
                    <h3 className=' subtitulos text-center text-[1.1rem]'>CONTRASEÑA</h3>
                    <input type="password" {...register("Contrasena", { required: true })} placeholder='password' className='w-full  bg-white  text-black  px-4 py-4 d ' />
                    {errors.Contrasena && <p className='alertas'>Password is required</p>}
                    <h3 className=' subtitulos text-center text-[1.1rem]'>FECHA DE NACIMIENTO</h3>
                    <input type="date" {...register("Fecha", { required: true })} placeholder='fecha' className='w-full  bg-white  text-black  px-4 py-4  ' />
                    {errors.Fecha && <p className='alertas'>Fecha es requerida o tienes que ser mayor de edad</p>}
                    <div className='flex justify-center mt-10 btn-custom '>
                        <button type="submit" className=" btn-primary  bg-red-600 flex  hover:bg-red-700 text-white font-bold py-4 px-16  rounded-sm min-h-min">
                            CREAR
                        </button>
                    </div>
                </form>
            </div>
            <div className='imgg'>
                <img src="../src/img/imgRegister.png" alt="" className='w-[100%]' />
            </div>



        </div>

    )
}
export default RegisterPage