import { Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import "../../loader.css"
import Navbar from "../Admin/Navbar";
import Sidebar from "../Admin/Sidebar";
import Footer from "../Admin/Footer";
function AdminLayout() {
    useEffect(() => {
        import ("../../assets/css/typography.css");
        import ("../../assets/css/style.css");
        // import ("../../assets/css/responsive.css");
        // import ("../../assets/js/bootstrap.min.js");
        import ('primeicons/primeicons.css');
        import ("primereact/resources/themes/lara-dark-cyan/theme.css");
    },[])
    const {user, token, notification} = useStateContext();
    const userInfor = JSON.parse(user);
    if(!token){
        window.location.href = "/"
    }
    if(token && userInfor.permission != "admin"){
        window.location.href = "/"
    }
    return (
        <>
            <Sidebar></Sidebar>
            <div id="content-page" className="content-page">
            <Navbar></Navbar>
                <Outlet />
            </div>
            <Footer></Footer>
            {notification && notification.map((toast, index) => (
            <div key={index} className={`toast fade show ${toast.toastClass}`} role="alert" id="toast">
                <div className="toast-body">
                    <div className="d-flex gap-4">
                    <span><i className={`bi ${toast.iconToast} fs-5`}></i></span>
                    <div className="d-flex flex-grow-1 align-items-center">
                        <span className="fw-semibold">{toast.message }</span>
                        <button type="button"
                        className="btn-close btn-close-white btn-close-sm ms-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"></button>
                    </div>
                    </div>
                </div>
            </div>
            ))
            }
        </>
    );
}

export default AdminLayout;
