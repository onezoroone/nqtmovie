/* eslint-disable react/prop-types */
import {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import unidecode from "unidecode";
function RankingLayout({ListRanking}) {
    const carouselRef = useRef(null);
      useEffect(() => {
        const carouselElement = carouselRef.current;
        if (carouselElement) {
          const owlCarousel = window.jQuery(carouselElement);
          owlCarousel.owlCarousel({
            items:5,
            loop:true,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1.2,
                    nav:true
                },
                400:{
                    items:1.5
                },
                570:{
                    items:2.1,
                },
                860:{
                    items:3.1
                },
                1500:{
                    items:5,
                },
            }
          });
        }
      }, []);
    return (
        <div className="owl-carousel carousel-top owl-theme" ref={carouselRef}>
            {ListRanking.map((item, index) => (
                <div className="item" key={item.id}>
                    <div className="position-relative">
                        <div className="top-videos-item slider-item">
                            <div className="top-videos-inner">
                                <div className="top-number">
                                    {index+1}
                                </div>
                                <div className="position-absolute" style={{right: '0'}}>
                                    <Link to={`movie/${unidecode(item.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${item.id}`}>
                                        <img alt={item.name} src={item.img} title={item.name} style={{opacity: '1'}} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
        </div>
     );
}

export default RankingLayout;
