/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./maincarousel.module.css";
import axiosClient from "../../axios-client";
import { Toast } from 'primereact/toast';
import { TypeAnimation } from "react-type-animation";
        
function MainCarousel({movie}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = movie.length;
    const [transform, setTransform] = useState(20);
    const [widthScreen, setWidthScreen] = useState(0);
    const toast = useRef(null);
    useEffect(()=>{
        const screenWidth = window.innerWidth;
        setWidthScreen(screenWidth);
        if(screenWidth < 450){
            setTransform(50);
        }else if(screenWidth > 450 && screenWidth < 575){
            setTransform(35);
        }
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % totalSlides);
        }, 7000);

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex, totalSlides]);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    const handleNextClick = () => {
        if (currentIndex < movie.length-1) {
            setCurrentIndex(currentIndex + 1);
        }else{
            setCurrentIndex(0);
        }
    };

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }else{
            setCurrentIndex(movie.length - 1);
        }
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
        <div className={styles.carouselContainer}>
            <Toast ref={toast} />
            <div className={styles.container}>
                {movie.map((item, index) => (
                <div key={index} className={`${styles.itemCarousel} ${index == currentIndex && styles.activeItem}`}>
                    <img className={styles.image} src={item.poster} alt={item.name} />
                    <div className={styles.carouselContent}>
                        <div className={styles.leftcontent}>
                            <Link to={`/${item.slug}`} title={item.name}><h3 className={styles.title}>
                            <TypeAnimation sequence={[
                                    item.name,
                                    3000,
                                    item.othername,
                                    2000]}
                                    cursor={true}
                                    repeat={Infinity}
                                />
                            </h3></Link>
                            <div className={styles.details}>
                                <div>
                                    <span>{item.year}</span> <b>|</b>{item.categories.map((item, index) => (<span key={index}>{item} <b>|</b></span>))}<span>{item.time}</span>
                                </div>
                                <div className="mt-5 d-flex gap-3" style={(widthScreen < 1200) ? { justifyContent: "center" } : null }>
                                    <Link to={`/${item.slug}`} className={styles.btn}>Xem Ngay</Link>
                                    <button onClick={() => handleWatchList(item.id)} className={styles.playlist}>
                                        <i className="bi bi-plus"></i>
                                        <span>Xem sau</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                <div className="d-flex justify-content-end position-relatvie" style={{maxWidth: '1400px', width:'100%'}}>
                    <div className={styles.rightcontent}>
                        <h4 className="text-white">Khuyến nghị nên xem hôm nay</h4>
                        <div className={styles.dotscarousel} style={(widthScreen < 1200) ? { transform: `translateX(-${(currentIndex) * transform}vw)` } : null}>
                            {movie.map((item, index) => (
                            <div key={index} className={`${styles.dots} ${index == currentIndex && styles.active}`} onClick={() => handleThumbnailClick(index)}>
                                <img src={item.poster} alt={item.name} title={item.name} />
                            </div>
                            ))}
                        </div>
                    </div>
                    <button className={styles.buttonPrev} onClick={handlePrevClick}><i className="bi bi-chevron-left"></i> <span>Prev</span></button>
                    <button className={styles.buttonNext} onClick={handleNextClick}><i className="bi bi-chevron-right"></i> <span>Next</span></button>
                </div>
            </div>
        </div>
    );
}

export default MainCarousel;