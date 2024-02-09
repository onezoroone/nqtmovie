import { useState } from "react";
import { Link } from "react-router-dom";
import { Panel } from 'primereact/panel';

function Sidebar() {
    const [activeItem, setActiveItem] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        if(!isSidebarOpen){
            const page = document.getElementById('content-page');
            page.classList.add('content-open');
        }else{
            const page = document.getElementById('content-page');
            page.classList.remove('content-open');
        }
    };
    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
    };
    const templateCategory = (options) => {
        const toggleIcon = options.collapsed ? 'bi-caret-right-fill' : 'bi-caret-down-fill';
        return(
            <a style={{cursor:'pointer'}} onClick={options.onTogglerClick} className="iq-waves-effect collapsed"><i className="bi bi-tags-fill"></i><span>Category Movie</span><i className={`bi ${toggleIcon} iq-arrow-right`}></i></a>
        )
    }
    const templateMovie = (options) => {
        const toggleIcon = options.collapsed ? 'bi-caret-right-fill' : 'bi-caret-down-fill';
        return(
            <a style={{cursor:'pointer'}} onClick={options.onTogglerClick} className="iq-waves-effect collapsed"><i className="bi bi-film"></i><span>Movie</span><i className={`bi ${toggleIcon} iq-arrow-right`}></i></a>
        )
    }
    const templateComic = (options) => {
        const toggleIcon = options.collapsed ? 'bi-caret-right-fill' : 'bi-caret-down-fill';
        return(
            <a style={{cursor:'pointer'}} onClick={options.onTogglerClick} className="iq-waves-effect collapsed"><i className="bi bi-book-half"></i><span>Comic</span><i className={`bi ${toggleIcon} iq-arrow-right`}></i></a>
        )
    }
    const handleMobileToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    return (
        <>
        <div className="iq-menu-bt-sidebar">
            <div className="iq-menu-bt align-self-center">
                <div className="wrapper-menu">
                    <div className="toggle-sidebar1" onClick={handleMobileToggle}><i className="bi bi-list"></i></div>
                </div>
            </div>
        </div>
    <div  className={`iq-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="iq-sidebar-logo d-flex justify-content-between">
            <Link to="/admin/dashboard" className="header-logo" style={{textDecoration:'none'}} onClick={() => handleItemClick(1)}>
                <img src="/logo.png" className="img-fluid rounded-normal" alt="" />
                <div className="logo-title">
                    <span className="text-primary text-uppercase">Movie NQT</span>
                </div>
            </Link>
            <div className="iq-menu-bt-sidebar">
                <div className="iq-menu-bt align-self-center">
                    <div className="wrapper-menu">
                        <div className="main-circle" onClick={toggleSidebar}><i className="bi bi-list"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="sidebar-scrollbar">
            <nav className="iq-sidebar-menu">
                <ul id="iq-sidebar-toggle" className="iq-menu">
                    <li className="iq-menu-bt-sidebar">
                        <div className="iq-menu-bt align-self-center">
                            <div className="wrapper-menu">
                                <div className="toggle-sidebar" onClick={toggleSidebar}><i className="bi bi-list"></i></div>
                            </div>
                        </div>
                    </li>
                    <li className={activeItem === 1 ? 'active active-menu' : ''} onClick={() => handleItemClick(1)}>
                        <Link to="/admin/dashboard" className="iq-waves-effect"><i className="bi bi-house-door-fill"></i><span>Dashboard</span></Link></li>
                    <li className={activeItem === 2 ? 'active active-menu' : ''} onClick={() => handleItemClick(2)}><Link to="/admin/users" className="iq-waves-effect"><i className="bi bi-people-fill"></i><span>User</span></Link></li>
                    <li>
                        <Panel headerTemplate={templateCategory} toggleable collapsed>
                            <li className={activeItem === 3 ? 'active active-menu' : ''} onClick={() => handleItemClick(3)}><Link to="/admin/category/add"><i className="bi bi-plus-circle-fill"></i>Add Category</Link></li>
                            <li className={activeItem === 4 ? 'active active-menu' : ''} onClick={() => handleItemClick(4)}><Link to="/admin/category"><i className="bi bi-eye-fill"></i>Category List</Link></li>
                        </Panel>
                    </li>
                    <li>
                        <Panel headerTemplate={templateMovie} toggleable collapsed>
                            <li className={activeItem === 5 ? 'active active-menu' : ''} onClick={() => handleItemClick(5)}><Link to="/admin/movie/add"><i className="bi bi-plus-circle-fill"></i>Add Movie</Link></li>
                            <li className={activeItem === 6 ? 'active active-menu' : ''} onClick={() => handleItemClick(6)}><Link to="/admin/movies"><i className="bi bi-eye-fill"></i>Movie List</Link></li>
                        </Panel>
                    </li>
                    <li>
                        <Panel headerTemplate={templateComic} toggleable collapsed>
                            <li className={activeItem === 7 ? 'active active-menu' : ''} onClick={() => handleItemClick(7)}><Link to="/admin/comic/add"><i className="bi bi-plus-circle-fill"></i>Add Comic</Link></li>
                            <li className={activeItem === 8 ? 'active active-menu' : ''} onClick={() => handleItemClick(8)}><Link to="/admin/comic"><i className="bi bi-eye-fill"></i>Comic List</Link></li>
                        </Panel>
                    </li>
                    <li className={activeItem === 9 ? 'active active-menu' : ''} onClick={() => handleItemClick(9)}>
                        <Link to="/admin/getcomic" className="iq-waves-effect"><i className="bi bi-rocket-takeoff-fill"></i><span>Crawl</span></Link>
                    </li>
                    <li className={activeItem === 10 ? 'active active-menu' : ''} onClick={() => handleItemClick(10)}>
                        <Link to="/admin/movie/api" className="iq-waves-effect"><i className="bi bi-rocket-takeoff-fill"></i><span>API</span></Link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
        </>
    );
}

export default Sidebar;
