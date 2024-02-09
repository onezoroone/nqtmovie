import { Outlet } from "react-router-dom";
import HeaderMoblie from "../Movie/HeaderMoblie";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import SidebarLayout from "../Movie/SidebarLayout";
import { useStateContext } from "../../contexts/ContextProvider";
import Loading from "../Loading";
import Pusher from "pusher-js";
function MovieLayout() {
    const {user, data, idUser,notification, setData, setNotification} = useStateContext();
    const hasPusherInitialized = useRef(false);
    const [renderCount, setRenderCount] = useState(0);
    useEffect(()=>{
        setRenderCount(renderCount + 1);
        if(user && !hasPusherInitialized.current && renderCount > 1){
            Pusher.logToConsole = false;
            const pusher = new Pusher('965865056288a2556707', {
                cluster: 'ap1'
            });
            const channel = pusher.subscribe('NQTMOVIE');
            channel.bind('movie-updates', function (noti) {
                if(data.Favo.length != 0 && data.Favo.some(item => item.id === Number(noti.id))){
                    setNotification(`Bộ phim "${noti.movie}" vừa cập nhật tập mới nhất`, 'text-bg-success', 'bi-bell-fill');
                }
            });
            hasPusherInitialized.current = true;
        }
    },[user, data, setNotification])
    useEffect(() => {
        import('../../assets/css/index.css')
        const fetchData = async () => {
            try {
                if(idUser){
                    const response = await axiosClient.post(`/getmovies/${idUser}`);
                    setData(response.data);
                }else{
                    const response = await axiosClient.post('/getmovies');
                    setData(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    if (!data) {
        return <Loading></Loading>;
    }
    const { allcategories } = data;
    const handleCloseSidebar = () => {
        const canvas = document.getElementById('offcanvasExample');
        const backdrop = document.getElementById("backdrop-sidebar");
        canvas.classList.remove("show")
        backdrop.classList.remove("show")
    }
    return (
        <div className="main-content p-0 m-0">
            <HeaderMoblie></HeaderMoblie>
            <SidebarLayout categories={allcategories}></SidebarLayout>
            <Outlet/>
            {notification && notification.map((toast, index) => (
            <div key={index} className={`toast fade show ${toast.toastClass}`} role="alert" id="toast" style={{zIndex: 1000}}>
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
            <div className="backdrop-sidebar" onClick={handleCloseSidebar} id="backdrop-sidebar"></div>
        </div>
    );
}

export default MovieLayout;
