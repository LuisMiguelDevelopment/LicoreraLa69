import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import RegisterPage from './pages/crear-cuenta/RegisterPage'
import LoginPage from './pages/iniciar-sesion/LoginPage'
import { AuthProvider } from './context/authContext'
import ProtectedRoutes from './ProtectedRoutes'
import ProtectRoutesAdmin from './ProtectRoutesAdmin';
import { CarritoProvider } from './context/CarritoContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Catalogo from './pages/Catalogo/Catalogo'
import ListaProductos from './pages/ListaProductos/ListaProductos'
import { ProductoProvider } from './context/productoContext'
import Agregar_producto from "./pages/agregar-producto/agregar_producto"
import Editar_producto from "./pages/editar-producto/editar_producto"
import { CompraProvider } from './context/compraContex'
import { Cart } from './components/Cart/Cart'
import { Profile } from './components/Profile/Profile'
import Editar_Perfil from './pages/Editar-Perfil/Editar_Perfil'
import Pedidos from './pages/pedidos/pedidos';
import Pedidos_Comprados from './pages/pedidos_Comprados/Pedidos_Comprados'


function App() {
  return (
    <>
      <AuthProvider>
        <ProductoProvider>
          <CarritoProvider>
            <CompraProvider>
              <BrowserRouter>
                <Header />
                <Cart />
                <Profile />
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />
                  <Route path='/catalogo' element={<Catalogo />} />
                  <Route path='/pedidos' element={<Pedidos />} />
                  <Route element={<ProtectRoutesAdmin />}>
                    <Route path='/agregar-productos' element={<Agregar_producto />} />
                    <Route path='/editar-productos/:id' element={<Editar_producto />} />
                    <Route path='/ListaProductos' element={<ListaProductos />} />
                    <Route path='/PedidosComprados' element={<Pedidos_Comprados />} />

                  </Route>
                  <Route element={<ProtectedRoutes />}>
                    <Route path='/editar-perfil' element={<Editar_Perfil />} />
                  </Route>
                </Routes>

                <Footer />
              </BrowserRouter>
            </CompraProvider>

          </CarritoProvider>
        </ProductoProvider>
      </AuthProvider>
    </>
  )
}

export default App
