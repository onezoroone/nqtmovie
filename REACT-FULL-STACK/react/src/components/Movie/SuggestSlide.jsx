/* eslint-disable react/prop-types */
import { useRef } from "react";
import unidecode from "unidecode";
// eslint-disable-next-line react/prop-types
function SuggestSlide({suggestMovie}) {
    const carouselRef = useRef(null);
        const carouselElement = carouselRef.current;
        if (carouselElement) {
            const owlCarousel = window.jQuery(carouselElement);
            owlCarousel.owlCarousel({
            loop:true,
            responsiveClass:true,
            margin: 10,
            dots: false,
            responsive:{
                0:{
                    items:2,
                    margin: 0
                },
                670:{
                    items:3,
                },
                900:{
                    items:4,
                },
                1300:{
                    items:6,
                },
                1500:{
                    items:8,
                    loop:true,
                }
            }
            });
        }
    return (
        <div className="row mt-5 suggestions">
            <div className="row">
                <h4 className="text-white">Đề Xuất Cho Bạn</h4>
            </div>
            <div className="owl-carousel p-0 carousel-suggestion owl-theme" ref={carouselRef}>
                {suggestMovie.map((sMovie) => (
                    <div className="item" key={sMovie.id_movie}>
                        <div className="link-movie">
                            <div className="multi-carousel-item m-1 position-relative">
                                <img src={sMovie.img} className="d-block" alt={sMovie.name} title={sMovie.name} />
                            </div>
                            <h5 className="name text-uppercase text-white p-1" style={{textAlign:'center'}}>
                                {sMovie.name}
                            </h5>
                            <div className="desciption text-white position-absolute ">
                                <h4 className="title-name ">
                                    {sMovie.name}
                                </h4>
                                <div className="year" style={{color: '#808080'}}>
                                    {sMovie.year} &centerdot; {sMovie.time}
                                </div>
                                <div className="episode-item text-uppercase text-danger">
                                    Tập {sMovie.episode}
                                </div>
                                <div className="des-content mt-4">
                                    {sMovie.des}
                                </div>
                                <a href={`/movie/${unidecode(sMovie.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${sMovie.id_movie}`} className="btn btn-updated d-flex p-2 justify-content-center align-content-center text-uppercase">Xem Ngay
                                    <span style={{marginLeft: '5px'}}><i className="fs-6 bi bi-play-circle"></i></span></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SuggestSlide;
