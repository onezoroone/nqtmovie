import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axiosClient from "../../../axios-client";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Helmet } from "react-helmet";

function RequestMovie() {
    const [name, setName] = useState("");
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const handleSendRequest = async (e) => {
        e.preventDefault();
        if(name != ""){
            setLoading(true);
            await axiosClient.post("/requests/createRequest",{
                name
            })
            .then((res) => {
                toast.current.show({severity:'success', summary: 'Thành công', detail:res.data, life: 3000});
                setName("");
            }).catch((err) => {
                console.error(err.response);
            })
            setLoading(false);
        }else{
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail: "Vui lòng điền đầy đủ thông tin.", life: 3000});
        }
    }
    return (  
        <div className="d-flex justify-content-center">
            <Helmet>
                <title>{`Yêu Cầu Phim - ${import.meta.env.VITE_BASE_NAME}`}</title>
            </Helmet>
            <Toast ref={toast} />
            <div style={{maxWidth:'1400px'}} className="w-100 p-5">
                <form onSubmit={handleSendRequest}>
                    <InputText value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-100 p-inputtext-lg" placeholder="Nhập tên phim cần yêu cầu" />
                    <Button loading={loading} label="Gửi" type="submit" icon="bi bi-send" className="rounded-2 text-white mt-3" />
                </form>
            </div>
        </div>
    );
}

export default RequestMovie;