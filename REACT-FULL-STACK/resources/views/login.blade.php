<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Đăng nhập</title>
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
    <div class="container" type="position: relative; z-index: 1;">
        <div class="row justify-content-center align-items-center height-self-center">
            <div class="col-lg-5 col-md-12 align-self-center form-padding">
                <div class="sign-user_card ">
                    <div class="sign-in-page-data">
                        <div class="sign-in-from w-100 m-auto">
                            <h3 class="mb-3 text-center text-white">Đăng nhập</h3>
                            <form class="mt-4" action="{{route('Plogin')}}" method="POST">
                                @csrf
                                <div class="form-group mb-3">
                                    <input type="text" name="account" class="form-control mb-0 text-white" id="exampleInputEmail2" placeholder="Enter username" required>
                                </div>
                                <div class="form-group mb-3">
                                    <input type="password" class="form-control mb-0 text-white" name="pass" id="exampleInputPassword2" placeholder="Password" required>
                                </div>
                                @if(session('error'))
                                    <p class="p-2 text-center" style="background-color: red; color: white">{{session('error')}}</p>
                                @endif
                                <div class="sign-info">
                                    <button type="submit" name="signin" class="btn btn-primary">Đăng nhập</button>
                                    <div class="custom-control custom-checkbox d-inline-block">
                                        <input type="checkbox" class="custom-control-input" id="customCheck">
                                        <label class="custom-control-label" for="customCheck">Lưu tài khoản</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="mt-3">
                        <div class="d-flex justify-content-center links">
                            Bạn chưa có tài khoản? <a href="{{route('signup')}}" class="text-primary register">Đăng ký</a>
                        </div>
                        <div class="d-flex justify-content-center links">
                            <a href="/recovery" class="f-link">Quên mật khẩu?</a>
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
