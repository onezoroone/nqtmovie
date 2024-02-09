<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Sửa phim</title>
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
                    <li><a href="/admin/user" class="iq-waves-effect"><i class="bi bi-people-fill"></i><span>User</span></a></li>
                    <li>
                        <a href="#category" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i class="bi bi-tags-fill"></i><span>Category</span><i class="bi bi-caret-right-fill iq-arrow-right"></i></a>
                        <ul id="category" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                            <li><a href="{{route('category.create')}}"><i class="bi bi-plus-circle-fill"></i>Add Category</a></li>
                            <li><a href="/admin/category"><i class="bi bi-eye-fill"></i>Category List</a></li>
                        </ul>
                    </li>
                    <li class="">
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
</div>
@include('admin.layout.nav-bar')
    <!-- Page Content  -->
<div id="content-page" class="content-page">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="iq-card">
                    <div class="iq-card-header d-flex justify-content-between">
                        <div class="iq-header-title">
                            <h4 class="card-title">Thông tin phim</h4>
                        </div>
                    </div>
                    @if(session('success'))
                    <div class="card-footer">
                        <h4 class="card-title text-success"><i class="bi bi-check-circle-fill"></i> Edit Successful Movie <strong class="text-danger">{{session('success')}}</strong> !</h4>
                    </div>
                    @endif
                    @if(session('error'))
                    <div class="card-footer">
                        <h4 class="card-title text-warning"><i class="bi bi-exclamation-circle-fill"></i> Error When Editing Movie <strong style="color: red">{{session('error')}}</strong> !</h4>
                    </div>
                    @endif
                    <div class="iq-card-body">
                        <form action="{{route('movie.update', $movie->id)}}" method="POST" enctype="multipart/form-data">
                            @csrf
                            @method('PUT')
                            <div class="row">
                                <div class="col-lg-10">
                                    <div class="row">
                                        <input type="hidden" name="id" value="{{$movie->id}}">
                                        <div class="col-12 form-group input-group-lg">
                                            <input type="text" class="form-control" name="name" placeholder="Tên phim" value="{{$movie->name}}" required>
                                        </div>
                                        <div class="col-12 form-group">
                                            <input type="text" class="form-control" name="othername" value="{{$movie->othername}}" placeholder="Tên khác">
                                        </div>
                                        <div class="col-lg-10 form-group">
                                            <select class="form-control select2 select2-multiple" name="category[]" multiple="multiple" required>
                                                @foreach($categories as $category)
                                                    @php($isSelected = in_array($category->id,
                                                            array_map(function($movie) {return $movie->id_cate;}, $cateMovie)) ? 'selected' : '')
                                                    <option value="<?= $category->id ?>" {{$isSelected}}>{{$category->category}}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="col-12 form-group">
                                            <textarea id="text" name="des" rows="5" class="form-control" placeholder="Nội dung">{{$movie->des}}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2">
                                    <div class="d-block position-relative">
                                        <div class="form__img form-control">
                                            <label for="form__img-upload" id="img_label">Upload Image</label>
                                            <input id="form__img-upload" name="form__img-upload" type="file" value="{{$movie->img}}" accept=".png, .jpg, .jpeg">
                                            <img id="form__img" src="{{$movie->img}}" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2 form-group">
                                    <input type="text" name="year" value="{{$movie->year}}" class="form-control" placeholder="Năm sản xuất">
                                </div>
                                <div class="col-sm-2 form-group">
                                    <input type="text" name="episode" value="{{$movie->episode}}" class="form-control" placeholder="Tập phim">
                                </div>
                                <div class="col-sm-2 form-group">
                                    <input type="text" name="time" class="form-control" value="{{$movie->time}}" placeholder="Thời lượng">
                                </div>
                                <div class="col-sm-6 form-group">
                                    <input type="text" name="trailer" class="form-control" value="{{$movie->trailer}}" placeholder="Trailer">
                                </div>
                                <div class="col-sm-6 form-group">
                                    <input type="text" name="actor" class="form-control" value="{{$movie->actor}}" placeholder="Đạo diễn">
                                </div>
                                <div class="col-sm-2 form-group">
                                    <select class="form-control" name="quality">
                                        <option disabled="">Choose quality</option>
                                        <option @if($movie->quality == 'Full HD') selected @endif>Full HD</option>
                                        <option @if($movie->quality == 'HD') selected @endif>HD</option>
                                    </select>
                                </div>
                                <div class="col-sm-2 form-group">
                                    <select class="form-control" name="type">
                                        <option @if($movie->type == 'Phim bộ') selected @endif>Phim bộ</option>
                                        <option @if($movie->type == 'Phim lẻ') selected @endif>Phim lẻ</option>
                                    </select>
                                </div>
                                <div class="col-sm-2 form-group">
                                    <input type="text" class="form-control" value="{{$movie->status}}" name="status" placeholder="Trạng thái">
                                </div>
                                <div class="col-12">
                                    <div class="d-block position-relative">
                                        <div class="form__pos form-control">
                                            <label for="form__pos-upload">Poster</label>
                                            <input type="hidden" value="{{$movie->poster}}" name="current_image">
                                            <input type="file" value="{{$movie->poster}}" name="form__pos-upload" id="form__pos-upload" accept=".png, .jpg, .jpeg">
                                            <img id="form__pos" src="{{$movie->poster}}" alt="">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 form-group ">
                                    <button type="submit" name="btn-edit" class="btn btn-primary">Lưu</button>
                                    <a href="{{route('episodes', ['id'=>$movie->id])}}" class="btn btn-success">Quản lý tập phim</a>
                                    <a href="/admin/movie" class="btn btn-danger">Đóng</a>
                                </div>
                            </div>
                        </form>
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
