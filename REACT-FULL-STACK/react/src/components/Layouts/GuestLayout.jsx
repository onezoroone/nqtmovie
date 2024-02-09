import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
function GuestLayout() {
    useEffect(() => {
        import ('../../assets/css/login.css');
    }, [])
    const {token} = useStateContext();
    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <Outlet />
    );
}

export default GuestLayout;
