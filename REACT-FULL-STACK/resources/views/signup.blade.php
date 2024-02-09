<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Đăng ký</title>
    <link rel="shorcut icon" href="{{asset('images/logo.png')}}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{asset('css/login.css')}}">
</head>
<body>
<section class="sign-in-page">
    <video autoplay muted loop class="myvideo">
        <source src="https://ik.imagekit.io/vi6fma9xb/register.mp4?updatedAt=1698501171653" type="video/mp4">
    </video>
    <div class="container">
        <div class="row justify-content-center align-items-center height-self-center">
            <div class=" align-self-center col-md-12 col-lg-7 form-padding">
                <div class="sign-user_card ">
                    <div class="sign-in-page-data">
                        <div class="sign-in-from w-100 m-auto">
                            <h3 class="mb-3 text-center text-white">Đăng ký</h3>
                            <form action="{{route('Psignup')}}" method="POST" id="formSignUp">
                                @csrf
                                <div class="row">
                                    <div class="form-group col-md-6 mb-3">
                                        <label for="username" class="text-white">Username</label>
                                        <input type="text" class="form-control mb-0 btn-border text-white" name="user" id="username" placeholder="Nhập username" autocomplete="off" required>
                                        <small style="color: red; font-size: 15px"></small>
                                        <span></span>
                                    </div>
                                    <div class="form-group col-md-6 mb-3">
                                        <label for="email" class="text-white">E-mail</label>
                                        <input type="email" class="form-control mb-0 btn-border text-white" name="email" id="email" placeholder="Nhập email" autocomplete="off" required>
                                        <small style="color: red; font-size: 15px"></small>
                                        <span></span>
                                    </div>
                                    <div class="form-group col-md-6 mb-3">
                                        <label for="pass1" class="text-white">Password</label>
                                        <input type="text" class="form-control mb-0 btn-border text-white" name="pass" id="pass1" placeholder="Mật khẩu" autocomplete="off" required>
                                    </div>
                                    <div class="form-group col-md-6 mb-3">
                                        <label for="pass2" class="text-white">Confirm Password</label>
                                        <input type="text" class="form-control mb-0 btn-border text-white" id="pass2" placeholder="Nập lại mật khẩu" required>
                                        <small style="color: red; font-size: 15px"></small>
                                        <span></span>
                                    </div>
                                </div>f
                                @if(session('error'))
                                    <p class="p-2 text-center" style="background-color: red; color: white">{{session('error')}}</p>
                                @endif
                                @if(session('success'))
                                    <p class="p-2 text-center" style="background-color: green; color: white">{{session('success')}}</p>
                                @endif
                                <button type="submit" name="signup" class="btn btn-primary my-2 text-white">Đăng ký</button>
                            </form>
                        </div>
                    </div>
                    <div class="mt-3">
                        <div class="d-flex justify-content-center links text-white">
                            Bạn đã có tài khoản? <a href="/login" class="register">Đăng nhập</a>
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
<script src="{{'js/validate.js'}}"></script>
</html>
