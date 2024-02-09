import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import Loading from "../../components/Loading";
import Footer from "../../components/Comic/Footer";
function DetailsComic() {
    const [data, setData] = useState(null);
    const {idUser} = useStateContext();
    useEffect(() => {
        const path = window.location.pathname;
        const id = path.substring(path.lastIndexOf('/') + 1);
        if(idUser != null){
            const fetchData = async () => {
                try {
                    const response = await axiosClient.get(`/getdetails/${id}/${idUser}`);
                    setData(response.data);
                } catch (error) {
                    console.error(error);
                }
                };
                fetchData();
        }else{
            const fetchData = async () => {
                try {
                    const response = await axiosClient.get(`/getdetails/${id}`);
                    setData(response.data);
                } catch (error) {
                    console.error(error);
                }
                };
                fetchData();
        }
    }, [idUser])
    if (!data) {
        return <Loading></Loading>;
    }
    const {details, chapters, history} = data;
    document.title = `Đọc truyện ${data.details[0].name}`;
    return (
        <>
            <div className="container">
                {details.map((item) => (
                    <div className="row mt-5" key={item.id}>
                        <div className="col-lg-4 col-sm-12 d-flex justify-content-center">
                            <img className="w-auto" src={item.image} alt={item.name} title={item.name} style={{userSelect: 'none'}}/>
                        </div>
                        <div className="col-lg-8 col-sm-12">
                            <h1 style={{textAlign: 'center'}}>{item.name}</h1>
                            {chapters.length !== 0 ? (
                        <div className="d-flex">
                            <Link
                            to={`chapter-${chapters[chapters.length - 1].chapter}/${chapters[chapters.length - 1].id}`}
                            className="btn-read-chap"
                            >
                            Chap đầu
                            </Link>
                            <Link
                            to={`chapter-${chapters[0].chapter}/${chapters[0].id}`}
                            className="btn-read-chap"
                            >
                            Chap mới nhất
                            </Link>
                        </div>
                        ) : null}
                        <div className="mt-3 d-flex justify-content-center">
                        {history.length !== 0 && (
                            <Link to={`chapter-${history[0].chapter}/${history[0].ChapterID}`} id="btn-continue" className="btn-read-chap">
                            Đọc tiếp
                            </Link>
                        )}
                        </div>
                        </div>
                    </div>
                ))}
                <div className="mt-5">
                {chapters.length !== 0 && (
                <div>
                    <h2 className="d-flex justify-content-center mb-3">DANH SÁCH CHƯƠNG</h2>
                    <ul className="ul-list-chaper-detail-commic">
                    {chapters.map((item) => (
                        <li key={item.id}>
                        <Link to={`chapter-${item.chapter}/${item.id}`}>Chapter {item.chapter}</Link>
                        </li>
                    ))}
                    </ul>
                </div>
                )}
                </div>
            </div>
            <Footer></Footer>
        </>
     );
}

export default DetailsComic;
