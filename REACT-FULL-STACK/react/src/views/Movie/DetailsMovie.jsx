import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Footer from "../../components/Movie/Footer";
import SuggestSlide from "../../components/Movie/SuggestSlide";
import { Helmet } from 'react-helmet';
import Pusher from "pusher-js";
import BoxChat from '../../components/BoxChat';
function DetailsMovie() {
    const [data, setData] = useState(null);
    const {idUser, setNotification} = useStateContext();
    const [id, setId] = useState(null);
    const navi = useNavigate();
    useEffect(() => {
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        setId(id);
        if(idUser != null){
            const fetchData = async () => {
                await axiosClient.post(`/detailsmovie/${id}/${idUser}`)
                .then(({data}) => {
                    setData(data);
                })
                .catch(err => {
                    const response = err.response;
                    if(response && response.status === 422){
                        setNotification(response.data.message, 'text-bg-danger', 'bi-exclamation-triangle');
                        navi('/');
                    }
                })
            };
                fetchData();
        }else{
            const fetchData = async () => {
                await axiosClient.post(`/detailsmovie/${id}`)
                .then(({data}) =>{
                    setData(data);
                })
                .catch(err => {
                    const response = err.response;
                    if(response && response.status === 422){
                        setNotification(response.data.message, 'text-bg-danger', 'bi-exclamation-triangle');
                        navi('/');
                    }
                })
            };
                fetchData();
        }
        Pusher.logToConsole = false;
        const pusher = new Pusher('965865056288a2556707', {
            cluster: 'ap1'
        });
        const channel = pusher.subscribe('NQTMOVIE');
        channel.bind('chat', function () {
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idUser])
    if (!data) {
        return <Loading></Loading>;
    }
    const {details, categories, epsmovie, firstep, suggestMovie, checkFavo, history} = data;
    let youtubeIframe = document.getElementById("youtubeIframe");
    const handeWatchTrailer = () => {
        const youtubeOverlay = document.getElementById("youtubeOverlay");
        youtubeIframe.src = 'https://www.youtube.com/embed/'+ details[0].trailer;
        youtubeOverlay.style.display = "block";
    }
    const handleCloseTrailer = () => {
        const youtubeOverlay = document.getElementById("youtubeOverlay");
        youtubeOverlay.style.display = "none";
        youtubeIframe.src = "";
    }
    const handleShowToast = () => {
        if(idUser){
            axiosClient.get(`/addFavo/${id}/${idUser}`)
            .then(response => {
                if(response.data == 'existed'){
                    setNotification('Phim đã có trong danh sách xem sau', 'text-bg-danger', 'bi-exclamation-triangle-fill')
                }else{
                    setNotification('Thêm phim vào danh sách xem sau thành công', 'text-bg-success', 'bi-check-circle-fill')
                }
            })
        }else{
            setNotification('Vui lòng đăng nhập', 'text-bg-warning', 'bi-exclamation-triangle-fill')
        }
    }
    const handleUpView = () => {
        axiosClient.get(`/upView/${id}`)
    }
    return (
        <>
            {data && (
                <>
            <Helmet>
                <title>Xem Phim {data.details[0].name} Trọn bộ</title>
                <meta property="og:title" content={`${data.details[0].name} Trọn bộ`} />
                <meta name="description" content={`[Full] ${data.details[0].name}: ${data.details[0].othername}`} />
                <meta name="keywords" content={`xem phim ${data.details[0].name}, ${data.details[0].name}, xem phim ${data.details[0].othername}, ${data.details[0].othername}`} />
                <meta itemProp="name" content={`${data.details[0].name} Trọn bộ`}></meta>
                <meta itemProp="description" content={`[Full] ${data.details[0].name}: ${data.details[0].othername}`} />
                <meta property="og:type" content="video.movie"/>
                <meta property="og:url" content={`${window.location}`}></meta>
                <meta property="og:description" content={`[Full] ${data.details[0].name}: ${data.details[0].othername}`}></meta>
            </Helmet>
            <div className="banner" style={{ backgroundImage: `url(${details[0].poster})` }}>
                <div className="banner-inner d-flex m-0 position-relative" style={{marginLeft: '20px', maxWidth: '1300px'}}>
                   <div className="detail-img">
                       <img src={details[0].img} className="d-block image-detail" id="image-detail" alt="..." />
                   </div>
                    <div className="banner-content" >
                        <h1 className="detail-name text-white">{details[0].name}</h1>
                        <h2 className="detail-name text-white">{details[0].othername}</h2>
                        <div className="details-info">
                            <div className="rating-result">
                                <span><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i>
                                </span>
                            </div>
                            <div className="jws-imdb">8.2</div>
                            <div className="jws-view"><i className="bi bi-eye"></i> {details[0].views} Views</div>
                        </div>
                        <div className="details-info2 mb-2 text-white">
                            <span className="video-years">{details[0].year}</span> &nbsp;●&nbsp; <span className="video-time">{details[0].time}</span>
                            <span className="video-badge">{details[0].type}</span>
                        </div>&nbsp;●&nbsp;
                        <div className="details-info2 mb-2 text-white">
                            <span>Chất Lượng: </span> <span>{details[0].quality}</span>&nbsp;●&nbsp;
                            <span>Trạng Thái: </span> <span>{details[0].status}</span>
                        </div>
                        <div className="details-category mb-2 text-white">
                            {categories.map((category) => (
                                <a href={`/search?category=${category.category}`} key={category.id}>{category.category}, </a>
                                ))}
                        </div>
                        <div className="details-tool mb-4">
                            <div className="details-likes">
                                <a href="#" className="like-button" data-type="movies" data-post-id="9053">
                                    <i className="bi bi-hand-thumbs-up fs-6" style={{marginRight: '3px'}}></i>
                                    <span className="likes-count">6</span> <span>likes</span>
                                </a>
                            </div>
                            <div className="details-share">
                                <a href="#" data-modal-jws="#share-videos">
                                    <i className="bi bi-share-fill fs-6" style={{marginRight: '3px'}}></i>
                                    <span>Share</span>
                                </a>
                            </div>
                            <div className="details-watchlist">
                                {idUser ? (
                                    checkFavo > 0 ? (
                                        <a className="watchlist-add showToastBtn" onClick={handleShowToast}>
                                        <i className="bi bi-plus fs-6" style={{ marginRight: '2px' }}></i>
                                        <span>Watchlist</span>
                                        </a>
                                    ) : (
                                        <a className="watchlist-add showToastBtn" onClick={handleShowToast}>
                                        <i className="bi bi-plus fs-6" style={{ marginRight: '2px' }}></i>
                                        <span>Watchlist</span>
                                        </a>
                                    )
                                    ) : (
                                    <a className="watchlist-add showToastBtn" onClick={handleShowToast}>
                                        <i className="bi bi-plus fs-6" style={{ marginRight: '2px' }}></i>
                                        <span>Watchlist</span>
                                    </a>
                                )}
                            </div>
                            <div className="toast-container position-fixed top-0 end-0 p-3">
                                <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                    <div className="toast-header text-white" style={{background: "#9e61ff"}}>
                                        <strong className="me-auto">Thông báo</strong>
                                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                    </div>
                                    <div className="toast-body" >
                                        Bạn chưa đăng nhập !
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="details-description text-white">
                            <div className="js-content">
                                <p>{details[0].des}</p>
                            </div>
                        </div>
                        <div className="details-description text-white">
                            <div className="js-content">
                                Diễn viên: <p>{details[0].actor && details[0].actor}</p>
                            </div>
                        </div>
                        <div className="video-play d-flex gap-2 clear-both mb-2">
                            {epsmovie.length > 0 && (firstep.map((epf) => (
                            <Link key={epf.episode_id} to={`tap-${epf.ep_number}/${epf.episode_id}`} onClick={handleUpView} className="btn text-white btn-watch p-3 m-0 d-flex justify-content-center align-content-center">
                                Xem Ngay
                                <span className="" style={{marginLeft: '5px'}}><i className="fs-6 bi bi-play-circle"></i></span>
                            </Link>
                            )))}
                            {history && (
                            <Link to={`tap-${history.ep_number}/${history.idEpisode}`} onClick={handleUpView} className="btn text-white btn-primary p-3 m-0 d-flex justify-content-center align-content-center" style={{marginLeft:'15px'}}>
                                Xem Tiếp
                                <span className="" style={{marginLeft: '5px'}}><i className="fs-6 bi bi-play-circle"></i></span>
                            </Link>
                            )}
                            <a className="btn text-white p-3 d-flex btn-trailer m-0 justify-content-center align-items-center" id="btn-trailer" onClick={handeWatchTrailer}>
                                Trailer
                                <span className="" style={{marginLeft: '5px'}}><i className="fs-6 bi bi-play-circle"></i></span>
                            </a>
                        </div>
                        <div id="youtubeOverlay">
                            <div id="youtubePlayer">
                                <button id="closeButton" onClick={handleCloseTrailer}>&times;</button>
                                <iframe id="youtubeIframe" width="900" height="500" src="" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>
                        </div>
                        <div className="list-ep mt-3">
                        {epsmovie.length > 0 && (
                        <>
                            <h4 className="text-white mb-4">Tập Mới Nhất</h4>
                            {epsmovie.map((ep) => (
                                <Link to={`tap-${ep.ep_number}/${ep.episode_id}`} key={ep.episode_id} style={{marginLeft: '10px'}} onClick={handleUpView} className="p-3 episode-box">{ep.ep_number}</Link>
                            ))}
                        </>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            <BoxChat></BoxChat>
            <SuggestSlide suggestMovie={suggestMovie}></SuggestSlide>
            <Footer></Footer>
                </>
            )}
        </>
    );
}

export default DetailsMovie;
