import styles from "./carousel.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

function CarouselTemplate({movie, title, time}) {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 701 },
          items: 5
        },
        vippro: {
          breakpoint: { max: 700, min: 580 },
          items: 4
        },
        sm: {
          breakpoint: { max: 579, min: 463 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
    };
    const diffTime = (date) => {
      const currentDate = new Date();
      const updatedDate = new Date(date);
      const diff = currentDate.getTime() - updatedDate.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      if(days > 0){
          return `${days} ngày trước`;
      }else if(hours > 0){
          return `${hours} giờ trước`;
      }else if(minutes > 0){
          return `${minutes} phút trước`;
      }else{
          return `${seconds} giây trước`;
      }
    }
    return ( 
        <div className={styles.carouselUpdatedContainer}>
            <div className={styles.updatedcontainer}>
                <Carousel autoPlay={true} autoPlaySpeed={5000} infinite={true} containerClass={styles.carouselcontainer} responsive={responsive}>
                {movie.map((item) => (
                    <div key={item.id} className={`${styles.slideitem}`}>
                        <Link to={`/${item.slug}`}><img className={styles.imgupdated} src={item.img} title={item.name} alt={item.name} /></Link>
                        <div className={styles.detailsmovie}>
                            <p>{item.episode} - {item.type}</p>
                            <Link to={`/${item.slug}`}><h6>{item.name}</h6></Link>
                        </div>
                        {time && 
                        <div className={styles.updatedTime}>
                          {diffTime(item.updated_at)}
                        </div>}
                    </div>
                ))}
                </Carousel>
                <div className={`d-flex h-100 justify-content-center position-relative flex-column ${styles.titleupdatedContent}`}>
                    <h2 className={styles.titleUpdated}><span className="position-relative">{title}</span></h2>
                    <Link className={styles.viewall} to="/tim-kiem">Xem Tất Cả <i className="bi bi-chevron-right"></i></Link>
                </div>
            </div>
        </div>
     );
}

export default CarouselTemplate;