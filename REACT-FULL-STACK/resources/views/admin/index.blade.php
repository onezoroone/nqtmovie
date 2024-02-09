<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Dashboard</title>
    <link rel="shortcut icon" href="{{asset('images/logo.png')}}">
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/dataTables.bootstrap4.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/typography.css')}}">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <link rel="stylesheet" href="{{asset('css/responsive.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
</head>
<body>
<!-- loader Start -->
<div id="loading">
    <div id="loading-center">
    </div>
</div>
<!-- Nav bar -->
@include('admin.layout.nav-bar');

<div class="wrapper">
    <!-- Sidebar -->
    <div class="iq-sidebar">
        <div class="iq-sidebar-logo d-flex justify-content-between">
            <a href="/admin" class="header-logo">
                <img src="{{asset('images/logo.png')}}" class="img-fluid rounded-normal" alt="">
                <div class="logo-title">
                    <span class="text-primary text-uppercase">Movie NQT</span>
                </div>
            </a>
            <div class="iq-menu-bt-sidebar">
                <div class="iq-menu-bt align-self-center">
                    <div class="wrapper-menu">
                        <div class="main-circle"><i class="bi bi-list"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="sidebar-scrollbar">
            <nav class="iq-sidebar-menu">
                <ul id="iq-sidebar-toggle" class="iq-menu">
                    <li class="active active-menu"><a href="/admin" class="iq-waves-effect"><i class="bi bi-house-door-fill"></i><span>Dashboard</span></a></li>
                    <li><a href="admin/user" class="iq-waves-effect"><i class="bi bi-people-fill"></i><span>User</span></a></li>
                    <li>
                        <a href="#category" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i class="bi bi-tags-fill"></i><span>Category</span><i class="bi bi-caret-right-fill iq-arrow-right"></i></a>
                        <ul id="category" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                            <li><a href="{{route('category.create')}}"><i class="bi bi-plus-circle-fill"></i>Add Category</a></li>
                            <li><a href="/admin/category"><i class="bi bi-eye-fill"></i>Category List</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#movie" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i class="bi bi-film"></i><span>Movie</span><i class="bi bi-caret-right-fill iq-arrow-right"></i></i></a>
                        <ul id="movie" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                            <li><a href="{{route('movie.create')}}"><i class="bi bi-plus-circle-fill"></i>Add Movie</a></li>
                            <li><a href="/admin/movie"><i class="bi bi-eye-fill"></i>Movie List</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

        <!-- Page Content  -->
    <div id="content-page" class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-sm-6 col-lg-6 col-xl-3">
                            <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div class="iq-card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="iq-cart-text text-capitalize">
                                            <p class="mb-0">Users</p>
                                        </div>
                                        <div class="icon iq-icon-box-top rounded-circle bg-primary">
                                            <i class="bi bi-people-fill"></i>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center mt-3">
                                        <h2 class="mb-0">{{$countUser}}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-6 col-xl-3">
                            <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div class="iq-card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="iq-cart-text text-capitalize">
                                            <p class="mb-0 font-size-14">Movies</p>
                                        </div>
                                        <div class="icon iq-icon-box-top rounded-circle bg-warning">
                                            <i class="bi bi-film"></i>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center mt-3">
                                        <h2 class="mb-0">{{$countMovie}}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-6 col-xl-3">
                            <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div class="iq-card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="iq-cart-text text-capitalize">
                                            <p class="mb-0 font-size-14">Categories</p>
                                        </div>
                                        <div class="icon iq-icon-box-top rounded-circle bg-info">
                                            <i class="bi bi-tags-fill"></i>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center mt-3">
                                        <h2 class=" mb-0">{{$countCate}}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-6 col-xl-3">
                            <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div class="iq-card-body">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="iq-cart-text text-uppercase">
                                            <p class="mb-0 font-size-14">Total Views</p>
                                        </div>
                                        <div class="icon iq-icon-box-top rounded-circle bg-success">
                                            <i class="bi bi-eye-fill"></i>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-center mt-3">
                                        <h2 class=" mb-0">{{$totalView}}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

{{--                    Movie Trending--}}
                    <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between align-items-center">
                            <div class="iq-header-title">
                                <h4 class="card-title">Top Movie Trending </h4>
                            </div>
                            <div id="top-rated-item-slick-arrow" class="slick-aerrow-block  iq-rtl-direction"></div>
                        </div>
                        <div class="iq-card-body">
                            <ul class="list-unstyled row top-rated-item mb-0 iq-rtl-direction">
                                @foreach($movies as $movie)
                                <li class="col-sm-6 col-lg-4 col-xl-3 iq-rated-box">
                                    <div class="iq-card mb-0">
                                        <div class="iq-card-body p-0">
                                            <div class="iq-thumb">
                                                <a href="javascript:void(0)">
                                                    <img src="{{$movie->img}}" style="height: 250px !important" class="img-fluid w-100 img-border-radius" alt="">
                                                </a>
                                            </div>
                                            <div class="iq-feature-list">
                                                <h6 class="font-weight-600 mb-0">{{$movie->name}}</h6>
                                                <p class="mb-0 mt-2"></p>
                                                <div class="d-flex align-items-center my-2 iq-ltr-direction">
                                                    <p class="mb-0 mr-2"><i class="bi bi-eye-fill mr-1"></i>{{$movie->views}} Views</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
                <!--                User of Product-->
                <div class="col-lg-4">
                    <div class="iq-card iq-card iq-card-block iq-card-stretch iq-card-height">
                        <div class="iq-card-header">
                            <div class="iq-header-title">
                                <h4 class="card-title text-center">User's Of Product</h4>
                            </div>
                        </div>
                        <div class="iq-card-body pb-0">
                            <div id="view-chart-01">
                            </div>
                            <div class="row mt-1">
                                <div class="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                    <div class="iq-card">
                                        <div class="iq-card-body">
                                            <div class="media align-items-center">
                                                <div class="iq-user-box bg-primary"></div>
                                                <div class="media-body text-white">
                                                    <p class="mb-0 font-size-14 line-height">New <br>
                                                        Customer
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                    <div class="iq-card">
                                        <div class="iq-card-body">
                                            <div class="media align-items-center">
                                                <div class="iq-user-box bg-warning"></div>
                                                <div class="media-body text-white">
                                                    <p class="mb-0 font-size-14 line-height">Exsisting <br>
                                                        Subscriber's
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                    <div class="iq-card">
                                        <div class="iq-card-body">
                                            <div class="media align-items-center">
                                                <div class="iq-user-box bg-info"></div>
                                                <div class="media-body text-white">
                                                    <p class="mb-0 font-size-14 line-height">Daily<br>
                                                        Visitor's
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-3 col-lg-6 iq-user-list">
                                    <div class="iq-card">
                                        <div class="iq-card-body">
                                            <div class="media align-items-center">
                                                <div class="iq-user-box bg-danger"></div>
                                                <div class="media-body text-white">
                                                    <p class="mb-0 font-size-14 line-height">Extented <br>
                                                        Subscriber's
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

            <!--             Category-->
            <div class="row">
                <div class="col-sm-12  col-lg-4">
                    <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                        <div class="iq-card-header d-flex align-items-center justify-content-between">
                            <div class="iq-header-title">
                                <h4 class="card-title">Categories</h4>
                            </div>
                        </div>
                        <div class="iq-card-body p-0">
                            <div id="view-chart-03"></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                        <div class="iq-card-header d-flex align-items-center justify-content-between">
                            <div class="iq-header-title">
                                <h4 class="card-title">Top Category</h4>
                            </div>
                            <div class="iq-card-header-toolbar d-flex align-items-center seasons">
                                <div class="iq-custom-select d-inline-block sea-epi s-margin">
                                    <select name="cars" class="form-control season-select">
                                        <option value="season1">Today</option>
                                        <option value="season2">This Week</option>
                                        <option value="season2">This Month</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="iq-card-body row align-items-center">
                            <div class="col-lg-7">
                                <div class="row list-unstyled mb-0 pb-0">
                                    <div class="col-sm-6 col-md-4 col-lg-6 mb-3">
                                        <div class="iq-progress-bar progress-bar-vertical iq-bg-primary">
                                            <span class="bg-primary" data-percent="100" style="transition: height 2s ease 0s; width: 100%; height: 40%;"></span>
                                        </div>
                                        <div class="media align-items-center">
                                            <div class="iq-icon-box-view rounded mr-3 iq-bg-primary"><i class="las la-film font-size-32"></i></div>
                                            <div class="media-body text-white">
                                                <h6 class="mb-0 font-size-14 line-height">Actions</h6>
                                                <small class="text-primary mb-0">+34%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-4 col-lg-6 mb-3">
                                        <div class="iq-progress-bar progress-bar-vertical iq-bg-secondary">
                                            <span class="bg-secondary" data-percent="100" style="transition: height 2s ease 0s; width: 100%; height: 70%;"></span>
                                        </div>
                                        <div class="media align-items-center">
                                            <div class="iq-icon-box-view rounded mr-3 iq-bg-secondary"><i class="las la-laugh-squint font-size-32"></i></div>
                                            <div class="media-body text-white">
                                                <p class="mb-0 font-size-14 line-height">Comedy</p>
                                                <small class="text-secondary mb-0">+44%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-4 col-lg-6 mb-3">
                                        <div class="iq-progress-bar progress-bar-vertical iq-bg-info">
                                            <span class="bg-info" data-percent="100" style="transition: height 2s ease 0s; width: 100%; height: 40%;"></span>
                                        </div>
                                        <div class="media align-items-center">
                                            <div class="iq-icon-box-view rounded mr-3 iq-bg-info"><i class="las la-skull-crossbones font-size-32"></i></div>
                                            <div class="media-body text-white">
                                                <p class="mb-0 font-size-14 line-height">Horror</p>
                                                <small class="text-info mb-0">+56%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-4 col-lg-6 mb-3">
                                        <div class="iq-progress-bar progress-bar-vertical iq-bg-warning">
                                            <span class="bg-warning" data-percent="100" style="transition: height 2s ease 0s; width: 40%; height: 40%;"></span>
                                        </div>
                                        <div class="media align-items-center">
                                            <div class="iq-icon-box-view rounded mr-3 iq-bg-warning"><i class="las la-theater-masks font-size-32"></i></div>
                                            <div class="media-body text-white">
                                                <p class="mb-0 font-size-14 line-height">Drama</p>
                                                <small class="text-warning mb-0">+65%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-4 col-lg-6 mb-lg-0 mb-3">
                                        <div class="iq-progress-bar progress-bar-vertical iq-bg-success">
                                            <span class="bg-success" data-percent="100" style="transition: height 2s ease 0s; width: 60%; height: 60%;"></span>
                                        </div>
                                        <div class="media align-items-center mb-lg-0 mb-3">
                                            <div class="iq-icon-box-view rounded mr-3 iq-bg-success"><i class="las la-child font-size-32"></i></div>
                                            <div class="media-body text-white">
                                                <p class="mb-0 font-size-14 line-height">Kids</p>
                                                <small class="text-success mb-0">+74%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-4 col-lg-6  mb-lg-0 mb-3">
                                        <div class="iq-progress-bar progress-bar-vertical iq-bg-danger">
                                            <span class="bg-danger" data-percent="100" style="transition: height 2s ease 0s; width: 80%; height: 80%;"></span>
                                        </div>
                                        <div class="media align-items-center">
                                            <div class="iq-icon-box-view rounded mr-3 iq-bg-danger"><i class="las la-grin-beam font-size-32"></i></div>
                                            <div class="media-body text-white">
                                                <p class="mb-0 font-size-14 line-height">Thrilled</p>
                                                <small class="text-danger mb-0">+40%</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div id="view-chart-02" class="view-cahrt-02"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('admin.layout.footer')
<script src="{{asset('js/jquery.min.js')}}"></script>
<script src="{{asset('js/popper.min.js')}}"></script>
<script src="{{asset('js/bootstrap.min.js')}}"></script>
<script src="{{asset('js/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('js/dataTables.bootstrap4.min.js')}}"></script>
<script src="{{asset('js/jquery.appear.js')}}"></script>
<script src="{{asset('js/countdown.min.js')}}"></script>
<script src="{{asset('js/select2.min.js')}}"></script>
<script src="{{asset('js/waypoints.min.js')}}"></script>
<script src="{{asset('js/jquery.counterup.min.js')}}"></script>
<script src="{{asset('js/wow.min.js')}}"></script>
<script src="{{asset('js/slick.min.js')}}"></script>
<script src="{{asset('js/owl.carousel.min.js')}}"></script>
<script src="{{asset('js/jquery.magnific-popup.min.js')}}"></script>
<script src="{{asset('js/smooth-scrollbar.js')}}"></script>
<script src="{{asset('js/apexcharts.js')}}"></script>
<script src="{{asset('js/chart-custom.js')}}"></script>
<script src="{{asset('js/custom.js')}}"></script>
</body>
</html>
