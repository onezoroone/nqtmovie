/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from 'primereact/sidebar';
import { Dialog } from 'primereact/dialog';
import styles from "./header.module.css";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
        
// eslint-disable-next-line react/prop-types
function Header({countries, categories}) {
    const [visible, setVisible] = useState(false);
    const [visibleSidebar, setVisibleSidebar] = useState(false);
    const {user, setUser} = useStateContext();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const location = useLocation();
    const navbar = [
        {
            name: 'Trang chủ',
            icon: 'bi-house-door',
            link: '/'
        },
        {
            name: 'Thể loại',
            link: '#category',
            id: 'category',
            icon: 'bi-tag',
            children: []
        },
        {
            name: 'Quốc gia',
            link: '#country',
            id: 'country',
            icon: 'bi-flag',
            children: []
        },
        {
            name: 'Phim bộ',
            link: '/tim-kiem?type=Phim+bộ',
            icon: 'bi-badge-4k'
        },
        {
            name: 'Phim lẻ',
            link: '/tim-kiem?type=Phim+lẻ',
            icon: 'bi-badge-8k'
        },
        {
            name: 'Yêu cầu phim',
            link: '/request',
            icon: 'bi-send'
        }
    ];
    useEffect(()=>{
        setVisibleSidebar(false);
        setVisible(false);
    },[location])
    countries.forEach(country => {
        navbar.find(item => item.name === 'Quốc gia').children.push(country);
    });
    categories.forEach(category => {
        navbar.find(item => item.name === 'Thể loại').children.push(category);
    });

    const handleLogOut = async () => {
        await axiosClient.post("/user/logout");
        setUser(null);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        navigate("/tim-kiem?name="+ keyword);
    }
    
    
    return (  
        <div className="d-flex justify-content-center">
            <nav className={styles.navbar}>
                <Link to="/"><img src="/brand.png" className={styles.brand} alt="logo" /></Link>
                <ul className={styles.listnav}>
                    {navbar.map((item, index) => (
                    <li key={index}>
                        <Link to={item.link}>{item.name} {item.children && <i className="bi bi-chevron-down fs-6"></i>}</Link>
                        {item.children &&
                        <ul className={styles.submenu}>
                            {item.children.map((child, index) => (
                                <li key={index}><Link className="text-white" to={`/tim-kiem?${item.name == "Thể loại" ? "category" : 'country'}=${child.name}`}>{child.name}</Link></li>
                            ))}
                        </ul>}
                    </li>
                    ))}
                </ul>
                <div className="flex-1 d-flex justify-content-end align-items-center gap-3">
                    <form className={styles.formsearch} onSubmit={onSubmit}>
                        <div className={styles.searchcontainer}>
                            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" className={styles.input} placeholder="Tìm kiếm..." />
                            <button type="submit" className="border-0 bg-transparent bi bi-search"></button>
                        </div>
                    </form>
                    <i className={`${styles.searchIcon} bi bi-search`} onClick={() => setVisible(true)}></i>
                    <Dialog header="Tìm kiếm" visible={visible} onHide={() => setVisible(false)}
                        style={{ width: '50vw' }} breakpoints={{'660px': '95vw'}}>
                        <form onSubmit={onSubmit}>
                            <div className={styles.searchcontainermobile}>
                                <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className={styles.inputmobile} placeholder="Tìm kiếm..." />
                                <button type="submit" className="flex-1 border-0 bg-transparent bi bi-search"></button>
                            </div>
                        </form>
                    </Dialog>
                    <i className={`bi bi-list ${styles.menu}`} onClick={() => setVisibleSidebar(true)}></i>
                    <Sidebar visible={visibleSidebar} onHide={() => setVisibleSidebar(false)}>
                        <div className="d-flex align-items-center gap-4">
                            <img src="/logo1.png" width="50px" height="50px" alt="logo" />
                            <h2 className="mb-0 mt-1">NQT Movie</h2>
                        </div>
                        <ul className={styles.listnavmobile}>
                            {navbar.map((item, index) => (
                            <li key={index}>
                                <Link to={item.link} className="d-flex align-items-center" {...(item.children && { "data-bs-toggle": "collapse" })}>
                                    <i className={`bi ${item.icon}`} style={{marginRight:'10px', fontSize:'20px'}}></i>
                                    {item.name} 
                                    {item.children && <div className="flex-1 d-flex justify-content-end"><i className="bi bi-chevron-down fs-6"></i></div>}
                                </Link>
                                {item.children &&
                                <ul id={item.id} className={`${styles.submenumobile} collapse`}>
                                    {item.children.map((child, index) => (
                                        <li key={index}><Link className="text-white" to={`/tim-kiem?${item.name == "Thể loại" ? "category" : 'country'}=${child.name}`}>{child.name}</Link></li>
                                    ))}
                                </ul>}
                            </li>
                            ))}
                        </ul>
                    </Sidebar>
                    <div className="d-flex align-items-center gap-2">
                        {(!user) ? <Link to="/user/login" title="Đăng nhập"><i className={`${styles.user} bi bi-person-circle`}></i></Link>
                        :  <>
                        <div className="dropdown">
                            <button className="btn p-0 btn-transparent d-flex align-items-center gap-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img width="50px" height="50px" src={`/api/avatars/${JSON.parse(user).avatar}`} alt="avatar" className={`${styles.user} rounded-5`}></img>
                                <i className="bi bi-chevron-down text-white"></i>
                            </button>
                            <ul className="dropdown-menu bg-secondary">
                                <li><Link className="dropdown-item text-white" to="/tai-khoan">Tài khoản</Link></li>
                                <li><Link className="dropdown-item text-white" to="/xem-sau">Xem sau</Link></li>
                                {(JSON.parse(user).role == "admin") && (<li><Link className="dropdown-item text-white" to="/admin/dashboard">Trang quản trị</Link></li>)} 
                                <li><button onClick={() => handleLogOut()} className="dropdown-item text-white">Đăng Xuất</button></li>
                            </ul>
                        </div>
                        </>}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;