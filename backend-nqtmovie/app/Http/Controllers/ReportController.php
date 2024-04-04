<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function store(Request $request){
        DB::table('reports')->insert([
            'idEpisode' => $request->idEpisode,
            'content' => $request->content,
            'created_at' => now()
        ]);
        return response()->json("Gửi báo cáo tập phim thành công.", 200);
    }

    public function index(){
        $reports = DB::table('reports')->join('episodes', 'episodes.id', '=','reports.idEpisode')
        ->join('movies', 'episodes.idMovie', '=', 'movies.id')
        ->select('reports.id','name', 'ep_number', 'content', 'fixed', 'reports.created_at', 'reports.updated_at')
        ->orderByDesc('reports.created_at')->get();
        return response()->json($reports, 200);
    }

    public function update(Request $request){
        DB::table('reports')->where('id', $request->id)->update([
            'fixed' => $request->fixed,
            'updated_at' => now()
        ]);
        return response()->json("Sửa thành công.", 200);
    }
}
