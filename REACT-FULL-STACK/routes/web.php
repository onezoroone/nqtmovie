<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\DB;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
//---------------------------------PAGE ROUTES------------------------------

// Route::get('/',[HomeController::class, 'index']);
// Route::get('xem-phim-{name}-{id}', [HomeController::class, 'showDetailMovie'])->name('showDetail')->where(['name' => '.*[^-]', 'id' => '[0-9]+']);
// Route::get('xem-{name}-tap-{ep}-{id}', [HomeController::class, 'watchMovie'])->name('watchMovie')->where(['name' => '.*[^-]', 'id' => '[0-9]+']);
// Route::get('/search', [HomeController::class, 'searchMovie'])->name('search');
// Route::get('/upView', [HomeController::class, 'UpdateView']);
// Route::get('login',[UserController::class, 'login'])->name('signin');
// Route::post('login',[UserController::class, 'signin'])->name('Plogin');
// Route::get('register',[UserController::class, 'signup'])->name('signup');
// Route::post('register',[UserController::class, 'Psignup'])->name('Psignup');
// Route::get('logoutUser', [UserController::class, 'logout']);
// Route::get('recovery',[UserController::class, 'recovery']);
// Route::post('recovery',[UserController::class, 'ResetPass'])->name('recovery');
// Route::get('confirm-pw',function (){return view('confirmpw');});
// Route::get('watchlist', [HomeController::class, 'watchList']);
// Route::get('viewall',[HomeController::class, 'viewall']);
// Route::get('filter',[HomeController::class, 'getCategory'])->name('category');
// Route::post('changePW', [UserController::class,'EditPass'])->name('changePW');
// Route::get('/addFavo',[HomeController::class, 'AddFMovie']);
//---------------------------------END PAGE ROUTES------------------------------





Route::get('/adminer', function () {
    return view('adminer');
});

//---------------------------------ADMIN ROUTES------------------------------
Route::get('admin',function (){
    if (!session('admin')) {
        return redirect('/admin/login');
    }
    $countMovie = DB::table('movies')->count();
    $countUser = DB::table('users')->count();
    $countCate = DB::table('categories')->count();
    $totalView = DB::table('movies')->sum('views');
    $movies = DB::table('movies')->orderByDesc('views')->limit(4)->get();
    return view('admin.index', [
        'countMovie'=>$countMovie,
        'countUser'=>$countUser,
        'countCate'=>$countCate,
        'totalView'=>$totalView,
        'movies'=>$movies
    ]);
});
Route::get('admin/login', [AdminController::class, 'index']);
Route::post('admin/login', [AdminController::class, 'login'])->name('login');
Route::get('/logout', [AdminController::class, 'logout'])->name('logout');
Route::get('admin/movie/episode/{id}', [AdminController::class, 'episodes'])->name('episodes');
Route::post('addEpisode', [AdminController::class, 'addEpisode'])->name('addEpisode');
Route::get('/deleteEpisode/{id}', [AdminController::class, 'deleteEpisode'])->name('deleteEpisode');
Route::post('editEpisode/{id}', [AdminController::class, 'editEpisode'])->name('editEpisode');
Route::resource('/admin/movie',MovieController::class);
Route::resource('admin/category', CategoryController::class);
Route::resource('admin/user', UserController::class);

//---------------------------------END ADMIN ROUTES------------------------------
