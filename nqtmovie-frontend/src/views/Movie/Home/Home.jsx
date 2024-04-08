import { Link } from "react-router-dom";
import styles from "./home.module.css";
import MainCarousel from "../../../components/MainCarousel/MainCarousel";
import {Helmet} from "react-helmet";
import RankingLayout from "../../../components/RankingLayout/RankingLayout";
import CarouselTemplate from "../../../components/Carousel/CarouselTemplate";
import { getData } from "../../../libs/data";
import Loading from "../../Loading";
function Home() {
    const {data, isLoading, isError} = getData();
    if(isError) return <div>Lỗi</div>
    if(isLoading) return <Loading />
    return (
        <div>
            <Helmet>
                <title>{`Xem Phim Vietsub Online - ${import.meta.env.VITE_BASE_NAME}`}</title>
                <meta property="og:title" content={`Xem Phim Vietsub Online - ${import.meta.env.VITE_BASE_NAME}`} />
                <meta property="og:description" content="Xem phim vietsub online xem trên điện thoại di động và máy tính nhanh nhất. Là một website xem phim anime vietsub miễn phí tốt nhất. Liên tục cập nhật các bộ phim sớm nhất." />
                <meta name="description" content="Xem phim vietsub online xem trên điện thoại di động và máy tính nhanh nhất. Là một website xem phim anime vietsub miễn phí tốt nhất. Liên tục cập nhật các bộ phim sớm nhất." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={import.meta.env.VITE_BASE_URL} />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="keywords" content="xem phim, anime, animetv, animehay, phim hay, anime vietsub, phim vietsub, vietsub online, phim vietsub online, xem anime, phim hd, xem phim full hd, phim moi nhat, phim anime, hoat hinh, nqtmovie, nqt movie" />
                <meta property="og:image" content="/brand.png" />
            </Helmet>
            <MainCarousel movie={data.banners} />
            <div className="d-flex align-items-center flex-column">
                <div className={styles.container}>
                    <RankingLayout daily={data.daily} monthly={data.monthly} weekly={data.weekly} />
                </div>
                <div className={styles.morecontainer}>
                    <Link to="/tim-kiem" className={styles.btnmore}><i className="bi bi-plus"></i>XEM THÊM</Link>
                </div>
                <section className={styles.sectioncontainer}>
                    <div className={styles.container}>
                        <h2 className="mb-4">
                            Phim mới cập nhật
                        </h2>
                        <CarouselTemplate title="Hãy Đón Xem Những Bộ Phim Mới Nhất!" movie={data.updatedMovies} time={true} />
                    </div>
                </section>
                <section className={`${styles.container} mt-4`}>
                    <h2 className="mb-4">Phim Bộ Mới</h2>
                    <div className={styles.listmovie}>
                    {data.seriesmovies.map((item) => (
                        <div key={item.id} className={styles.animation}>
                            <Link to={item.slug}>
                                <img loading="lazy" className={styles.imgList} src={item.img} title={item.name} alt={item.name} />
                                <div className={styles.hover}>
                                    <i className="fs-1 bi bi-play-circle"></i>
                                </div>
                            </Link>
                            <div className={`${styles.detailsmovie} p-0`}>
                                <div className={styles.episode}>
                                    {item.episode}
                                </div>
                                <p className="fs-6">{item.year}</p>
                                <Link to={item.slug}><h6>{item.name}</h6></Link>
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
                <div className={`${styles.morecontainer} mt-5`}>
                    <Link to="/tim-kiem?type=Phim+bộ" className={styles.btnmore}><i className="bi bi-plus"></i>XEM THÊM</Link>
                </div>
                <section className={`${styles.sectioncontainer} mt-5`}>
                    <div className={styles.container}>
                        <h2 className="mb-4">Phim Lẻ Mới</h2>
                        <div className={styles.listmovie}>
                        {data.singlemovies.map((item) => (
                            <div key={item.id} className={styles.animation}>
                                <Link to={item.slug}>
                                    <img loading="lazy" className={styles.imgList} src={item.img} title={item.name} alt={item.name} />
                                    <div className={styles.hover}>
                                        <i className="fs-1 bi bi-play-circle"></i>
                                    </div>
                                </Link>
                                <div className={`${styles.detailsmovie} p-0`}>
                                    <div className={styles.episode}>
                                        {item.episode}
                                    </div>
                                    <p className="fs-6">{item.year}</p>
                                    <Link to={item.slug}><h6>{item.name}</h6></Link>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className={`${styles.morecontainer} mt-5`}>
                        <Link to="/tim-kiem?type=Phim+lẻ" className={styles.btnmore}><i className="bi bi-plus"></i>XEM THÊM</Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;