<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Quản lý người dùng</title>
    <link rel="shortcut icon" href="{{asset('images/logo.png')}}">
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/dataTables.bootstrap4.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/typography.css')}}">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <link rel="stylesheet" href="{{asset('css/responsive.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</head>
<body>
<!-- loader Start -->
<div id="loading">
    <div id="loading-center">
    </div>
</div>
<!-- loader END -->
<div class="wrapper">
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
                    <li class=""><a href="/admin" class="iq-waves-effect"><i class="bi bi-house-door-fill"></i><span>Dashboard</span></a></li>
                    <li class="active active-menu"><a href="/admin/user" class="iq-waves-effect"><i class="bi bi-people-fill"></i><span>User</span></a></li>
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
    @include('admin.layout.nav-bar');
        <!-- Page Content  -->
    <div id="content-page" class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                            <div class="iq-header-title">
                                <h4 class="card-title">User List</h4>
                            </div>
                        </div>
                        @if(session('success'))
                            <div class="card-footer">
                                <h4 class="card-title text-success"><i class="bi bi-check-circle-fill"></i> Remove Succesful User <strong class="text-danger">{{session('success')}}</strong> !</h4>
                            </div>
                        @endif
                        <div class="iq-card-body">
                            <div class="table-view">
                                <table class="data-tables table movie_table" id="result-table" style="width:100%">
                                    <thead>
                                    <tr>
                                        <th style="width: 5%;"></th>
                                        <th style="width: 10%;">No.</th>
                                        <th style="width: 15%;">Username</th>
                                        <th style="width: 30%;">Email</th>
                                        <th style="width: 20%;">Join Date</th>
                                        <th style="width: 10%;">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        @php($i = 1)
                                        @foreach($users as $user)
                                    <tr>
                                        <td>
                                            <div class="form-check custom-checkbox checkbox-success">
                                                <input type="checkbox" class="form-check-input" id="customCheckBox2" style="width:20px; height:20px">
                                                <label class="form-check-label" for="checkAll"></label>
                                            </div>
                                        </td>
                                        <td>{{$i}}</td>
                                        <td>{{$user->username}}</td>
                                        <td>{{$user->email}}</td>
                                        <td>{{$user->created_at}}</td>
                                        <td>
                                            <div class="flex align-items-center list-user-action">
                                                <a href="" class="iq-bg-primary" data-bs-toggle="modal" data-bs-target="#Modal{{$user->id}}"><i class="bi bi-trash"></i></a>
                                            </div>
                                        </td>
                                    </tr>
                                    <div class="modal fade" id="Modal{{$user->id}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h3 class="modal-title" id="exampleModalLabel">Thông báo</h3>
                                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" style="color:white"><span aria-hidden="true">&times;</span></button>
                                                </div>
                                                <div class="modal-body">
                                                    Bạn có chắc chắn muốn xóa tài khoản <strong style="color:yellow;">{{$user->username}}</strong>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <form action="{{route('user.destroy', $user->id)}}" method="POST">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit" class="btn btn-primary">Submit</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                            @php($i++)
                                        @endforeach
                                    </tbody>
                                </table>
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
