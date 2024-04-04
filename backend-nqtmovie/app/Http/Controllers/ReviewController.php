<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{

    public function index(){
        $reviews = DB::table('reviews')->join('users','users.id','=','reviews.idUser')->join('movies','movies.id','=','reviews.idMovie')
        ->select('users.name as nameUser','movies.name','review', 'reviews.created_at', 'rating', 'reviews.id')
        ->orderByDesc('reviews.created_at')
        ->get();
        return response()->json($reviews, 200);
    }

    public function getReviewsByMovie($id){
        $reviews = DB::table('reviews')->join('users','users.id','=','reviews.idUser')
        ->where('idMovie', $id)
        ->select('idMovie', 'name', 'rating', 'reviews.created_at', 'review')
        ->orderByDesc('reviews.created_at')->limit(5)
        ->get();
        return response()->json(['reviews' => $reviews], 200);
    }
    public function store(Request $request){
        if(!Auth::check()){
            return response()->json("Bạn cần đăng nhập để bình luận!", 422);
        }
        $user = Auth::user();
        DB::table('reviews')->insert([
            'idUser' => $user->id,
            'idMovie' => $request->idMovie,
            'rating' => $request->rating,
            'review' => $request->review,
            'created_at' => now()
        ]);
        return response()->json("Bình luận thành công!", 200);
    }

    public function destroy(Request $request){
        DB::table('reviews')->where('id', $request->id)->delete();
        return response()->json("Xóa bình luận thành công.", 200);
    }
}
