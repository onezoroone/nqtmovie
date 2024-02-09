<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>NQTMOVIE.ID.VN</title>
    <link rel="shorcut icon" href="{{asset('images/logo.png')}}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{'css/index.css'}}">
    <link rel="stylesheet" href="{{'css/owl.carousel.min.css'}}">
</head>
<body style="background: #21182E">
<div class="main">
    @include('layouts.sidebar')
    {{-------------------------------Content-------------------------------}}
    <div class="main-content">
        {{-------------------------------Header-------------------------------}}
        <div class="header w-100">
            <a href="/" class="position-fixed logobrand text-white"><img src="{{'images/jack.png'}}" alt="" width="auto" height="50"></a>
            <a class="position-fixed toggle" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><i class="bi bi-list text-white p-0"></i></a>
        </div>
        {{-------------------------------End Header-------------------------------}}
        <div class="" style="height: 100px">
        </div>
        @if(count($list)>0)
        <div class="" style="margin-left: 20px;">
            <div class="list-movie" style="margin-right: 20px !important;user-select: none;">
                @foreach ($list as $LMovie)
                    <div class="movie-box position-relative w-100 mt-2" style="max-width: 200px">
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
        @else
            <div>
                <h2 class="text-white">Không có bộ phim nào.</h2>
            </div>
        @endif
    </div>
</div>
<script src="{{'js/jquery-3.7.1.min.js'}}"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<script src="{{'js/owl.carousel.min.js'}}"></script>
<script src="{{'js/index.js'}}"></script>
<script src="{{'js/validate.js'}}"></script>
</body>
</html>
