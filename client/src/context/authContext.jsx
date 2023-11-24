// AuthProvider.js
import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, profileRequest , logoutRequest, editarPerfilRequest } from "../api/auth";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within on AuthProvider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const showAlert = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon
        });
    }

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
            showAlert('Registro exitoso', '¡Te has registrado correctamente!', 'success');
        } catch (error) {
            setErrors(error.response.data);
            console.log(error);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            setIsAuthenticated(true);
            setUser(res.data);
            showAlert('Sesión iniciada', '¡Sesión iniciada correctamente!', 'success');
        } catch (error) {
            console.log(error)
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }
    
    const profile = async (id) => {
        try {
            const res = await profileRequest(id);
            setUser(res.data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }


    const logout = async ()=>{
        try {
           await logoutRequest();
           setIsAuthenticated(false);
           setUser(null);
           Cookies.remove('token')
        } catch (error) {
            console.log(error)
        }
    }

    const editarImagenPerfil = async(formData) =>{
        try {
           const res = await editarPerfilRequest(user.id , formData);
           const nuevaImagenPerfil = res.data.nuevaURL;
           
            setUser({
                ...user,
                imagen: nuevaImagenPerfil
            });

            // Después de editar la imagen, vuelve a cargar los datos del perfil
            await profile(user.id);
            console.log("se actualizo correctamente")
            showAlert('Se editó con éxito', '¡Se editó correctamente!', 'success');
        } catch (error) {
            console.log(error)
        }
    }


     const getImageUrl = (user) => {
        return 'http://localhost:4001/uploads/' + user.UrlImagen;
      };

   

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyTokenRequest(cookies.token)
                console.log(res)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            signin,
            isAuthenticated,
            errors,
            loading,
            profile,
            showAlert,
            logout,
            editarImagenPerfil,
            getImageUrl
        }}>
            {children}
        </AuthContext.Provider>
    )
}
