<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
class RequestMovieController extends Controller
{
    public function store(Request $request){
        $user = null;
        if(Auth::check()){
            $user = Auth::user()->name;
        }else{
            $user = "Vị khách vô danh";
        }
        DB::table('movies_request')->insert([
            'name' => $request->name,
            'user' => $user,
            'created_at' => now()
        ]);
        return response()->json("Gửi yêu cầu thành công.", 200);
    }

    public function index(){
        $requests = DB::table('movies_request')->orderByDesc('created_at')->get();
        return response()->json($requests, 200);
    }

    public function destroy(Request $request){
        DB::table('movies_request')->where('id', $request->id)->delete();
        return response()->json("Xóa thành công.", 200);
    }

    public function update(Request $request){
        DB::table('movies_request')->where('id', $request->id)->update([
            'status' => $request->status
        ]);
        return response()->json("Cập nhật thành công.", 200);
    }
}
