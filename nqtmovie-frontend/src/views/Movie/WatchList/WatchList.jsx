/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "./watchlist.module.css";
import Loading from "../../Loading";
import axiosClient from "../../../axios-client";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function WatchList() {
    const [data, setData] = useState(null);
    const navi = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            await axiosClient.get("/movies/getWatchList")
            .then((res) => {
                setData(res.data);
            }).catch(() => {
                navi("/");
            })
        }
        fetch();
    },[])
    if(!data) return <Loading />
    return (  
        <div className="w-100 d-flex flex-column align-items-center">
            <Helmet>
                <title>{`Danh Sách Xem Sau - ${import.meta.env.VITE_BASE_NAME}`}</title>
            </Helmet>
            <div className={styles.container}>
                <h2 className="text-center">Danh sách xem sau</h2>
                <div className={styles.watchlistcontainer}>
                    {data.watchlist.length > 0 && data.watchlist.map((item, index) => (
                    <Link key={index} to={`/${item.slug}`}>
                        <div >
                            <img src={item.img} alt={item.name} title={item.name} />
                            <h5>{item.name}</h5>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
            {data.historylist && data.historylist.length != 0 && 
            <div className={`${styles.container} mb-5`}>
                <h2 className="text-center">Lịch sử xem</h2>
                <div className={styles.watchlistcontainer}>
                    {data.historylist.map((item, index) => (
                    <Link key={index} to={`/${item.slug}/${item.slugEpi}`}>
                        <div >
                            <img src={item.img} alt={item.name} title={item.name} />
                            <h5>{item.name}</h5>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>}
        </div>
    );
}

export default WatchList;