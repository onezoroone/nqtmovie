import { useEffect, useState } from "react";
import styles from "./newmovie.module.css";
import { InputText } from 'primereact/inputtext';
import { Editor } from "primereact/editor";
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import SlugName from "../../../libs/SlugName";
import { TabView, TabPanel } from 'primereact/tabview';
import Loading from "../../Loading";
import { useStateContext } from "../../../contexts/ContextProvider";

function NewMovie() {
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
    const [episodes, setEpisodes] = useState(null);
    const [nameServer, setNameServer] = useState("");
    const [searchParams, ] = useSearchParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPoster, setSelectedPoster] = useState(null);
    const {toast} = useStateContext();
    const router = useNavigate();
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        const source = searchParams.get('api');
        if(source){
            if(source == "NGUONC"){
                const data = JSON.parse(sessionStorage.getItem('apimovie'));
                if(!data){
                    router("/not-found")
                }
                const movie = data.movie;
                setName(movie.name)
                setOthername(movie.original_name);
                setQuality(movie.quality);
                setEpisode(movie.current_episode);
                setCasts(movie.casts);
                setTime(movie.time);
                setDescription(movie.description);
                const { id, ...objectWithoutId } = movie.category["1"].list[0];
                setType(objectWithoutId);
                setStatus(movie.category["1"].list[1] ? movie.category["1"].list[1].name : "");
                setCountry(movie.category["4"] ? movie.category["4"].list[0].name : "");
                setYear(movie.category["3"] ? movie.category["3"].list[0].name : "");
                setImage(movie.thumb_url);
                setPoster(movie.poster_url);
                const category = movie.category["2"].list.map(function(item) {
                    return {"name" : item.name};
                });
                setSelectedCategories(category);
                setSecurity(true);
                setKeyword("xem phim " + movie.name+" vietsub nqtmovie, xem phim" + movie.original_name+" vietsub, xem phim "+ movie.name+" full hd, xem phim "+ movie.original_name+" hd");
                setEpisodes(movie.episodes[0].items);
                setNameServer("NGUONC");
            }else if(source == "OPHIM" || source == "KKPHIM"){
                const data = JSON.parse(sessionStorage.getItem('apimovie'));
                if(!data){
                    router("/not-found")
                }
                const movie = data.movie;
                setName(movie.name);
                setOthername(movie.origin_name);
                setQuality(movie.quality);
                setEpisode(movie.episode_current);
                const typeMovie = {name: movie.type == "series" ? "Phim bộ" : "Phim lẻ"};
                setType(typeMovie);
                const listcasts = movie.actor.join(', ');
                setCasts(listcasts);
                setTime(movie.time);
                setDescription(movie.content);
                setStatus(movie.status);
                setCountry(movie.country[0].name);
                setYear(movie.year);
                setImage(movie.thumb_url);
                setPoster(movie.poster_url);
                const category = movie.category.map(function(item) {
                    return {"name" : item.name};
                });
                setSelectedCategories(category);
                setSecurity(true);
                setKeyword("xem phim " + movie.name+" vietsub nqtmovie, xem phim" + movie.origin_name+" vietsub, xem phim "+ movie.name+" full hd, xem phim "+ movie.origin_name+" hd");
                setEpisodes(data.episodes[0].server_data);
                setNameServer(source);
            }
        }
        axiosClient.get("/categories/getAllCategories")
        .then((res) => {
            setCategories(res.data);
        })
    },[router, searchParams])
    if(!categories) return <Loading />

    const typeMovie = [
        {name: 'Phim bộ'},
        {name: 'Phim lẻ'},
        {name: 'Phim cấm'},
    ]
    const onSubmit = async (ev) => {
        ev.preventDefault();
        if(name == "" || !selectedCategories || !type){
            toast.current.show({severity:'warn', summary: 'Cảnh Báo', detail:'Không được để trống tên và thể loại phim.', life: 3000});
        }else{
            setLoading(true);
            await axiosClient.post("/movies/addMovie",{
                name, othername, 
                slug: SlugName(name),
                quality, year, episode,time,status,image,trailer,casts, 
                poster,security: security ? "True" : "False",
                type,description,country,keyword, 
                selectedCategories, episodes, 
                nameServer,
                selectedImage,
                selectedPoster
            },{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                toast.current.show({severity:'success', summary: 'Thành Công', detail: response.data, life: 3000});
                router(`/admin/edit-movie/${SlugName(name)}`)
            }).catch((err) => {
                toast.current.show({severity:'error', summary: 'Lỗi', detail: err.response.data.message, life: 5000});
                // Object.values(err.response.data.errors).forEach(errorArray => {
                //     errorArray.forEach(errorMessage => {
                //         toast.current.show({severity:'error', summary: 'Lỗi', detail: errorMessage, life: 5000});
                //     });
                // });
            })
            setLoading(false);
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(file);
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
    };
    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedPoster(file);
            setPoster(reader.result);
          };
          reader.readAsDataURL(file);
        }
    };
    return (  
        <div className={styles.container}>
            <Helmet>
                <title>{`New Movie - ${import.meta.env.VITE_BASE_NAME}`}</title>
                <meta property="og:title" content={`New Movie - ${import.meta.env.VITE_BASE_NAME}`} />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className={styles.titleContainer}>
                <h2>Thêm Phim Mới</h2>
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
                        <div className="d-flex justify-content-center">
                            <div className={styles.imageBackground} style={{backgroundImage: `url(${image})`}}></div>
                        </div>
                        <div className="mt-3 d-flex flex-column gap-2">
                        <TabView className="w-100 p-0 m-0">
                            <TabPanel className="w-100" header="Url">
                                <InputText className="w-100" value={image} placeholder="Url Ảnh" onChange={(e) => setImage(e.target.value)} />
                                <InputText className="w-100 mt-3" value={poster} placeholder="Url Poster" onChange={(e) => setPoster(e.target.value)} />
                            </TabPanel>
                            <TabPanel className="w-100" header="Import File">
                                <div>
                                    <label htmlFor="image">Image</label>
                                    <input id="image" type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} className={styles.inputfile} />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="poster">Poster</label>
                                    <input id="poster" type="file" accept=".png, .jpg, .jpeg" className={styles.inputfile}  onChange={handlePosterChange} />
                                </div>
                            </TabPanel>
                        </TabView>
                            
                            
                        </div>
                        <div className="mt-5 d-flex justify-content-end">
                            <Button icon="bi bi-check" loading={loading} className="text-white" label="Thêm Phim" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewMovie;