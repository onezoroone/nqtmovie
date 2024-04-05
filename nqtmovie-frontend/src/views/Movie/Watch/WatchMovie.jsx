/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import CarouselTemplate from "../../../components/Carousel/CarouselTemplate";
import styles from "./watch.module.css";
import IframeTemplate from "../../../components/IframeTemplate/IframeTemplate";
import { Helmet } from "react-helmet";
import NotFound from "../../NotFound";
import Loading from "../../Loading";
import { useEffect, useRef, useState } from "react";
import { Toast } from 'primereact/toast';
import axiosClient from "../../../axios-client";
import {Button} from "primereact/button";
import { Rating } from "primereact/rating";
function WatchMovie() {
    const {slug, episode} = useParams();
    const [rating, setRating] = useState("null");
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useRef();
    const [data, setData] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [newReviews, setNewReviews] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            setData(null);
            await axiosClient.get(`/movie/getEpisodeByMovie/${slug}/${episode}`)
            .then((res) => {
                setData(res.data);
                setReviews(res.data.reviews);
            })
        }
        fetch();
        window.scrollTo(0, 0);
    },[episode, slug])

    useEffect(() => {
        if(data){
            const getReviews = async () => {
                await axiosClient.get("/reviews/getReviewsByMovie/" + data.movie.id)
                .then((response) => {
                    setReviews(response.data.reviews);
                })
            }
            getReviews();
        }
    },[newReviews])
    if (!data) return <Loading />
    if(data.status == "error") return <NotFound message={data.message} />
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
        link: '/'+data.movie.slug
    });
    breadcrumb.push({
        name: `Tập ${data.currentEpisode[0].ep_number}`,
        link: '#'
    });

    const handleReview = async (e) => {
        e.preventDefault();
        if(review != "" && rating != "null"){
            setLoading(true);
            await axiosClient.post("/reviews/createReview",{
                idMovie : data.movie.id,
                rating,
                review
            }).then((res) => {
                toast.current.show({severity:'success', summary: 'Thành công', detail:res.data, life: 3000});
                setRating("null");
                setReview("");
                setNewReviews(!newReviews);
            }).catch((err) => {
                toast.current.show({severity:'error', summary: 'Lỗi', detail:err.response.data, life: 3000});
            })
            setLoading(false);
        }else{
            toast.current.show({severity:'error', summary: 'Lỗi', detail:'Vui lòng điền đẩy đủ thông tin.', life: 3000});
        }
    }
    return (
        <>
        <Toast ref={toast} />
        <Helmet>
            <title>{`Xem Phim ${data.movie.name + " Tập " + data.currentEpisode[0].ep_number} [HD Vietsub]`}</title>
            <meta property="og:title" content={`Xem Phim ${data.movie.name + " Tập " + data.currentEpisode[0].ep_number} [HD Vietsub]`} />
            <meta name="description" content={data.movie.des} />
            <meta property="og:description" content={data.movie.des} />
            <meta property="og:type" content="article" />
            <meta name="robots" content="index,follow" />
            <meta name="keywords" content={`xem phim ${data.movie.name} tập ${data.currentEpisode[0].ep_number}, ${data.movie.keyword}, nqtmovie, phimmoi, nqt movie`} />
            <meta property="og:image" content={data.movie.img} />
            <meta property="og:url" content={`${import.meta.env.VITE_BASE_URL}/${data.movie.slug}/${data.currentEpisode[0].slug}`} />
        </Helmet>
        <div className="w-100 d-flex flex-column align-items-center ">
            <div className={styles.container}>
                <BreadCrumb data={breadcrumb} />
                <div className="row p-0 m-0">
                    <IframeTemplate data={data} />
                </div>
               <div className={styles.MoreMovie}>
                    <h4 className={styles}>{data.movie.name}</h4>
                    <div>
                        {data.movie.year} <span>|</span> {data.movie.time} <span>|</span> {data.movie.type} <span>|</span> {data.movie.status}
                    </div>
               </div>
            </div>
            <div className="w-100 d-flex justify-content-center mt-4" style={{background: 'var(--bg-main)'}}>
                <div className={styles.container}>
                    <h2 className={styles.suggesttitle}>Có Thể Bạn Sẽ Thích</h2>
                    <div className="mt-3">
                        <CarouselTemplate movie={data.related} title="Có Thể Bạn Sẽ Thích" />
                    </div>
                </div>
            </div>
            <div className={`${styles.container} mt-3`}>
                <div className={styles.titleReviewsContainer}>
                    <h4 className={styles.titleReviews}><span>{data.movie.name}</span> <i>/</i> <b>Đánh Giá</b></h4>
                </div>
                <div className={styles.morereviews}>
                    <span>Để lại bình luận của bạn</span>
                </div>
                <div className={styles.reviewsContainer}>
                    <form className={styles.formReviews} onSubmit={handleReview}>
                        <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Viết Đánh giá..." />
                        <div className="d-flex flex-column">
                            <select value={rating} onChange={(e) => setRating(e.target.value)}>
                                <option value="null">Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <div className="flex-1 d-flex align-items-end justify-content-end">
                                <Button loading={loading} className={styles.btnSubmitReviews} type="submit">Gửi đánh giá</Button>
                            </div>
                        </div>
                    </form>
                    <div className={styles.bodyReviews}>
                        {(reviews && reviews.length != 0) ? reviews.map((item, index) => (
                        <div key={index} className="rounded-2 p-3" style={{background: '#0a0d14'}}>
                            <div className={styles.headbodyReviews}>
                                <i className="fs-1 bi bi-person-circle"></i>
                                <div className="d-flex flex-column">
                                    <div className="d-flex gap-2">
                                        <b>{item.name}</b><Rating value={item.rating} readOnly cancel={false} />
                                    </div>
                                    <span>{item.created_at}</span>
                                </div>
                            </div>
                            <div className={styles.contentBodyReviews}>
                                <p>
                                {item.review}
                                </p>
                            </div>
                        </div>
                        )) : (
                            <p className="text-white text-center">Không có đánh giá nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default WatchMovie;