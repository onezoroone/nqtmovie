import { useEffect, useRef, useState } from "react";
import unidecode from "unidecode";
import { Helmet } from 'react-helmet';
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import Loading from "../../components/Loading";
import Footer from "../../components/Movie/Footer";
import SuggestSlide from "../../components/Movie/SuggestSlide";
import BoxChat from '../../components/BoxChat';
import { useNavigate } from "react-router-dom";
function ViewMovie() {
    const [data, setData] = useState(null);
    const {idUser, setNotification} = useStateContext();
    const [currentEpisode, setCurrentEpisode] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [checkType, setCheckType] = useState(false);
    const isApiSent = useRef(false);
    const [watchedEpisodes, setWatchedEpisodes] = useState([]);
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    useEffect(() => {
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        const storedEpisodes = JSON.parse(localStorage.getItem('watchedEpisodes'));
        if (storedEpisodes) {
        setWatchedEpisodes(storedEpisodes);
        }
        if(idUser != null){
            const fetchData = async () => {
                axiosClient.get(`/viewmovie/${id}/${idUser}`)
                .then(({data}) => {
                    setData(data);
                    if(!isApiSent.current){
                        axiosClient.get(`/upView/${data.MDetails[0].id}`);
                        isApiSent.current = true;
                    }
                    if (data.MDetails[0].type == 'Phim bộ') {
                        setCheckType(true)
                        setCurrentEpisode(data.MDetails[0].ep_number);
                        const pageCurrent = Math.ceil(currentEpisode / 50 ) - 1;
                        setCurrentPage(pageCurrent)
                    }
                })
                .catch(err => {
                    const response = err.response;
                    if(response && response.status === 422){
                        setNotification(response.data.message, 'text-bg-danger', 'bi-exclamation-triangle');
                        navigate('/');
                    }
                })
            };
            fetchData();
        }else{
            const fetchData = async () => {
                await axiosClient.get(`/viewmovie/${id}`)
                .then(({data}) => {
                    setData(data);
                    if(!isApiSent.current){
                        axiosClient.get(`/upView/${data.MDetails[0].id}`);
                        isApiSent.current = true;
                    }
                    if (data.MDetails[0].type == 'Phim bộ') {
                        setCheckType(true);
                        setCurrentEpisode(data.MDetails[0].ep_number);
                        const pageCurrent = Math.ceil(currentEpisode / 50 ) - 1;
                        setCurrentPage(pageCurrent)
                    }
                })
                .catch(err => {
                    const response = err.response;
                    if(response && response.status === 422){
                        setNotification(response.data.message, 'text-bg-danger', 'bi-exclamation-triangle');
                        navigate('/');
                    }
                })
            };
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentEpisode, idUser])
    if (!data) {
        return <Loading></Loading>;
    }
    const {MDetails, categories, suggestMovie, epsmovie, totalEpisodes, totalPages} = data;
    const handleEpisodeButtonClick = (index) => {
        setCurrentPage(index);
    };
    const handleChangeEp = (name, id, number, idEp) => {
        if (!watchedEpisodes.includes(idEp)) {
            const newWatchedEpisodes = [...watchedEpisodes, idEp];
            setWatchedEpisodes(newWatchedEpisodes);
            localStorage.setItem('watchedEpisodes', JSON.stringify(newWatchedEpisodes));
        }
        setCurrentEpisode(number);
        navigate(`/movie/${unidecode(name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${id}/tap-${number}/${idEp}`);
    }
    const renderTabEp = () => {
        const episodeButtons = [];
        if(checkType){
            if(totalEpisodes > 10){
                for(let i = 0; i< totalPages; i++){
                    const startEpisode = (i * 50) + 1;
                    const endEpisode = Math.min((i + 1) * 50, totalEpisodes);
                    const isActive = currentPage === i;
                    episodeButtons.push(
                        <li className="nav-item" role="presentation" key={i}>
                            <button className={`nav-link ${ isActive ? 'active' : '' } text-white`}
                            id={`pills-${i}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${i}`}
                            type="button" role="tab" aria-controls={`pills-${i}`}
                            aria-selected={i === 0 ? 'true' : 'false'}
                            onClick={() => handleEpisodeButtonClick(i )}>{ startEpisode }-{ endEpisode }
                            </button>
                        </li>
                    );
                }
            }else{
                const startEpisode = epsmovie[0].ep_number;
                const endEpisode = epsmovie[epsmovie.length - 1].ep_number;
                episodeButtons.push(
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link active text-white`}
                        data-bs-toggle="pill"
                        type="button" role="tab"
                        >{ startEpisode }-{ endEpisode }
                        </button>
                    </li>
                )
            }
        }else{
            episodeButtons.push(
                <li className="nav-item" role="presentation">
                    <button className={`nav-link active text-white`} data-bs-toggle="pill" type="button" role="tab"aria-selected='true'>
                        Movie
                    </button>
                </li>
            )
        }
        return episodeButtons;
    }
      const renderEpisodes = () => {
        const episodes = [];
        if(checkType){
            if(totalEpisodes > 10){
                for (let i = 0; i < totalPages; i++) {
                    const startEpisode = (i * 50) + 1;
                    const endEpisode = Math.min((i + 1) * 50, totalEpisodes);
                    const episodeItems = [];
                    for (const ep of epsmovie.filter(ep => ep.ep_number >= startEpisode && ep.ep_number <= endEpisode)) {
                      const isActive = currentEpisode === ep.ep_number;
                      episodeItems.push(
                        <div className={`episode-item ${isActive ? 'active' : ''}`} key={ep.episode_id}>
                          <div className="post-inner">
                            <div onClick={() => handleChangeEp(MDetails[0].name, MDetails[0].id, ep.ep_number, ep.episode_id)} style={{cursor:'pointer'}}>
                              <div className="post-media">
                                <img src={MDetails[0].poster} alt="" className="banner-episode" />
                                <span className="time">
                                  <i className="bi bi-play-circle" style={{ fontSize: '16px', marginRight: '5px' }}></i>{MDetails[0].time}
                                </span>
                              </div>
                              <div className="episodes-info">
                                <h6 className={`episode-number ${watchedEpisodes.includes(ep.episode_id) ? 'text-secondary' : 'text-white'}`}>
                                  Tập {ep.ep_number}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    episodes.push(
                      <div className={`tab-pane fade${currentPage === i ? ' show active' : ''}`} id={`pills-${i}`} role="tabpanel" aria-labelledby={`pills-${i}-tab`} key={i}>
                        <div className="list-episodes position-relative">
                          <div className="episodes-content">
                            {episodeItems}
                          </div>
                        </div>
                      </div>
                    );
                  }
            }else{
                const episodeItems = [];
                epsmovie.map((ep) => {
                    const isActive = currentEpisode === ep.ep_number;
                    episodeItems.push(
                        <div className={`episode-item ${isActive ? 'active' : ''}`} key={ep.episode_id}>
                          <div className="post-inner">
                            <div onClick={() => handleChangeEp(MDetails[0].name, MDetails[0].id, ep.ep_number, ep.episode_id)} style={{cursor:'pointer'}}>
                              <div className="post-media">
                                <img src={MDetails[0].poster} alt="" className="banner-episode" />
                                <span className="time">
                                  <i className="bi bi-play-circle" style={{ fontSize: '16px', marginRight: '5px' }}></i>{MDetails[0].time}
                                </span>
                              </div>
                              <div className="episodes-info">
                                <h6 className={`episode-number ${watchedEpisodes.includes(ep.episode_id) ? 'text-secondary' : 'text-white'}`}>
                                  Tập {ep.ep_number}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                })
                episodes.push(
                    <div className={`tab-pane fade show active`} role="tabpanel" >
                      <div className="list-episodes position-relative">
                        <div className="episodes-content">
                          {episodeItems}
                        </div>
                      </div>
                    </div>
                  );
            }
        }

        return episodes;
      };    return (
        <>
            <Helmet>
                <title>Tập {currentEpisode} {MDetails[0].name} ({MDetails[0].othername}) {MDetails[0].year} HD-VietSub</title>
                <meta name="description" content={`[Full] ${MDetails[0].name}: ${MDetails[0].othername}`}></meta>
                <meta name="keywords" content={`${MDetails[0].name}, ${MDetails[0].name} vietsub, ${MDetails[0].name} tap ${currentEpisode}`}></meta>
                <meta itemProp="name" content={`Tập ${currentEpisode} ${MDetails[0].name} (${MDetails[0].othername}) ${MDetails[0].year} HD-VietSub`}></meta>
                <meta itemProp="description" content={`[Full] ${MDetails[0].name}: ${MDetails[0].othername}`}></meta>
                <meta property="og:title" content={`Tập ${currentEpisode} ${MDetails[0].name} (${MDetails[0].othername}) ${MDetails[0].year} HD-VietSub`}></meta>
                <meta property="og:type" content="video.movie"></meta>
                <meta property="og:description" content={`[Full] ${MDetails[0].name}: ${MDetails[0].othername}`}></meta>
                <meta property="og:url" content={window.location}></meta>
            </Helmet>
            {MDetails.map((movie) => (
            <div className="container" key={movie.id}>
                <div style={{height:'50px'}}></div>
                <div className="row p-3">
                    <div className="col-xl-3">
                        <img className="rounded-4" src={movie.img} width="100%" height="100%" alt="" />
                    </div>
                    <div className="banner-content col-xl-9">
                        <a href={`/movie/${unidecode(movie.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${movie.id}`} className="detail-name text-white" style={{fontSize: '35px', fontWeight: '500'}}>{movie.name}</a>
                        <div className="details-info" style={{marginTop: '21px', marginBottom: '9px'}}>
                            <div className="rating-result">
                                    <span><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i>
                                    </span>
                            </div>
                            <div className="jws-imdb">8.2</div>
                            <div className="jws-view"><i className="bi bi-eye"></i> {movie.views} Views</div>
                        </div>
                        <div className="details-info2 mb-2 text-white">
                            <span className="video-years">{movie.year}</span> &nbsp;●&nbsp; <span className="video-time">{movie.time}</span>
                            <span className="video-badge">{movie.type}</span>
                        </div>
                        <div className="details-info2 mb-2 text-white">
                            <span>Chất Lượng: </span> <span>{movie.quality}</span>&nbsp;●&nbsp;
                            <span>Trạng Thái: </span> <span>{movie.status}</span>
                        </div>
                        <div className="details-category mb-2 text-white">
                            {categories.map((category) => (
                            <a key={category.id} href={`/search?category=${category.category}`}>{category.category},&nbsp;</a>
                            ))}
                        </div>
                        <div className="details-casts mb-2 text-white">
                            Diễn viên: {movie.actor}
                        </div>
                    </div>
                </div>
                <div className="episodes-top row mt-4" style={{marginBottom: '65px'}}>
                    <div className={`${active ? "iframe-container-active" : ""} col-xl-9`}>
                        <div className="video-container m-0" style={{position: 'relative', overflow: 'hidden', paddingBottom: '56.25%'}}>
                            <iframe src={movie.ep_link} width="100%" height="100%" frameBorder="0"
                                    scrolling="auto" style={{position: 'absolute', top: '0', left: '0'}} allowFullScreen>
                            </iframe>
                        </div>
                        <div className="d-flex justify-content-end mt-2">

                            {active && <div className="btn text-white p-1 rounded-3 btn-secondary" onClick={() => setActive(false)} style={{cursor:'pointer'}}>Thu nhỏ</div>}
                            {!active && <div className="btn text-white p-1 rounded-3 btn-secondary" onClick={() => setActive(true)} style={{cursor:'pointer'}}>Phóng to</div>}
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            {renderTabEp()}
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            {renderEpisodes()}
                        </div>
                        {!checkType && (
                            <div className="list-episodes position-relative" id="tab-movie">
                            <div className="episodes-content">
                                <div className="episode-item active">
                                    <div className="post-inner">
                                        <a>
                                            <div className="post-media" >
                                                <img src={movie.poster} className="banner-episode" alt=""/>
                                                <span className="time">
                                                    <i className="bi bi-play-circle" style={{fontSize: '16px', marginRight: '5px'}}></i>120:00
                                                </span>
                                            </div>
                                            <div className="episodes-info">
                                                <h6 className="episode-number text-white">
                                                    MOVIE
                                                </h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                        }
                    </div>
                </div>
            </div>
        ))}
        <BoxChat></BoxChat>
        <div className="mt-5">
            <SuggestSlide suggestMovie={suggestMovie}></SuggestSlide>
        </div>
        <Footer></Footer>
        </>
    );
}

export default ViewMovie;
