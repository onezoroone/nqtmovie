import { useEffect, useState } from "react";
import axiosClient from '../../axios-client';
import Loading from "../../components/Loading";
import { useStateContext } from "../../contexts/ContextProvider";
function Dashboard() {
    const [data, setData] = useState(null);
    const [banner, setBanner] = useState('');
    const {setNotification} = useStateContext();
    useEffect(() => {
        document.title = "Dashboard";
        const fetchData = async () => {
            const response = await axiosClient.post('/getTotal')
            setData((response).data)
        }
        fetchData()
    },[])
    if(!data){
        return <Loading></Loading>
    }
    const {movies} = data;
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const payload = {
            link: banner
        }
        axiosClient.post('/editBanner', payload)
        .then((response) => {
            if(response.data == 'success'){
                setNotification(`Cập nhật banner thành công`, 'text-bg-success', 'bi-check-lg')
            }
        })
    }
    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-sm-6 col-lg-6 col-xl-3">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="iq-cart-text text-capitalize">
                                            <p className="mb-0 font-size-16">Users</p>
                                        </div>
                                        <div className="icon iq-icon-box-top rounded-circle bg-primary">
                                            <i className="bi bi-people-fill"></i>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mt-3">
                                        <h2 className="mb-0">{data && data.countUser}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-6 col-xl-3">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="iq-cart-text text-capitalize">
                                            <p className="mb-0 font-size-16">Movies</p>
                                        </div>
                                        <div className="icon iq-icon-box-top rounded-circle bg-warning">
                                            <i className="bi bi-film"></i>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mt-3">
                                        <h2 className="mb-0">{data && data.countMovie}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-6 col-xl-3">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="iq-cart-text text-capitalize">
                                            <p className="mb-0 font-size-16">Comics</p>
                                        </div>
                                        <div className="icon iq-icon-box-top rounded-circle bg-info">
                                            <i className="bi bi-tags-fill"></i>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mt-3">
                                        <h2 className=" mb-0">{data && data.countComic}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-6 col-xl-3">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="iq-cart-text text-uppercase">
                                            <p className="mb-0 font-size-16">Total Views</p>
                                        </div>
                                        <div className="icon iq-icon-box-top rounded-circle bg-success">
                                            <i className="bi bi-eye-fill"></i>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mt-3">
                                        <h2 className=" mb-0">{data && data.totalView}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between align-items-center">
                            <div className="iq-header-title">
                                <h4 className="card-title">Top Movie Trending </h4>
                            </div>
                            <div id="top-rated-item-slick-arrow" className="slick-aerrow-block  iq-rtl-direction"></div>
                        </div>
                        <div className="iq-card-body">
                            <ul className="list-unstyled row top-rated-item mb-0 iq-rtl-direction">
                                {data && movies.map((movie) => (
                                <li className="col-sm-6 col-lg-4 col-xl-3 iq-rated-box" key={movie.id}>
                                    <div className="iq-card mb-0">
                                        <div className="iq-card-body p-0" >
                                            <div className="iq-thumb">
                                                <a href="javascript:void(0)">
                                                    <img src={movie.img} style={{maxHeight: '270px', maxWidth: '300px'}} className="img-fluid w-100 img-border-radius" alt="" />
                                                </a>
                                            </div>
                                            <div className="iq-feature-list">
                                                <h6 className="font-weight-600 mb-0">{movie.name}</h6>
                                                <p className="mb-0 mt-2"></p>
                                                <div className="d-flex align-items-center my-2 iq-ltr-direction">
                                                    <p className="mb-0 mr-2"><i className="bi bi-eye-fill mr-1"></i>{movie.views} Views</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                               ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="iq-card iq-card iq-card-block iq-card-stretch iq-card-height">
                        <div className="iq-card-header">
                            <div className="iq-header-title">
                                <h4 className="card-title text-center">User&apos;s Of Product</h4>
                            </div>
                        </div>
                        <div className="iq-card-body pb-0">
                            <div id="view-chart-01">
                            </div>
                            <div className="row mt-1">
                                <div className="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                    <div className="iq-card">
                                        <div className="iq-card-body">
                                            <div className="media align-items-center">
                                                <div className="iq-user-box bg-primary"></div>
                                                <div className="media-body text-white">
                                                    <p className="mb-0 font-size-14 line-height">New <br />
                                                        Customer
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                    <div className="iq-card">
                                        <div className="iq-card-body">
                                            <div className="media align-items-center">
                                                <div className="iq-user-box bg-warning"></div>
                                                <div className="media-body text-white">
                                                    <p className="mb-0 font-size-14 line-height">
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                    <div className="iq-card">
                                        <div className="iq-card-body">
                                            <div className="media align-items-center">
                                                <div className="iq-user-box bg-info"></div>
                                                <div className="media-body text-white">
                                                    <p className="mb-0 font-size-14 line-height">
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                    <div className="iq-card">
                                        <div className="iq-card-body">
                                            <div className="media align-items-center">
                                                <div className="iq-user-box bg-danger"></div>
                                                <div className="media-body text-white">
                                                    <p className="mb-0 font-size-14 line-height">
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12  col-lg-4">
                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                        <div className="iq-card-header d-flex align-items-center justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Banners</h4>
                            </div>
                        </div>
                        <div className="iq-card-body p-2">
                            <form onSubmit={handleOnSubmit}>
                                <input type="text" value={banner} className="form-control" onChange={(e) => setBanner(e.target.value)} />
                                <button type="submit" className="btn btn-primary mt-2">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                        <div className="iq-card-header d-flex align-items-center justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Top Category</h4>
                            </div>
                            <div className="iq-card-header-toolbar d-flex align-items-center seasons">
                                <div className="iq-custom-select d-inline-block sea-epi s-margin">
                                    <select name="cars" className="form-control season-select">
                                        <option value="season1">Today</option>
                                        <option value="season2">This Week</option>
                                        <option value="season2">This Month</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="iq-card-body row align-items-center">
                            <div className="col-lg-7">
                                <div className="row list-unstyled mb-0 pb-0">
                                    <div className="col-sm-6 col-md-4 col-lg-6 mb-3">
                                        <div className="iq-progress-bar progress-bar-vertical iq-bg-primary">
                                            <span className="bg-primary" data-percent="100" style={{transition: 'height 2s ease 0s', width: '100%', height:'40%'}}></span>
                                        </div>
                                        <div className="media align-items-center">
                                            <div className="iq-icon-box-view rounded mr-3 iq-bg-primary"><i className="las la-film font-size-32"></i></div>
                                            <div className="media-body text-white">
                                                <h6 className="mb-0 font-size-14 line-height">Actions</h6>
                                                <small className="text-primary mb-0">+34%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-6 mb-3">
                                        <div className="iq-progress-bar progress-bar-vertical iq-bg-secondary">
                                            <span className="bg-secondary" data-percent="100" style={{transition: 'height 2s ease 0s', width: '100%', height:'70%'}}></span>
                                        </div>
                                        <div className="media align-items-center">
                                            <div className="iq-icon-box-view rounded mr-3 iq-bg-secondary"><i className="las la-laugh-squint font-size-32"></i></div>
                                            <div className="media-body text-white">
                                                <p className="mb-0 font-size-14 line-height">Comedy</p>
                                                <small className="text-secondary mb-0">+44%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-6 mb-3">
                                        <div className="iq-progress-bar progress-bar-vertical iq-bg-info">
                                            <span className="bg-info" data-percent="100" style={{transition: 'height 2s ease 0s', width: '100%', height:'40%'}}></span>
                                        </div>
                                        <div className="media align-items-center">
                                            <div className="iq-icon-box-view rounded mr-3 iq-bg-info"><i className="las la-skull-crossbones font-size-32"></i></div>
                                            <div className="media-body text-white">
                                                <p className="mb-0 font-size-14 line-height">Horror</p>
                                                <small className="text-info mb-0">+56%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-6 mb-3">
                                        <div className="iq-progress-bar progress-bar-vertical iq-bg-warning">
                                            <span className="bg-warning" data-percent="100" style={{transition: 'height 2s ease 0s', width: '40%', height:'40%'}}></span>
                                        </div>
                                        <div className="media align-items-center">
                                            <div className="iq-icon-box-view rounded mr-3 iq-bg-warning"><i className="las la-theater-masks font-size-32"></i></div>
                                            <div className="media-body text-white">
                                                <p className="mb-0 font-size-14 line-height">Drama</p>
                                                <small className="text-warning mb-0">+65%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-6 mb-lg-0 mb-3">
                                        <div className="iq-progress-bar progress-bar-vertical iq-bg-success">
                                            <span className="bg-success" data-percent="100" style={{transition: 'height 2s ease 0s', width: '60%', height:'60%'}}></span>
                                        </div>
                                        <div className="media align-items-center mb-lg-0 mb-3">
                                            <div className="iq-icon-box-view rounded mr-3 iq-bg-success"><i className="las la-child font-size-32"></i></div>
                                            <div className="media-body text-white">
                                                <p className="mb-0 font-size-14 line-height">Kids</p>
                                                <small className="text-success mb-0">+74%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-6  mb-lg-0 mb-3">
                                        <div className="iq-progress-bar progress-bar-vertical iq-bg-danger">
                                            <span className="bg-danger" data-percent="100" style={{transition: 'height 2s ease 0s', width: '80%', height: '80%'}}></span>
                                        </div>
                                        <div className="media align-items-center">
                                            <div className="iq-icon-box-view rounded mr-3 iq-bg-danger"><i className="las la-grin-beam font-size-32"></i></div>
                                            <div className="media-body text-white">
                                                <p className="mb-0 font-size-14 line-height">Thrilled</p>
                                                <small className="text-danger mb-0">+40%</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div id="view-chart-02" className="view-cahrt-02"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;
