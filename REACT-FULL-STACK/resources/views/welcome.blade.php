<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>NQTMOVIE.ID.VN - ANIME VIETSUB ONLINE</title>
    <meta property="og:title" content="Anime Vietsub Online - NQTMOVIE.ID.VN">
    <meta name="description" content="Xem phim anime vietsub online xem trên điện thoại di động và máy tính nhanh nhất. Là một website xem phim anime vietsub miễn phí tốt nhất. Liên tục cập nhật các anime sớm nhất từ các fansub Việt Nam.">
    <meta name="keywords" content="anime, animetv, anime hay, anime vietsub, anime vietsub online, xem anime, anime tv, download anime vietsub, anime hd, tai anime, anime moi nhat, phim anime, hoat hinh nhat, anime tv">
    <meta property="og:type" content="website">
    <meta property="og:description" content="Xem phim anime vietsub online xem trên điện thoại di động và máy tính nhanh nhất. Là một website xem phim anime vietsub miễn phí tốt nhất. Liên tục cập nhật các anime sớm nhất từ các fansub Việt Nam.">
    <meta property="og:url" content="https://nqtmovie.id.vn/">
    <meta name="language" content="Vietnamese, English">
    <link rel="shorcut icon" href="{{asset('images/logo.png')}}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://ik.imagekit.io/vi6fma9xb/CSS,JS/index.css">
    <link rel="stylesheet" href="{{'css/owl.carousel.min.css'}}">
    <meta name="google-site-verification" content="_JgcoYXmP56NVQ03tsChgkIGJqOQjsgIbZMqKDRhIM0" />
</head>
<body style="background: #21182E">
<div class="main">
    @include('layouts.sidebar')
{{-------------------------------Content-------------------------------}}
    <div class="main-content p-0 m-0">
        {{-------------------------------Header-------------------------------}}
        <div class="header w-100">
            <a href="/" class="position-fixed logobrand text-white"><img src="{{'images/jack.png'}}" alt="" width="auto" height="50"></a>
            <a class="position-fixed toggle" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><i class="bi bi-list text-white p-0"></i></a>
        </div>
        {{-------------------------------End Header-------------------------------}}
        {{-------------------------------Slide-------------------------------}}
        <div class="row">
            <div class="col-12">
            <div class="slide-content">
                <div id="carouselTrending" class="carousel slide" style="user-select: none;">
                    <div class="carousel-inner">
                        @foreach($first as $movie)
                        <div class="carousel-item active position-relative">
                            <div class="video-img position-absolute w-100 h-100" style="background-image: url({{$movie->poster}});"></div>
                            <div class="myvideo position-absolute">
                                <video src="{{$movie->autotrailer}}" class="slider trailer" id="{{'myvideo'. $movie->id}}" loop muted playsinline>
                                </video>
                            </div>
                            <a href="#" onclick="toggleMute('{{'myvideo'. $movie->id}}','{{'iconvideo'. $movie->id}}',event)" class="iconvolume fs-1 text-white"><i id="{{'iconvideo'. $movie->id}}" class="bi bi-volume-mute-fill"></i></a>
                            <div class="overlay"></div>
                            <div class="describe-movie row p-5" style="z-index: 1; position: relative; top: 0">
                                <a href="{{route('showDetail', ['name' => Str::slug($movie->name), 'id'=>$movie->id])}}" class="title text-uppercase text-white col-12" style="font-size: 40px">{{$movie->name}}</a>
                                <p class="text-white mt-3 col-12" style="height: 43px;overflow: hidden"><span class="text-danger">Tên khác:</span> <span>{{$movie->othername}}</span></p>
                                <p class="text-danger">Tập: <span class="text-white">{{$movie->episode}}</span></p>
                                <div class="">
                                    <p class="text-danger">Thể loại:
                                        <span class="genres text-white">&numsp;
                                            @foreach($categoriesf[0] as $categoryf)
                                                <a href="/filter?category={{$categoryf->id_cate}}">{{ $categoryf->category }}</a>,
                                            @endforeach
                                        </span>
                                    </p>
                                </div>
                                <a href="{{route('showDetail', ['name' => Str::slug($movie->name), 'id'=>$movie->id])}}" class="btn text-white btn-watch p-3 d-flex justify-content-center align-content-center text-uppercase">Xem Ngay <span class="" style="margin-left: 5px !important"><i class="fs-6 bi bi-play-circle"></i></span></a>
                            </div>
                        </div>
                        @endforeach
                        @foreach($TMovies as $TMovie)
                        <div class="carousel-item">
                            <div class="video-img" style="background-image: url({{$TMovie->poster}})"></div>
                            <div class="myvideo" style="position: absolute; ">
                                <video src="{{$TMovie->autotrailer}}" class="slider trailer" id="{{'myvideo'. $TMovie->id}}" loop muted playsinline></video>
                            </div>
                            <a href="#" onclick="toggleMute('{{'myvideo'. $TMovie->id}}','{{'iconvideo'. $TMovie->id}}',event)" class="iconvolume fs-1 text-white"><i id="{{'iconvideo'. $TMovie->id}}" class="bi bi-volume-mute-fill"></i></a>
                            <div class="overlay"></div>
                            <div class="describe-movie row p-5" style="z-index: 1; position: relative; top: 0">
                                <a href="{{route('showDetail', ['name' => Str::slug($TMovie->name), 'id'=>$TMovie->id])}}" class="title text-uppercase text-white col-12" style="font-size: 40px">{{$TMovie->name}}</a>
                                <p class="text-white mt-3 col-12" style="height: 43px;overflow: hidden"><span class="text-danger">Tên khác:</span> <span>{{$TMovie->othername}}</span></p>
                                <p class="text-danger">Tập: <span class="text-white">{{$TMovie->episode}}</span></p>
                                <div class="">
                                    <p class="text-danger">Thể loại:
                                        <span class="genres text-white">&numsp;
                                            @php($movieCategories = array())
                                            @php($movieCategories = [])
                                            @foreach($categories as $subArray)
                                                @foreach($subArray as $category)
                                                    @if($category->id_movie == $TMovie->id)
                                                        @php($movieCategories[] = [
                                                            'id_cate' => $category->id_cate,
                                                            'category' => $category->category
                                                        ])
                                                    @endif
                                                @endforeach
                                            @endforeach
                                            @foreach($movieCategories as $category)
                                                <a href="/filter?category={{$category['id_cate']}}">{{ $category['category'] }}</a>,
                                            @endforeach
                                        </span>
                                    </p>
                                </div>
                                <a href="{{route('showDetail', ['name' => Str::slug($TMovie->name), 'id'=>$TMovie->id])}}" class="btn text-white btn-watch p-3 d-flex justify-content-center align-content-center text-uppercase">Xem Ngay <span class="" style="margin-left: 5px !important"><i class="fs-6 bi bi-play-circle"></i></span></a>
                            </div>
                        </div>
                            @endforeach
                    </div>
                    <button class="carousel-control-prev" style="width: 5% !important; height: 5%; top: 50%" type="button" data-bs-target="#carouselTrending" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" style="width: 5% !important;height: 5%;top: 50%" type="button" data-bs-target="#carouselTrending" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            </div>
        </div>
        {{-------------------------------End Slide-------------------------------}}
        {{-------------------------------Movie Updated-------------------------------}}
        <div class="row mt-5">
            <div class="row">
                <h4 class="text-white">Phim Mới Cập Nhật</h4>
            </div>
            <div class="owl-carousel carousel-update owl-theme">
                @foreach ($UMovies as $index => $UMovie)
                <div class="item">
                    <div class="link-movie">
                        <div class="multi-carousel-item m-1 position-relative">
                            <img src="{{$UMovie->img}}" class="d-block" alt="...">
                            <div class="position-absolute text-white rounded p-2 time-stamp" style="">{{$ArrayUpdated[$index]}} phút trước</div>
                        </div>
                        <h5 class="name text-uppercase text-white p-1" style="text-align: center;">
                            {{$UMovie->name}}
                        </h5>
                        <div class="desciption text-white position-absolute ">
                            <h4 class="title-name ">
                                {{$UMovie->name}}
                            </h4>
                            <div class="year" style="color: #808080">
                                {{$UMovie->year}} &centerdot; {{$UMovie->time}}
                            </div>
                            <div class="episode-item text-uppercase text-danger">
                                Tập {{$UMovie->episode}}
                            </div>
                            <div class="des-content mt-4">
                                {{$UMovie->des}}
                            </div>
                            <a href="{{route('showDetail', ['name' => Str::slug($UMovie->name), 'id'=>$UMovie->id])}}" class="btn btn-updated d-flex p-2 justify-content-center align-content-center text-uppercase">Xem Ngay
                                <span class="" style="margin-left: 5px !important"><i class="fs-6 bi bi-play-circle"></i></span></a>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
        <div class="mt-5">
            <div class="m-1 title-ranking d-flex justify-content-between align-items-center">
                <h4 class="d-inline-block text-white">Phim Nổi Bật</h4>
                <div class="d-inline-block">
                    <ul class="nav" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active text-white" id="home-tab" data-bs-toggle="tab" data-bs-target="#nav-day" type="button" role="tab" aria-controls="home" aria-selected="true"><h4>Hôm nay</h4></button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link text-white" id="profile-tab" data-bs-toggle="tab" data-bs-target="#nav-week" type="button" role="tab" aria-controls="profile" aria-selected="false"><h4>Tuần Này</h4></button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link text-white" id="contact-tab" data-bs-toggle="tab" data-bs-target="#nav-month" type="button" role="tab" aria-controls="contact" aria-selected="false"><h4>Tháng này</h4></button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tab-content" id="myTabContent">
                {{--        --------------------------------Daily Ranking----------------------------------}}
                <div class="owl-carousel carousel-top owl-theme tab-pane fade show active" role="tabpanel" id="nav-day" style="display: none;">
                    @php($i=1)
                    @foreach ($DayLists as $dayList)
                        <div class="item">
                            <div class="position-relative">
                                <div class="top-videos-item slider-item">
                                    <div class="top-videos-inner">
                                        <div class="top-number">
                                            {{$i}}
                                        </div>
                                        <div class="position-absolute" style="right: 0">
                                            <a href="{{route('showDetail', ['name' => Str::slug($dayList->name), 'id'=>$dayList->id])}}">
                                                <img class="" alt="" src="{{$dayList->img}}" style="opacity: 1;">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @php($i++)
                    @endforeach
                </div>
                {{--        -------------------------------------Weeky Ranking----------------------------------}}
                <div class="owl-carousel carousel-top owl-theme carousel-week tab-pane fade" role="tabpanel" id="nav-week" style="display: none ">
                    @php($i=1)
                    @foreach ($WeekLists as $weekList)
                        <div class="item">
                            <div class="position-relative">
                                <div class="top-videos-item slider-item">
                                    <div class="top-videos-inner">
                                        <div class="top-number">
                                            {{$i}}
                                        </div>
                                        <div class="position-absolute" style="right: 0">
                                            <a href="{{route('showDetail', ['name' => Str::slug($weekList->name), 'id'=>$weekList->id])}}">
                                                <img class="" alt="" src="{{$weekList->img}}" style="opacity: 1;">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @php($i++)
                    @endforeach
                </div>
                {{--        -------------------------------------Monthly Ranking----------------------------------}}
                <div class="owl-carousel carousel-top owl-theme tab-pane fade" role="tabpanel" id="nav-month" style="display: none">
                    @php($i=1)
                    @foreach ($MonthLists as $monthList)
                        <div class="item">
                            <div class="position-relative">
                                <div class="top-videos-item slider-item">
                                    <div class="top-videos-inner">
                                        <div class="top-number">
                                            {{$i}}
                                        </div>
                                        <div class="position-absolute" style="right: 0">
                                            <a href="{{route('showDetail', ['name' => Str::slug($monthList->name), 'id'=>$monthList->id])}}">
                                                <img class="" alt="" src="{{$monthList->img}}" style="opacity: 1;">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @php($i++)
                    @endforeach
                </div>
            </div>
        </div>
{{--        -------------------------------------List Movie---------------------------------------}}
        <div class="mt-2">
            <div class="row" style="margin-right: 10px">
                <h4 class="text-white col-6">Danh Sách Phim</h4>
                <h4 class="text-white col-6 justify-content-end d-flex"><a href="/viewall" class="viewall">Xem tất cả</a></h4>
            </div>
            <div class="list-movie m-1" style="margin-right: 20px !important;user-select: none;">
                @foreach ($LMovies as $LMovie)
                <div class="movie-box position-relative w-100">
                    <img src="{{$LMovie->img}}" alt="" class="w-100 object-fit-cover" >
                    <h5 class="title-name text-uppercase text-white p-1" style="text-align: center;">
                        {{$LMovie->name}}
                    </h5>
                    <div class="position-absolute box-episode text-white rounded-circle" style="width: 50px; height: 50px; text-align: center;line-height: 50px;">
                        {{$LMovie->episode}}
                    </div>
                    <a href="{{route('showDetail', ['name' => Str::slug($LMovie->name), 'id'=>$LMovie->id])}}" class="position-absolute play-button align-items-center">
                        <div class="position-absolute p-2 rounded title-episode">Lượt xem: {{$LMovie->views}}</div>
                        <i class="bi bi-play-circle fs-1"></i>
                    </a>
                </div>
                @endforeach
            </div>
        </div>

    @include('layouts.footer')

    </div>
</div>
<script src="{{'js/jquery-3.7.1.min.js'}}"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<script src="{{'js/owl.carousel.min.js'}}"></script>
<script src="https://ik.imagekit.io/vi6fma9xb/CSS,JS/index.js?updatedAt=1698570476989"></script>
<script src="{{'js/validate.js'}}"></script>
</body>
</html>
