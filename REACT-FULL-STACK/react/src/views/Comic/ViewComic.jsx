import { useEffect, useLayoutEffect, useState } from "react";
import ShowImage from "../../components/Comic/ShowImage";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import Loading from "../../components/Loading";
import Footer from "../../components/Comic/Footer";
import { Link } from "react-router-dom";
import unidecode from "unidecode";

function ViewComic() {
    const [, setSelectedChapter] = useState(null);
    const [data, setData] = useState(null);
    const [path, setPath] = useState(null);
    const [preChap, setPreChap] = useState(null);
    const [nextChap, setNextChap] = useState(null);
    const [idComic, setIdComic] = useState(null);
    const [currentChap, setCurrentChap] = useState(null);
    const {idUser} = useStateContext();
    const handleChapterChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedChapter(selectedOption);
        window.location.href = selectedOption;
    };
    useLayoutEffect(() =>{
        const urlPage = window.location.pathname;
        const id = urlPage.substring(urlPage.lastIndexOf('/') + 1);
        const parts = urlPage.split("/");
        const comicid = parseInt(parts[3]);
        setPath(urlPage);
        setIdComic(parseInt(id));
        const fetchData = async () => {
            try {
                if(idUser != null){
                    const response = await axiosClient.get(`/comicdetails/${id}/${comicid}/${idUser}`);
                    setData(response.data);
                }else{
                    const response = await axiosClient.get(`/comicdetails/${id}/${comicid}`);
                    setData(response.data);
                }
            } catch (error) {
                return <Loading></Loading>;
            }
        };
        fetchData();
    }, [idUser, currentChap]);
    useLayoutEffect(() => {
        let foundIndex = -1;
        if(data != null){
            setCurrentChap(data.abc[0].chapter)
            for (let i = 0; i < data.chapters.length; i++) {
                if (data.chapters[i].id === idComic) {
                    foundIndex = i;
                    break;
                }
            }
            document.title = `Đọc truyện ${data.chapters[0].name} Chap ${data.chapters[foundIndex].chapter}`;
            const previousElement = chapters[foundIndex - 1];
            const nextElement = chapters[foundIndex + 1];
            const btnPreChap = document.getElementById('pre-chap');
            const btnNextChap = document.getElementById('next-chap');
            if(previousElement == null){
                if (btnNextChap) {
                    btnNextChap.style.display = 'none';
                }
            }else{
                if (btnNextChap) {
                    btnNextChap.style.display = 'block';
                }
                const nextUrl = `/comic/${unidecode(data.chapters[foundIndex].name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${data.chapters[foundIndex].ComicID}/chapter-${data.chapters[foundIndex-1].chapter}/${data.chapters[foundIndex-1].id}`;
                setNextChap(nextUrl);
            }
            if(nextElement == null){
                if(btnPreChap){
                    btnPreChap.style.display = 'none';
                }
            }else{
                if(btnPreChap){
                    btnPreChap.style.display = 'block';
                }
                const preUrl = `/comic/${unidecode(data.chapters[foundIndex].name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${data.chapters[foundIndex].ComicID}/chapter-${data.chapters[foundIndex+1].chapter}/${data.chapters[foundIndex+1].id}`;
                setPreChap(preUrl);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, idComic])
    const [isAtTop, setIsAtTop] = useState(true);
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const isTop = scrollPosition === 0;
            setIsAtTop(isTop);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    if (!data) {
        return <Loading></Loading>;
    }
    const{ abc, chapters} = data;
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    const handleGoToBot = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };
    return (
        <div>
            <div className="container">
                <h1 className="d-flex justify-content-center mb-3 text-primary">{data.chapters[0].name}&nbsp; <span className="text-dark">Chap {currentChap && (currentChap)}</span></h1>
                <div className={`chapter-nav d-flex justify-content-center ${isAtTop ? '' : 'change-nav'}`} id="myDiv">
                    <Link to="/comic"><i className="bi bi-house-fill"></i></Link>
                    <Link to={`/comic/${encodeURIComponent(data.chapters[0].name.toLowerCase()).replace(/%20/g, '-').replace(/%2C/g,'')}/${data.chapters[0].ComicID}`}><i className="bi bi-list"></i></Link>
                    <Link to={preChap} onClick={()=>{setCurrentChap((preChap) => preChap - 1)}} className="btn-chapter" id="pre-chap"><i className="bi bi-arrow-left"></i></Link>
                    <select name="" value={path} className="select-chapter" id="" onChange={handleChapterChange}>
                        {chapters.map((chap) => (
                            <option value={`/comic/${unidecode(chap.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${chap.ComicID}/chapter-${chap.chapter}/${chap.id}`} key={chap.id}>Chapter {chap.chapter}
                            </option>
                        ))}
                    </select>
                    <Link to={nextChap} onClick={()=>{setCurrentChap((preChap) => preChap + 1)}} className="btn-chapter" id="next-chap"><i className="bi bi-arrow-right"></i></Link>
                </div>
            </div>
            <div className="mb-5">
                <ShowImage contents={abc}></ShowImage>
                <div className="chapter-nav mt-5 p-3 d-flex justify-content-center" style={{background: '#232323'}}>
                    <a href={`/comic/${encodeURIComponent(data.chapters[0].name.toLowerCase()).replace(/%20/g, '-').replace(/%2C/g,'')}/${data.chapters[0].ComicID}`}><i className="bi bi-list"></i></a>
                    <Link to={preChap} onClick={()=>{setCurrentChap((preChap) => preChap - 1)}} className="btn-chapter" id="pre-chap"><i className="bi bi-arrow-left"></i></Link>
                    <select name="" value={path} className="select-chapter" id="" onChange={handleChapterChange}>
                        {chapters.map((chap) => (
                            <option value={`/comic/${unidecode(chap.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${chap.ComicID}/chapter-${chap.chapter}/${chap.id}`} key={chap.id}>Chapter {chap.chapter}
                            </option>
                        ))}
                    </select>
                    <Link to={nextChap} onClick={()=>{setCurrentChap((preChap) => preChap + 1)}} className="btn-chapter" id="next-chap"><i className="bi bi-arrow-right"></i></Link>
                </div>
            </div>
            <a id="back-to-top" onClick={handleBackToTop} className={`${isAtTop ? '' : 'show'}`}><i className="bi bi-arrow-up-square"></i></a>
            <a id="go-to-bot" onClick={handleGoToBot}><i className="bi bi-arrow-down-square"></i></a>
            <Footer></Footer>
        </div>
     );
}

export default ViewComic;
