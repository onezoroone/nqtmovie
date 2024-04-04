import { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Editor } from "primereact/editor";
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import SlugName from "../../../libs/SlugName";
import Loading from "../../Loading";
import styles from "./editmovie.module.css";
import { useStateContext } from "../../../contexts/ContextProvider";

function EditMovie() {
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [othername, setOthername] = useState("");
    const [quality, setQuality] = useState("");
    const [year, setYear] = useState("");
    const [episode, setEpisode] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState("");
    const [trailer, setTrailer] = useState("");
    const [casts, setCasts] = useState("");
    const [security, setSecurity] = useState(false);
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [poster, setPoster] = useState("");
    const [country, setCountry] = useState("");
    const [keyword, setKeyword] = useState("");
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useNavigate();
    const [categories, setCategories] = useState(null);
    const {slug} = useParams();
    const {toast} = useStateContext();
    useEffect(() => {
        const fetch = async () => {
            await axiosClient.get("/movies/getDetailsMovie/"+ slug)
            .then((res) => {
                if(res.data.status == "error"){
                    router("/not-found")
                }
                const movie = res.data;
                setId(movie.id);
                setName(movie.name);
                setOthername(movie.othername);
                setQuality(movie.quality);
                setYear(movie.year);
                setEpisode(movie.episode);
                setTime(movie.time);
                setStatus(movie.status);
                setImage(movie.img);
                setPoster(movie.poster);
                setCountry(movie.country);
                setKeyword(movie.keyword);
                setSecurity(movie.security == "True" ? true : false);
                setType({name: movie.type});
                setCasts(movie.casts);
                setTrailer(movie.trailer);
                setDescription(movie.des);
                setSelectedCategories(movie.categories);
            })

            await axiosClient.get("/categories/getAllCategories")
            .then((res) => {
                setCategories(res.data);
            })
        }
        fetch();
    },[])
    if(!categories) return <Loading />
    const typeMovie = [
        {name: 'Phim bộ'},
        {name: 'Phim lẻ'}
    ]
    const onSubmit = async (ev) => {
        ev.preventDefault();
        if(name == "" || !selectedCategories || !type){
            toast.current.show({severity:'warn', summary: 'Cảnh Báo', detail:'Không được để trống tên và thể loại phim.', life: 3000});
        }else{
            setLoading(true);
            await axiosClient.post("/movies/editMovie",{
                id, name, othername, 
                slug: SlugName(name),
                quality, year, episode,time,status,image,trailer,casts, 
                poster,security: security ? "True" : "False",
                type,description,country,keyword, 
                selectedCategories
            })
            .then((response) => {
                toast.current.show({severity:'success', summary: 'Thành Công', detail: response.data, life: 3000});
            }).catch((err) => {
                Object.values(err.response.data.errors).forEach(errorArray => {
                    errorArray.forEach(errorMessage => {
                        toast.current.show({severity:'error', summary: 'Lỗi', detail: errorMessage, life: 5000});
                    });
                });
            })
            setLoading(false);
        }
    }
    return (
        <div className={styles.container}>
            <Helmet>
                <title>{`Edit Movie - ${name} - ${import.meta.env.VITE_BASE_NAME}`}</title>
                <meta property="og:title" content={`Edit Movie - ${name} - ${import.meta.env.VITE_BASE_NAME}`} />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className={styles.titleContainer}>
                <h2>Sửa Phim</h2>
            </div>
            <div className={styles.background} style={{backgroundImage: `url(${poster})`}}>
                <form className="row" onSubmit={onSubmit}>
                    <div className="col-xxl-9 d-flex flex-column gap-3">
                        <InputText value={name} placeholder="Tên Phim" onChange={(e) => setName(e.target.value)} />
                        <InputText value={othername} placeholder="Tên Khác" onChange={(e) => setOthername(e.target.value)} />
                        {description != "" && <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '300px' }} />}
                        {description == "" && <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '300px' }} />}
                        <MultiSelect value={selectedCategories} onChange={(e) => setSelectedCategories(e.value)} options={categories} optionLabel="name" display="chip" 
                            placeholder="Thể Loại Phim" />
                        <div className={styles.row1}>
                            <InputText value={year} placeholder="Năm" onChange={(e) => setYear(e.target.value)} />
                            <Dropdown value={type} onChange={(e) => setType(e.value)} options={typeMovie} optionLabel="name" 
                                placeholder="Loại Phim" className="w-100" />
                            <InputText value={status} placeholder="Trạng Thái" onChange={(e) => setStatus(e.target.value)} />
                            <InputText value={time} placeholder="Thời Lượng" onChange={(e) => setTime(e.target.value)} />
                            <InputText value={episode} placeholder="Tập Phim" onChange={(e) => setEpisode(e.target.value)} />
                        </div>
                        <div className={styles.row2}>
                            <InputText value={country} placeholder="Quốc Gia" onChange={(e) => setCountry(e.target.value)} />
                            <InputText value={trailer} placeholder="Trailer" onChange={(e) => setTrailer(e.target.value)} />
                            <InputText value={casts} placeholder="Diễn viên" onChange={(e) => setCasts(e.target.value)} className="w-100" />
                        </div>
                        <div className={styles.row3}>
                            <InputText value={quality} placeholder="Chất Lượng" onChange={(e) => setQuality(e.target.value)} />
                            <InputText value={keyword} placeholder="Từ Khóa" onChange={(e) => setKeyword(e.target.value)} className="w-100" />
                        </div>
                    </div>
                    <div className="col-xxl-3 d-flex flex-column">
                        <div className="mb-3">
                            <h5 className="text-white">Bảo Mật:</h5>
                            <InputSwitch checked={security} onChange={(e) => setSecurity(e.value)} />
                        </div>
                        <div className={styles.imageBackground} style={{backgroundImage: `url(${image})`}}></div>
                        <div className="mt-3 d-flex flex-column gap-2">
                            <InputText className="w-100" value={image} placeholder="Url Ảnh" onChange={(e) => setImage(e.target.value)} />
                            <InputText className="w-100 mt-3" value={poster} placeholder="Url Poster" onChange={(e) => setPoster(e.target.value)} />
                        </div>
                        <div className="mt-5 d-flex gap-3 justify-content-end">
                            <Link to="episodes"><Button icon="bi bi-database" loading={loading} className="text-white" label="Episode" /></Link>                          
                            <Button icon="bi bi-check" loading={loading} severity="success" className="text-white" label="Save" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditMovie;