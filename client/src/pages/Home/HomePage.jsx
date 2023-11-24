{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" /> */ }

import { useEffect, useState, useMemo } from 'react';
import './HomePage.css'
import corona from './img/back.png';
import jack from './img/jack3.png'
import licores from './img/licores.png'
import { Link } from 'react-router-dom'
import imagen1 from './img/wallpaperbetter.jpg'
import imagen2 from './img/wallpaperbetter2.jpg'
import imagen3 from './img/wallpaperbetter3.jpg'
import { useProductos } from '../../context/productoContext';
import { useCarritos } from '../../context/carritoContext';
const HomePage = () => {

  const images = [imagen1, imagen2, imagen3];
  const [currentImage, setCurrentImage] = useState(0);
  const [randomProductos, setRandomProductos] = useState([]);
  const { addCarrito2 } = useCarritos();

  const nextSlide = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 37) {
        // Tecla izquierda
        prevSlide();
      } else if (event.keyCode === 39) {
        // Tecla derecha
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevSlide, nextSlide]);

  useEffect(() => {
    const animacion = document.getElementById('sobre__nosotros--img');
    const animacion2 = document.getElementById('sobre__nosotros--text');


    const Animacion = (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
         
        } else {
          entrada.target.classList.remove('visible');
        }
      });
    }

    const observador = new IntersectionObserver(Animacion, {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.1
    });

    observador.observe(animacion);
    observador.observe(animacion2);

  })

  const { getProductos, productos, getImageUrl } = useProductos();

  useEffect(() => {
    getProductos();
  }, []);

  const handleAddToCart = (producto) => {
    addCarrito2(producto);
  };



  const shuffledProductos = useMemo(() => {
    const shuffledArray = [...productos].sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, 3); // Take the first three elements
  }, [productos]);

  useEffect(() => {
    setRandomProductos(shuffledProductos);
  }, [shuffledProductos]);

  return (
    <div>
      <div className="container_carrusel">
        <div className='principal_homepage'>
          {/* <button className='prev' onClick={prevSlide}><GrPrevious /></button> */}
          <div className="carrusel_container-img">
            <div className="carrusel-images" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Imagen ${index + 1}`} className="carrusel-image" />
              ))}
            </div>
          </div>
          {/* <button className='next' onClick={nextSlide}><GrNext/></button> */}
        </div>
        <div className="button__homepage">
          <Link to="/catalogo" className="section1__button">VER MAS PRODUCTOS</Link>
        </div>
      </div>

      <body className='Section__CatalogoMasVendido '>
        <h2 className="main__titulo">PRODUCTOS<span className="main__titulo main__titulo-span "> RECOMENDADOS</span></h2>
        <main className="main ">
          <div className="CatalogoMasVendido">

            {
              randomProductos.map((producto) => (
                <div className="card" key={producto.id}>
                  <div className="img">
                    <img src={getImageUrl(producto)} alt="" className="card__img" />
                    <img src={corona} alt="" className="card__back" />
                  </div>
                  <h3 className="card__title1">{producto.Nombre}</h3>
                  <h4 className="card__cantidad">{producto.Litro}<span className="card__cantidad--span">ml</span></h4>
                  <span className="card__precio1">{producto.Precio}</span>
                  <button href="#" className="card__button" onClick={() => handleAddToCart(producto)}>AGREGAR
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
              ))
            }

          </div>
        </main>
      </body>

      <div className="sobre__nosotros ">
        <div className="sobre__nostros--section" id='sobre__nosotros--img'>
          <img src={licores} alt="" className="sobre__nosotros--img" />
        </div>
        <div className="sobre__nostros--section sobre__nostros--section2" id='sobre__nosotros--text'>
          <h1 className='sobre__nosotros--h1'>SOBRE <span className='sobre__nosotros--span'>NOSOTROS</span></h1>
          <p className="sobre__nosotros--p">Salsamentaria la 69 es un negocio establecido con más de 10 años en el mercado de bebidas alcohólicas. Ofrecemos una amplia selección de licores, vinos y cervezas para satisfacer las preferencias de nuestros clientes. Nuestro equipo altamente capacitado brinda un servicio al cliente excepcional, asesorando en la elección de bebidas adecuadas. Nos enorgullecemos de cumplir con todas las regulaciones y promover el consumo responsable. Nuestra visión es seguir creciendo, manteniendo nuestro compromiso con la calidad y la comunidad.</p>
        </div>
      </div>

    </div>
  )
}

export default HomePage