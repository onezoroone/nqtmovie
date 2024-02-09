/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axiosClient from '../../axios-client';
import unidecode from "unidecode";

function SidebarLayout({categories}) {
    const {token, image, idUser, notification, user} = useStateContext();
    const JSONUser = JSON.parse(user);
    const keyRef = useRef();
    const [show, setShow] = useState(false);
    const [modalGenres, setModalGenres] = useState(false)
    const [modalNoti, setModalNoti] = useState(false);
    const [noti, setNoti] = useState(null);
    const [checkNoti, setCheckNoti] = useState(false);
    useEffect(() => {
        if(notification.length != 0){
            setCheckNoti(true)
        }
    },[notification])
    const handleCloseSearch = () => setShow(false);
    const handleShowSearch = () => setShow(true);
    const handleCloseCategory = () => setModalGenres(false);
    const handleShowCategory = () => setModalGenres(true);
    const handleShowNoti = () => {
        setModalNoti(true)
        axiosClient.post(`/getAllNotifications/${idUser}`)
        .then((response) => setNoti(response.data))
        setCheckNoti(false)
    };
    const handleCloseNoti = () => setModalNoti(false);
    const [data1, setData1] = useState(null);
    const typingTimeoutRef = useRef(null);
    const [,setLoading] = useState(false);
    const [valueSearch, setValueSearch] = useState("");
    const handleOnChange = (e) => {
        const searchValue = e.target.value;
        if(!searchValue.startsWith(' ')){
            setValueSearch(searchValue)
            setLoading(true)
            setData1(null)
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => {
                callApiWithDelay(searchValue);
                setLoading(false)
            }, 1000);
            if(searchValue == ""){
                setData1(null)
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(keyRef.current && keyRef.current.value.trim() !== ""){
            const keyword = keyRef.current.value;
            window.location.href = `/search?q=${keyword}`;
        }
    }
    const callApiWithDelay  = (keyword) => {
        if(keyword != ""){
            try{
                const fetchData = async () => {
                    try {
                        const response = await axiosClient.post(`/search/q=${keyword}`)
                        setData1(response.data);
                    } catch (error) {
                        console.error(error);
                    }
                };
                fetchData();
            }catch(error){
                console.log('Lỗi:', error);
            }
        }
    }
    const renderLoader = () => {
        const loader = []
        if(keyRef.current){
            if(!data1 && keyRef.current.value){
                loader.push(
                    <div className='d-flex justify-content-center align-items-center'>
                        <span className="loader"></span>
                    </div>
                )
            }
        }
        return loader;
    }
    return (
        <>
        <div className="d-flex flex-column flex-shrink-0 sidebar">
            <div className="h-25 p-3" style={{ userSelect: 'none' }}>
                <Link to="/" className="d-block link-dark text-decoration-none icon" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                <img src="/images/logo.png" className="logo" alt="" />
                <span className="visually-hidden">Icon-only</span>
                </Link>
            </div>
            <ul className="nav nav-pills nav-flush d-flex flex-column mb-auto text-center" style={{ height: '65%' }}>
                <li className="nav-item">
                <Link to="/" className="nav-link py-3 rounded-0 text-white">
                <i className="bi bi-house-fill fs-5"></i>
                </Link>
                </li>
                {token && (
                <>
                <li>
                    <Link to="/watchlist" className="nav-link py-3 rounded-0 text-white">
                    <i className="bi bi-heart-fill fs-5"></i>
                    </Link>
                </li>
                <li>
                    <a href="/comic" className="nav-link py-3 rounded-0 text-white" >
                    <i className="bi bi-cake-fill fs-5"></i>
                    </a>
                </li>
                {token && JSONUser.permission == "admin" && (
                <li>
                    <a href="/admin/dashboard" className="nav-link py-3 rounded-0 text-white">
                    <i className="bi bi-house-gear-fill fs-5"></i>
                    </a>
                </li>
                )}
                </>
                )}
                <li>
                <a onClick={handleShowSearch} className="nav-link py-3 rounded-0 text-white" style={{cursor:'pointer'}}>
                    <i className="bi bi-search fs-5" />
                </a>
                </li>
                <li>
                <a onClick={handleShowCategory} className="nav-link py-3 rounded-0 text-white" style={{cursor:'pointer'}}>
                    <i className="bi bi-tag-fill fs-5" />
                </a>
                </li>
                {token && (
                    <li>
                        <a onClick={handleShowNoti} className="nav-link py-3 rounded-0 text-white" style={{cursor:'pointer', position: 'relative'}}>
                            <i className="bi bi-bell-fill fs-5" /> {checkNoti && <span className="notification-dots"></span>}
                        </a>
                    </li>
                )}
            </ul>
            {token ? (
                <Link to="/setting" className="d-flex align-items-center justify-content-center p-3 link-light">
                    <img src={`${window.location.origin}/api/images/uploads/${image}`} alt="" width="40" height="40" className="rounded-circle" />
                </Link>
            ) : (
                <div className="btn-login text-white">
                    <Link to="/login" className="nav-link px-2 rounded-0 text-white" data-bs-placement="right">
                        <i className="bi bi-door-open-fill" style={{ fontSize: '50px' }} />
                    </Link>
                </div>
            )}
        </div>
        {/* --------------------------------Sidebar Mobile------------------------------- */}
        <div className="canvasSidebar" id="offcanvasExample">
      <div className="d-flex flex-column flex-shrink-0" style={{ width: '4.5rem', height: '100vh', background: '#21182E' }}>
        <div className="h-25 p-3" style={{ userSelect: 'none' }}>
          <a href="/" className="d-block link-dark text-decoration-none icon">
            <img src="/images/logo.png" className="logo" alt="" />
            <span className="visually-hidden">Icon-only</span>
          </a>
        </div>
        <ul className="nav nav-pills nav-flush d-flex flex-column mb-auto text-center" style={{ height: '65%' }}>
          <li className="nav-item">
            <a href="/" className="nav-link py-3 rounded-0 text-white">
              <i className="bi bi-house-fill fs-5"></i>
            </a>
          </li>
          {token && (
            <>
            <li>
                <Link to="/watchlist" className="nav-link py-3 rounded-0 text-white">
                <i className="bi bi-heart-fill fs-5"></i>
                </Link>
            </li>
            <li>
                <a href="/comic" className="nav-link py-3 rounded-0 text-white" >
                <i className="bi bi-cake-fill fs-5"></i>
                </a>
            </li>
            {token && JSONUser.permission == "admin" && (
            <li>
                <a href="/admin/dashboard" className="nav-link py-3 rounded-0 text-white">
                <i className="bi bi-house-gear-fill fs-5"></i>
                </a>
            </li>
            )}
            </>
          )}
            <li>
                <a onClick={handleShowSearch} className="nav-link py-3 rounded-0 text-white" style={{cursor: 'pointer'}}>
                <i className="bi bi-search fs-5"></i>
                </a>
            </li>
            <li>
                <a onClick={handleShowCategory} className="nav-link py-3 rounded-0 text-white" style={{cursor: 'pointer'}}>
                <i className="bi bi-tag-fill fs-5"></i>
                </a>
            </li>
            {token && (
                <li>
                    <a onClick={handleShowNoti} className="nav-link py-3 rounded-0 text-white" style={{cursor:'pointer', position: 'relative'}}>
                        <i className="bi bi-bell-fill fs-5" /> {checkNoti && <span className="notification-dots"></span>}
                    </a>
                </li>
            )}
        </ul>
        {token ? (
            <Link to="/setting" className="d-flex align-items-center justify-content-center p-3 link-light">
                <img src={`${window.location.origin}/api/images/uploads/${image}`} alt="" width="40" height="40" className="rounded-circle" />
            </Link>
        ) : (
            <div className="btn-login text-white">
                <Link to="/login" className="nav-link px-2 rounded-0 text-white" data-bs-placement="right">
                    <i className="bi bi-door-open-fill" style={{ fontSize: '50px' }} />
                </Link>
            </div>
        )}
      </div>
    </div>
        {/* Modal search category*/}
        <Modal show={modalGenres} onHide={handleCloseCategory} size='lg'>
            <div style={{background: '#21182E'}}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-white'>Thể loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className='list-categories'>
                        {categories.map((category) => (
                                <a href={`/search?category=${category.category}`} key={category.id}><li>{category.category}</li></a>
                            ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <button type='button' className="btn btn-secondary" onClick={handleCloseCategory}>
                        Đóng
                    </button>
                </Modal.Footer>
            </div>
        </Modal>

        {/* Modal search movie */}
        <Modal
        show={show}
        size='lg'
        onHide={handleCloseSearch}
        centered>
            <div className='p-4 w-100' style={{background: '#21182E'}}>
            <Modal.Header closeButton>
                <Modal.Title className='text-white'>Tìm kiếm</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background: '#21182E'}}>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <span className="input-group-text text-white" style={{background: '#191c33', borderColor: '#191c33', marginRight: '10px', borderRadius: '10px'}}>Movie</span>
                        <input type="text" ref={keyRef} value={valueSearch} onChange={handleOnChange} className="form-control input-keyword text-white p-3" name="keyword" placeholder="Tìm kiếm..." style={{background: '#191c33',borderColor: '#191c33',borderRadius: '10px 0 0 10px'}} />
                        <button type="submit" className="p-3 text-white" style={{background: '#191c33', borderRadius: '0 10px 10px 0',border: 'none'}}><i className="bi bi-search"></i></button>
                    </div>
                </form>
                <div className="search-results w-100" id="search-results">
                    <div className="list-movie m-1" style={{marginRight: '20px',userSelect: 'none'}}>
                        <div className="search-box position-relative row text-white" id="search-box" style={{maxHeight: '500px',minHeight: '200px', overflowX: 'hidden'}}>
                            {data1 && (
                                data1.length > 0 ? (
                                    data1.map((item) => (
                                    <div className="search-item movie-box col-xl-6 col-lg-6 col-12 mt-3" key={item.id}>
                                        <div className="d-flex">
                                            <img title={item.name} src={item.img} alt={item.img} className="object-fit-cover" style={{maxWidth: '100px', display: 'inline-block', verticalAlign: 'middle', maxHeight: '150px'}} />
                                            <div className="search-content" style={{display: 'inline-block', maxWidth: '100%', paddingLeft: '10px'}}>
                                                <a href={`/movie/${encodeURIComponent(item.name.toLowerCase()).replace(/%20/g, '-')}/${item.id}`} type="submit" className="text-white" style={{background: '#21182E', border: 'none'}}>
                                                    {item.name}
                                                    <div className="text-uppercase text-danger">
                                                        {item.episode}
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>))
                                ):<span className='mt-2'>Không có kết quả tương ứng</span>
                            )}
                            {renderLoader()}
                        </div>
                    </div>
                    {(data1 && data1.length > 0) && (
                        <div className='d-flex justify-content-center mt-2'>
                            <a href={`search?q=${valueSearch}`} className='btn-more'>Xem tất cả</a>
                        </div>
                    ) }
                </div>
            </Modal.Body>
            <Modal.Footer>
            <button type='button' className="btn btn-secondary" onClick={handleCloseSearch}>
                Đóng
            </button>
            </Modal.Footer>
        </div>
      </Modal>


      <Modal
        show={modalNoti}
        size='lg'
        onHide={handleCloseNoti}
        centered>
            <div className='p-4 w-100' style={{background: '#21182E'}}>
            <Modal.Header closeButton>
                <Modal.Title className='text-white'>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background: '#21182E', color: '#fff'}}>
            {noti ? (noti.notifications.map((item, index) => (
                <div key={item.id} className='d-flex' style={{marginBottom: '10px', width: '100%', maxHeight: '100px'}}>
                    <img src={item.img} alt="" style={{width: '60px', maxHeight: '100%', marginRight: '10px'}} />
                    <div style={{width: '60%', marginRight: '10px', overflow: 'auto'}}>
                        Bộ Phim <Link className='notification-link' to={`movie/${unidecode(item.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${item.MovieID}`} style={{color: '#6a54fa'}}>{item.name}</Link> Vừa Được Cập Nhật Tập Mới Nhất!
                    </div>
                    <div style={{width: '20%'}}>
                        {noti.notiUpdated[index]} phút trước
                    </div>
                </div>
            )))
            : (
                <div className='d-flex is-loading' style={{width: '100%', maxHeight: '100px'}}>
                    <img  className='image' style={{width: '60px', marginRight: '10px'}} />
                    <div className='content' style={{width: '60%', marginRight: '10px'}}></div>
                    <div className='time_content' style={{width: '20%'}}></div>
                 </div>
            )}

            </Modal.Body>
            <Modal.Footer>
            <button type='button' className="btn btn-secondary" onClick={handleCloseNoti}>
                Đóng
            </button>
            </Modal.Footer>
        </div>
      </Modal>
        </>
     );
}

export default SidebarLayout;
