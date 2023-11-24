import React, { useEffect, useState } from "react";
import { useCompra } from "../../context/compraContex";
import "./pedidos_Comprados.css";

const Pedidos_Comprados = () => {
  const { todosLosPedidos, getImageUrl } = useCompra();
  const [compras, setCompras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const pedidosData = await todosLosPedidos();
        const totalPedidos = pedidosData.length;

        const totalPages = Math.ceil(totalPedidos / itemsPerPage);
        setTotalPages(totalPages);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const currentPedidos = pedidosData.slice(startIndex, endIndex);
        setCompras(currentPedidos);
      } catch (error) {
        console.error("Error fetching pedidos", error);
      }
    };

    fetchPedidos();
  }, [todosLosPedidos, currentPage]);

  return (
    <div className="pedidos_comprados w-full mx-auto p-4 flex items-center   flex-col">
      <div className="scrollpedidosComprados overflow-x-auto w-[90%] m-32 flex flex-col">
      <h1 className="text-[2rem] font-bold mb-4 justify-center  flex p-6 ">
        PEDIDOS<span className="ml-2 text-[#EF3634]">COMPRADOS</span>{" "}
      </h1>
      <table className="min-w-[90%] border-4 border-collapse divide-y ">
        <thead>
          <tr className=" text-[20px]">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">IMAGEN</th>
            <th className="py-2 px-4">PRODUCTO</th>
            <th className="py-2 px-4">CANTIDAD</th>
            <th className="py-2 px-4">ESTADO PEDIDO</th>
            <th className="py-2 px-4">DIRECCION</th>
            <th className="py-2 px-4">TIPO DE PAGO</th>
            <th className="py-2 px-4">PRECIO TOTAL</th>
            <th className="py-2 px-4">NOMBRE</th>
            <th className="py-2 px-4">NUMERO</th>
          </tr>
        </thead>
        <tbody className="w-full text-center">
        {compras.map((pedido, pedidoIndex) => (
  <React.Fragment key={pedido._id}>
    {pedido.productos.map((producto, productoIndex) => (
      <tr
        key={`${pedido._id}-${productoIndex}`}
        className={`${
          productoIndex === 0
            ? "border-t-2 h-[120px] text-[20px]  //hover:bg-[#2d2d2d94]//"
            : ""
        } py-2 w-full `}
      >
        {productoIndex === 0 && (
          <td rowSpan={pedido.productos.length} className="px-4">
            {pedido._id}
          </td>
        )}
        <td className=" h-[120px]">
          <img
            src={getImageUrl({ urlimagen: producto.urlimagen })}
            alt=""
            className="pedido__img h-17 w-16 object-cover"
          />
        </td>
        <td className="py-2">{producto.nombre}</td>
        <td className="py-2">{producto.cantidad}</td>
        <td className="py-2">
          {pedido.estado === "pagado" ? "Sí" : "No"}
        </td>
        {productoIndex === 0 && (
          <td rowSpan={pedido.productos.length} className="py-2">
            {pedido.direccion}
          </td>
        )}
        {productoIndex === 0 && (
          <td rowSpan={pedido.productos.length} className="py-2">
            {pedido.tipoPago}
          </td>
        )}
        {productoIndex === 0 && (
          <td rowSpan={pedido.productos.length} className="py-2">
            {pedido.total}
          </td>
        )}
        {productoIndex === 0 && (
          <td rowSpan={pedido.productos.length} className="py-2">
            {pedido.nombreUsuario}
          </td>
        )}
        {productoIndex === 0 && (
          <td rowSpan={pedido.productos.length} className="py-2">
            {pedido.telefono}
          </td>
        )}
      </tr>
    ))}
  </React.Fragment>
))}

        </tbody>
      </table>
      </div>
      <div className="flex justify-center items-center m-16 ">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 bg-[#EF3634] text-white hover:bg-white hover:text-red-500  border border-red-500"
        >
          Anterior
        </button>
        <span className="m-5">
          {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={compras.length < itemsPerPage}
          className="mx-2 px-4 py-2 bg-[#EF3634] text-white hover:bg-white hover:text-red-500  border border-red-500"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Pedidos_Comprados;
