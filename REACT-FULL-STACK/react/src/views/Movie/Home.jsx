/* eslint-disable react/prop-types */
import Banner from '../../components/Movie/Banner';
import SlideMovie from '../../components/Movie/SlideMovie';
import RankingLayout from '../../components/Movie/RankingLayout';
import ListMovie from '../../components/Movie/ListMovie';
import { useStateContext } from '../../contexts/ContextProvider';
import Footer from '../../components/Movie/Footer';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom';
import BoxChat from '../../components/BoxChat';

function Home(){
    const {data, user} = useStateContext();
    const {first, categoriesf, TMovies, categories, UMovies, ArrayUpdated, LMovies, DayLists, WeekLists, MonthLists } = data;
    const [showBanner, setShowBanner] = useState(true);
    const [banner, setBanner] = useState(null);
    const [privates, setPrivates] = useState([]);
    useEffect(() => {
        const isBannerClosed = sessionStorage.getItem('isBannerClosed');
        if (isBannerClosed) {
            setShowBanner(false);
        }
        const userJSON = JSON.parse(user);
        if(userJSON && userJSON.permission == "admin"){
            axiosClient.post('/getMoviesPrivate')
            .then(({data}) => setPrivates(data))
        }
        axiosClient.post('/getbanners')
        .then((response) => setBanner(response.data[0].image))
    }, [user])
    const handleClose = () => {
        sessionStorage.setItem('isBannerClosed', 'true');
        setShowBanner(false)
    }
    return(
        <>
            <Helmet>
                <title>Anime Vietsub Online - NQTMOVIE.ID.VN</title>
                <meta name="title" content="Anime Vietsub Online - NQTMOVIE.ID.VN" />
                <meta property="og:title" content="Anime Vietsub Online - NQTMOVIE.ID.VN" />
                <meta name="description" content="Xem phim anime vietsub online xem trên điện thoại di động và máy tính nhanh nhất. Là một website xem phim anime vietsub miễn phí tốt nhất. Liên tục cập nhật các anime sớm nhất từ các fansub Việt Nam." />
                <meta name="keywords" content="anime, animetv, anime hay, anime vietsub, anime vietsub online, xem anime, anime tv, download anime vietsub, anime hd, tai anime, anime moi nhat, phim anime, hoat hinh nhat, anime tv, nqtmovie" />
                <meta property="og:type" content="website"></meta>
                <meta property="og:description" content="Xem phim anime vietsub online xem trên điện thoại di động và máy tính nhanh nhất. Là một website xem phim anime vietsub miễn phí tốt nhất. Liên tục cập nhật các anime sớm nhất từ các fansub Việt Nam."></meta>
                <meta property="og:url" content="https://nqtmovie.id.vn/"></meta>
                <meta property="og:site_name" content="nqtmovie.id.vn"></meta>
            </Helmet>
            {showBanner &&
            <div className='event' id="event">
                <div className='conatiner-event'>
                    <span id='closeButtonEvent' className='d-flex justify-content-end ' onClick={handleClose} style={{color: 'red', fontSize: '18px', cursor: 'pointer'}}>X</span>
                    {banner && <img src={banner} alt="Happy" className='h-100 w-100' />}
                </div>
            </div>}
            <Banner first={first} categoriesf={categoriesf} TMovies={TMovies} categories={categories}></Banner>
            <SlideMovie UMovies={UMovies} ArrayUpdated={ArrayUpdated}></SlideMovie>
            <div className="mt-5">
                <div className="m-1 title-ranking d-flex justify-content-between align-items-center">
                    <h4 className="d-inline-block text-white">Phim Nổi Bật</h4>
                    <div className="d-inline-block">
                        <ul className="nav nav-tab nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active text-white" id="pills-day-tab" data-bs-toggle="pill" data-bs-target="#pills-day" type="button" role="tab" aria-controls="pills-day" aria-selected="true"><h4>Hôm nay</h4></button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link text-white" id="pills-week-tab" data-bs-toggle="pill" data-bs-target="#pills-week" type="button" role="tab" aria-controls="pills-week" aria-selected="false"><h4>Tuần Này</h4></button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link text-white" id="pills-month-tab" data-bs-toggle="pill" data-bs-target="#pills-month" type="button" role="tab" aria-controls="pills-month" aria-selected="false"><h4>Tháng này</h4></button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="tab-content" id="pills-tabContent">
                    <div id="pills-day" className="tab-pane fade show active" role="tabpanel">
                        <RankingLayout ListRanking={DayLists}></RankingLayout>
                    </div>
                    <div id="pills-week" className="tab-pane fade" role="tabpanel">
                        <RankingLayout ListRanking={WeekLists}></RankingLayout>
                    </div>
                    <div id="pills-month" className="tab-pane fade" role="tabpanel">
                        <RankingLayout ListRanking={MonthLists}></RankingLayout>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <div className="row" style={{marginRight: '10'}}>
                    <h4 className="text-white col-6">Danh Sách Phim</h4>
                    <h4 className="text-white col-6 justify-content-end d-flex"><Link to="/viewall" className="viewall" style={{paddingRight: '20px'}}>Xem tất cả</Link></h4>
                </div>
                <ListMovie LMovies={LMovies}></ListMovie>
                {privates.length != 0 && <ListMovie LMovies={privates}></ListMovie>}
            </div>
            <BoxChat></BoxChat>
            <Footer></Footer>
        </>
    )
}

export default Home
