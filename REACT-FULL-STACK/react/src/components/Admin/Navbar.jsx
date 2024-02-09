function Navbar() {
    return (
        <>
        <div className="iq-top-navbar">
            <div className="card flex justify-content-center">
            </div>
         <div className="iq-navbar-custom">
            <nav className="navbar navbar-expand-lg navbar-light p-0">
               <div className="iq-search-bar ml-auto">
                  <form action="#" className="searchbox">
                     <input type="text" className="text search-input" placeholder="Search Here..."/>
                     <a className="search-link" href="#"><i className="bi bi-search"></i></a>
                  </form>
               </div>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"  aria-label="Toggle navigation">
                  <i className="ri-menu-3-line"></i>
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto navbar-list">
                     <li className="nav-item nav-icon search-content">
                        <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                           <i className="ri-search-line"></i>
                        </a>
                        <form action="#" className="search-box p-0">
                           <input type="text" className="text search-input" placeholder="Type here to search..." />
                           <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                        </form>
                     </li>
                     <li className="nav-item nav-icon">
                        <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                            <i className="bi bi-bell-fill"></i>
                            <span className="bg-primary dots"></span>
                        </a>
                        <div className="iq-sub-dropdown">
                           <div className="iq-card shadow-none m-0">
                              <div className="iq-card-body p-0">
                                 <div className="bg-primary p-3">
                                    <h5 className="mb-0 text-white">Thông báo<small className="badge  badge-light float-right pt-1">4</small></h5>
                                 </div>
                                 <a href="#" className="iq-sub-card" >
                                    <div className="media align-items-center">
                                       <div className="">
                                            <i className="bi bi-person-circle"></i>
                                       </div>
                                       <div className="media-body ml-3">
                                          <h6 className="mb-0 ">Hoàng Thanh Tùng</h6>
                                          <small className="float-right font-size-12">Ngay bây giờ</small>
                                          <p className="mb-0">Anh Thắng vip quá</p>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="iq-sub-card" >
                                    <div className="media align-items-center">
                                       <div className="">
                                            <i className="bi bi-person-circle"></i>
                                       </div>
                                       <div className="media-body ml-3">
                                          <h6 className="mb-0 ">Jack</h6>
                                          <small className="float-right font-size-12">5 tiếng trước</small>
                                          <p className="mb-0">Anh Thắng đẳng cấp</p>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="iq-sub-card" >
                                    <div className="media align-items-center">
                                       <div className="">
                                            <i className="bi bi-person-circle avatar-40 rounded"></i>
                                       </div>
                                       <div className="media-body ml-3">
                                          <h6 className="mb-0 ">VCT</h6>
                                          <small className="float-right font-size-12">2 days ago</small>
                                          <p className="mb-0">OK</p>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="iq-sub-card" >
                                    <div className="media align-items-center">
                                       <div className="">
                                            <i className="bi bi-person-circle avatar-40 rounded"></i>
                                       </div>
                                       <div className="media-body ml-3">
                                          <h6 className="mb-0 ">NQT</h6>
                                          <small className="float-right font-size-12">3 days ago</small>
                                          <p className="mb-0">Vip</p>
                                       </div>
                                    </div>
                                 </a>
                              </div>
                           </div>
                        </div>
                     </li>
                     <li className="nav-item nav-icon dropdown">
                        <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                            <i className="bi bi-chat-dots-fill"></i>
                           <span className="bg-primary dots"></span>
                        </a>
                        <div className="iq-sub-dropdown">
                           <div className="iq-card shadow-none m-0">
                              <div className="iq-card-body p-0 ">
                                 <div className="bg-primary p-3">
                                    <h5 className="mb-0 text-white">All Messages<small className="badge  badge-light float-right pt-1">5</small></h5>
                                 </div>
                                 <a href="#" className="iq-sub-card">
                                    <div className="media align-items-center">
                                       <div className="">
                                       <i className="bi bi-person-circle avatar-40 rounded"></i>
                                       </div>
                                       <div className="media-body ml-3">
                                          <h6 className="mb-0 ">Barry Emma Watson</h6>
                                          <small className="float-left font-size-12">13 Jun</small>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="iq-sub-card">
                                    <div className="media align-items-center">
                                       <div className="">
                                       <i className="bi bi-person-circle avatar-40 rounded"></i>
                                       </div>
                                       <div className="media-body ml-3">
                                          <h6 className="mb-0 ">Lorem Ipsum Watson</h6>
                                          <small className="float-left font-size-12">20 Apr</small>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="iq-sub-card">
                                    <div className="media align-items-center">
                                       <div className="">
                                       <i className="bi bi-person-circle avatar-40 rounded"></i>
                                       </div>
                                       <div className="media-body ml-3">
                                          <h6 className="mb-0 ">Why do we use it?</h6>
                                          <small className="float-left font-size-12">30 Jun</small>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="iq-sub-card">
                                    <div className="media align-items-center">
                                       <div className="">
                                       <i className="bi bi-person-circle avatar-40 rounded"></i>
                                       </div>
                                       <div className="media-body ml-3">
                                          <h6 className="mb-0 ">Variations Passages</h6>
                                          <small className="float-left font-size-12">12 Sep</small>
                                       </div>
                                    </div>
                                 </a>
                                 <a href="#" className="iq-sub-card">
                                    <div className="media align-items-center">
                                       <div className="">
                                       <i className="bi bi-person-circle avatar-40 rounded"></i>
                                       </div>
                                       <div className="media-body ml-3">
                                          <h6 className="mb-0 ">Lorem Ipsum generators</h6>
                                          <small className="float-left font-size-12">5 Dec</small>
                                       </div>
                                    </div>
                                 </a>
                              </div>
                           </div>
                        </div>
                     </li>
                     <li className="line-height pt-3">
                        <a href="#" className="search-toggle iq-waves-effect d-flex align-items-center">
                           <img src="{{asset('images/admin.ico')}}" className="img-fluid rounded-circle mr-3" alt="user" />
                        </a>
                        <div className="iq-sub-dropdown iq-user-dropdown">
                           <div className="iq-card shadow-none m-0">
                              <div className="iq-card-body p-0 ">
                                 <div className="bg-primary p-3">
                                    <h5 className="mb-0 text-white line-height">Admin</h5>
                                 </div>
                                 <div className="d-inline-block w-100 text-center p-3">
                                    <a className="bg-primary iq-sign-btn" href="{{route('logout')}}" role="button">Đăng xuất<i className="ri-login-box-line ml-2"></i></a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </li>
                  </ul>
               </div>
            </nav>
         </div>
      </div>

        </>
    );
}

export default Navbar;
