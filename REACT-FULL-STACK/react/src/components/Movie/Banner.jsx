/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import unidecode from 'unidecode';
const Banner = ( {first, categoriesf, TMovies, categories} ) => {

    const [isTabVisible, setIsTabVisible] = useState(true);
    const carousel = document.getElementById('carouselTrending');
    let previousSlide;
    let playTimeout;
    let img_video;
    const toggleMute = (idvideo, icon, event) => {
      event.preventDefault();
      const video = document.getElementById(idvideo);
      const muteIcon = document.getElementById(icon);
      if (video.muted) {
        video.muted = false;
        muteIcon.className = "fs-1 bi bi-volume-up-fill";
      } else {
        video.muted = true;
        muteIcon.className = "fs-1 bi bi-volume-mute-fill";
      }
    };

    useEffect(() => {
      if (carousel) {
        const playVideo = () => {
          const activeSlide = carousel.querySelector('.carousel-item.active');
          const activeVideoContainer = activeSlide.querySelector('.myvideo');
          const iconVolume = activeSlide.querySelector('.iconvolume');
          if (activeVideoContainer) {
            const activeVideo = activeVideoContainer.querySelector('.trailer');
            img_video = activeSlide.querySelector('.video-img');
            img_video.style.display = "none";
            iconVolume.style.display = "block";
            activeVideo.play();
          }
        }

        const pauseVideo = () => {
          const activeSlide = carousel.querySelector('.carousel-item.active');
          const activeVideoContainer = activeSlide.querySelector('.myvideo');
          if (activeVideoContainer) {
            const activeVideo = activeVideoContainer.querySelector('.trailer');
            activeVideo.pause();
          }
          clearTimeout(playTimeout);
        }

        const resumeVideo = () => {
          const activeSlide = carousel.querySelector('.carousel-item.active');
          const activeVideoContainer = activeSlide.querySelector('.myvideo');
          if (activeVideoContainer) {
            const activeVideo = activeVideoContainer.querySelector('.trailer');
            activeVideo.play();
          }
        }

        document.addEventListener('visibilitychange', function () {
          if (document.visibilityState === 'visible') {
            setIsTabVisible(true);
            resumeVideo();
          } else {
            setIsTabVisible(false);
            pauseVideo();
          }
        });

        carousel.addEventListener('slide.bs.carousel', function (event) {
          const activeSlide = event.target.querySelector('.carousel-item.active');
          const activeVideoContainer = activeSlide.querySelector('.myvideo');
          const iconVolume = activeSlide.querySelector('.iconvolume');
          if (activeVideoContainer) {
            const activeVideo = activeVideoContainer.querySelector('.trailer');
            activeVideo.pause();
            activeVideo.currentTime = 0;
            img_video = activeSlide.querySelector('.video-img');
            img_video.style.display = "block";
            iconVolume.style.display = "none";
          }
          clearTimeout(playTimeout);
        });

        carousel.addEventListener('slid.bs.carousel', function (event) {
          if (isTabVisible) {
            playTimeout = setTimeout(function () {
              playVideo();
            }, 5000);
          }
          if (previousSlide) {
            const previousVideoContainer = previousSlide.querySelector('.myvideo');
            if (previousVideoContainer) {
              const previousVideo = previousVideoContainer.querySelector('.trailer');
              previousVideo.pause();
              previousVideo.currentTime = 0;
            }
          }
          previousSlide = event.target.querySelector('.carousel-item.active');
        });

        const firstSlide = carousel.querySelector('.carousel-item:first-child');
        const firstVideoContainer = firstSlide.querySelector('.myvideo');
        if (firstVideoContainer) {
            const firstVideo = firstVideoContainer.querySelector('.trailer');
            playTimeout = setTimeout(function () {
                firstVideo.autoplay = true;
                img_video = firstSlide.querySelector('.video-img');
                const iconVolume = firstSlide.querySelector('.iconvolume');
                img_video.style.display = "none";
                iconVolume.style.display = "block";
                firstVideo.play();
            }, 10000);
        }

      }
    }, [carousel, isTabVisible]);

    return (
        <div className="row">
            <div className="col-12" style={{padding: '0'}}>
            <div className="slide-content">
                <div id="carouselTrending" className="carousel slide" style={{userSelect: 'none'}}>
                    <div className="carousel-inner">
                    {first.map((movie) => (
                        <div className="carousel-item active position-relative" key={movie.id}>
                        <img src={movie.poster} className="video-img" />
                        <div className="myvideo position-absolute">
                            <video src={movie.autotrailer} className="slider trailer" id={`myvideo${movie.id}`} loop muted playsInline></video>
                        </div>
                        <a href="#" onClick={(event) => toggleMute(`myvideo${movie.id}`, `iconvideo${movie.id}`, event)} className="iconvolume fs-1 text-white"><i id={`iconvideo${movie.id}`} className="bi bi-volume-mute-fill"></i></a>
                        <div className="overlay"></div>
                        <div className="describe-movie row p-5" style={{ zIndex: 1, position: 'relative', top: 0 }}>
                            <a href={`/showDetail?name=${movie.name}&id=${movie.id}`} className="title text-uppercase text-white col-12" style={{ fontSize: '40px' }}>{movie.name}</a>
                            <p className="text-white mt-3 col-12" style={{ height: '43px', overflow: 'hidden' }}><span className="text-danger">Tên khác:</span> <span>{movie.othername}</span></p>
                            <p className="text-danger">Tập: <span className="text-white">{movie.episode}</span></p>
                            <div>
                            <p className="text-danger">Thể loại:
                                <span className="genres text-white">
                                {categoriesf[0].map((category) => (
                                    <a href={`/filter?category=${category.id_cate}`} key={category.id_cate}> {category.category},</a>
                                ))}
                                </span>
                            </p>
                            </div>
                            <Link to={`movie/${unidecode(movie.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${movie.id}`} className="btn text-white btn-watch p-3 d-flex justify-content-center align-content-center text-uppercase">
                                Xem Ngay <span className="" style={{ marginLeft: '5px' }}><i className="fs-6 bi bi-play-circle"></i></span>
                            </Link>
                        </div>
                        </div>
                    ))}
                    {TMovies.map((TMovie) => (
                        <div className="carousel-item" key={TMovie.id}>
                            <div className="video-img" style={{ backgroundImage: `url(${TMovie.poster})` }}></div>
                            <div className="myvideo" style={{ position: 'absolute' }}>
                            <video src={TMovie.autotrailer} className="slider trailer" id={`myvideo${TMovie.id}`} loop muted playsInline></video>
                            </div>
                            <a href="#" onClick={(event) => toggleMute(`myvideo${TMovie.id}`, `iconvideo${TMovie.id}`, event)} className="iconvolume fs-1 text-white">
                            <i id={`iconvideo${TMovie.id}`} className="bi bi-volume-mute-fill"></i>
                            </a>
                            <div className="overlay"></div>
                            <div className="describe-movie row p-5" style={{ zIndex: 1, position: 'relative', top: 0 }}>
                            <a href="" className="title text-uppercase text-white col-12" style={{ fontSize: '40px' }}>
                                {TMovie.name}
                            </a>
                            <p className="text-white mt-3 col-12" style={{ height: '43px', overflow: 'hidden' }}>
                                <span className="text-danger">Tên khác:</span> <span>{TMovie.othername}</span>
                            </p>
                            <p className="text-danger">Tập: <span className="text-white">{TMovie.episode}</span></p>
                            <div className="">
                                <p className="text-danger">
                                Thể loại:
                                <span className="genres text-white">
                                    {(() => {
                                    const movieCategories = [];
                                    categories.forEach((subArray) => {
                                        subArray.forEach((category) => {
                                        if (category.id_movie === TMovie.id) {
                                            movieCategories.push({
                                            id_cate: category.id_cate,
                                            category: category.category
                                            });
                                        }
                                        });
                                    });
                                    return movieCategories.map((category) => (
                                        <a href="" key={category.category}> {category.category},</a>
                                    ));
                                    })()}
                                </span>
                                </p>
                            </div>
                            <Link to={`movie/${unidecode(TMovie.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${TMovie.id}`} className="btn text-white btn-watch p-3 d-flex justify-content-center align-content-center text-uppercase">
                                Xem Ngay <span className="" style={{ marginLeft: '5px' }}><i className="fs-6 bi bi-play-circle"></i></span>
                            </Link>
                            </div>
                        </div>
                    ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselTrending" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselTrending" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            </div>
        </div>
     );
}

export default Banner;
