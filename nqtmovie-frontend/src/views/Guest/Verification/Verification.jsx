import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../../../axios-client.js";
function Verification() {
    const {token} = useParams();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    useEffect(()=>{
        axiosClient.post(`/user/verification/${token}`)
        .then((response) => {
            setMessage(response.data)
        }).catch((err) => {
            setError(err.response.data)
        })
    },[])
    return (  
        <>
        <Helmet>
            <title>{`Xác Thực Tài Khoản - ${import.meta.env.VITE_BASE_NAME}`}</title>
            <meta property="og:title" content={`Xác Thực Tài Khoản - ${import.meta.env.VITE_BASE_NAME}`} />
            <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        {message && 
        <div className="d-flex flex-column align-items-center w-100">
            <p className="alert bg-success">{message}</p>
            <Link className={`btn btn-danger rounded-3`} to="/user/login">Đăng nhập thôi baby ơi!</Link>
        </div>}
        {error && !message && 
        <div className="d-flex flex-column align-items-center w-100">
            <p className="alert bg-danger">{error}</p>
        </div>}
        </>
    );
}

export default Verification;