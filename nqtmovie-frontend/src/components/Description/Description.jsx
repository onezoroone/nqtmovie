/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import styles from "./description.module.css";
import { Link } from "react-router-dom";
import { Rating } from 'primereact/rating';
import axiosClient from "../../axios-client";
import { Toast } from "primereact/toast";
function Description({movie, episodes, history, average, count}) {
    const [expanded, setExpanded] = useState(false);
    const toast = useRef(null);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleWatchList = async (id) => {
        await axiosClient.post("/movies/addWatchList",{
            idMovie: id
        })
        .then((res) => {
            if(res.data.status == "success"){
                toast.current.show({severity:'success', summary: 'Thành công', detail: res.data.message, life: 3000});
            }else{
                toast.current.show({severity:'warn', summary: 'Thất bại', detail: res.data.message, life: 3000});
            }
        }).catch((err) => {
            toast.current.show({severity:'error', summary: 'Lỗi', detail:err.response.data, life: 3000});
        })
    }

    return (  
        <div>
            <Toast ref={toast} />
            <div className={styles.description}>
                <div className="mb-3 d-flex align-items-center gap-3">
                    <div className="d-flex">
                        <Rating value={average} readOnly cancel={false} />
                        <span className="fs-5">/ {count} lượt đánh giá</span>
                    </div>
                    <div className="d-flex gap-1">
                        <i className="bi bi-eye-fill"></i>
                        <span>{movie.views} lượt xem</span>
                    </div>
                </div>
                <div className="mb-3 d-flex align-items-center gap-2">
                    {movie.year}
                    <span className={styles.dots}></span>
                    {movie.type}
                    <span className={styles.dots}></span>
                    {movie.time}
                    <span className={styles.dots}></span>
                    {movie.quality}
                </div>
                <div className="mb-3 d-flex gap-2 align-items-center">
                    {movie.status ? movie.status : 'Đang cập nhật'}
                    <span className={styles.dots}></span>
                    <div className={styles.bgepisode}>
                        {movie.episode}
                    </div>
                </div>
                {(movie.des.length > 400 && !expanded) ? (
                    <>
                    <div dangerouslySetInnerHTML={{ __html: `${movie.des.substring(0, 400)}....` }} />
                    <button className={styles.btn} onClick={toggleExpand}>Xem thêm...</button>
                    </>
                ):(
                    <>
                    <div dangerouslySetInnerHTML={{ __html: movie.des}} />
                    {movie.des.length > 400 && <button className={styles.btn} onClick={toggleExpand}>Ẩn bớt</button>}
                    </>
                )}
                <div className={styles.casts}>
                    Diễn viên: <span className="text-white">{movie.casts ? movie.casts : 'Đang cập nhật'}</span>
                </div>
                <div>
                    <div className={styles.containerbtn}>
                        <div className="d-flex gap-2">
                            {episodes.length > 0 && <Link to={`/${movie.slug}/${episodes[episodes.length - 1].slug}`} className={styles.btnWatch}><i className="bi bi-play-circle"></i>Xem Ngay</Link>}
                            {history && <Link to={`/${movie.slug}/${history.slug}`} className={styles.btnContinue}><i className="bi bi-play-circle"></i>Xem Tiếp</Link>}
                        </div>
                        <div className="d-flex gap-2">
                            <Link to="/" className={styles.btnTrailer}><i className="bi bi-play-circle"></i>Trailer</Link>
                            <Link to="#" onClick={() => handleWatchList(movie.id)} className={styles.btnWatchList}><i className="bi bi-plus"></i>Xem sau</Link>
                        </div>
                    </div>
                </div>
                <div className="d-flex mt-3 flex-column">
                    {episodes.length > 0 && (
                        <>
                        <h4 className="text-white">Tập mới nhất</h4>
                        <div className="d-flex gap-3">
                            {episodes.slice(0,5).map((item, index)=>(
                                <Link key={index} to={`/${movie.slug}/${item.slug}`}>
                                <div className={styles.episode}>
                                    {item.ep_number}
                                </div>
                                </Link>
                            ))}
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Description;