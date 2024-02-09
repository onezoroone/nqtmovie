import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import ListMovie from "../../components/Movie/ListMovie";
import { useLocation } from 'react-router-dom';
import Loading from "../../components/Loading";
import Footer from '../../components/Movie/Footer';

function Filter() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);
    const perPage = 16;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const key = searchParams.keys().next().value;
    const searchTerm = searchParams.get(key);
    useEffect(() => {
        const fetchData = async () => {
        try{
            const response = await axiosClient.get(`/filter/${key}=${searchTerm}?page=${currentPage}`)
            setData(response.data.list.data);
            setTotalMovies(response.data.list.total);
        }catch(error){
            console.log(error)
        }
    };
    fetchData();
    document.title = `Kết quả tìm kiếm`
    }, [currentPage, searchTerm, key])
    if(!data){
        return <Loading></Loading>
    }
    const totalPages = Math.ceil(totalMovies / perPage);
    const renderPagination = () => {
        const pagination = [];
        if(totalPages < 7){
            for (let page = 1; page <= totalPages; page++) {
                const isActive = currentPage === page ? 'active' : '';

                    pagination.push(
                        <li key={page} className={`page-item ${isActive}`}>
                            <button className="page-link" onClick={() => setCurrentPage(page)}>
                                {page}
                            </button>
                        </li>
                    );

            }
        }else{
            if (currentPage > 1) {
                pagination.push(
                  <li key="prevPage" className="page-item">
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                      {currentPage - 1}
                    </button>
                  </li>
                );
              }
              pagination.push(
                <li key={currentPage} className="page-item active">
                  <button className="page-link" onClick={() => setCurrentPage(currentPage)}>
                    {currentPage}
                  </button>
                </li>
              );

              for (let page = currentPage + 1; page <= currentPage + 4; page++) {
                if (page <= totalPages) {
                  pagination.push(
                    <li key={page} className="page-item">
                      <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
                      </button>
                    </li>
                  );
                }
              }
        }
        return pagination;
      };
    return (
        <div >
            <div style={{height: '100px'}}></div>
            <div>
                <h1 className="text-white d-flex justify-content-center mb-3">Kết quả tìm kiếm cho &nbsp; <span className="text-uppercase">{searchTerm}</span> </h1>
                <ListMovie LMovies={data}></ListMovie>
                <nav className="d-flex justify-content-center mt-5">
                    <ul className="pagination">
                        <li className="page-item" disabled >
                            <a className="d-block" style={{marginRight: '40px', background: 'rgba(0,3,28,.4)', borderColor: 'rgba(0,3,28,.4)', padding: '0.375rem 0.75rem'}}>Trang {currentPage} / {totalPages}</a>
                        </li>
                        {currentPage > 1 && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Trang trước</button>
                        </li>
                        )}
                        {renderPagination()}
                        {currentPage < totalPages && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Trang sau</button>
                        </li>
                        )}
                    </ul>
                </nav>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Filter;
