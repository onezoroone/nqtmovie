/* eslint-disable react/prop-types */
import {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import unidecode from "unidecode";
function SlideMovie({UMovies, ArrayUpdated}) {
    const carouselRef = useRef(null);
    useEffect(() => {
        const carouselElement = carouselRef.current;
        if (carouselElement) {
          const owlCarousel = window.jQuery(carouselElement);
          owlCarousel.owlCarousel({
            loop: true,
            responsiveClass: true,
            dots: false,
            responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 3,
            },
            900: {
                items: 4,
            },
            1200: {
                items: 6,
            },
            1500: {
                items: 8,
                loop: false
            }
            }
          });
        }
      }, []);
    return (
        <div className="row mt-5">
            <div className="row">
                <h4 className="text-white" style={{userSelect: 'none'}}>Phim Mới Cập Nhật</h4>
            </div>
            <div className="owl-carousel carousel-update owl-theme" ref={carouselRef}>
                {UMovies.map((UMovie, index) => (
                <div className="item" key={UMovie.id}>
                    <div className="link-movie">
                        <div className="multi-carousel-item m-1 position-relative">
                            <img src={UMovie.img} className="d-block" alt={UMovie.name} title={UMovie.name} />
                            <div className="position-absolute text-white rounded p-2 time-stamp">{ArrayUpdated[index]} phút trước</div>
                        </div>
                        <h5 className="name text-uppercase text-white p-1" style={{textAlign: 'center'}}>
                            {UMovie.name}
                        </h5>
                        <div className="desciption text-white position-absolute ">
                            <h4 className="title-name ">
                                {UMovie.name}
                            </h4>
                            <div className="year" style={{color: '#808080'}}>
                                {UMovie.year} ● {UMovie.time}
                            </div>
                            <div className="episode-item text-uppercase text-danger">
                                Tập {UMovie.episode}
                            </div>
                            <div className="des-content mt-4">
                                {UMovie.des}
                            </div>
                            <Link to={`movie/${unidecode(UMovie.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${UMovie.id}`} className="btn btn-updated d-flex p-2 justify-content-center align-content-center text-uppercase">
                                Xem Ngay
                                <span style={{marginLeft: '5px !important'}}><i className="fs-6 bi bi-play-circle"></i></span>
                            </Link>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default SlideMovie;
