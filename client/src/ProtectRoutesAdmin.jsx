import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

const ProtectRoutesAdmin = () => {
    const { loading, isAuthenticathed, user } = useAuth();
    console.log(loading, isAuthenticathed);

    if (loading) return <h1>Loading....</h1>;

    if (user && user.Tipo === "Admi") {
        return (
            <div>
                <Outlet />
            </div>
        );
    } else {
        console.log("Error: Usuario no es administrador");
        if(!loading && !isAuthenticathed)return <Navigate to='/' replace />
    }
}

export default ProtectRoutesAdmin;
