import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiTwotoneDelete , AiOutlineClose } from 'react-icons/ai';
import './lista-productos.css';
import { useProductos } from '../../context/productoContext';


const ListaProductos = () => {
  const { getProductos, productos, getImageUrl, deleteProductos, notificaciones } = useProductos();
  const [buscarProducto, setBuscarProducto] = useState('');
  const [resultadoBusqueda, setResultadoBusqueda] = useState([]);
  const [selectProducto, setSelectProducto] = useState(null);

  const handleBusqueda = (event) => {
    setBuscarProducto(event.target.value);
  }

  useEffect(() => {
    getProductos();
  }, []);


  const openModal = (producto) => {
    setSelectProducto(producto);
  };

  const closeModal = () => {
    setSelectProducto(null);
  };


  useEffect(() => {
    const filtrarProductos = productos.filter((producto) => {
      const productoValor = Object.values(producto).join('').toLowerCase();
      return productoValor.includes(buscarProducto.toLowerCase());
    });
    setResultadoBusqueda(filtrarProductos);
  }, [productos, buscarProducto]);

  const handleDeleteProducto = (productoId) => {
    deleteProductos(productoId);
  }



  /*Notificacion*/

  useEffect(() => {


    const abrirNoti = document.querySelector(".notificacion");
    const cerraNoti = document.querySelector(".salir-noti");

    if (abrirNoti && cerraNoti) {

      const noti = () => {
        abrirNoti.classList.toggle('mobile-menu-noti');
      };


      abrirNoti.addEventListener('click', noti);


      return () => {

        abrirNoti.removeEventListener('click', noti);
        cerraNoti.removeEventListener('click', noti);
      };
    }


  }, []);






  return (
    <div className='container__ListaProductos'>
      <img className='imgFondo' alt="" />
      <div className="principal_lp">
        <div className='title_buscar_lp'>
          <h2 className='title_lp'>Lista<h2 className='title_lp title_lp-h2'> Productos</h2></h2>
          <div className="options">

          <Link to="/PedidosComprados" className='crear_lp'>PEDIDOS</Link>
          <Link to="/agregar-productos" className='crear_lp'>CREAR</Link>
          </div>
          <input className='buscar_lp' type="text" name="" id="" placeholder='Buscar' value={buscarProducto} onChange={handleBusqueda} />
        </div>
      </div>
      <hr className='separador__lp' />

      {resultadoBusqueda.map((producto) => (
        <div key={producto._id}>
            <hr className='separador__lp' />
            <div className="bloque_producto">
              <div className="bloque_producto__image bloque_producto-block">
                <h3 className='bloque_producto__image_title'>Imagen</h3>
                <div className='size-img'>
                  <img className='bloque_producto__image_img' src={getImageUrl(producto)} alt="" />
                </div>
              </div>
              <div className="bloque_producto__nombre bloque_producto-block">
                <h3 className='bloque_producto__id_title'>Nombre</h3>
                <p className='bloque_producto__id_text'>{producto.Nombre}</p>
              </div>
              <div className="bloque_producto__marca bloque_producto-block">
                <h3 className='bloque_producto__id_title marca__title'>Marca</h3>
                <p className='bloque_producto__id_text marca__text'>{producto.Marca}</p>
              </div>
              <div className="bloque_producto__tipo bloque_producto-block">
                <h3 className='bloque_producto__id_title tipo__title'>Tipo</h3>
                <p className='bloque_producto__id_text tipo__text'>{producto.Tipo}</p>
              </div>
              <div className="bloque_producto__cantidad bloque_producto-block">
                <h3 className='bloque_producto__id_title cantidad__title'>Cantidad</h3>
                <p className='bloque_producto__id_text cantidad__text'>{producto.Cantidad}</p>
              </div>
              <div className="bloque_producto__precio bloque_producto-block">
                <h3 className='bloque_producto__id_title precio__title'>Precio</h3>
                <p className='bloque_producto__id_text precio__text'>$ {producto.Precio}</p>
              </div>
              <div className="bloque_producto__buttons bloque_producto-block">
                <button onClick={() => openModal(producto)}>Ver Producto</button>
              <Link to={`/editar-productos/${producto._id}`}>Editar</Link>
              <AiTwotoneDelete className='delete__product' onClick={() => handleDeleteProducto(producto._id)} />
            </div >
          </div >
  <hr className='separador__lp' />
        </div >
      ))}



{selectProducto && (
          <div className="modal">
            <div className="card__modal">
              <div className="modal__derecha">
                <div className="modal__image">
                  <img className="modal__image--img" src={getImageUrl(selectProducto)} alt="" />
                </div>
              </div>
              <div className="modal__izquierda">
                <AiOutlineClose className="fa-solid fa-x salir-modal" onClick={closeModal} />
                <div className="modal__info">
                  <h1 className='modal__h2'>{selectProducto.Nombre}</h1>
                  <p className='modal__descripcion'>{selectProducto.Descripcion}</p>
                  <div className="modal__valor">
                    <h2 className="modal__precio">${selectProducto.Precio}</h2>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


<div className="notificacion">
  <div className="noficacion__pestana">
    <span className='span__noti'>{notificaciones && notificaciones.productos ? notificaciones.productos.length : 0}</span>
    <AiOutlineClose className="salir-noti" />
  </div>
  <div className="notificacion__body">
    {notificaciones && notificaciones.productos && notificaciones.productos[0] && notificaciones.productos[0].AvisoAdmi && (
      <div className="notfi">
        <div>
          <p className='notificacion__mensaje'>{notificaciones.message}</p>
          <ul>
            <h2 className='notificacion__h2'>Lista productos</h2>
            {notificaciones.productos.map((producto) => (
              <li className='lista__noti' key={producto._id}>
                <h3>{producto.Nombre}</h3>
                <p>Cantidad: {producto.Cantidad}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
</div>



      


    </div >
  );
};

export default ListaProductos;
