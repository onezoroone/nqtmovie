@foreach($Details as $item)
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Xem phim {{$item->name}}</title>
    <link rel="shorcut icon" href="{{asset('images/logo.png')}}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://ik.imagekit.io/vi6fma9xb/CSS,JS/index.css">
    <link rel="stylesheet" href="{{'css/owl.carousel.min.css'}}">
</head>
<body style="background: #21182E">
    <div class="main">
        @include('layouts.sidebar')
        <div class="main-content p-0 m-0" style="">
            <div class="header w-100">
                <a href="/" class="position-fixed logobrand text-white"><img src="{{'images/jack.png'}}" alt="" width="auto" height="50"></a>
                <a class="position-fixed toggle" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><i class="bi bi-list text-white p-0"></i></a>
            </div>
            <div class="banner" style='background-image: url("{{$item->poster}}");'>
                <div class="banner-inner d-flex m-0 position-relative" style="margin-left: 20px;max-width: 1300px">
                   <div class="detail-img" style="max-width: 450px; min-width: 200px">
                       <img src="{{$item->img}}" class="d-block image-detail" id="image-detail" alt="...">
                   </div>
                    <div class="banner-content" style="margin-left: 40px; max-width: 547px">
                        <h1 class="detail-name text-white">{{$item->name}}</h1>
                        <h2 class="detail-name text-white">{{$item->othername}}</h2>
                        <div class="details-info" style="margin-top: 21px; margin-bottom: 9px">
                            <div class="rating-result">
                                <span><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>
                                </span>
                            </div>
                            <div class="jws-imdb">8.2</div>
                            <div class="jws-view"><i class="bi bi-eye"></i> {{$item->views}} Views</div>
                        </div>
                        <div class="details-info2 mb-2 text-white">
                            <span class="video-years">{{$item->year}}</span> &numsp; &centerdot; &numsp; <span class="video-time">{{$item->time}}</span>
                            <span class="video-badge">{{$item->type}}</span>
                        </div>
                        <div class="details-info2 mb-2 text-white">
                            <span>Chất Lượng: </span> <span>{{$item->quality}}</span>&numsp; &centerdot;&numsp;
                            <span>Trạng Thái: </span> <span>{{$item->status}}</span>
                        </div>
                        <div class="details-category mb-2 text-white">
                            @foreach($categories as $category)
                                <a href="/filter?category={{$category->id_cate}}">{{$category->category}}</a>&blacktriangleright;
                            @endforeach
                        </div>
                        <div class="details-tool mb-4">
                            <div class="details-likes">
                                <a href="#" class="like-button" data-type="movies" data-post-id="9053">
                                    <i class="bi bi-hand-thumbs-up fs-6" style="margin-right: 3px"></i>
                                    <span class="likes-count">6</span> <span>likes</span>
                                </a>
                            </div>
                            <div class="details-share">
                                <a href="#" data-modal-jws="#share-videos">
                                    <i class="bi bi-share-fill fs-6" style="margin-right: 3px"></i>
                                    <span>Share</span>
                                </a>
                            </div>
                            <div class="details-watchlist">
                                @if(session('user'))
                                    @if($checkFavo > 0)
                                        <a class="watchlist-add showToastBtn" onclick="showToastWarning()">
                                            <i class="bi bi-plus fs-6" style="margin-right: 2px"></i>
                                            <span>Watchlist</span>
                                        </a>
                                    @else
                                        <a class="watchlist-add showToastBtn" onclick="showToastSuccess()">
                                            <i class="bi bi-plus fs-6" style="margin-right: 2px"></i>
                                            <span>Watchlist</span>
                                        </a>
                                    @endif

                                @else
                                    <a class="watchlist-add" href="#" id="liveToastBtn">
                                        <i class="bi bi-plus fs-6" style="margin-right: 2px"></i>
                                        <span>Watchlist</span>
                                    </a>
                                @endif
                            </div>
                            <div class="toast-container position-fixed top-0 end-0 p-3">
                                <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                    <div class="toast-header text-white" style="background: #9e61ff">
                                        <strong class="me-auto">Thông báo</strong>
                                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                    </div>
                                    <div class="toast-body" >
                                        Bạn chưa đăng nhập !
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="details-description text-white">
                            <div class="js-content" style="">
                                <p>{{$item->des}}</p>
                            </div>
                        </div>
                        <div class="video-play clear-both mb-2">
                            @if(count($epsmovie)>0)
                                @foreach($firstep as $epf)
                            <a href="{{ route('watchMovie', ['name' => Str::slug($item->name),'ep' => $epf->ep_number,'id'=>$item->id ]) }}" onclick="increaseViews({{$item->id}})" class="btn text-white btn-watch p-3 m-0 d-flex justify-content-center align-content-center">
                                Xem Ngay
                                <span class="" style="margin-left: 5px !important"><i class="fs-6 bi bi-play-circle"></i></span>
                            </a>
                                @endforeach
                            @endif
                            <a class="btn text-white p-3 d-flex btn-trailer justify-content-center align-items-center" id="btn-trailer" onclick="trailer('{{$item->trailer}}')">
                                Trailer
                                <span class="" style="margin-left: 5px !important"><i class="fs-6 bi bi-play-circle"></i></span>
                            </a>
                        </div>
                        <div id="youtubeOverlay">
                            <div id="youtubePlayer">
                                <button id="closeButton">&times;</button>
                                <iframe id="youtubeIframe" width="900" height="500" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                        </div>
                        <div class="list-ep mt-3">
                            @if(count($epsmovie)>0)
                            <h4 class="text-white mb-4">Tập Mới Nhất</h4>
                            @foreach($epsmovie as $ep)
                                <a class="p-3 episode-box" href="{{ route('watchMovie', ['name' => Str::slug($item->name),'ep' => $ep->ep_number,'id'=>$item->id ]) }}" onclick="increaseViews({{$item->id}})">{{$ep->ep_number}}</a>
                            @endforeach
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="global-actor position-relative text-white">
                    <h5 style="margin-bottom: 16px; line-height: 18px;font-size: 16px;">Đạo Diễn</h5>
                    <div class="d-flex">
                        @php($elements = explode(', ', $item->actor))
                        @foreach ($elements as $element)
                        <div class="person-actor" style="width: 240px; margin-right: 10px;">
                            <img src="{{'images/actor/74215.jpg'}}" alt="" style="width: 100%">
                            <h5 class="mt-2">{{htmlspecialchars($element)}}</h5>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
{{--            ------------------------Courasel Suggested-----------------------------}}
            <div class="row mt-5 suggestions" style="margin-left: 150px; margin-right: 150px">
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
{{--            ---------------------------------Footer---------------------------------}}
            @include('layouts.footer')
        </div>
    </div>
    <div id="toast1"></div>
    <script src="{{'js/jquery-3.7.1.min.js'}}"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="{{'js/owl.carousel.min.js'}}"></script>
    <script >
        const toastTrigger = document.getElementById('liveToastBtn')
        const toastLiveExample = document.getElementById('liveToast')

        if (toastTrigger) {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastTrigger.addEventListener('click', () => {
                toastBootstrap.show()
            })
        }
        const movieId = "{{ $item->id }}";
        @if(session('user'))
        const username = "{{ session('user')->username }}";
        @endif
    </script>
    <script src="https://ik.imagekit.io/vi6fma9xb/CSS,JS/index.js?updatedAt=1698570476989"></script>
    <script src="{{'js/validate.js'}}"></script>
</body>
</html>
@endforeach
