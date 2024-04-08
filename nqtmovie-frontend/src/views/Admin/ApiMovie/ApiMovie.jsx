import { useNavigate } from "react-router-dom";
import styles from "./api.module.css";
import { useRef, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import axios from "axios";
import { Helmet } from "react-helmet";
import axiosClient from "../../../axios-client";
function ApiMovie() {
    const router = useNavigate();
    const toast = useRef(null);
    const [selectedAPI, setSelectedAPI] = useState(null);
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedAPI1, setSelectedAPI1] = useState(null);
    const [value1, setValue1] = useState("");
    const options = [
        {
            name: 'OPHIM'
        },
        {
            name: 'NGUONC'
        },
        {
            name: 'KKPHIM'
        }
    ];
    const onSubmit = async (ev) => {
        ev.preventDefault();
        if(!selectedAPI || value == ""){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Vui lòng điền đầy đủ thông tin.', life: 3000});
        }else{
            setLoading(true);
            if(selectedAPI.name == "NGUONC"){
                await axios.get(`${import.meta.env.VITE_BASE_NGUONC}` + value)
                .then((res) => {
                    sessionStorage.setItem('apimovie', JSON.stringify(res.data));
                    router("/admin/new-movie?movie="+res.data.movie.slug+"&api=" + selectedAPI.name);
                })
                .catch(() => {
                    toast.current.show({severity:'error', summary: 'Lỗi', detail:'Đường dẫn không hợp lệ.', life: 3000});
                })
            }else if(selectedAPI.name == "OPHIM"){
                await axios.get(`${import.meta.env.VITE_BASE_OPHIM}` + value)
                .then((res) => {
                    sessionStorage.setItem('apimovie', JSON.stringify(res.data));
                    router("/admin/new-movie?movie="+res.data.movie.slug+"&api=" + selectedAPI.name);
                }).catch(() => {
                    toast.current.show({severity:'error', summary: 'Lỗi', detail:'Đường dẫn không hợp lệ.', life: 3000});
                })
            }else if(selectedAPI.name == "KKPHIM"){
                await axios.get(`${import.meta.env.VITE_BASE_KKPHIM}` + value)
                .then((res) => {
                    sessionStorage.setItem('apimovie', JSON.stringify(res.data));
                    router("/admin/new-movie?movie="+res.data.movie.slug+"&api=" + selectedAPI.name);
                }).catch(() => {
                    toast.current.show({severity:'error', summary: 'Lỗi', detail:'Đường dẫn không hợp lệ.', life: 3000});
                })
            }
            setLoading(false);
        }
    }

    const hanldeUpdate = async (e) => {
        e.preventDefault();
        if(!selectedAPI1 || value1 == ""){
            toast.current.show({severity:'warn', summary: 'Cảnh báo', detail:'Vui lòng điền đầy đủ thông tin.', life: 3000});
        }else{
            setLoading(true);
            if(selectedAPI1.name == "NGUONC"){
                const response = await axios.get(`https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=` + value1)
                for(let i = 0; i < response.data.items.length; i++){
                    await axiosClient.post("/movies/leechMovies",{
                        data: response.data.items[i],
                        serverName: "NGUONC",
                        name: response.data.items[i].name
                    }).then((res) => {
                        toast.current.show({severity:'success', summary: 'Thành công', detail:res.data, life: 3000});
                    }).catch((err) => {
                        toast.current.show({severity:'error', summary: 'Lỗi', detail:err.response.data.message, life: 3000});
                    })
                }
            }else if(selectedAPI1.name == "OPHIM"){
                const response = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=` + value1)
                for(let i = 0; i < response.data.items.length; i++){
                    await axiosClient.post("/movies/leechMovies",{
                        data: response.data.items[i],
                        serverName: "OPHIM",
                        name: response.data.items[i].name
                    }).then((res) => {
                        toast.current.show({severity:'success', summary: 'Thành công', detail:res.data, life: 3000});
                    }).catch((err) => {
                        toast.current.show({severity:'error', summary: 'Lỗi', detail:err.response.data.message, life: 3000});
                    })
                }
            }else{
                toast.current.show({severity:'error', summary: 'Lỗi', detail:'Nguồn này chưa được hỗ trợ.', life: 3000});
            }
            setLoading(false);
        }
    }
    return ( 
        <>
        <div className={styles.container}>
            <Helmet>
                <title>{`API Movie - ${import.meta.env.VITE_BASE_NAME}`}</title>
                <meta property="og:title" content={`API Movie - ${import.meta.env.VITE_BASE_NAME}`} />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <Toast ref={toast} />
            <h2 className="text-white">API Phim</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className="d-flex gap-3">
                <Dropdown value={selectedAPI} onChange={(e) => setSelectedAPI(e.value)} options={options} optionLabel="name" 
                placeholder="Chọn API" />
                    <input value={value} placeholder="Nhập Slug Phim. Ví dụ: mashle-2nd-season" onChange={(e) => setValue(e.target.value)} className={styles.input} type="text" />
                </div>
                <div className="mt-4">
                    <Button loading={loading} className="text-white rounded-4" label="Gửi API" type="submit"></Button>
                </div>
            </form>
        </div>
        <div className={`${styles.container} mt-5`}>
            <h2 className="text-white">Crawl phim nhanh</h2>
            <form className={styles.form} onSubmit={hanldeUpdate}>
                <div className="d-flex gap-3">
                <Dropdown value={selectedAPI1} onChange={(e) => setSelectedAPI1(e.value)} options={options} optionLabel="name" 
                placeholder="Chọn API" />
                    <input value={value1} placeholder="Nhập số trang. Ví dụ: 1" onChange={(e) => setValue1(e.target.value)} className={styles.input} type="text" />
                </div>
                <div className="mt-4">
                    <Button loading={loading} className="text-white rounded-4" label="Gửi API" type="submit"></Button>
                </div>
            </form>
        </div>
        </>
     );
}

export default ApiMovie;