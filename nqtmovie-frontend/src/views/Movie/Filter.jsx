/* eslint-disable react-hooks/exhaustive-deps */
import { RadioButton } from "primereact/radiobutton";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./filter.module.css";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { useSearchParams } from "react-router-dom";
import { Sidebar } from 'primereact/sidebar';
import { Helmet } from "react-helmet";
        
function Filter() {
    const breadcrumb = [
        {
            name:'Trang Chủ',
            link: '/'
        },
        {
            name:'Movies',
            link: '#'
        }
    ];
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [filterData, setFilterData] = useState(null);
    let [searchParams, setSearchParams] = useSearchParams();
    const [ingredient, setIngredient] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [visible, setVisible] = useState(false);
    const itemperPage = 24;
    useEffect(() => {
        const fetch = async () => {
            await axiosClient.get("/movies/getFilter")
            .then((res) => {
                setData(res.data);
                setPage(Math.ceil(res.data.movies.length / itemperPage));
                let filteredData = res.data.movies;
                const nameParam = searchParams.get("name");
                if(nameParam){
                    filteredData = filteredData.filter(movie => 
                        movie.name.toLowerCase().includes(nameParam.toLowerCase()) || 
                        (movie.othername && movie.othername.toLowerCase().includes(nameParam.toLowerCase()))
                    );
                }
                const categoryParam = searchParams.get("category");
                if (categoryParam) {
                    filteredData = filteredData.filter(movie => movie.categories.includes(categoryParam));
                    setIngredient(categoryParam);
                }
                const yearParam = searchParams.get("year");
                if (yearParam) {
                    filteredData = filteredData.filter(movie => movie.year === yearParam);
                    setSelectedYear(yearParam);
                }
                const countryParam = searchParams.get("country");
                if (countryParam) {
                    filteredData = filteredData.filter(movie => movie.country === countryParam);
                    setSelectedCountry(countryParam);
                }
                const typeParam = searchParams.get("type");
                if (typeParam) {
                    filteredData = filteredData.filter(movie => movie.type === typeParam);
                    setSelectedType(typeParam);
                }
                if(filteredData && filteredData.length != 0){
                    setPage(Math.ceil(filteredData.length / itemperPage));
                    setCurrentPage(1);
                }
                setFilterData(filteredData);
            })
        }
        fetch();
        window.scrollTo(0, 0);
    },[])
    useEffect(() => {
        if(data) {
            let filteredData = data.movies;
            const nameParam = searchParams.get("name");
            if(nameParam){
                filteredData = filteredData.filter(movie => 
                    movie.name.toLowerCase().includes(nameParam.toLowerCase()) || 
                    (movie.othername && movie.othername.toLowerCase().includes(nameParam.toLowerCase()))
                );
            }
            const categoryParam = searchParams.get("category");
            if (categoryParam) {
                filteredData = filteredData.filter(movie => movie.categories.includes(categoryParam));
                setIngredient(categoryParam);
            }
            const yearParam = searchParams.get("year");
            if (yearParam) {
                filteredData = filteredData.filter(movie => movie.year === yearParam);
                setSelectedYear(yearParam);
            }
            const countryParam = searchParams.get("country");
            if (countryParam) {
                filteredData = filteredData.filter(movie => movie.country === countryParam);
                setSelectedCountry(countryParam);
            }
            const typeParam = searchParams.get("type");
            if (typeParam) {
                filteredData = filteredData.filter(movie => movie.type === typeParam);
                setSelectedType(typeParam);
            }
            if(filteredData && filteredData.length != 0){
                setPage(Math.ceil(filteredData.length / itemperPage));
                setCurrentPage(1);
            }
            setFilterData(filteredData);
        }
    }, [searchParams]);
    if(!data){
        return <Loading />
    }
    const handleYearClick = (year) => {
        setSelectedYear(year);
        searchParams.set('year', year);
        setSearchParams(searchParams);
        setVisible(false);
    };
    const handleCountryClick = (country) => {
        setSelectedCountry(country);
        searchParams.set('country', country);
        setSearchParams(searchParams);
        setVisible(false);
    }
    const handleCategoryClick = (e, category) => {
        setIngredient(e.value);
        searchParams.set('category', category);
        setSearchParams(searchParams);
        setVisible(false);
    }
    const handleTypeClick = (type) => {
        setSelectedType(type);
        searchParams.set('type', type);
        setSearchParams(searchParams);
        setVisible(false);
    }
    const handleClear = () => {
        setFilterData(null);
        setSelectedYear(null);
        setSelectedCountry(null);
        setIngredient(null);
        setSelectedType(null);
        setVisible(false);
        setSearchParams({});
    }
    const pages = [...Array(page).keys()].map(page => page + 1);
    return (  
        <div className="d-flex flex-column align-items-center mb-5">
            <Helmet>
                <title>{`Tìm Kiếm - ${import.meta.env.VITE_BASE_NAME}`}</title>
            </Helmet>
            <div className={styles.container}>
                <div className="w-100">
                    <BreadCrumb data={breadcrumb} />
                </div>
                <div onClick={() => setVisible(true)} className={styles.btnMobile}>
                    <i className="bi bi-filter-left"></i>Lọc danh sách
                </div>
                <div className="d-flex gap-5">
                    <Sidebar visible={visible} onHide={() => setVisible(false)}>
                        <div>
                            <h3>Thể loại phim</h3>
                            <div className={styles.listcategories}>
                                {data.categories.map((item) => (
                                <div className="d-flex" key={item.id}>
                                    <RadioButton name="category" onChange={(e) => handleCategoryClick(e,item.name)} checked={ingredient === item.name} value={item.name} />
                                    <label htmlFor="ingredient1" className="ml-2">{item.name}</label> 
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3>Năm sản xuất</h3>
                            <div className={styles.listyears}>
                                {data.years.map((item, index)=>(
                                <div onClick={() => handleYearClick(item.year)} className={selectedYear == item.year ? styles.active : ""} key={index}>
                                    <span>{item.year}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3>Quốc gia</h3>
                            <div className={styles.listcountries}>
                                {data.countries.map((item,index) => (
                                <div onClick={() => handleCountryClick(item.country)} className={selectedCountry == item.country ? styles.active : null} key={index}>
                                    <span>{item.country}</span>
                                </div>
                                ))}
                                
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3>Loại Phim</h3>
                            <div className={styles.listtype}>
                                <div onClick={() => handleTypeClick("Phim bộ")} className={selectedType == "Phim bộ" ? styles.active : null}>
                                    Phim bộ
                                </div>
                                <div onClick={() => handleTypeClick("Phim lẻ")} className={selectedType == "Phim lẻ" ? styles.active : null}>
                                    Phim lẻ
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button severity="danger" onClick={() => handleClear()} label="Clear"></Button>
                        </div>
                    </Sidebar>
                    <div className={styles.filter}>
                        <div>
                            <h3>Thể loại phim</h3>
                            <div className={styles.listcategories}>
                                {data.categories.map((item) => (
                                <div className="d-flex" key={item.id}>
                                    <RadioButton name="category" onChange={(e) => handleCategoryClick(e,item.name)} checked={ingredient === item.name} value={item.name} />
                                    <label htmlFor="ingredient1" className="ml-2">{item.name}</label> 
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3>Năm sản xuất</h3>
                            <div className={styles.listyears}>
                                {data.years.map((item, index)=>(
                                <div onClick={() => handleYearClick(item.year)} className={selectedYear == item.year ? styles.active : ""} key={index}>
                                    <span>{item.year}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3>Quốc gia</h3>
                            <div className={styles.listcountries}>
                                {data.countries.map((item,index) => (
                                <div onClick={() => handleCountryClick(item.country)} className={selectedCountry == item.country ? styles.active : null} key={index}>
                                    <span>{item.country}</span>
                                </div>
                                ))}
                                
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3>Loại Phim</h3>
                            <div className={styles.listtype}>
                                <div onClick={() => handleTypeClick("Phim bộ")} className={selectedType == "Phim bộ" ? styles.active : null}>
                                    Phim bộ
                                </div>
                                <div onClick={() => handleTypeClick("Phim lẻ")} className={selectedType == "Phim lẻ" ? styles.active : null}>
                                    Phim lẻ
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button severity="danger" onClick={() => handleClear()} label="Clear"></Button>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className={styles.result}>
                            {!filterData && data.movies.slice((currentPage - 1) * itemperPage, currentPage * itemperPage).map((item) => (
                                <div className={styles.itemContent} key={item.id}>
                                    <Link to={`/${item.slug}`} className="d-flex flex-column gap-2">
                                        <img src={item.img} alt={item.name} title={item.name} />
                                        <div className={styles.content}>
                                            <h6>{item.name}</h6>
                                        </div>
                                        <i className="bi bi-play-circle"></i>
                                    </Link>
                                </div>
                            ))}
                            {(filterData && filterData.length != 0) && filterData.slice((currentPage - 1) * itemperPage, currentPage * itemperPage).map((item) => (
                                <div className={styles.itemContent} key={item.id}>
                                    <Link to={`/${item.slug}`} className="d-flex flex-column gap-2">
                                        <img src={item.img} alt={item.name} title={item.name} />
                                        <div className={styles.content}>
                                            <h6>{item.name}</h6>
                                        </div>
                                        <i className="bi bi-play-circle"></i>
                                    </Link>
                                </div>
                            ))} 
                        </div>
                        {!filterData || filterData.length == 0 && 
                        <div className="text-white w-100 text-center">
                            <h4>Không có kết quả phù hợp.</h4>  
                        </div>}
                        {!filterData || filterData.length != 0 && <div className={styles.pagination}>
                            {currentPage != 1 && 
                            <div onClick={() => setCurrentPage(currentPage - 1)} className={styles.prevPage}>
                                <i className="bi bi-arrow-left"></i> <span>Trang trước</span> 
                            </div>}
                            <div className="d-flex gap-2">
                            {pages.map((page, index) => {
                                if (pages.length > 6) {
                                    if (index === 0 || index === pages.length - 1 || index === currentPage - 1) {
                                        return (
                                            <div onClick={()=> setCurrentPage(index+1)} key={index} className={`${styles.page} ${currentPage == index + 1 && styles.active}`}>
                                                {page}
                                            </div>
                                        )
                                    } else if (index === currentPage || index === currentPage - 2) {
                                        return (
                                            <div key={index} className={`${styles.page}`}>
                                                ...
                                            </div>
                                        )
                                    }
                                } else {
                                    return (
                                        <div onClick={()=> setCurrentPage(index+1)} key={index} className={`${styles.page} ${currentPage == index + 1 && styles.active}`}>
                                            {page}
                                        </div>
                                    )
                                }
                            })}
                            </div>
                            {currentPage != pages.length && 
                            <div onClick={() => setCurrentPage(currentPage + 1)} className={styles.nextPage}>
                                <span>Trang tiếp</span> <i className="bi bi-arrow-right"></i>
                            </div>}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;