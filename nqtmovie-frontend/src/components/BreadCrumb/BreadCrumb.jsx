import { useEffect } from "react";
import styles from "./breadcrumb.module.css";
import { Link } from "react-router-dom";
function BreadCrumb({data}) {
    useEffect(()=>{
        const breadcrumbLinks = document.querySelectorAll('.breadcrumb span');
        if(breadcrumbLinks){
            const lastBreadcrumbLink = breadcrumbLinks[breadcrumbLinks.length - 1];
            lastBreadcrumbLink.classList.add('d-none');
            const breadcrumbactive = document.querySelectorAll('.breadcrumb a');
            const lastBreadcrumbactive = breadcrumbactive[breadcrumbactive.length - 1];
            lastBreadcrumbactive.classList.remove('text-secondary')
            lastBreadcrumbactive.classList.add('text-white')
        }
    },[])
    return ( 
        <div className={`${styles.breadcrumb} breadcrumb`}>
            {data && data.map((item, index) => (
                <div key={index}>
                    <Link className="text-secondary" to={item.link}>{item.name}</Link>
                    <span className={`${styles.icon}`}></span>
                </div>
            ))}
        </div>
    );
}

export default BreadCrumb;