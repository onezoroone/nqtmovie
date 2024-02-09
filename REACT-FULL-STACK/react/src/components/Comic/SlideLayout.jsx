/* eslint-disable react/prop-types */
import {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import unidecode from "unidecode";
export default function SlideLayout({data}){
  const carouselRef = useRef(null);
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      const owlCarousel = window.jQuery(carouselElement);
      owlCarousel.owlCarousel({
        loop: true,
        margin: 4,
        nav: true,
        dots: true,
        autoplay:true,
        autoplayTimeout:10000,
        items: 7,
        responsive: {
          0: {
            items: 2
          },
          600: {
            items: 4
          },
          1200: {
            items: 7
          }
        }
      });
    }
  }, []);
  const renderItem = () => {
    const items = [];
    if (data) {
      for (let i = 0; i < data.length; i += 2) {
        const item1 = data[i];
        const item2 = data[i + 1];

        const a1 = (
          <Link to={`${unidecode(item1.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${item1.id}`} title={item1.name}>
            <img className="ls-is-cached lazyloaded" src={item1.image} alt={item1.name} title={item1.name} />
          </Link>
        );

        let a2 = null;
        if (item2) {
            a2 = (
            <Link to={`${unidecode(item2.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${item2.id}`} title={item2.name}>
                <img className="ls-is-cached lazyloaded" src={item2.image} alt={item2.name} title={item2.name} />
            </Link>
            );
        }

        const item = (
          <div className="item" key={i}>
            {a1}
            {a2}
          </div>
        );

        items.push(item);
      }
    }

    return items;
  }
  return(
    <div className="container">
        <div className="container top-home-hot p-0">
          <div ref={carouselRef} className="owl-carousel owl-theme" style={{marginTop: '2.5rem'}}>
            {renderItem()}
            </div>
        </div>

    </div>
  )
}
