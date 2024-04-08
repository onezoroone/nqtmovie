/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import CarouselTemplate from "../../../components/Carousel/CarouselTemplate";
import styles from "./detail.module.css";
import Description from "../../../components/Description/Description";
import { Helmet } from "react-helmet";
import NotFound from "../../NotFound";
import Loading from "../../Loading";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
function Details() {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const navi = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            await axiosClient.get(`/movie/getMovie/${slug}`)
            .then((res) => {
                setData(res.data);
            }).catch(() => {
                navi("/not-found");
            })
        }
        fetch();
        window.scrollTo(0, 0);
    },[slug])
    if (!data) return <Loading />
    if (data.status == "error") return <NotFound message={data.message} />
    const breadcrumb = data.categories.map(category => ({
        name: category.name,
        link: `/tim-kiem?category=${category.name}`
    }));
    breadcrumb.unshift({
        name: 'Trang Chủ',
        link: '/'
    });
    breadcrumb.push({
        name: data.movie.name,
        link: '/'+ data.movie.slug
    });
    return ( 
        <>
            <Helmet>
                <title>{`${data.movie.name + " [HD Vietsub] - " + data.movie.othername}`}</title>
                <meta property="og:title" content={`${data.movie.name + " [HD Vietsub] - " + data.movie.othername}`} />
                <meta name="description" content={data.movie.des} />
                <meta property="og:description" content={data.movie.des} />
                <meta property="og:type" content="article" />
                <meta name="robots" content="index,follow" />
                <meta name="keywords" content={`${data.movie.keyword}, nqtmovie, phimmoi, nqt movie`} />
                <meta property="og:image" content={data.movie.img} />
                <meta property="og:url" content={`${import.meta.env.VITE_BASE_URL}/${data.movie.slug}`} />
            </Helmet>
            <div className="w-100 d-flex flex-column align-items-center">
            <div className={styles.container}>
                <BreadCrumb data={breadcrumb} />
                <div className={styles.background} style={{backgroundImage: `url(${data.movie.poster})`}}>
                </div>
                <div className="row p-0 m-0">
                    <div className="col-lg-3 d-flex justify-content-center">
                        <img className={styles.image} src={data.movie.img} alt={data.movie.name} />
                    </div>
                    <div className="col-lg-9 mt-3">
                        <h1 className={styles.title}>{data.movie.name}</h1>
                        <h2 className={styles.othername} style={{fontSize:'calc(1.3rem + .6vw)'}}>{data.movie.othername}</h2>
                        <Description average={data.averageRating} count={data.numReviews} history={data.history} movie={data.movie} episodes={data.episodes} />
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <h2 className={styles.suggesttitle}>Có Thể Bạn Sẽ Thích</h2>
                <div className="mt-3">
                    <CarouselTemplate movie={data.related} title="Có Thể Bạn Sẽ Thích" />
                </div>
            </div>
        </div>
        </>
    );
}

export default Details;