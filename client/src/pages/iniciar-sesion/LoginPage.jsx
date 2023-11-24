import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css";
import licor from './img/licor.png';


function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, showAlert , isAuthenticated , errors: signinErrors} = useAuth(); // Obtiene la función showAlert del contexto
  const navigate = useNavigate();
    
  useEffect(()=>{
    if(isAuthenticated) navigate('/');
  },[isAuthenticated , navigate] )
  

  const onSubmited = async (data) => {
    try {
      await signin(data);
    } catch (error) {
      showAlert('Error de inicio de sesión', 'Hubo un error durante el inicio de sesión.', 'error');
    }
  }
 
  return (
    <div className="login">
    <div className="login__img">
        <img src={licor} alt="" className="login__img--img" />
    </div>
      <div className='login__container-form'>

      

        <form className='login__form' onSubmit={handleSubmit(onSubmited)}>
          <h1 className="login__h1">INICIAR <span className='login__span'>SESION</span></h1>
          <label htmlFor="" className="login__label">CORREO</label>
          <input type="email" {...register("Email", { required: true })} placeholder='email' className='login__input' />
          {
            errors.Email && <p className='login__p'>Email is required</p>
          }
          <label htmlFor="" className="login__label">CONTRASEÑA</label>
          <input type="password" {...register("Contrasena", { required: true })} placeholder='password' className='login__input' />
          {
            errors.Contrasena && <p className='login__p'>Password is required</p>
          }
          <div className="buttons">
            <button type="submit" className="login__button login__button--red">INICIAR</button>
            <Link to="/register" type="submit" className="login__button login__button--grey">CREAR</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
