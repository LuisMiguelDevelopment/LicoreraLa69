import { useEffect } from 'react'
import { useAuth } from '../../context/authContext';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import './Profile.css'

export const Profile = () => {

  useEffect(() => {


    const menus = document.querySelector(".menu");
    const navLinks = document.querySelector(".navbar__enlaces");

    const abrir = document.querySelector(".abrir")
    const salirperfil = document.querySelector(".salir-perfil");
    const perfil = document.querySelector(".perfil");

    if (menus && navLinks) {
      const burgerMenu = () => {
        navLinks.classList.toggle('mobile-menu');
      };
      const perfill = () => {
        perfil.classList.toggle('mobile-menu');
      };

      menus.addEventListener('click', burgerMenu);
      abrir.addEventListener('click', perfill);
      salirperfil.addEventListener('click', perfill);

      return () => {
        menus.removeEventListener('click', burgerMenu);
        abrir.removeEventListener('click', perfill);
        salirperfil.removeEventListener('click', perfill);

      };
    }


  }, []);

  const { user, profile, isAuthenticathed, logout, getImageUrl } = useAuth();

  useEffect(() => {
    profile();
  }, []);

  const handleLogout = () => {
    logout();
  }

  return (
    <div>
      <div className="perfil">
        <div className="perfil-section">
          <AiOutlineClose className="fa-solid fa-x salir-perfil" />
          <h2 className="perfil-h2 perfil-titulo">PERFIL</h2>


          <hr />
          {user ? (
            // Si el usuario está autenticado, muestra su información y un botón para cerrar sesión
            <>
              <div className="perfil-header">
                <img src={getImageUrl({ UrlImagen: user.UrlImagen })} alt="" className="perfil__img" />
              </div>
              <div className="perfil-body" key={user._id}>
                <h2 className="perfil-h2">NOMBRE</h2>
                <p className="perfil-p">{user.Nombre}</p>
                <h2 className="perfil-h2">CORREO ELECTRÓNICO</h2>
                <p className="perfil-p">{user.Email}</p>
              </div>
              <hr />
              <div className="perfil-footer">
                <Link to={{ pathname: "/editar-perfil", state: { user } }} className="perfil-button">
                  EDITAR PERFIL
                </Link>
                <button className="perfil-button" onClick={handleLogout} >CERRAR SESIÓN</button>
              </div>
            </>
          ) : (
            // Si el usuario no está autenticado, muestra el botón de inicio de sesión
            <div className="perfil-body">
              <p className="perfil-p">Inicia sesión para ver tu perfil</p>
              <Link to="/login" className="perfil-button">INICIAR SESIÓN</Link>
            </div>
          )}
        </div>
      </div>


    </div>
  )
}
