<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ComicController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('getMoviesPrivate', [HomeController::class, 'getMoviesPrivate']);
    Route::post('apiMovieNguonc', [MovieController::class, 'apiMovieNguonc']);
});
Route::get('/getdoctruyen/{url}/{id}',[ComicController::class, 'doctruyen3q']);
Route::get('/details/{url}/{id}', [ComicController::class, 'create']);
Route::get('/comicdetails/{chapterid}/{comicid}/{user?}', [ComicController::class, 'getImage']);
Route::get('/allcomics', [ComicController::class, 'getAll']);
Route::get('/getdetails/{idcomic}/{user?}', [ComicController::class, 'getDetail']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/gettruyenvn/{name}', [ComicController::class, 'truyenvn']);
Route::get('/getgenres', [ComicController::class, 'getGenres']);
Route::get('/getnettruyen/{name}', [ComicController::class, 'nettruyen']);
Route::post('/getprivate', [ComicController::class, 'getPrivate']);


Route::post('/getmovies/{user?}', [HomeController::class, 'index']);
Route::post('/detailsmovie/{id}/{user?}', [HomeController::class, 'showDetailMovie']);
Route::get('/addFavo/{id_movie}/{user}',[HomeController::class, 'AddFMovie']);
Route::get('/upView/{movieId}', [HomeController::class, 'UpdateView']);
Route::get('/viewmovie/{id}/{user?}', [HomeController::class, 'watchMovie']);
Route::post('/viewall', [HomeController::class, 'viewall']);
Route::post('/getInfor/{id}', [UserController::class, 'getInfor']);
Route::post('/updateInfor/{id}', [UserController::class, 'update']);
Route::post('/search/q={searchKeyword}', [HomeController::class, 'searchMovie']);
Route::get('/filter/q={searchKeyword}', [HomeController::class, 'filterMovie']);
Route::get('/filter/category={Category}', [HomeController::class, 'getCategory']);
Route::post('/getWatchlist/{id}', [HomeController::class, 'watchList']);
Route::post('/getAllNotifications/{id}', [HomeController::class, 'getAllNotis']);
Route::post('/getbanners',[HomeController::class, 'getbanners']);
Route::post('/getMessages/{id?}', [HomeController::class, 'getMessages']);
Route::post('/getMessagesMovie/{id}', [HomeController::class, 'getMessagesByMovie']);
Route::post('/addMessage', [HomeController::class, 'addMessage']);

Route::post('/getAllCategoriesMovie', [CategoryController::class, 'getAllCate']);

Route::post('/getAllusers', [UserController::class, 'show']);
Route::post('/getAllmovies', [MovieController::class, 'index']);
Route::post('/deleteMovie/{id}', [MovieController::class, 'destroy']);
Route::post('/changePermission/{id}/{permission}', [UserController::class, 'changePermission']);
Route::post('/deleteUser/{id}', [UserController::class, 'destroy']);
Route::post('/addMovie', [MovieController::class, 'store']);
Route::post('/getDetailMovie/{id}', [MovieController::class , 'edit']);
Route::post('/updateMovie/{id}', [MovieController::class, 'update']);
Route::post('/getTotal', [AdminController::class , 'total']);
Route::post('/getEpisodes/{id}', [AdminController::class ,'getEpisodes']);
Route::post('/editEpisode/{id}', [AdminController::class, 'editEpisode']);
Route::post('/deleteEpisode/{id}', [AdminController::class , 'deleteEpisode']);
Route::post('/addEpisode/{movie_id}', [AdminController::class, 'addEpisode']);
Route::post('/editBanner', [MovieController::class, 'editBanner']);
