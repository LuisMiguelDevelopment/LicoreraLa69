import React, { useEffect, useState } from "react";
import { useCompra } from "../../context/compraContex";
import { useAuth } from "../../context/authContext";
import "./pedidos.css";

const Pedidos = () => {
  const { obtenerCompras, getImageUrl } = useCompra();
  const { user } = useAuth();
  const [compras, setCompras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        if (user) {
          // Obtener los datos de las compras
          const response = await obtenerCompras(user.id);
          setCompras(response);

          // Calcular el número total de páginas
          const totalPaginas = Math.ceil(response.length / itemsPerPage);
          setTotalPages(totalPaginas);
        }
      } catch (error) {
        console.error("Error al obtener compras:", error);
      }
    };

    fetchCompras();
  }, [user]);

  // Función para obtener los datos de las compras de la página actual
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return compras.slice(startIndex, endIndex);
  };

  // Manejar el cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="pedidos w-full mx-auto p-4 flex items-center flex-col">
    <div className="scroll_pedidos overflow-x-auto w-[90%] m-32 flex flex-col">
    <h1 className="text-[2rem] font-bold mb-4 justify-center  flex p-6  ">
      PEDIDOS <span className="text-[#EF3634] ml-2">REALIZADOS</span>
    </h1>
    <table className="min-w-[100%] border-4 border-collapse ">
      <thead>
        <tr className=" text-[20px]">
          <th className="py-2 px-4">ID</th>
          <th className="py-2 px-4">IMAGEN</th>
          <th className="py-2 px-4">PRODUCTOS</th>
          <th className="py-2 px-4">CANTIDAD</th>
          <th className="py-2 px-4">ESTADO PEDIDO</th>
          <th className="py-2 px-4">DIRECCION</th>
          <th className="py-2 px-4">METODO PAGO</th>
          <th className="py-2 px-4">TOTAL</th>
        </tr>
      </thead>
      <tbody className="w-full text-center">
        {getCurrentPageData().map((pedido) => (
          <React.Fragment key={pedido._id}>
            {pedido.productos.map((producto, productoIndex) => (
              <tr
                key={`${pedido._id}-${productoIndex}`}
                className={` h-[120px] //hover:bg-[#2d2d2d94] // ${
                  productoIndex === 0 ? "border-t-2 text-[20px]" : ""
                } py-2 w-full `}
              >
                {productoIndex === 0 && (
                  <td rowSpan={pedido.productos.length} className="px-4 ">
                    {pedido._id}
                  </td>
                )}
                <td className="h-[120px] flex justify-center items-center">
                  <img
                    src={getImageUrl({ urlimagen: producto.urlimagen })}
                    alt=""
                    className="pedido__img h-17 w-16 object-cover"
                  />
                </td>
                <td className="py-2">{producto.nombre}</td>
                <td className="py-2">{producto.cantidad}</td>
                <td className="py-2">
                  {pedido.estado === "pagado" ? "CONFIRMADO" : "No"}
                </td>
                {productoIndex === 0 && (
                  <td rowSpan={pedido.productos.length} className="">
                    {pedido.direccion}
                  </td>
                )}
                {productoIndex === 0 && (
                  <td rowSpan={pedido.productos.length} className="">
                    {pedido.tipoPago}
                  </td>
                )}
                {productoIndex === 0 && (
                  <td rowSpan={pedido.productos.length} className="">
                    {pedido.total}
                  </td>
                )}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
    <div className="flex justify-center items-center m-16">
      
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="mx-2 px-4 py-2 bg-[#EF3634] text-white hover:bg-white hover:text-red-500 border border-red-500"
      >
        Anterior
      </button>

      <span className="m-5">
         {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={compras.length <= itemsPerPage * currentPage}
        className="mx-2 px-4 py-2 bg-[#EF3634] text-white hover:bg-white hover:text-red-500 border border-red-500"
      >
        Siguiente
      </button>
    </div>
  </div>
  
  );
}

export default Pedidos;
