/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./layout.module.css";
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from "react";
import Loading from "../Loading";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../contexts/ContextProvider";
import { Sidebar } from 'primereact/sidebar';
import { Toast } from "primereact/toast";
        
function LayoutAdmin() {
    const sidebar = [
        {
            name: 'Trang điều khiển',
            link: 'dashboard',
            icon: "bi-house-gear-fill"
        },
        {
            name: 'Người dùng',
            link: 'list-users',
            icon: "bi-person-fill-gear"
        },
        {
            name: 'Api',
            link: 'api-movie',
            icon: 'bi-rocket-takeoff-fill'
        },
        {
            name: 'Phim',
            link: '#movie',
            icon: 'bi-film',
            id: 'movie',
            children: [
                {
                    name: 'Thêm mới',
                    link: '/admin/new-movie',
                    icon: 'bi-plus'
                },
                {
                    name: 'Danh sách',
                    link: '/admin/list-movies',
                    icon: 'bi-eye-fill'
                }
            ]
        },
        {
            name: 'Đánh giá',
            link: '/admin/reviews',
            icon: 'bi-chat-dots-fill'
        },
        {
            name: 'Thể loại',
            link: '/admin/categories',
            icon: 'bi-tags-fill'
        },
        {
            name: 'Yêu cầu phim',
            link: '/admin/list-requests',
            icon: 'bi-send-fill'
        },
        {
            name: 'Báo cáo phim',
            link: '/admin/list-reports',
            icon: 'bi-flag-fill',
        }
    ]
    const [active, setActive] = useState(0);
    const location = useLocation();
    const router = useNavigate();
    const [loading, setLoading] = useState(true);
    const {setRole} = useStateContext();
    const [activeSidebar, setActiveSidebar] = useState(false);
    const [visible, setVisible] = useState(false);
    const {toast, countReports, countRequests, setCountReports, setCountRequests} = useStateContext();
    useEffect(()=>{
        const checkUser = async () => {
            await axiosClient.get("/user")
            .then((res) => {
                if(res.data.status == "success"){
                    if(res.data.user.role != "admin"){
                        router("/not-found");
                    }
                }else{
                    router("/not-found");
                }
            }).catch(() => {
                router("/not-found");
            })
            setLoading(false);
        }
        checkUser();
        const screenWidth = window.innerWidth;
        if(screenWidth < 1200){
            setActiveSidebar(true);
        }
        const getNotification = async () => {
            await axiosClient.get("/getNotifications")
            .then((res) => {
                const reports = res.data.countReports;
                const request = res.data.countRequests;
                if(reports > 0 ){
                    setCountReports(reports);
                }
                if(request > 0){
                    setCountRequests(request);
                }
            })
        }
        getNotification();
    },[])
    useEffect(() => {
        if(location.pathname == "/admin/dashboard" || location.pathname == "/admin"){
            setActive(0);
        }else if(location.pathname == "/admin/list-users"){
            setActive(1)
        }else if(location.pathname == "/admin/api-movie"){
            setActive(2);
        }else if(location.pathname.includes("/admin/list-movies" || location.pathname == "/admin/new-movie")){
            setActive(3);
        }else if(location.pathname == "/admin/reviews"){
            setActive(4);
        }else if(location.pathname == "/admin/categories"){
            setActive(5);
        }else if(location.pathname == "/admin/list-requests"){
            setActive(6);
        }else if(location.pathname == "/admin/list-reports"){
            setActive(7);
        }
        setVisible(false);
    },[location]);
    if(loading){
        return <Loading />
    }
    const handleLogOut = async () => {
        await axiosClient.post("/user/logout");
        setRole(null);
        router("/");
    }

    const handleToggle = () => {
        setActiveSidebar(!activeSidebar);
    }
    return(
        <div>
            <Toast ref={toast} />
            {!loading && 
            <div className={`${activeSidebar && styles.activeSidebar}`}>
                <nav className={`${styles.sidebar}`}>
                    <div className={styles.containerlogo}>
                        <Link to="/admin/dashboard"><img src="/logo.png" width="50px" height="50px" alt="NQTMovie" /></Link>
                        <h3 className={styles.titleLogo}>NQT Movie</h3>
                        <div className="flex-1 d-flex justify-content-end" style={{paddingRight:'15px'}}>
                            <i style={{cursor:'pointer'}} onClick={() => handleToggle()} className="bi bi-list fs-3"></i>
                        </div>
                    </div>
                    <div className={styles.customer}>
                        <i onClick={() => handleToggle()} className={`bi bi-list fs-3 ${styles.mobileToggle}`}></i>  
                        <div>
                            <i className="bi fs-1 bi-person-circle"></i>
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <div className={styles.welcome}>
                                Chào mừng <span className="text-danger">Nghiêm Quang Thắng</span>
                            </div>
                            <div className="text-secondary text-center">
                                Admin
                            </div>
                        </div>
                    </div>
                    <ul className={`${styles.listsidebar}`} style={{overflow: 'auto'}}>
                        {sidebar.map((item,index) => (
                            <li onClick={() => setActive(index)} className={`${styles.navLink} ${index == active && styles.active}`} key={index}>
                                <Link to={item.link} {...(item.children && { "data-bs-toggle": "collapse" })}>
                                    <i className={`${styles.icon} bi ${item.icon}`}></i>
                                    <span>{item.name}</span>
                                    {index == 6 && countRequests > 0 && <span className="badge bg-danger mt-1" style={{marginLeft:'10px'}}>{countRequests}</span>}
                                    {index == 7 && countReports > 0 && <span className="badge bg-danger mt-1" style={{marginLeft:'10px'}}>{countReports}</span>}
                                    <span className="flex-1 d-flex justify-content-end">
                                        {item.children && <i className="bi bi-chevron-down"></i>}
                                    </span>
                                </Link>
                                {item.children &&
                                <ul id={item.id} className={`${styles.submenu} collapse`}>
                                    {item.children.map((child, index1) => (
                                        <li key={index1}>
                                            <Link to={child.link}><i className={`${styles.icon} bi ${child.icon}`}></i>{child.name}</Link>
                                        </li>
                                    ))}
                                </ul>}
                            </li>
                        ))}
                    </ul>
                </nav>
                <Sidebar className="admin" visible={visible} onHide={() => setVisible(false)}>
                <div className={styles.containerlogo}>
                        <img src="/logo.png" width="50px" height="50px" alt="NQTMovie" />
                        <h3 className={styles.titleLogo}>NQT Movie</h3>
                    </div>
                    <div className={styles.customer}>
                        <div>
                            <i className="bi fs-1 bi-person-circle"></i>
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <div className={styles.welcome}>
                                Welcome <span className="text-danger">Nghiêm Quang Thắng</span>
                            </div>
                            <div className="text-secondary text-center">
                                Admin
                            </div>
                        </div>
                    </div>
                    <ul className={`${styles.listsidebar}`}>
                        {sidebar.map((item,index) => (
                            <li onClick={() => setActive(index)} className={`${index == active && styles.active}`} key={index}>
                                <Link to={item.link} {...(item.children && { "data-bs-toggle": "collapse" })}>
                                    <i className={`${styles.icon} bi ${item.icon}`}></i>
                                    <span>{item.name}</span>
                                    {index == 6 && countRequests > 0 && <span className="badge bg-danger mt-1" style={{marginLeft:'10px'}}>{countRequests}</span>}
                                    {index == 7 && countReports > 0 && <span className="badge bg-danger mt-1" style={{marginLeft:'10px'}}>{countReports}</span>}
                                    <span className="flex-1 d-flex justify-content-end">
                                        {item.children && <i className="bi bi-chevron-down"></i>}
                                    </span>
                                </Link>
                                {item.children &&
                                <ul id={item.id} className={`${styles.submenu} collapse`}>
                                    {item.children.map((child, index1) => (
                                        <li key={index1}>
                                            <Link to={child.link}><i className={`${styles.icon} bi ${child.icon}`}></i>{child.name}</Link>
                                        </li>
                                    ))}
                                </ul>}
                            </li>
                        ))}
                    </ul>
                </Sidebar>
                <header className={styles.header}>
                    <div className={styles.formSearch}>
                        <span className="p-input-icon-left">
                            <i className="bi bi-search fs-6" style={{marginTop:'-0.7rem'}} />
                            <InputText className={styles.input} type="search" placeholder="Tìm kiếm..." />
                        </span>
                    </div>
                    <div className="d-flex flex-1 justify-content-end align-items-center gap-2">
                        <div className="d-flex gap-3 align-items-center" style={{marginRight:'20px'}}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/225px-Flag_of_Vietnam.svg.png" width="50" height="30" alt="vn" />
                            <i className="bi fs-5 bi-bell"></i>
                            <i className="bi fs-5 bi-gear-fill"></i>
                        </div>
                        <div className={`${styles.infoCustomer} dropdown`}>
                            <a href="#" className="d-flex align-items-center gap-2" style={{color:'#9292a9'}} data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-circle fs-3"></i> 
                                <span>Admin.</span>
                                <i className="bi fs-6 bi-chevron-down"></i>
                            </a>
                            <ul className={`dropdown-menu ${styles.menuperson}`}>
                                <li><Link className="dropdown-item" to="/admin"><i className="bi bi-gear-fill"></i>Cài đặt</Link></li>
                                <li onClick={() => handleLogOut()}><Link className="dropdown-item"><i className="bi bi-box-arrow-right"></i>Đăng xuất</Link></li>
                                <li><Link className="dropdown-item" to="/">NQTMOVIE.SITE</Link></li>
                            </ul>
                        </div>
                        <i onClick={() => setVisible(true)} className={`bi bi-filter-right ${styles.toogleMobildHeader}`}></i>
                    </div>
                </header>
                <main className={styles.maincontent}>
                    <Outlet />
                </main>
                <footer className={styles.footer}>
                    <div className="w-100 d-flex justify-content-end">
                        Copyright © 2024 <b className="text-white"> NQT Movie </b> All Rights Reserved.
                    </div>
                </footer>
            </div>}
        </div>
    );
}

export default LayoutAdmin;