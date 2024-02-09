{{-------------------------------Sidebar-------------------------------}}
<div class="d-flex flex-column flex-shrink-0 sidebar">
    <div class="h-25 p-3" style="user-select: none;">
        <a href="/" class="d-block link-dark text-decoration-none icon" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
            <img src="{{'images/logo.png'}}" class="logo" alt="">
            <span class="visually-hidden">Icon-only</span>
        </a>
    </div>
    <ul class="nav nav-pills nav-flush d-flex flex-column mb-auto text-center" style="height: 65%;">
        <li class="nav-item">
            <a href="/" class="nav-link py-3 rounded-0 text-white" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Home" data-bs-original-title="Home">
                <i class="bi bi-house-fill fs-5"></i>
            </a>
        </li>
        @if(session('user'))
        <li>
            <a href="/watchlist" class="nav-link py-3 rounded-0 text-white" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Dashboard" data-bs-original-title="Dashboard">
                <i class="bi bi-heart-fill fs-5"></i>
            </a>
        </li>
        @endif
        <li>
            <a href="#" data-bs-toggle="modal" data-bs-target="#searchModal" class="nav-link py-3 rounded-0 text-white" data-bs-placement="right" aria-label="Orders" data-bs-original-title="Orders">
                <i class="bi bi-search fs-5"></i>
            </a>
        </li>
        <li>
            <a href="#" data-bs-toggle="modal" data-bs-target="#ModalCategory" class="nav-link py-3 rounded-0 text-white" data-bs-placement="right" aria-label="Dashboard" data-bs-original-title="Dashboard">
                <i class="bi bi-tag-fill fs-5"></i>
            </a>
        </li>
    </ul>
    @if(session('user'))
    <div class="dropdown" style="height: 10%;">
        <a href="#" class="d-flex align-items-center justify-content-center p-3 link-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
            <img src="{{'images/'.session('user')->img}}" alt="" width="40" height="40" class="rounded-circle">
        </a>
        <ul class="dropdown-menu text-small shadow" style="background-color: #302E38">
            <li><a class="dropdown-item mb-2" href="/logoutUser"><i class="bi bi-box-arrow-left text-primary fs-5"></i></a></li>
            <li><a href="#" class="dropdown-item" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i class="bi bi-gear-fill fs-5 text-primary"></i></a></li>
        </ul>
    </div>
    @else
        <div class="btn-login text-white">
            <a href="{{route('signin')}}" class="nav-link px-2 rounded-0 text-white" data-bs-placement="right">
                <i class="bi bi-door-open-fill" style="font-size: 50px"></i>
            </a>
        </div>
    @endif
</div>

<div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" style="max-width: 740px">
        <div class="container">
            <div class="modal-content p-4 w-100" style="background: #21182E">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="input-group">
                            <span class="input-group-text text-white" style="background-color: #191c33; border-color: #191c33; margin-right: 10px; border-radius: 10px">Movie</span>
                            <input type="text" class="form-control text-white p-3" name="searchKeyword" id="search-keyword" aria-label="Sizing example input" placeholder="Tìm kiếm..." style="background-color: #191c33;border-color: #191c33;border-radius: 10px 0 0 10px;">
                            <button type="submit" class="p-3 text-white" style="background-color: #191c33;border-radius: 0 10px 10px 0;border: none"><i class="bi bi-search"></i></button>
                        </div>
                    </form>
                    <div class="search-results w-100" id="search-results">
                        <div class="list-movie m-1" style="margin-right: 20px !important;user-select: none;">
                            <div class="search-box position-relative row text-white" id="search-box" style="max-height: 500px;min-height: 200px; overflow-x: hidden">
                                {{--Content--}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="ModalCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background: #21182E">
            <div class="modal-header">
                <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">Chọn thể loại</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{route('category')}}" method="get">
            <div class="modal-body">
                <select class="form-select form-select-lg mb-3 text-white" aria-label="Large select example" name="category" style="background: #21182E">
                    <option selected>Chọn thể loại</option>
                    @foreach($allcategories as $category)
                        <option value="{{$category->id}}">{{$category->category}}</option>
                    @endforeach
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button type="submit" class="btn btn-primary">Tìm</button>
            </div>
            </form>
        </div>
    </div>
</div>
@if(session('user'))
<div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background: #21182E">
            <div class="modal-header">
                <h2 class="modal-title text-white text-uppercase" id="exampleModalToggleLabel">Welcome <span class="text-primary">{{session('user')->username}}</span></h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Đổi mật khẩu</button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</div>
    <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background: #21182E">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-white" id="exampleModalToggleLabel2">Đổi mật khẩu</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="{{route('changePW')}}" method="POST" id="formChangePw">
                    @csrf
                    <div class="modal-body">
                        <input type="hidden" name="id" value="{{session('user')->username}}">
                        <div class="form-group mb-3">
                            <label for="pass1" class="text-white">Password</label>
                            <input type="text" class="form-control mb-0 btn-border" name="pass" id="pass1" placeholder="Mật khẩu" autocomplete="off" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="pass2" class="text-white">Confirm Password</label>
                            <input type="text" name="password" class="form-control mb-0 btn-border" id="pass2" placeholder="Nập lại mật khẩu" required>
                            <small style="color: red; font-size: 15px"></small>
                            <span></span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Quay lại</button>
                        <button type="submit" class="btn btn-primary">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endif

{{--    -------------------------------Siderbar Mobile-----------------------------}}
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style="width: 4.5rem;background: #21182E">
    <div class="d-flex flex-column flex-shrink-0" style="width: 4.5rem; height: 100vh; background: #21182E">
        <div class="h-25 p-3" style="user-select: none;">
            <a href="/" class="d-block link-dark text-decoration-none icon" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                <img src="{{'images/logo.png'}}" class="logo" alt="">
                <span class="visually-hidden">Icon-only</span>
            </a>
        </div>
        <ul class="nav nav-pills nav-flush d-flex flex-column mb-auto text-center" style="height: 65%;">
            <li class="nav-item">
                <a href="/" class="nav-link py-3 rounded-0 text-white" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Home" data-bs-original-title="Home">
                    <i class="bi bi-house-fill fs-5"></i>
                </a>
            </li>
            @if(session('user'))
            <li>
                <a href="/watchlist" class="nav-link py-3 rounded-0 text-white" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Dashboard" data-bs-original-title="Dashboard">
                    <i class="bi bi-heart-fill fs-5"></i>
                </a>
            </li>
            @endif
            <li>
                <a href="#" data-bs-toggle="modal" data-bs-target="#searchModal" class="nav-link py-3 rounded-0 text-white" data-bs-placement="right" aria-label="Orders" data-bs-original-title="Orders">
                    <i class="bi bi-search fs-5"></i>
                </a>
            </li>
            <li>
                <a href="#" data-bs-toggle="modal" data-bs-target="#ModalCategory" class="nav-link py-3 rounded-0 text-white" data-bs-placement="right" aria-label="Dashboard" data-bs-original-title="Dashboard">
                    <i class="bi bi-tag-fill fs-5"></i>
                </a>
            </li>
        </ul>
        @if(session('user'))
        <div class="dropdown" style="height: 10%;">
            <a href="#" class="d-flex align-items-center justify-content-center p-3 link-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
                <img src="{{'images/'.session('user')->img}}" alt="" width="40" height="40" class="rounded-circle">
            </a>
            <ul class="dropdown-menu text-small shadow" style="background-color: #302E38">
                <li><a class="dropdown-item mb-2" href="/logoutUser"><i class="bi bi-box-arrow-left text-primary fs-5"></i></a></li>
                <li><a href="#" class="dropdown-item"><i class="bi bi-gear-fill fs-5 text-primary"></i></a></li>
            </ul>
        </div>
        @else
            <div class="btn-login text-white">
                <a href="#" class="nav-link px-2 rounded-0 text-white" data-bs-placement="right">
                    <i class="bi bi-door-open-fill" style="font-size: 50px"></i>
                </a>
            </div>
        @endif
    </div>
</div>
