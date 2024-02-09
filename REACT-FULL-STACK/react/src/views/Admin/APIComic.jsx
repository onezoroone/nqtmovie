import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

function APIComic() {
    const [urlTruyenvn, setUrlTruyenvn] = useState('');
    const [urlNettruyen, setUrlNettruyen] = useState('');
    const [urlDoctruyen, setUrlDoctruyen] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitializedTruyenvn, setIsInitializedTruyenvn] = useState(false);
    const [isInitializedNettruyen, setIsInitializedNettruyen] = useState(false);
    const [isInitializedDoctruyen, setIsInitializedDoctruyen] = useState(false);
    const [, setProgress] = useState(0);
    const {setNotification} = useStateContext();
    const handleSubmitTruyenvn = async (e) => {
        e.preventDefault();
        if (isInitializedTruyenvn) {
          setIsLoading(true);
          try {
            await axiosClient.get(`/gettruyenvn/${urlTruyenvn}`, {
                proxy: {
                    protocol: 'https',
                    host: '127.0.0.1',
                    port: 8000,
                  },
            });
          } catch (error) {
            setNotification(`${error}`, 'text-bg-danger', 'bi-patch-check-fill')
          } finally {
            setIsLoading(false);
            setNotification('Crawl truyenvn Successfully', 'text-bg-success', 'bi-patch-check-fill')
          }
        }
      };
      const handleSubmitNettruyen = async (e) => {
        e.preventDefault();
        if (isInitializedNettruyen) {
          setIsLoading(true);
          try {
            await axiosClient.get(`/getnettruyen/${urlNettruyen}`, {
                onDownloadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percentCompleted);
                  },
                });
          } catch (error) {
            setNotification(`${error}`, 'text-bg-danger', 'bi-patch-check-fill')
          } finally {
            setIsLoading(false);
            setNotification('Crawl nettruyen Successfully', 'text-bg-success', 'bi-patch-check-fill')
          }
        }
      };
      const handleSubmitDoctruyen = async (e) => {
        e.preventDefault();
        if (isInitializedDoctruyen) {
          setIsLoading(true);
          try {
            await axiosClient.get(`/getdoctruyen/${urlDoctruyen}`, {
                onDownloadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percentCompleted);
                  },
                });
          } catch (error) {
            setNotification(`${error}`, 'text-bg-danger', 'bi-patch-check-fill')
          } finally {
            setIsLoading(false);
            setNotification('Crawl doctruyen Successfully', 'text-bg-success', 'bi-patch-check-fill')
          }
        }
      };
      useEffect(() => {
        document.title = "Crawl Comic"
      },[])
      useEffect(() => {
        if (urlTruyenvn !== '') {
            setIsInitializedTruyenvn(true);
        }else{
            setIsInitializedTruyenvn(false)
        }
      }, [urlTruyenvn]);
      useEffect(() => {
        if (urlNettruyen !== '') {
            setIsInitializedNettruyen(true);
        }else{
            setIsInitializedNettruyen(false)
        }
      }, [urlNettruyen]);
      useEffect(() => {
        if (urlDoctruyen !== '') {
            setIsInitializedDoctruyen(true);
        }else{
            setIsInitializedDoctruyen(false)
        }
      }, [urlDoctruyen]);
    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Crawl Truyenvn</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form onSubmit={handleSubmitTruyenvn}>
                                        <div className="form-group mb-4">
                                            <input type="text" value={urlTruyenvn} onChange={(e) => setUrlTruyenvn(e.target.value)} className="form-control" disabled={isLoading}  placeholder="Nhập url" required/>
                                        </div>
                                        <div className="form-group">
                                            {isLoading ? (
                                            <button type="submit" className="btn btn-primary" disabled style={{position:'relative'}}>
                                                    <span className="loader"></span><span style={{color: 'transparent'}}>Crawl</span>
                                            </button>
                                            ) : (
                                            <button type="submit" className={`btn btn-primary`}>Crawl</button>
                                            )}
                                            <Link to="" className="btn btn-danger" style={{marginLeft: '10px'}}>Đóng</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Crawl Nettruyen</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form onSubmit={handleSubmitNettruyen}>
                                        <div className="form-group mb-4">
                                            <input type="text" value={urlNettruyen} onChange={(e) => setUrlNettruyen(e.target.value)} className="form-control" disabled={isLoading}  placeholder="Nhập url" required/>
                                        </div>
                                        <div className="form-group">
                                            {isLoading ? (
                                            <button type="submit" className="btn btn-primary" disabled style={{position:'relative'}}>
                                                    <span className="loader"></span><span style={{color: 'transparent'}}>Crawl</span>
                                            </button>
                                            ) : (
                                            <button type="submit" className={`btn btn-primary`}>Crawl</button>
                                            )}
                                            <Link to="" className="btn btn-danger" style={{marginLeft: '10px'}}>Đóng</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Crawl Doctruyen3Q</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form onSubmit={handleSubmitDoctruyen}>
                                        <div className="form-group mb-4">
                                            <input type="text" value={urlDoctruyen} onChange={(e) => setUrlDoctruyen(e.target.value)} className="form-control" disabled={isLoading}  placeholder="Nhập url" required/>
                                        </div>
                                        <div className="form-group">
                                            {isLoading ? (
                                            <button type="submit" className="btn btn-primary" disabled style={{position:'relative'}}>
                                                    <span className="loader"></span><span style={{color: 'transparent'}}>Crawl</span>
                                            </button>
                                            ) : (
                                            <button type="submit" className={`btn btn-primary`}>Crawl</button>
                                            )}
                                            <Link to="" className="btn btn-danger" style={{marginLeft: '10px'}}>Đóng</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default APIComic;
