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
    <div class="container h-100">
        <div class="row justify-content-center align-items-center h-100">
            <div class="col-md-6 col-sm-12 col-12 ">
                <div class="sign-user_card ">
                    <div class="sign-in-page-data">
                        <div class="sign-in-from w-100 m-auto">
                            <h3 class="mb-0 text-primary">Success !</h3>
                            <p class="text-white mt-3">Mật khẩu mới đã được gửi về mail của bạn. Vui lòng kiểm tra lại email!</p>
                            <div class="d-inline-block w-100">
                                <a href="/login" class="btn btn-primary mt-2">Quay lại đăng nhập</a>
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
