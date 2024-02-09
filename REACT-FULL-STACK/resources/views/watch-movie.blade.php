@foreach($MDetails as $movie)
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Xem phim {{$movie->name}} Tập {{$movie->ep_number}}</title>
    <link rel="shorcut icon" href="{{asset('images/logo.png')}}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://ik.imagekit.io/vi6fma9xb/CSS,JS/index.css">
    <link rel="stylesheet" href="{{'css/owl.carousel.min.css'}}">
</head>
<body style="background: #21182E">
<div class="main">
    @include('layouts.sidebar')

    <div class="main-content p-0 m-0">
        <div class="header w-100">
            <a href="/" class="position-fixed logobrand text-white"><img src="{{'images/jack.png'}}" alt="" width="auto" height="50"></a>
            <a class="position-fixed toggle" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><i class="bi bi-list text-white p-0"></i></a>
        </div>
        <div class="container">
            <div class="row p-3">
                <div class="col-xl-3">
                    <img src="{{$movie->img}}" width="240" height="auto" alt="">
                </div>
                <div class="banner-content col-xl-9">
                    <h1 class="detail-name text-white">{{$movie->name}}</h1>
                    <div class="details-info" style="margin-top: 21px; margin-bottom: 9px">
                        <div class="rating-result">
                                <span><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>
                                </span>
                        </div>
                        <div class="jws-imdb">8.2</div>
                        <div class="jws-view"><i class="bi bi-eye"></i> {{$movie->views}} Views</div>
                    </div>
                    <div class="details-info2 mb-2 text-white">
                        <span class="video-years">{{$movie->year}}</span> &numsp; &centerdot; &numsp; <span class="video-time">{{$movie->time}}</span>
                        <span class="video-badge">{{$movie->type}}</span>
                    </div>
                    <div class="details-info2 mb-2 text-white">
                        <span>Chất Lượng: </span> <span>{{$movie->quality}}</span>&numsp; &centerdot;&numsp;
                        <span>Trạng Thái: </span> <span>{{$movie->status}}</span>
                    </div>
                    <div class="details-category mb-2 text-white">
                        @foreach($categories as $category)
                        <a href="/filter?category={{$category->id_cate}}">{{$category->category}}</a>&blacktriangleright;
                        @endforeach
                    </div>
                </div>
            </div>
            <div class="episodes-top row mt-4" style="margin-bottom: 65px">
                <div class="col-xl-9">
                    <div class="video-container m-0" style="position:relative;overflow:hidden;padding-bottom:56.25%">
                        <iframe src="{{$movie->ep_link}}" width="100%" height="100%" frameborder="0"
                                scrolling="auto" style="position:absolute; top: 0; left: 0" allowfullscreen>
                        </iframe>
                    </div>
                </div>
                <div class="col-xl-3">
                @php
                    $currentEpisode = $movie->ep_number;
                @endphp
                @if(is_numeric($currentEpisode))
                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        @php $currentPage = ceil($currentEpisode / 50) - 1;@endphp
                        @for ($i = 0; $i < $totalPages; $i++)
                            @php
                                $startEpisode = ($i * 50) + 1;
                                $endEpisode = min(($i + 1) * 50, $totalEpisodes);
                            @endphp
                        <li class="nav-item" role="presentation">
                            <button class="nav-link {{ $currentPage == $i ? 'active' : '' }} text-white" id="pills-{{ $i }}-tab" data-bs-toggle="pill" data-bs-target="#pills-{{ $i }}" type="button" role="tab" aria-controls="pills-{{ $i }}" aria-selected="{{ $i === 0 ? 'true' : 'false' }}">{{ $startEpisode }}-{{ $endEpisode }}</button>
                        </li>
                        @endfor
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        @for ($i = 0; $i < $totalPages; $i++)
                            <div class="tab-pane fade{{ $currentPage == $i ? ' show active' : '' }}" id="pills-{{ $i }}" role="tabpanel" aria-labelledby="pills-{{ $i }}-tab">
                            <div class="list-episodes position-relative" style="height: 480px;">
                                <div class="episodes-content" style="position: absolute; height: 100%; width: 100%; top: 0; overflow-y: auto; overflow-x: hidden;">
                                    @php
                                        $currentEpisode = $movie->ep_number;
                                        $startEpisode = ($i * 50) + 1;
                                        $endEpisode = min(($i + 1) * 50, $totalEpisodes);
                                    @endphp
                                    @foreach($epsmovie->whereBetween('ep_number', [$startEpisode, $endEpisode]) as $ep)
                                    <div class="episode-item {{ $currentEpisode == $ep->ep_number ? ' active' : '' }}" style="margin-bottom: 15px !important; padding-right: 5px">
                                        <div class="post-inner">
                                            <a href="{{ route('watchMovie', ['name' => Str::slug($movie->name),'ep' => $ep->ep_number, 'id'=>$movie->movie_id ]) }}" class="" onclick="increaseViews({{$movie->movie_id}})">
                                                <div class="post-media" style="border-radius: 5px;max-width: 150px;display: inline-block; vertical-align: middle; overflow: hidden; position: relative">
                                                    <img src="{{$movie->poster}}" alt="" style="object-fit: cover; transition: .5s all; width: 100%; border-style: none;max-width: 100%;height: auto;will-change: tranform;">
                                                    <span class="time" style="background-color: rgba(0,3,28,.4); border-radius: 20px; color: #fff; position: absolute; bottom: 5px; left: 7px; padding: 2px 5px; font-size: 12px;">
                                                        <i class="bi bi-play-circle" style="font-size: 16px; margin-right: 5px"></i>23:00
                                                    </span>
                                                </div>
                                                <div class="episodes-info" style="width: calc(100% - 155px);display: inline-block;padding-left: 8px; vertical-align: middle">
                                                    <h6 class="episode-number text-white">
                                                        Tập {{$ep->ep_number}}
                                                    </h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    @endforeach
                                </div>
                            </div>
                            @endfor
                        </div>
                    </div>
                    @else
                        <div class="list-episodes position-relative" style="height: 480px;">
                            <div class="episodes-content" style="position: absolute; height: 100%; width: 100%; top: 0; overflow-y: auto; overflow-x: hidden;">
                                <div class="episode-item active" style="margin-bottom: 15px !important; padding-right: 5px">
                                    <div class="post-inner">
                                        <a href="#" class="" onclick="increaseViews({{$movie->movie_id}})">
                                            <div class="post-media" style="border-radius: 5px;max-width: 150px;display: inline-block; vertical-align: middle; overflow: hidden; position: relative">
                                                <img src="{{$movie->poster}}" alt="" style="object-fit: cover; transition: .5s all; width: 100%; border-style: none;max-width: 100%;height: auto;will-change: tranform;">
                                                <span class="time" style="background-color: rgba(0,3,28,.4); border-radius: 20px; color: #fff; position: absolute; bottom: 5px; left: 7px; padding: 2px 5px; font-size: 12px;">
                                                    <i class="bi bi-play-circle" style="font-size: 16px; margin-right: 5px"></i>120:00
                                                </span>
                                            </div>
                                            <div class="episodes-info" style="width: calc(100% - 155px);display: inline-block;padding-left: 8px; vertical-align: middle">
                                                <h6 class="episode-number text-white">
                                                    MOVIE
                                                </h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif
                </div>
            </div>

            {{--            ------------------------Courasel Suggested-----------------------------}}
            <div class="row mt-5">
                <div class="row">
                    <h4 class="text-white">Đề Xuất Cho Bạn</h4>
                </div>
                <div class="owl-carousel carousel-suggestion owl-theme" style="">
                    @foreach($suggestMovie as $sMovie)
                        <div class="item">
                            <div class="link-movie">
                                <div class="multi-carousel-item m-1 position-relative">
                                    <img src="{{$sMovie->img}}" class="d-block" alt="...">
                                </div>
                                <h5 class="name text-uppercase text-white p-1" style="text-align: center;">
                                    {{$sMovie->name}}
                                </h5>
                                <div class="desciption text-white position-absolute ">
                                    <h4 class="title-name ">
                                        {{$sMovie->name}}
                                    </h4>
                                    <div class="year" style="color: #808080">
                                        {{$sMovie->year}} &centerdot; {{$sMovie->time}}
                                    </div>
                                    <div class="episode-item text-uppercase text-danger">
                                        Tập {{$sMovie->episode}}
                                    </div>
                                    <div class="des-content mt-4" style="">
                                        {{$sMovie->des}}
                                    </div>
                                    <a href="{{route('showDetail', ['name' => Str::slug($sMovie->name), 'id'=>$sMovie->id_movie])}}" class="btn btn-updated d-flex p-2 justify-content-center align-content-center text-uppercase">Xem Ngay
                                        <span class="" style="margin-left: 5px !important"><i class="fs-6 bi bi-play-circle"></i></span></a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            {{-----------------------------------End Carousel Suggested---------------------------------}}




        </div>
        {{--            ---------------------------------Footer---------------------------------}}
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
@endforeach
