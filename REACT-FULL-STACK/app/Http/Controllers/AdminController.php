<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function total(){
        $countMovie = DB::table('movies')->count();
        $countUser = DB::table('users')->count();
        $totalView = DB::table('movies')->sum('views');
        $countComic = DB::table('comics')->count();
        $movies = DB::table('movies')->orderByDesc('views')->limit(4)->get();
        return response()->json([
            'countMovie'=>$countMovie,
            'countUser'=>$countUser,
            'countComic'=>$countComic,
            'totalView'=>$totalView,
            'movies' => $movies
        ]);
    }

    public function login(Request $request){
        Session::start();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        if ($request->isMethod('post')) {
            $username = $request->input('username');
            $password = $request->input('password');
            $admin = DB::table('admins')
                ->where('username', $username)
                ->where('password', $password)
                ->first();
            if ($admin) {
                Session::put('admin', $username);
                $current_time = date('Y-m-d H:i:s');
                DB::table('admins')
                    ->where('username', $username)
                    ->update(['last_login' => $current_time]);
                return redirect('/admin');
            } else {
                return back()->with('error', 'Invalid password');
            }
        }
    }

    public function getEpisodes($id){
        $movie = DB::table('movies')->where('id',$id)->get();
        $Eps = DB::table('movie_episodes')->where('movie_id', $id)->get();
        return response()->json(['movie'=>$movie, 'Eps'=>$Eps]);
    }

    public function addEpisode(Request $request, $movie_id){
        $ep_number = $request->input('ep_number');
        $ep_link = $request->input('ep_link');
        DB::table('movie_episodes')->insert([
            'movie_id'=>$movie_id,
            'ep_number'=>$ep_number,
            'ep_link'=>$ep_link
        ]);
        return back()->with('success','Add Successful Episode '. $ep_number);
    }

    public function editEpisode(Request $request,$id){
        $ep = DB::table('movie_episodes')->where('episode_id', $id)->get();
        foreach ($ep as $item){
            $number = $item->ep_number;
        }
        $ep_number = $request->input('ep_number');
        $ep_link = $request->input('ep_link');
        DB::table('movie_episodes')->where('episode_id', $id)->update([
            'ep_number'=>$ep_number,
            'ep_link'=>$ep_link
        ]);
    }

    public function deleteEpisode($id){
        DB::table('movie_episodes')->where('episode_id', $id)->delete();
    }
}
