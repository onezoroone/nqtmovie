<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Quên mật khẩu</title>
    <link rel="shorcut icon" href="{{asset('images/logo.png')}}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{asset('css/login.css')}}">
</head>
<body>
<section class="sign-in-page">
    <video autoplay muted loop class="myvideo" playsinline>
        <source src="https://ik.imagekit.io/vi6fma9xb/login.mp4?updatedAt=1698146388361" type="video/mp4">
    </video>
    <div class="container h-100">
        <div class="row justify-content-center align-items-center h-100">
            <div class="col-md-6 col-sm-12 col-12 ">
                <div class="sign-user_card ">
                    <div class="sign-in-page-data">
                        <div class="sign-in-from w-100 m-auto">
                            <h3 class="mb-0 text-white">Reset Password</h3>
                            <p class="text-primary ">Nhập email mà bạn đã đăng ký</p>
                            <form class="mt-2" action="{{route('recovery')}}" method="POST">
                                @csrf
                                <div class="form-group mb-3">
                                    <input type="email" name="email" class="form-control mb-0 text-white" id="exampleInputEmail2" placeholder="Email address" autocomplete="off" required>
                                </div>
                                @if(session('error'))
                                    <p class="p-2 text-center" style="background-color: red; color: white">{{session('error')}}</p>
                                @endif
                                <div class="d-inline-block w-100">
                                    <button type="submit" name="forgot" class="btn btn-primary float-right">Reset Password</button>
                                </div>
                            </form>
                            <div class="d-flex justify-content-center links mt-3">
                                <a href="/login" class="f-link">Đăng nhập</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</body>
<script src="{{'js/jquery-3.7.1.min.js'}}"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

</html>
