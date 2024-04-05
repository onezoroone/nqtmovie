import { useRef, useState } from "react";
import styles from "./login.module.css"
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const router = useNavigate();
    const {setRole, setAvatar} = useStateContext();
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    const onSubmit = async (ev) =>{
        ev.preventDefault();
        if(email == "" || password == ""){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Vui lòng điền đầy đủ thông tin.', life: 3000});
        }else if(!isValidEmail(email)){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Email không hợp lệ.', life: 3000});
        }else{
            setLoading(true);
            try{
                await axiosClient.post("/user/login",{                    
                    email, password, remember: true
                })
                .then((response) => {
                    setRole(response.data.user.role);
                    setAvatar(response.data.user.avatar);
                    router("/");
                }).catch((err) => {
                    toast.current.show({severity:'error', summary: 'Lỗi', detail: err.response.data.message, life: 3000});
                })
            }catch (error) {
                console.error(error.message)
            } finally{
                setLoading(false);
            } 
        }
    }
    return (
        <>
        <Helmet>
            <title>{`Đăng Nhập - ${import.meta.env.VITE_BASE_NAME}`}</title>
            <meta property="og:title" content={`Đăng Nhập - ${import.meta.env.VITE_BASE_NAME}`} />
            <meta property="og:image" content="/jack.png" />
        </Helmet>
        <div className="w-100 rounded-2" style={{background: 'var(--bg-main)', paddingBottom:'20px'}}>
            <Toast ref={toast} />
            <form className="d-flex flex-column p-4 gap-3" onSubmit={onSubmit}>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="username" className={styles.input} type="text" placeholder="Email" />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className={styles.input} type="password" autoComplete="current-password" placeholder="Nhập Mật Khẩu" />
                <div className="text-secondary d-flex align-items-center gap-2">
                    <Checkbox onChange={e => setCheck(e.checked)} checked={check}></Checkbox><span className="text-white">Nhớ Tôi</span>
                </div>
                <Button loading={loading} className="btn btn-primary" type="submit">Đăng Nhập</Button>
            </form>
            <div className={styles.loginFooter}>
                <div>
                    <span className="text-secondary">Bạn chưa có tài khoản?</span><Link to="/user/register">Đăng ký ngay</Link>
                </div>
                <Link className="mt-2" to="/user/forgot-password">Quên mật khẩu</Link>
            </div>
        </div>
        </>
    );
}

export default Login;