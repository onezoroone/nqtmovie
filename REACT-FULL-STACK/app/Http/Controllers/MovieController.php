<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use ImageKit\ImageKit;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Events\MovieUpdated;
class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function index()
    {
        //
        $movies = Movie::all();
        return response()->json($movies);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $imagekit = new ImageKit(
            "public_9vN2yArnjp/7b080KD52bOdSpkQ=",
            "private_0ubaiYTxTCggcq/HtGCqs4uabA4=",
            "https://ik.imagekit.io/vi6fma9xb"
        );
        $name = $request->input('name');
        $on = $request->input('othername');
        $quality = json_decode($request->input('quality'), true);
        $des = $request->input('des');
        $img = $request->file('form__img-upload')->getClientOriginalName();
        $poster = $request->file('form__pos-upload')->getClientOriginalName();
        $time = $request->input('time');
        $year = $request->input('year');
        $ep = $request->input('episode');
        $trailer = $request->input('trailer');
        $actor = $request->input('actor');
        $type = json_decode($request->input('type'), true);
        $status = $request->input('status');
        $cate = json_decode($request->input('categories'), true);
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $current_time = date('Y-m-d H:i:s');
        $count = DB::table('movies')->where('name', $name)->count();
        if ($count > 0){
            return response()->json('error');
        } else {
            $request->file('form__img-upload')->storeAs("public/upload", $img);
            $request->file('form__pos-upload')->storeAs("public/poster", $poster);
            $sourceFilePath = Storage::path('public/');
            $destinationFilePath = public_path('images/');
            File::move($sourceFilePath.'upload/'.$img, $destinationFilePath.'upload/'. $img);
            File::move($sourceFilePath.'poster/'.$poster, $destinationFilePath.'poster/'. $poster);
            $uploadedImg = $imagekit->uploadFile([
                'file' => fopen($destinationFilePath.'upload/'.$img, "r"),
                'fileName' => $img
            ]);
            $uploadedPoster = $imagekit->uploadFile([
                'file' => fopen($destinationFilePath.'poster/'.$poster, "r"),
                'fileName' => $poster
            ]);
            $imgURL = $uploadedImg->result->url;
            $posterURL = $uploadedPoster->result->url;
            $movieId = DB::table('movies')->insertGetId([
                'name' => $name,
                'othername' => $on,
                'quality' => $quality['value'],
                'year' => $year,
                'episode' => $ep,
                'time' => $time,
                'status' => $status,
                'img' => $imgURL,
                'actor' => $actor,
                'type' => $type['value'],
                'trailer' => $trailer,
                'des' => $des,
                'poster' => $posterURL,
                'update_at' => $current_time,
            ]);
            foreach ($cate as $theloai_id) {
                DB::table('movie_cate')->insert([
                    'id_movie' => $movieId,
                    'id_cate' => $theloai_id['value'],
                ]);
            }
            return response()->json('success');
        }
    }

    public function getCateByMovie($mid){
        return DB::table('movie_cate')->join('categories', 'movie_cate.id_cate', '=', 'categories.id')->where('id_movie', $mid)->get()->toArray();
    }
    public function edit($id)
    {
        $movie = DB::table('movies')->where('id',$id)->get();
        $cateMovies = $this->getCateByMovie($id);
        $categories = DB::table('categories')->get();
        return response()->json(['movie'=>$movie, 'Allcategories' => $categories, 'cateMovies' => $cateMovies]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $imagekit = new ImageKit(
            "public_9vN2yArnjp/7b080KD52bOdSpkQ=",
            "private_0ubaiYTxTCggcq/HtGCqs4uabA4=",
            "https://ik.imagekit.io/vi6fma9xb"
        );
        $name = $request->input('name');
        $on = $request->input('othername');
        $quality = json_decode($request->input('quality'), true);
        $des = $request->input('des');
        $img = $request->file('form__img-upload');
        $pos = $request->file('form__pos-upload');
        $time = $request->input('time');
        $year = $request->input('year');
        $ep = $request->input('episode');
        $trailer = $request->input('trailer');
        $actor = $request->input('actor');
        $type = json_decode($request->input('type'), true);
        $status = $request->input('status');
        $cate = json_decode($request->input('categories'), true);
        $sourceFilePath = Storage::path('public/');
        $destinationFilePath = public_path('images/');
        $currentMovie = DB::table('movies')->select('name','img', 'poster')->where('id', $id)->first();
        $count = DB::table('movies')->where('name', $name)->where('id','!=' ,$id)->count();
        if ($count > 0) {
            return response()->json('error');
        }
        else {
            if ($img ==! null){
                $imgName = $img->getClientOriginalName();
                $request->file('form__img-upload')->storeAs("public/upload", $imgName);
                File::move($sourceFilePath.'upload/'.$imgName, $destinationFilePath.'upload/'. $imgName);
                $uploadedImg = $imagekit->uploadFile([
                    'file' => fopen($destinationFilePath.'upload/'.$imgName, "r"),
                    'fileName' => $imgName
                ]);
                $imgURL = $uploadedImg->result->url;
            }else{
                $imgURL = $currentMovie->img;
            }
            if($pos ==! null){
                $posName = $pos->getClientOriginalName();
                $request->file('form__pos-upload')->storeAs("public/poster", $posName);
                File::move($sourceFilePath.'poster/'.$posName, $destinationFilePath.'poster/'. $posName);
                $uploadedPoster = $imagekit->uploadFile([
                    'file' => fopen($destinationFilePath.'poster/'.$posName, "r"),
                    'fileName' => $posName
                ]);
                $posterURL = $uploadedPoster->result->url;
            }else{
                $posterURL = $currentMovie->poster;
            }
            date_default_timezone_set('Asia/Ho_Chi_Minh');
            $current_time = date('Y-m-d H:i:s');
            DB::table('movies')->where('id', $id)->update([
                'name' => $name,
                'othername' => $on,
                'quality' => $quality['value'],
                'year' => $year,
                'episode' => $ep,
                'time' => $time,
                'status' => $status,
                'img' => $imgURL,
                'actor' => $actor,
                'type' => $type['value'],
                'trailer' => $trailer,
                'des' => $des,
                'poster' => $posterURL,
                'update_at' => $current_time
            ]);

            DB::table('movie_cate')->where('id_movie', $id)->delete();
            foreach ($cate as $theloai_id) {
                DB::table('movie_cate')->insert(['id_movie' => $id, 'id_cate' => $theloai_id['value']]);
            }
            $users = DB::table('movie_favo')->where('id_movie', $id)->get('id_user');
            foreach($users as $item){
                DB::insert('insert into notifications (UserID, MovieID) values (?, ?)', [$item->id_user, $id]);
            }
            event(new MovieUpdated($name, $id));
            return response()->json('success');
        }
    }

    public function destroy($id)
    {
        DB::table('movies')->where('id', $id)->delete();
        return response('success');
    }

    public function editBanner(Request $request){
        $banner = $request->input('link');
        DB::table('banners')->where('id',1)->update([
            'image' => $banner,
        ]);
        return response()->json('success');
    }
    public function apiMovieNguonc(Request $request){
        $name = $request->data['name'];
        $id = DB::table('movies')->insertGetId([
            'name' => $request->data['name'],
            'othername' => $request->data['original_name'],
            'quality' => 'Full HD',
            'year' => '2024',
            'episode' => $request->data['current_episode'],
            'time' => $request->data['time'],
            'status' => 'Xong',
            'img' => $request->data['thumb_url'],
            'actor' => $request->data['casts'],
            'type' => $request->data['category']["1"]["list"][0]['name'],
            'security' => 'Y',
            'poster' => $request->data['poster_url'],
            'des' => $request->data['description'],
        ]);
        foreach($request->data['episodes'][0]['items'] as $item){
            DB::table('movie_episodes')->insert([
                'movie_id' => $id,
                'ep_number' => $item['name'],
                'ep_link' => $item['embed']
            ]);
        }
        DB::table('movie_cate')->insert([
            'id_movie' => $id,
            'id_cate' => 1
        ]);
        return response()->json('Đăng tải bộ '. $name. ' thành công!', 200);
    }

}
