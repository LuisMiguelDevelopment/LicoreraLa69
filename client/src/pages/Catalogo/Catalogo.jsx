import React, { useEffect, useState } from 'react';
import { useProductos } from '../../context/productoContext';
import { useCarritos } from '../../context/carritoContext';
import { AiOutlineClose } from 'react-icons/ai';
import corona from './img/back.png';
import './Catalogo.css';

const Catalogo = () => {
  const { getProductos, productos, getImageUrl } = useProductos();
  const { addCarrito2 } = useCarritos();
  const [selectProducto, setSelectProducto] = useState(null);
  const [buscarProducto, setBuscarProducto] = useState('');
  const [resultadoBusqueda, setResultadoBusqueda] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de productos por página

  const handleBusqueda = (event) => {
    setBuscarProducto(event.target.value);
    setCurrentPage(1); // Resetear la página cuando se realiza una nueva búsqueda
  };

  const openModal = (producto) => {
    setSelectProducto(producto);
  };

  const closeModal = () => {
    setSelectProducto(null);
  };

  const handleAddToCart = (producto) => {
    addCarrito2(producto);
  };

  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    const filtrarProductos = productos.filter((producto) => {
      const productoValor = Object.values(producto).join('').toLowerCase();
      return productoValor.includes(buscarProducto.toLowerCase());
    });

    setResultadoBusqueda(filtrarProductos);
  }, [productos, buscarProducto]);

  // Calcular el índice inicial y final para la paginación
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productosPagina = resultadoBusqueda.slice(startIndex, endIndex);

  const totalPages = Math.ceil(resultadoBusqueda.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='general'>
      <main className="main ">
        <h2 className="main__tituloo  ">
          CATA<span className="main__tituloo main__titulo-span">LOGO</span>
        </h2>
        <div className="buscar">
          <div className='title_buscar_lp'>
            <input className='buscar_lp' type="text" name="" id="" placeholder='Buscar'  value={buscarProducto} onChange={handleBusqueda} />
          </div>
        </div>
        <div className="catalogo  m-10">
          {productosPagina.map((producto) => (
            <div className="card card" key={producto._id}>
              <div className="img" onClick={() => openModal(producto)}>
                <img src={getImageUrl(producto)} alt="" className="card__img" />
                <img src={corona} alt="" className="card__backk" />
              </div>
              <h3 className="card__title">{producto.Nombre}</h3>
              <h4 className="card__cantidad">
                <span className="card__cantidad--span">{producto.Litro}</span>
                ml
              </h4>
              <span className="card__precio">$ {producto.Precio}</span>
              <button onClick={() => handleAddToCart(producto)} className="card__button">
                <span className="card__button-text">AGREGAR</span>
              </button>
            </div>
          ))}
        </div>
        {/* Agregar botones para cambiar de página */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1} className='button__pagination'>
            Anterior
          </button>
          <span> {currentPage} de {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={productosPagina.length < itemsPerPage || currentPage === totalPages}  className='button__pagination' >
            Siguiente
          </button>
        </div>
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
                    <button className="card__button">
                      <span className="card__button-text" onClick={() => handleAddToCart(selectProducto)}>Agregar Carrito</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Catalogo;
