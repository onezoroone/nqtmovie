<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RequestMovieController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    // Admin
    Route::group(['middleware' => 'admin'], function () {
        // Movie
        Route::get('movies/getAllMovie', [MovieController::class, 'getAllMovie']);
        Route::get('movies/getDetailsMovie/{slug}', [MovieController::class, 'edit']);
        Route::post('movies/addMovie', [MovieController::class, 'store']);
        Route::post('movies/deleteMovie', [MovieController::class, 'destroy']);
        Route::post('movies/editMovie', [MovieController::class, 'update']);
        Route::post('movies/leechMovies', [MovieController::class, 'updateMany']);
        // Episode
        Route::get("episodes/getEpisodes/{slug}",[EpisodeController::class, 'index']);
        Route::post("episodes/updateEpisode",[EpisodeController::class, 'update']);
        Route::post("episodes/deleteEpisode",[EpisodeController::class, 'destroy']);
        Route::post("episodes/addEpisode",[EpisodeController::class, 'store']);
        Route::post('episodes/addManyEpisodes', [EpisodeController::class, 'addManyEpisodes']);
        // User
        Route::get('users/getAllUser', [UserController::class, 'index']);
        Route::post('users/updateRole', [UserController::class, 'update']);
        Route::post('users/resetPassword', [UserController::class, 'resetPassword']);
        // Category
        Route::get('categories/getAllCategories', [CategoryController::class, 'index']);
        Route::post('categories/deleteCategory', [CategoryController::class, 'destroy']);
        Route::post('categories/newCategory', [CategoryController::class, 'store']);
        // Dashboard
        Route::get('movies/getAllIndex', [MovieController::class, 'getDashboard']);
        Route::get('getNotifications', [MovieController::class, 'getNotifications']);
        // Request
        Route::get('requests/getAllRequests', [RequestMovieController::class, 'index']);
        Route::post('requests/deleteRequest', [RequestMovieController::class, 'destroy']);
        Route::post('requests/updateRequest', [RequestMovieController::class, 'update']);
        // Reports
        Route::get('reports/getAllReports', [ReportController::class, 'index']);
        Route::post('reports/editReport', [ReportController::class, 'update']);
        // Review
        Route::get('reviews/getAllReviews', [ReviewController::class, 'index']);
        Route::post('reviews/deleteReview', [ReviewController::class, 'destroy']);
        // Crawl
        Route::post('episodes/crawlEpisodeOphim', [EpisodeController::class, 'crawlEpisodeOphim']);
        Route::post('episodes/crawlEpisodeNguonc', [EpisodeController::class, 'crawlEpisodeNguonc']);
    });
    // User
    Route::post('/user/logout', [AuthController::class, 'logout']);
    Route::post('/users/updateInfor', [UserController::class, 'updateInfor']);
    // Movie Private and Public
    Route::get('/movie/getMovie/{slug}', [MovieController::class, 'getDetailsMovie']);
    Route::get('/movie/getEpisodeByMovie/{slug}/{episode}', [MovieController::class, 'getEpisodeByMovie']);
    // Reviews
    Route::post('reviews/createReview', [ReviewController::class, 'store']);
    Route::get('reviews/getReviewsByMovie/{id}', [ReviewController::class, 'getReviewsByMovie']);
    // Watch List
    Route::post('movies/addWatchList', [MovieController::class, 'addWatchList']);
    Route::get('movies/getWatchList', [MovieController::class, 'getWatchList']);
    // Request
    Route::post('requests/createRequest', [RequestMovieController::class, 'store']);
});
// Layout
Route::get('movie/fetchData', [MovieController::class, 'index']);
Route::get('movie/fetchDataLayout', [MovieController::class, 'getDataLayout']);
// Filter
Route::get('movies/getMovieByType/{type}', [MovieController::class, 'getMovieByType']);
Route::get('movies/getFilter', [MovieController::class, 'getFilter']);
// Guest
Route::post('user/register', [AuthController::class, 'register']);
Route::post('user/verification/{code}', [AuthController::class, 'verification']);
Route::post('user/login', [AuthController::class, 'login']);
Route::post('user/forgotPassword', [UserController::class, 'forgotPassword']);
Route::post('user/changePassword', [UserController::class, 'changePassword']);
Route::post('reports/createReport', [ReportController::class, 'store']);
// Server
Route::get('movie/getMovieServer/{slug}', [MovieController::class, 'getMovieServer']);
Route::get('movie/getEpisodeByMovieServer/{slug}/{episode}', [MovieController::class, 'getEpisodeServer']);
