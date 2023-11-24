import { useState, useEffect } from 'react';
import './Cart.css';
import { useCompra } from '../../context/compraContex';
import { useCarritos } from '../../context/CarritoContext';
import { AiOutlineClose } from 'react-icons/ai';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const navigate = useNavigate();
  const [isCarritoAbierto, setIsCarritoAbierto] = useState(false);

  useEffect(() => {
    const menus = document.querySelector(".menu");
    const navLinks = document.querySelector(".navbar__enlaces");
    const abrirCarrito = document.querySelector(".abrirCarrito");
    const carrito = document.querySelector(".carrito");
    const salirCarrito = document.querySelector(".salir-carrito");

    if (menus && navLinks) {
      const burgerMenu = () => {
        navLinks.classList.toggle('mobile-menu');
      };

      const cart = () => {
        carrito.classList.toggle('mobile-menu');
        setIsCarritoAbierto(!isCarritoAbierto);
      };

      menus.addEventListener('click', burgerMenu);
      abrirCarrito.addEventListener('click', cart);
      salirCarrito.addEventListener('click', cart);

      return () => {
        menus.removeEventListener('click', burgerMenu);
        abrirCarrito.removeEventListener('click', cart);
        salirCarrito.removeEventListener('click', cart);
      };
    }
  }, [isCarritoAbierto]);

  const { carritos, getImageUrl, actualizarCart, precioTotal } = useCarritos();
  const [selectCompra, setSelectCompra] = useState(null);
  const [selectMetodoPago, setSelectMetodoPago] = useState("Efectivo");
  const { comprarProductoss } = useCompra();
  const { user } = useAuth();
  const { comprarEfectivo, setDireccion } = useCompra();
  const [direccion, setDireccionLocal] = useState("");
  const [tipoPago, setTipoPago] = useState("Efectivo");
  const [isCompraExitosa, setIsCompraExitosa] = useState(false);

  const openModal = (compra) => {
    setSelectCompra(compra);
  };

  const closeModal = () => {
    setSelectCompra(null);
  };

  const handleMetodoPago = (event) => {
    setSelectMetodoPago(event.target.value);
    setTipoPago(event.target.value);
  };



const handleRealizarCompra = async () => {
  try {
    if (user) {
      const userId = user.id;
      await comprarProductoss(userId, direccion, tipoPago);
      setIsCompraExitosa(true);
    } else {
      console.log('Usuario no autenticado');
    }
  } catch (error) {
    console.error('Error al realizar la compra:', error);
    console.log('Detalles del error:', error.response.data);
  }
};

  const handleRealizarCompraEfectivo = async () => {
    try {
      if (user) {
        const userId = user.id;
        await comprarEfectivo({ userId, direccion, carritos, tipoPago });
        setIsCompraExitosa(true);
        // Cambia el estado para cerrar automáticamente el carrito
        setIsCarritoAbierto(false);
        navigate('/pedidos');
      } else {
        console.log('Usuario no autenticado');
      }
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  };

  useEffect(() => {
    // Cierra el carrito cuando isCompraExitosa es verdadero
    if (isCompraExitosa) {
      closeModal();
    }
  }, [isCompraExitosa]);

  useEffect(() => {
    // Cierra el carrito cuando isCarritoAbierto es falso
    if (!isCarritoAbierto) {
      closeModal();
    }
  }, [isCarritoAbierto]);

  return (
    <div>
      <div className={`carrito ${isCarritoAbierto ? 'mobile-menu' : ''}`}>
        <AiOutlineClose className="fa-solid fa-x salir-carrito" />
        <div className="carrito-header">
          <div className="carrito__h2">TU CARRITO</div>
        </div>
        {carritos.map((carrito) => (
          <div className="carrito-items" key={carrito._id}>
            <hr />
            <div className="carrito__body">
              <div className="carrito-img">
                <img src={getImageUrl({ Urlimagen: carrito.Urlimagen })} className="carrito-producto" alt="" />
              </div>
              <div className="carrito__info">
                <div className="carrito__descripcion">
                  <p className="carrito__p">{carrito.Nombre}</p>
                  <p className="carrito__p">200ml</p>
                </div>
                <div className="carrito__pr-cant">
                  <div className="button-aumt">
                    <button className="button-cantidad" onClick={() => { actualizarCart(carrito._id, 'del') }}>-</button>
                    <p className="carrito__cantidad">{carrito.Cantidad}</p>
                    <button className="button-cantidad" onClick={() => { actualizarCart(carrito._id, 'add') }}>+</button>
                  </div>
                  <div className="carrito__precio">
                    <p className="precio-carrito">{carrito.Precio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="carrito__compra">
          <p className='carrito__p--compra'>PRECIO TOTAL: <span className='carrito__span'>{precioTotal.toFixed(2)}</span></p>
          <button className="carrito__button" onClick={openModal}>CONFIRMAR COMPRA</button>
        </div>
      </div>
      {selectCompra && (
        <div className="confirmar__compra">
          <div className="confirmar__compraText">
            <AiOutlineClose className="fa-solid fa-x salir-modal" onClick={closeModal} />
            <h1 className='confirmar__h1' >CONFIRMAR TU <span className='h1__span'>COMPRA</span></h1>
            <label className='confirmar__label' htmlFor="">METODO PAGO</label>
            <select className='confirmar__select input' name="" id="" value={selectMetodoPago} onChange={handleMetodoPago} >
              <option className='confirmar__option' value="Efectivo">Efectivo</option>
              <option className='confirmar__option' value="mercadopago">MercadoPago</option>
            </select>
            {selectMetodoPago === 'mercadopago' && (
              <div className="compra">
                <label className='confirmar__label' htmlFor="direccion">DIRECCION</label>
                <input
                  className='input'
                  type="text"
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccionLocal(e.target.value)} 
                />
                <label className='confirmar__label' htmlFor="">TOTAL</label>
                <p className='carrito__p--compra'>$<span className='carrito__span--text'>{precioTotal.toFixed(2)}</span></p>
                <button className="carrito__button carrito__button--compra" onClick={handleRealizarCompra}>PAGAR</button>
              </div>
            )}
            {selectMetodoPago == 'Efectivo' && (
              <div className="compra">
                <label className='confirmar__label' htmlFor="">DIRECCION</label>
                <input className='input' type="text" value={direccion} onChange={(e) => setDireccionLocal(e.target.value)} />
                <label className='confirmar__label' htmlFor="">TOTAL</label>
                <p className='carrito__p--compra'>$<span className='carrito__span'>{precioTotal.toFixed(2)}</span></p>
                <button className="carrito__button carrito__button--compra" onClick={handleRealizarCompraEfectivo}>PEDIR</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
