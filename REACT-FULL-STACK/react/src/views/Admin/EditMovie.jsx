import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useStateContext } from "../../contexts/ContextProvider";
import Loading from "../../components/Loading";
const animatedComponents = makeAnimated();
function AddMovie() {
    const [data, setData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPoster, setSelectedPoster] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewPoster, setPreviewPoster] = useState(null);
    const [name, setName] = useState('');
    const [otherName, setOtherName] = useState('');
    const [categories, setCategories] = useState([]);
    const [des, setDes] = useState('');
    const [year, setYear] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [quality, setQuality] = useState('');
    const [time, setTime] = useState('');
    const [episode, setEpisode] = useState('');
    const [trailer, setTrailer] = useState('');
    const [actor, setActor] = useState('');
    const [idMovie, setIdMovie] = useState(null);
    const {setNotification} = useStateContext();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        document.title = "Edit Movie"
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        setIdMovie(id)
        const fetchData =  async () => {
            try{
                const response = await axiosClient.post(`/getDetailMovie/${id}`)
                    setData(response.data)
                    setName(response.data.movie[0].name)
                    setOtherName(response.data.movie[0].othername)
                    setDes(response.data.movie[0].des)
                    setYear(response.data.movie[0].year)
                    setStatus(response.data.movie[0].status)
                    setType({value: response.data.movie[0].type , label: response.data.movie[0].type })
                    setQuality({value: response.data.movie[0].quality, label: response.data.movie[0].quality})
                    setTime(response.data.movie[0].time)
                    setEpisode(response.data.movie[0].episode)
                    setTrailer(response.data.movie[0].trailer)
                    setActor(response.data.movie[0].actor)
                    const array = [];
                    for(let i =0; i<response.data.cateMovies.length; i++){
                        array.push(
                            { value: `${response.data.cateMovies[i].id_cate}`, label: `${response.data.cateMovies[i].category}`}
                        )
                    }
                    setCategories(array)
            }catch(error){
                console.log(error)
            }
        };
        fetchData();
    },[])

    if(!data){
        return <Loading></Loading>
    }
    const {movie, Allcategories} = data;
    const options = []
    if(data){
        for(let i = 0; i< Allcategories.length; i++){
            options.push(
                { value: `${Allcategories[i].id}`, label: `${Allcategories[i].category}`}
            )
        }

    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(file);
            setPreviewImage(reader.result);
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
            setPreviewPoster(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      const onSubmit = (ev) => {
        ev.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('othername', otherName);
        formData.append('des', des);
        formData.append('quality', JSON.stringify(quality));
        formData.append('time', time);
        formData.append('categories', JSON.stringify(categories));
        formData.append('type', JSON.stringify(type));
        formData.append('status', status);
        formData.append('year', year);
        formData.append('trailer', trailer);
        formData.append('actor', actor);
        formData.append('episode', episode);
        formData.append('form__img-upload', selectedImage);
        formData.append('form__pos-upload', selectedPoster);
        axiosClient.post(`/updateMovie/${idMovie}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setIsLoading(false);
            if(response.data == 'success'){
                setNotification('Movie Updated', 'text-bg-success', 'bi-patch-check-fill')
            }else{
                setNotification(`The movie exsited`, 'text-bg-danger', 'bi-exclamation-triangle')
            }
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card" style={{backgroundImage: `url(${previewPoster ? previewPoster : `${movie[0].poster}`})`,backgroundSize: 'cover', backgroundPosition: 'center'}}>

                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Thêm phim mới</h4>
                            </div>
                            <label className="btn btn-primary" htmlFor="form__pos-upload">
                                <span>Thêm Poster</span>
                            </label>
                            <input type="file" className="d-none" onChange={handlePosterChange} name="form__pos-upload" id="form__pos-upload" accept=".png, .jpg, .jpeg" />
                        </div>
                        <div className="iq-card-body">
                            <form onSubmit={onSubmit}>
                                <div className="row">
                                    <div className="col-lg-10">
                                        <div className="row">
                                            <div className="col-12 form-group input-group-lg mb-2">
                                                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} disabled={isLoading} className="form-control" name="name" placeholder="Tên phim" required />
                                            </div>
                                            <div className="col-12 form-group mb-2">
                                                <input type="text" value={otherName} onChange={(e)=>{setOtherName(e.target.value)}} disabled={isLoading} className="form-control" name="othername" placeholder="Tên khác"/>
                                            </div>
                                            <div className="col-md-9 form-group mb-2">
                                            <Select
                                                    closeMenuOnSelect={false}
                                                    components={animatedComponents}
                                                    placeholder={`Chọn thể loại `}
                                                    defaultValue={categories}
                                                    isMulti
                                                    options={options}
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    onChange={(categories) => { setCategories(categories)}}
                                                    value={categories}
                                                    required
                                                    disabled={isLoading}
                                                    />
                                            </div>
                                            <div className="col-md-3 form-group mb-2">
                                                    <Select
                                                    placeholder={`Chọn chất lượng`}
                                                    defaultValue={quality}
                                                    options={[{value: 'Full HD', label: 'Full HD'},{value: 'HD', label: 'HD'}]}
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    onChange={(quality)=> setQuality(quality)}
                                                    value={quality}
                                                    required
                                                    disabled={isLoading}
                                                    />
                                            </div>
                                            <div className="col-12 form-group mb-2">
                                                <textarea name="" id="" defaultValue={des} className="w-100" style={{background:'#141414', border:'none', color:'#fff'}} rows="5"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="d-block position-relative">
                                            <div className="form__img form-control">
                                                <label htmlFor="form__img-upload" style={{backgroundImage: `url(${previewImage ? previewImage : `${movie[0].img}`})`}}>
                                                    <span>Chọn ảnh</span>
                                                </label>
                                                <input id="form__img-upload" name="form__img-upload" type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} disabled={isLoading}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-sm-2 form-group mb-2">
                                        <input type="text" value={year} onChange={(e)=>{setYear(e.target.value)}} name="year" disabled={isLoading} className="form-control" placeholder="Năm sản xuất" />
                                    </div>
                                    <div className="col-sm-2 form-group mb-2">
                                        <input type="text" value={episode} onChange={(e)=>{setEpisode(e.target.value)}} name="episode" disabled={isLoading} className="form-control" placeholder="Tập phim" />
                                    </div>
                                    <div className="col-sm-2 form-group mb-2">
                                        <input type="text" value={time} onChange={(e)=>{setTime(e.target.value)}} name="time" className="form-control" disabled={isLoading} placeholder="Thời lượng" />
                                    </div>
                                    <div className="col-sm-6 form-group mb-2">
                                        <input type="text" value={trailer} onChange={(e)=>{setTrailer(e.target.value)}} name="trailer" disabled={isLoading} className="form-control" placeholder="Trailer" />
                                    </div>
                                    <div className="col-sm-8 form-group mb-2">
                                        <input type="text" value={actor} onChange={(e)=>{setActor(e.target.value)}} name="actor" disabled={isLoading} className="form-control" placeholder="Đạo diễn" />
                                    </div>
                                    <div className="col-sm-2 form-group mb-2">
                                        <Select
                                        placeholder={`Chọn loại phim`}
                                        defaultValue={type}
                                        options={[{value: 'Phim bộ', label: 'Phim bộ'},{value: 'Phim lẻ', label: 'Phim lẻ'}]}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        value={type}
                                        onChange={(type)=>{setType(type)}}
                                        required
                                        disabled={isLoading}
                                        />
                                    </div>
                                    <div className="col-sm-2 form-group mb-2">
                                        <input type="text" value={status} onChange={(e)=>{setStatus(e.target.value)}} className="form-control" name="status" placeholder="Trạng thái" disabled={isLoading} />
                                    </div>
                                    <div className="col-12 form-group">
                                            {isLoading ? (
                                            <button type="submit" className="btn btn-primary" disabled style={{position:'relative'}}>
                                                    <span className="loader"></span><span style={{color: 'transparent'}}>Update</span>
                                            </button>
                                            ) : (
                                            <button type="submit" className={`btn btn-primary`}>Update</button>
                                            )}
                                        <Link to={`/admin/movie/edit/episodes/${idMovie}`} className="btn btn-success" style={{marginLeft: '10px'}}>Episodes</Link>
                                        <Link to="/admin/movies" className="btn btn-danger" style={{marginLeft: '10px'}}>Close</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMovie;
