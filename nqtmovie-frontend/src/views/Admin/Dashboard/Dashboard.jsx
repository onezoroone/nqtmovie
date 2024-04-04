import { Helmet } from "react-helmet";
import styles from "./dashboard.module.css";
import { Chart } from 'primereact/chart';
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Loading from "../../Loading";
import { Link } from "react-router-dom";
        
function Dashboard() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, ] = useState({
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true
                }
            }
        }
    });
    const [chartData1, setChartData1] = useState({});
    const [chartOptions1, setChartOptions1] = useState({});
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const fetch = async () => {
            await axiosClient.get("/movies/getAllIndex")
            .then((res) => {
                setData(res.data);
                const data = {
                    labels: ['Not active', 'Active'],
                    datasets: [
                        {
                            data: [res.data.users.unverified_count, res.data.users.verified_count],
                            backgroundColor: [
                                documentStyle.getPropertyValue('--red-500'), 
                                documentStyle.getPropertyValue('--green-500')
                            ],
                            hoverBackgroundColor: [
                                documentStyle.getPropertyValue('--red-400'), 
                                documentStyle.getPropertyValue('--green-400')
                            ]
                        }
                    ]
                }
                setChartData(data);
            })
        }
        fetch();
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data1 = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [
                {
                    label: 'Total views',
                    backgroundColor: documentStyle.getPropertyValue('--gray-500'),
                    borderColor: documentStyle.getPropertyValue('--gray-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Total movies watched',
                    backgroundColor: documentStyle.getPropertyValue('--purple-500'),
                    borderColor: documentStyle.getPropertyValue('--purple-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        const options1 = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData1(data1);
        setChartOptions1(options1);
    }, []);
    if(!data) return <Loading />
    return ( 
        <div>
            <Helmet>
                <title>{`Dashboard - ${import.meta.env.VITE_BASE_NAME}`}</title>
            </Helmet>
            <div className={styles.header}>
                <div className={styles.card}>
                    <h2>Phim</h2>
                    <div className="d-flex">
                        <span className="w-100 d-flex justify-content-center">{data.sumMovies}</span> <div className="flex-1 d-flex justify-content-end"><i className="bi bi-film"></i></div>
                    </div>
                </div>
                <div className={styles.card}>
                    <h2>Người dùng</h2>
                    <div className="d-flex">
                        <span className="w-100 d-flex justify-content-center">{data.sumUser}</span> <div className="flex-1 d-flex justify-content-end"><i className="bi bi-person-fill-check"></i></div>
                    </div>
                </div>
                <div className={styles.card}>
                    <h2>Đánh giá</h2>
                    <div className="d-flex">
                        <span className="w-100 d-flex justify-content-center">{data.sumReviews}</span> <div className="flex-1 d-flex justify-content-end"><i className="bi bi-chat-dots-fill"></i></div>
                    </div>
                </div>
                <div className={styles.card}>
                    <h2>Thể loại</h2>
                    <div className="d-flex">
                        <span className="w-100 d-flex justify-content-center">{data.sumCategories}</span> <div className="flex-1 d-flex justify-content-end"><i className="bi bi-tag-fill"></i></div>
                    </div>
                </div>
            </div>
            <div className={styles.bodyChart}>
                <div className="w-75 text-white p-0 m-0">
                    <div className={styles.card}>
                    <h3>Tổng lượt xem</h3>
                        <Chart type="bar" data={chartData1} options={chartOptions1} />
                    </div>
                </div>
                <div className={`${styles.col3} flex-1 w-100 justify-content-center d-flex text-center text-white`}>
                    <div className={`${styles.card} w-100`}>
                        <h3>Người dùng mới tháng này</h3>
                        <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                    </div>
                </div>
                
            </div>
            <div className="mt-5 text-white">
                <div className={styles.card}>
                    <h3>Phim nhiều lượt xem nhất</h3>
                    <div className={styles.bodyImg}>
                        {data.movies.map((item) => (
                            <Link to={`/admin/edit-movie/${item.slug}`} key={item.id}>
                                <div>
                                    <img src={item.img} alt={item.name} title={item.name} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;