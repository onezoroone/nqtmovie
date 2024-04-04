import { Link } from "react-router-dom";
import styles from "./rankinglayout.module.css";
import { useState } from "react";
function RankingLayout({daily, weekly, monthly}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    return (  
        <>
        <section className={styles.row1}>
            <div className={styles.titlecontent}>
                <h2 className="mb-4">
                    <span className="position-relative">Phim nổi bật</span>
                </h2>
                <p className={styles.titletabcontent}>Phim được xem nhiều nhất trong {currentIndex == 0 && "ngày"} {currentIndex == 1 && "tuần"} {currentIndex == 2 && "tháng"}</p>
                <div className={styles.contenttab}>
                    <button onClick={() => setCurrentIndex(0)}>Ngày<i className="bi bi-chevron-right"></i></button>
                    <button onClick={() => setCurrentIndex(1)}>Tuần<i className="bi bi-chevron-right"></i></button>
                    <button onClick={() => setCurrentIndex(2)}>Tháng<i className="bi bi-chevron-right"></i></button>
                </div>
            </div>
            {currentIndex == 0 && daily.slice(0, 5).map((item) => (
            <div className={styles.animation} key={item.id}>
                <Link to={item.slug}>
                    <img className={styles.img} src={item.img} title={item.name} alt={item.name} />
                    <div className={styles.hover}>
                        <i className="fs-1 bi bi-play-circle"></i>
                    </div>
                </Link>
                <div className={styles.detailsmovie}>
                    <p>{item.year}, {item.type}</p>
                    <Link to={item.slug}><h6>{item.name}</h6></Link>
                </div>
            </div>
            ))}
            {currentIndex == 1 && weekly.slice(0, 5).map((item) => (
            <div className={styles.animation} key={item.id}>
                <Link to={item.slug}>
                    <img className={styles.img} src={item.img} title={item.name} alt={item.name} />
                    <div className={styles.hover}>
                        <i className="fs-1 bi bi-play-circle"></i>
                    </div>
                </Link>
                <div className={styles.detailsmovie}>
                    <p>{item.year}, {item.type}</p>
                    <Link to={item.slug}><h6>{item.name}</h6></Link>
                </div>
            </div>
            ))}
            {currentIndex == 2 && monthly.slice(0, 5).map((item) => (
            <div className={styles.animation} key={item.id}>
                <Link to={item.slug}>
                    <img className={styles.img} src={item.img} title={item.name} alt={item.name} />
                    <div className={styles.hover}>
                        <i className="fs-1 bi bi-play-circle"></i>
                    </div>
                </Link>
                <div className={styles.detailsmovie}>
                    <p>{item.year}, {item.type}</p>
                    <Link to={item.slug}><h6>{item.name}</h6></Link>
                </div>
            </div>
            ))}
        </section>
        <section className={styles.row2}>
            {currentIndex == 0 && daily.slice(5).map((item) => (
            <div className={styles.animation} key={item.id}>
                <Link to={item.slug}>
                    <img className={styles.img} src={item.img} title={item.name} alt={item.name} />
                    <div className={styles.hover}>
                        <i className="fs-1 bi bi-play-circle"></i>
                    </div>    
                </Link>
                <div className={styles.detailsmovie}>
                    <p>{item.year}, {item.type}</p>
                    <Link to={item.slug}><h6>{item.name}</h6></Link>
                </div>
            </div>
            ))}
            {currentIndex == 1 && weekly.slice(5).map((item) => (
            <div className={styles.animation} key={item.id}>
                <Link to={item.slug}>
                    <img className={styles.img} src={item.img} title={item.name} alt={item.name} />
                    <div className={styles.hover}>
                        <i className="fs-1 bi bi-play-circle"></i>
                    </div>
                </Link>
                <div className={styles.detailsmovie}>
                    <p>{item.year}, {item.type}</p>
                    <Link to={item.slug}><h6>{item.name}</h6></Link>
                </div>
            </div>
            ))}
            {currentIndex == 2 && monthly.slice(5).map((item) => (
            <div className={styles.animation} key={item.id}>
                <Link to={item.slug}>
                    <img className={styles.img} src={item.img} title={item.name} alt={item.name} />
                    <div className={styles.hover}>
                        <i className="fs-1 bi bi-play-circle"></i>
                    </div>
                </Link>
                <div className={styles.detailsmovie}>
                    <p>{item.year}, {item.type}</p>
                    <Link to={item.slug}><h6>{item.name}</h6></Link>
                </div>
            </div>
            ))}
        </section>
        <div className={styles.titlecontentMobile}>
            <h2 className="mb-4">
                <span className="position-relative">Phim nổi bật</span>
            </h2>
            <p className={styles.titletabcontent}>Phim được xem nhiều nhất trong {currentIndex == 0 && "ngày"} {currentIndex == 1 && "tuần"} {currentIndex == 2 && "tháng"}</p>
            <div className={styles.contenttab}>
                <button onClick={() => setCurrentIndex(0)}>Ngày<i className="bi bi-chevron-right"></i></button>
                <button onClick={() => setCurrentIndex(1)}>Tuần<i className="bi bi-chevron-right"></i></button>
                <button onClick={() => setCurrentIndex(2)}>Tháng<i className="bi bi-chevron-right"></i></button>
            </div>
        </div>
        <section className={styles.rowmobile}>
        {currentIndex == 0 && daily.map((item) => (
            <div className={styles.animation} key={item.id}>
                <Link to={item.slug}>
                    <img className={styles.img} src={item.img} title={item.name} alt={item.name} />
                    <div className={styles.hover}>
                        <i className="fs-1 bi bi-play-circle"></i>
                    </div>
                </Link>
                <div className={styles.detailsmovie}>
                    <p>{item.year}, {item.type}</p>
                    <Link to={item.slug}><h6>{item.name}</h6></Link>
                </div>
            </div>
        ))}
        {currentIndex == 1 && weekly.map((item) => (
            <div className={styles.animation} key={item.id}>
                <Link to={item.slug}>
                    <img className={styles.img} src={item.img} title={item.name} alt={item.name} />
                    <div className={styles.hover}>
                        <i className="fs-1 bi bi-play-circle"></i>
                    </div>
                </Link>
                <div className={styles.detailsmovie}>
                    <p>{item.year}, {item.type}</p>
                    <Link to={item.slug}><h6>{item.name}</h6></Link>
                </div>
            </div>
        ))}
        {currentIndex == 2 && monthly.map((item) => (
            <div className={styles.animation} key={item.id}>
                <Link to={item.slug}>
                    <img className={styles.img} src={item.img} title={item.name} alt={item.name} />
                    <div className={styles.hover}>
                        <i className="fs-1 bi bi-play-circle"></i>
                    </div>
                </Link>
                <div className={styles.detailsmovie}>
                    <p>{item.year}, {item.type}</p>
                    <Link to={item.slug}><h6>{item.name}</h6></Link>
                </div>
            </div>
        ))}
        </section>
        </>
    );
}

export default RankingLayout;