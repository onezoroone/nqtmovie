import { Link, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../../../axios-client";
import styles from "./changepass.module.css";
import { Helmet } from "react-helmet";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
        
function ProcessChangePass() {
    const {token} = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading]= useState(false);
    const toast = useRef(null);

    // useEffect(() => {
    //     const auth = async () => {
    //         await axiosClient.post("/user/changePassword")
    //     }
    // },[token])
    const onSubmit = async (e) => {
        e.preventDefault();
        if(password == "" || confirmPassword == ""){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Không được để trống.', life: 3000});
        }else if(password != confirmPassword){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Không trùng khớp.', life: 3000});
        }else{
            setLoading(true);
            await axiosClient.post("/user/changePassword",{
                token,
                password,
                password_confirmation: confirmPassword
            }).then((res) =>{
                setPassword("");
                setConfirmPassword("");
                toast.current.show({severity:'success', summary: 'Thành công', detail:res.data, life: 3000});
            })
            .catch((err) => {
                Object.values(err.response.data.errors).forEach(errorArray => {
                    errorArray.forEach(errorMessage => {
                        toast.current.show({severity:'error', summary: 'Thất bại', detail: errorMessage, life: 5000});
                    });
                });
            })
            setLoading(false);
        }
    }
    return (
        <div className="w-100 rounded-2 p-4" style={{background: 'var(--bg-main)', paddingBottom:'20px'}}>
            <Toast ref={toast} />
            <Helmet>
                <title>{`Đổi Mật Khẩu - ${import.meta.env.VITE_BASE_NAME}`}</title>
            </Helmet>
            <h2 className="text-center mb-3">Đổi mật khẩu</h2>
            <form className="mb-3" onSubmit={onSubmit}>
                <div className="d-flex flex-column gap-3">
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder="Nhập mật khẩu mới" />
                    <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.input} placeholder="Xác nhận lại mật khẩu" />
                </div>
                <Button loading={loading} type="submit" label="Đổi mật khẩu" className="text-white rounded-2 mt-3" />
            </form>
            <div className="text-center w-100">
                <Link className="text-white" to="/user/login">Đăng nhập ngay</Link>
            </div>
        </div>
    );
}

export default ProcessChangePass;