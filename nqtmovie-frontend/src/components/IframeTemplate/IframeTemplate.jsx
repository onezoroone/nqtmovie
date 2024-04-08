/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styles from "./template.module.css";
import { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import PlayerContainer from "../JWPlayer/JWPlayer";
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import axiosClient from "../../axios-client";
import { Toast } from 'primereact/toast';    
function IframeTemplate({data}) {
    const router = useNavigate();
    const [active, setActive] = useState(false);
    const [server, setServer] = useState(0);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const [value, setValue] = useState('');
    const toast = useRef(null);
    const handleChangeEp = (slug, episode) => {
        router(`/${slug}/${episode}`);
    }
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 4
        },
        tabletmini: {
            breakpoint: { max: 768, min: 500 },
            items: 3
        },
        mobile: {
          breakpoint: { max: 500, min: 0 },
          items: 2
        }
      };
    const show = (position) => {
        setPosition(position);
        setVisible(true);
    };

    const handleSendReport = () => {
        axiosClient.post("/reports/createReport",{
            idEpisode: data.currentEpisode[0].idEpisode,
            content: value
        }).then((res) => {
            toast.current.show({severity:'success', summary: 'Thành công', detail:res.data, life: 3000});
            setValue("");
        })
        .catch((err)=>{
            console.error(err);
        })
        setVisible(false);
    }
    const footerContent = (
        <div>
            <Button label="Đóng" icon="bi bi-x" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Gửi" icon="bi bi-check" className="rounded-3" onClick={() => handleSendReport()} autoFocus />
        </div>
    );
    return (
        <>
        <Toast ref={toast} />
        <div className={`col-lg-9 ${active && styles.active} p-0`}>
            <div className={styles.iframecontainer}>
                {data.currentEpisode[server].server == "NQTMOVIE" && <PlayerContainer file={data.currentEpisode[server].ep_link} />}
                {data.currentEpisode[server].server == "Vietsub#1" && <PlayerContainer file={data.currentEpisode[server].ep_link} />}
                {(data.currentEpisode[server].server != "Vietsub#1" && data.currentEpisode[server].server != "NQTMOVIE") && 
                <iframe className={styles.iframe} src={data.currentEpisode[server].ep_link} allowFullScreen></iframe>}
            </div>
            <div className="d-flex mt-2 position-relative">
                <div className="d-flex flex-column w-100 align-items-center">
                    <h5 className="text-white">Chọn máy chủ</h5>
                    <div className="d-flex gap-3 mt-3">
                    {data.currentEpisode.map((item, index) => (
                        <div onClick={() => setServer(index)} className={`${styles.server} ${index == server && styles.activeServer}`} key={index}>
                            {item.server}
                        </div>
                    ))}
                    </div>
                </div>
                <div className="position-absolute d-flex justify-content-lg-end gap-2" style={{top:'0', right:'0'}}>
                    <button onClick={() => show('top')} className={`${styles.extension}`}><span>Báo Cáo</span><i className="bi bi-flag"></i></button>
                    {!active ? <button onClick={() => setActive(!active)} className={`${styles.extension} ${styles.btnExpand}`}>Phóng To<i className="bi bi-arrows-fullscreen"></i></button> : <button onClick={() => setActive(!active)} className={styles.extension}>Thu Nhỏ<i className="bi bi-arrows-fullscreen"></i></button> }
                    {data.episodes[0].ep_number != data.currentEpisode[0].ep_number && <Link to={`/${data.movie.slug}/${data.episodes[data.episodes.findIndex(episode => episode.ep_number === data.currentEpisode[0].ep_number) - 1].slug}`} className={styles.extension}><span>Tập Tiếp</span><i className="bi bi-chevron-double-right"></i></Link>}
                </div>
                <Dialog header={`Báo cáo phim ' ${data.movie.name} ' tập ${data.currentEpisode[0].ep_number}`} position={position} breakpoints={{ '960px': '75vw', '641px': '90vw' }} draggable={false} footer={footerContent} resizable={false} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <p className="m-0">
                        <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="Nội dung báo cáo" rows={5} className="w-100" />
                    </p>
                </Dialog>
            </div>
        </div>
        <div className={`col-lg-3 ${active && styles.active} p-0`}>
            <div className={`${styles.boxepisodes} ${active && "d-none"}`}>
                {data.episodes.map((item, index) => (
                <div onClick={() => handleChangeEp(data.movie.slug, item.slug)} className={`${styles.itemEpisode} ${item.ep_number == data.currentEpisode[0].ep_number && styles.activeEpisode}`} key={index}>
                    <div className={styles.thumbnail}>
                        <img src={item.thumbnail ? item.thumbnail : data.movie.poster} className={styles.imgepisode} alt={data.movie.name} />
                        <div className={styles.timeThumbnail}>{item.duration ? item.duration : data.movie.time}</div>
                    </div>
                    <span data-id={item.id} className={data.history.includes((item.id).toString()) ? 'text-secondary' : 'text-white'}>Tập {item.ep_number}</span>
                </div>
                ))}
            </div>
            <div className={`${styles.boxepisodesMobile} ${active && "d-block"} mt-5`}>
                {data.episodes.length > 20 && 
                <div className="mb-5">
                    <h3 className="text-white">Danh sách tập</h3>
                    <div className={`${styles.containerepispde}`}>
                        {data.episodes.map((item, index) => (
                            <div style={{cursor:'pointer'}} onClick={() => handleChangeEp(data.movie.slug, item.slug)} className={`${data.history.includes((item.id).toString()) ? 'text-secondary' : 'text-white'} ${styles.moreEpisode} ${item.ep_number == data.currentEpisode[0].ep_number && styles.activeEpisodeMore}`}  key={index}>
                                {item.ep_number}
                            </div>
                        ))}
                    </div>
                </div>}
                <Carousel infinite={true} responsive={responsive}>
                    {data.episodes.map((item, index) => (
                        <div onClick={() => handleChangeEp(data.movie.slug, item.slug)} className={`${styles.boxepisodesMobileItem} ${item.ep_number == data.currentEpisode[0].ep_number && styles.activeEpisodeMobile}`} key={index}>
                            <div className="position-relative">
                                <img className={styles.imgMobile} src={item.thumbnail ? item.thumbnail : data.movie.poster}  alt={data.movie.name} />
                                <span className={`${styles.timeThumbnail} text-white fs-6`}>{item.duration ? item.duration : data.movie.time}</span>
                            </div>
                            <div className={styles.titleEpisodesBox}>
                                <span className={data.history.includes((item.id).toString()) ? 'text-secondary' : 'text-white'}>Tập {item.ep_number}</span>
                            </div>
                        </div>
                    ))}
                </Carousel>;
            </div>
        </div>
        </>
    );
}

export default IframeTemplate;