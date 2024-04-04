/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

function LayoutGuest() {
    const router = useNavigate();
    const {user, role} = useStateContext();
    useEffect(()=>{
        if(user || role){
            router("/");
        }
    },[])
    return (  
        <div className="d-flex justify-content-center">
            <div style={{maxWidth:'1400px', padding:'10px',color:'#fff'}}>
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex gap-3 align-items-center">
                        <img src="/logo.png" alt="NQT Movie" width="70px" height="70px" />
                        <div className="flex-1 d-flex h-100 align-items-center">
                            <h4><span className="text-secondary">Chào mừng đến</span> NQT Movie</h4>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default LayoutGuest;