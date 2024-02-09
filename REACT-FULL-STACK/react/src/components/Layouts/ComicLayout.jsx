import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import Loading from "../Loading";
function ComicLayout() {
    const {user, dataComic ,setUser, setToken, setDataComic, setIdUser} = useStateContext();
    useEffect(() => {
        import('../../assets/css/comic.css');
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/allcomics');
                setDataComic(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    },[])
    const handleClick = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
        .then(() => {
            setUser(null)
            setToken(null)
            setIdUser(null)
        })
    }
    if(!dataComic){
        return <Loading></Loading>
    }
    const {genres} = dataComic;
    const userInfor = JSON.parse(user);
    return (
        <>
            <div className="container w-100">
                <div className="row">
                    <div className="topbar col-7" style={{userSelect: 'none'}}>
                    <Link to="/comic"><img src="/jack.png" alt="logo" style={{width:'140px'}}/></Link>
                    </div>
                    <div className="col-5 d-flex container-search">
                    <form action="" className="d-flex">
                        <input type="text" className="keyword" placeholder="Nhập tên truyện"/>
                        <button type="submit" className="btnSearch"><i className="bi bi-search"></i></button>
                    </form>
                    {user ?
                        <button onClick={handleClick} className="btn btn-login text-uppercase" >{userInfor.username}</button>
                        :
                        <Link to="/login" className="btn btn-login">Đăng nhập</Link>
                    }
                    <a href="" className="message"><i className="bi bi-chat-right-text fs-4"></i></a>
                    </div>
                </div>
            </div>
            <nav className="navbar-container">
                <ul className="navbar container">
                <li><a href="">HOT</a></li>
                <li><a href="">MỚI</a></li>
                <li className="dropdown-toggle toogle-categories">THỂ LOẠI
                    <ul className="list-categories dropdown-menu">
                    {genres.map((item) => (
                        <Link to="" key={item.id}>
                            <li title={item.genre}>{item.genre}</li>
                        </Link>
                    ))}
                    </ul>
                </li>
                <li><a href="">YÊU THÍCH</a></li>
                <li><a href="">LỊCH SỬ</a></li>
                <li><a href="">THEO DÕI</a></li>
                <li><a href="">ĐĂNG TRUYỆN</a></li>
                <li><a href="">MANHWA</a></li>
                <li><a href="">MANGA</a></li>
                <li><a href="">MANHUA</a></li>
                <li><a href="">NOVEL</a></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default ComicLayout;
