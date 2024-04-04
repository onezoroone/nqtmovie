import { Button } from "primereact/button";
import styles from "./forgot.module.css";
import { useState } from "react";
import { Helmet } from "react-helmet";
import axiosClient from "../../../axios-client";
function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [background, setBackground] = useState(null);
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axiosClient.post("/user/forgotPassword",{
            email
        }).then((res) => {
            setMessage(res.data);
            setBackground("green");
        }).catch((err) => {
            setMessage(err.response.data);
            setBackground("red");
        })
        setLoading(false);
    }
    return (  
        <div className="p-4 rounded-2 w-100" style={{background: 'var(--bg-main)', paddingBottom:'20px'}}>
            <Helmet>
                <title>{`Quên Mật Khẩu - ${import.meta.env.VITE_BASE_NAME}`}</title>
            </Helmet>
            <h2 className="text-center">Quên mật khẩu</h2>
            <form onSubmit={onSubmit}>
                <div className="input-group mb-3 mt-3">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} placeholder="Nhập Email" type="email" id="email" name="email" required />
                </div>
                <Button loading={loading} className={styles.btn} type="submit">Quên mật khẩu</Button>
            </form>
            {message && 
            <div className="alert mt-4 text-center" style={{background: `${background}`}}>
                {message}
            </div>}
        </div>
    );
}

export default ForgotPassword;