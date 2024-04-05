<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use ImageKit\ImageKit;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Http;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $banners = DB::table('movies')->limit(8)->orderByDesc('views')->get();
        $categories = [];
        foreach ($banners as $banner) {
            $categories = DB::table('movie_categories')
                ->join('categories', 'categories.id', '=', 'movie_categories.idCategory')
                ->where('idMovie', $banner->id)
                ->pluck('name');
            $banner->categories = $categories;
        }
        $updatedMovies = DB::table('movies')->limit(12)->orderByDesc('updated_at')->get();
        $popularmovies = DB::table('movies')->limit(12)->orderByDesc('views')->get();
        $daily = DB::table('daily_rankings')->join('movies','movies.id','=','daily_rankings.idMovie')
        ->whereDate('daily_rankings.created_at', now())->orderByDesc('daily_rankings.views')->limit(12)->get();
        $firstDayOfWeek = Carbon::now()->startOfWeek();
        $endDayOfWeek = Carbon::now()->endOfWeek();
        $weekly = DB::table('weekly_rankings')->join('movies','movies.id','=','weekly_rankings.idMovie')
        ->whereDate('weekly_rankings.created_at','>',$firstDayOfWeek)->whereDate('weekly_rankings.created_at','<=',$endDayOfWeek)
        ->limit(12)->orderByDesc('weekly_rankings.views')->get();
        $firstDayOfMonth = Carbon::now()->startOfMonth();
        $endDayOfMonth = Carbon::now()->endOfMonth();
        $monthly = DB::table('monthly_rankings')->join('movies','movies.id','=','monthly_rankings.idMovie')
        ->whereDate('monthly_rankings.created_at','>',$firstDayOfMonth)->whereDate('monthly_rankings.created_at','<=',$endDayOfMonth)
        ->limit(12)->orderByDesc('monthly_rankings.views')->get();
        if($daily->count() != 12){
            $daily = $popularmovies;
        }
        if($weekly->count() != 12){
            $weekly = $popularmovies;
        }
        if($monthly->count() != 12){
            $monthly = $popularmovies;
        }
        $seriesmovies = DB::table('movies')->where('type', 'Phim bộ')->limit(14)->orderByDesc('updated_at')->get();
        $singlemovies = DB::table('movies')->where('type', 'Phim lẻ')->limit(14)->orderByDesc('updated_at')->get();
        return response()->json([
            'banners' => $banners,
            'updatedMovies' => $updatedMovies,
            'daily' => $daily,
            'weekly' => $weekly,
            'monthly' => $monthly,
            'seriesmovies' => $seriesmovies,
            'singlemovies' => $singlemovies
        ],200);
    }

    public function getDetailsMovie($slug)
    {
        $movie = DB::table('movies')->where('slug',$slug)->first();
        if(!$movie){
            return response()->json(['status'=>'error', 'movie' => "Không tìm thấy bộ phim!"], 200);
        }
        if($movie->security == "True"){
            if(Auth::check()){
                $user = Auth::user();
                if($user->role == "user"){
                    return response()->json([
                        'status' => "error",
                        'message' => "Bạn không có quyền xem bộ phim này. Vui lòng liên hệ NQT."
                    ], 200);
                }
            }else{
                return response()->json([
                    'status' => "error",
                    'message' => "Bạn cần đăng nhập để xem được bộ phim này."
                ], 200);
            }
        }
        $maxNumber = DB::table('episodes')->where('idMovie',$movie->id)->max(DB::raw('CAST(ep_number AS UNSIGNED)'));
        $maxDigits = strlen((string)$maxNumber);
        $episodes = DB::table('episodes')->where('idMovie',$movie->id)->orderByRaw("LPAD(ep_number, $maxDigits, '0') DESC")->get();
        $categories = DB::table('movie_categories')->join('categories','categories.id','=','movie_categories.idCategory')->where('idMovie',$movie->id)->get();
        $category = DB::table('movies')->join('movie_categories','movie_categories.idMovie','=','movies.id')->first();
        $related = DB::table('movies')->join('movie_categories','movie_categories.idMovie','=','movies.id')->where('idCategory',$category->idCategory)
        ->where('idMovie','!=',$movie->id)->limit(10)->get();
        $history = [];
        if(Auth::check()){
            $user = Auth::user();
            $check = DB::table('history_watch')->where('idMovie', $movie->id)->where('idUser', $user->id)->first();
            if($check){
                $watched = explode(",", $check->idEpisode);
                foreach($watched as $item){
                    $episode = DB::table('episodes')->where('id', $item)->first()->slug;
                    $history[] = $episode;
                }
            }
        }
        $rating = DB::table('reviews')->where('idMovie', $movie->id)->avg('rating');
        if ($rating === null) {
            $averageRating = 0;
        } else {
            $averageRating = $rating;
        }
        $numReviews = DB::table('reviews')
        ->where('idMovie', $movie->id)
        ->count();
        return response()->json([
            'status'=>'success', 'movie' => $movie,
            'episodes' => $episodes, 'categories' => $categories, 'related' => $related,
            'history' => $history,
            'averageRating' => $averageRating,
            'numReviews' => $numReviews
        ], 200);
    }

    public function getDataLayout(){
        $movies = DB::table('movies')->orderByDesc('views')->limit(10)->select('name','slug')->get();
        $categories = DB::table('categories')->get('name');
        $countries = DB::table('movies')->where('country', '!=', null)->select('country as name')->distinct()->get();
        return response()->json(['movies' => $movies, 'categories' => $categories, 'countries' => $countries], 200);
    }

    public function getEpisodeByMovie($slug, $episode){
        $movie = DB::table('movies')->where('slug',$slug)->first();
        if(!$movie){
            return response()->json(['status'=>'error', 'movie' => "Không tìm thấy bộ phim!"], 200);
        }
        if($movie->security == "True"){
            if(Auth::check()){
                $user = Auth::user();
                if($user->role == "user"){
                    return response()->json([
                        'status' => "error",
                        'message' => "Bạn không có quyền xem bộ phim này. Vui lòng liên hệ NQT."
                    ], 200);
                }
            }else{
                return response()->json([
                    'status' => "error",
                    'message' => "Bạn cần đăng nhập để xem được bộ phim này."
                ], 200);
            }
        }
        $this->UpView($movie);
        $episode = DB::table('episodes')->join('server_episodes','episodes.id','=','server_episodes.idEpisode')->where('slug',$episode)->where('idMovie',$movie->id)->orderBy('server_episodes.id')->get();
        if(!$episode){
            return response()->json(['status'=>'error', 'movie' => "Không tìm thấy bộ phim!"], 200);
        }
        $maxNumber = DB::table('episodes')->where('idMovie',$movie->id)->max(DB::raw('CAST(ep_number AS UNSIGNED)'));
        $maxDigits = strlen((string)$maxNumber);
        $categories = DB::table('movie_categories')->join('categories','categories.id','=','movie_categories.idCategory')->where('idMovie',$movie->id)->get();
        $episodes = DB::table('episodes')->where('idMovie',$movie->id)->orderByRaw("LPAD(ep_number, $maxDigits, '0') DESC")->get();
        $category = DB::table('movies')->join('movie_categories','movie_categories.idMovie','=','movies.id')->first();
        $related = DB::table('movies')->join('movie_categories','movie_categories.idMovie','=','movies.id')->where('idCategory',$category->idCategory)
        ->where('idMovie','!=',$movie->id)->limit(10)->get();
        $history = [];
        if(Auth::check()){
            $user = Auth::user();
            $check = DB::table('history_watch')->where('idUser', $user->id)->where('idMovie', $movie->id)->first();
            if($check){
                $episodesWatched =  explode(",", $check->idEpisode);
                if(!in_array($episode[0]->idEpisode, $episodesWatched)){
                    $episodesWatched[] = $episode[0]->idEpisode;
                    DB::table('history_watch')->where('idUser', $user->id)->where('idMovie', $movie->id)->update([
                        'idEpisode' => implode(",", $episodesWatched),
                        'updated_at' => now()
                    ]);
                }
                $history = $episodesWatched;
            }else{
                DB::table('history_watch')->insert([
                    'idMovie' => $movie->id,
                    'idUser' => $user->id,
                    'idEpisode' => $episode[0]->idEpisode,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
        $reviews = DB::table('reviews')->join('users','users.id','=','reviews.idUser')
        ->where('idMovie', $movie->id)
        ->select('idMovie', 'name', 'rating', 'reviews.created_at', 'review')->orderByDesc("reviews.created_at")->limit(5)
        ->get();
        return response()->json([
            'status'=>'success',
            'movie' => $movie,
            'episodes' => $episodes,
            'currentEpisode' => $episode,
            'related' => $related,
            'categories' => $categories,
            'reviews' => $reviews,
            'history' => $history
        ], 200);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|unique:movies,name',
            'slug' => 'unique:movies,slug',
            'selectedCategories' => 'required',
            'type' => 'required'
        ], [
            'name.required' => 'Tên phim không được để trống',
            'name.unique' => 'Tên phim đã tồn tại.',
            'slug.unique' => 'Phim đã tồn tại.',
            'selectedCategories.required' => 'Không được để trống thể loại phim.',
            'type.required' => 'Không được để trống loại phim.'
        ]);

        $imageKit = new ImageKit(
            config('services.imagekit.public_key'),
            config('services.imagekit.private_key'),
            config('services.imagekit.url_endpoint')
        );

        $id = DB::table('movies')->insertGetId([
            'name' => $request->name,
            'slug' => $request->slug,
            'othername' => $request->othername,
            'quality' => $request->quality,
            'year' => $request->year,
            'episode' => $request->episode,
            'time' => $request->time,
            'status' => $request->status,
            'trailer' => $request->trailer,
            'casts' => $request->casts,
            'security' => $request->security,
            'type' => $request->type['name'],
            'des' => $request->description,
            'country' => $request->country,
            'keyword' => $request->keyword,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        if ($request->hasFile('selectedImage')) {
            $file = $request->file('selectedImage');
            $imagePath = 'public/images/'.$request->name;
            $imageName = $file->getClientOriginalName();
            Storage::disk('public')->put($request->slug.'/image.jpg', file_get_contents($file));
            $response = $imageKit->upload([
                'file' => fopen(public_path($request->slug.'/image.jpg'), 'r'),
                'fileName' => $imageName,
                'folder' => 'images/'.$request->slug,
            ]);
            $imageLink = $response->result->url;
            DB::table('movies')->where('id',$id)->update([
                'img' => $imageLink,
            ]);
        } else {
            $resImg = Http::get($request->image);
            Storage::disk('public')->put($request->slug.'/image.jpg', $resImg->body());
            $response = $imageKit->upload([
                'file' => $request->image,
                'fileName' => $request->name.".jpg",
                'folder' => 'images/'.$request->slug,
            ]);
            $imageLink = $response->result->url;
            DB::table('movies')->where('id',$id)->update([
                'img' => $imageLink,
            ]);
        }

        if ($request->hasFile('selectedPoster')) {
            $file = $request->file('selectedPoster');
            $imagePath = 'public/posters/'.$request->name;
            $imageName = $file->getClientOriginalName();
            $file->storeAs($imagePath, $imageName);
            $response = $imageKit->upload([
                'file' => fopen(Storage::path($imagePath.'/').$imageName,"r"),
                'fileName' => $imageName,
                'folder' => 'posters/'.$request->slug,
            ]);
            $posterLink = $response->result->url;
            DB::table('movies')->where('id',$id)->update([
                'poster' => $posterLink,
            ]);
        } else {
            $response = $imageKit->upload([
                'file' => $request->poster,
                'fileName' => $request->name.".jpg",
                'folder' => 'posters/'.$request->slug,
            ]);
            $posterLink = $response->result->url;
            DB::table('movies')->where('id',$id)->update([
                'poster' => $posterLink,
            ]);
        }

        foreach($request->selectedCategories as $item){
            $check = DB::table('categories')->where('name', $item['name'])->count();
            if($check > 0){
                $idCategory = DB::table('categories')->where('name', $item['name'])->first()->id;
            }else{
                $idCategory = DB::table('categories')->insertGetId([
                    'name' => $item['name'],
                    'created_at' => now()
                ]);
            }
            DB::table('movie_categories')->insert([
                'idMovie' => $id,
                'idCategory' => $idCategory,
            ]);
        }
        if($request->episodes){
            foreach($request->episodes as $item){
                $idEpisode = DB::table('episodes')->insertGetId([
                    'idMovie' => $id,
                    'ep_number' => $item['name'],
                    'slug' => 'tap-'.$item['name'],
                    'created_at' => now()
                ]);
                if($request->nameServer == "NGUONC"){
                    DB::table('server_episodes')->insert([
                        'server' => $request->nameServer,
                        'idEpisode' => $idEpisode,
                        'ep_link' => $item['embed']
                    ]);
                }
                if($request->nameServer == "OPHIM"){
                    DB::table('server_episodes')->insert([
                        'server' => "NQTMOVIE",
                        'idEpisode' => $idEpisode,
                        'ep_link' => $item['link_m3u8']
                    ]);
                    DB::table('server_episodes')->insert([
                        'server' => $request->nameServer,
                        'idEpisode' => $idEpisode,
                        'ep_link' => $item['link_embed']
                    ]);
                }
            }
        }
        return response()->json("Thêm thành công bộ ".$request->name, 200);
    }

    public function edit($slug){
        $movie = DB::table('movies')->where('slug', $slug)->first();
        if(!$movie){
            return response()->json(['status'=>'error', 'movie' => "Không tìm thấy bộ phim!"], 200);
        }
        $categories = DB::table('movie_categories')
            ->join('categories', 'categories.id', '=', 'movie_categories.idCategory')
            ->where('idMovie', $movie->id)
            ->pluck('name')
            ->toArray();
        $movie->categories = array_map(function($category) {
            return ['name' => $category];
        }, $categories);
        return response()->json($movie, 200);
    }

    public function update(Request $request){
        $request->validate([
            'name' => 'required|string|unique:movies,name,'.$request->id.',id',
            'slug' => 'unique:movies,slug,'.$request->id.',id',
            'selectedCategories' => 'required',
            'type' => 'required'
        ], [
            'name.required' => 'Tên phim không được để trống',
            'name.unique' => 'Tên phim đã tồn tại.',
            'slug.unique' => 'Phim đã tồn tại.',
            'selectedCategories.required' => 'Không được để trống thể loại phim.',
            'type.required' => 'Không được để trống loại phim.'
        ]);

        DB::table('movies')->where('id', $request->id)->update([
            'name' => $request->name,
            'slug' => $request->slug,
            'othername' => $request->othername,
            'quality' => $request->quality,
            'year' => $request->year,
            'episode' => $request->episode,
            'time' => $request->time,
            'status' => $request->status,
            'trailer' => $request->trailer,
            'casts' => $request->casts,
            'security' => $request->security,
            'type' => $request->type['name'],
            'des' => $request->description,
            'country' => $request->country,
            'keyword' => $request->keyword,
            'img' => $request->image,
            'poster' => $request->poster,
            'updated_at' => now()
        ]);

        DB::table('movie_categories')->where('idMovie', $request->id)->delete();
        foreach($request->selectedCategories as $item){
            $idCategory = DB::table('categories')->where('name', $item['name'])->first()->id;
            DB::table('movie_categories')->insert([
                'idMovie' => $request->id,
                'idCategory' => $idCategory,
            ]);
        }

        return response()->json("Sửa thành công bộ ".$request->name, 200);
    }

    public function destroy(Request $request){
        DB::table('movies')->where('id',$request->id)->delete();
        return response()->json("Delete successful ".$request->name, 200);
    }

    public function UpView($movie){
        $id = $movie->id;
        DB::table('movies')->where('id', $id)->update(['views' => $movie->views + 1]);
        $checkDaily = DB::table('daily_rankings')->where('idMovie', $id)->whereDate('created_at', now())->first();
        if($checkDaily){
            DB::table('daily_rankings')->where('idMovie', $id)->where('id', $checkDaily->id)->update([
                'views' => $checkDaily->views + 1
            ]);
        }else{
            DB::table('daily_rankings')->insert([
                'idMovie' => $id,
                'created_at' => now()
            ]);
        }
        $firstDayOfWeek = Carbon::now()->startOfWeek();
        $endDayOfWeek = Carbon::now()->endOfWeek();
        $checkWeekly = DB::table('weekly_rankings')->where('idMovie',$id)->whereDate('created_at', '>', $firstDayOfWeek)->whereDate('created_at', '<=', $endDayOfWeek)->first();
        if($checkWeekly){
            DB::table('weekly_rankings')->where('idMovie', $id)->where('id', $checkWeekly->id)->update([
                'views' => $checkWeekly->views + 1
            ]);
        }else{
            DB::table('weekly_rankings')->insert([
                'idMovie' => $id,
                'created_at' => now()
            ]);
        }
        $firstDayOfMonth = Carbon::now()->startOfMonth();
        $endDayOfMonth = Carbon::now()->endOfMonth();
        $checkMonthly = DB::table('monthly_rankings')->where('idMovie',$id)->whereDate('created_at', '>', $firstDayOfMonth)->whereDate('created_at', '<=', $endDayOfMonth)->first();
        if($checkMonthly){
            DB::table('monthly_rankings')->where('idMovie', $id)->where('id', $checkMonthly->id)->update([
                'views' => $checkMonthly->views + 1
            ]);
        }else{
            DB::table('monthly_rankings')->insert([
                'idMovie' => $id,
                'created_at' => now()
            ]);
        }
    }

    public function getAllMovie(){
        $movies = DB::table('movies')->orderByDesc('id')->get();
        $categories = [];
        foreach ($movies as $movie) {
            $categories = DB::table('movie_categories')
                ->join('categories', 'categories.id', '=', 'movie_categories.idCategory')
                ->where('idMovie', $movie->id)
                ->pluck('name');
            $movie->categories = $categories;
        }
        foreach ($movies as $movie) {
            $rating = DB::table('reviews')->where('idMovie', $movie->id)->avg('rating');
            if ($rating === null) {
                $averageRating = 0;
            } else {
                $averageRating = $rating;
            }
            $movie->rating = $averageRating;
        }
        return response()->json($movies, 200);
    }

    public function getFilter(){
        $movies = DB::table('movies')->orderByDesc('created_at')->get();
        $categories = [];
        foreach ($movies as $movie) {
            $categories = DB::table('movie_categories')
                ->join('categories', 'categories.id', '=', 'movie_categories.idCategory')
                ->where('idMovie', $movie->id)
                ->pluck('name');
            $movie->categories = $categories;
        }
        $years = DB::table('movies')->select("year")->distinct()->get();
        $countries = DB::table('movies')->select("country")->where('country','!=', null)->distinct()->get();
        $categories = DB::table('categories')->get();
        return response()->json([
            'movies' => $movies,
            'years' => $years,
            'countries' => $countries,
            'categories' => $categories
        ], 200);
    }

    public function addWatchList(Request $request){
        if(Auth::check()){
            $user = Auth::user();
            $check = DB::table('watchlist')->where('idUser', $user->id)->where('idMovie', $request->idMovie)->count();
            if($check > 0){
                return response()->json(['status' => "error", 'message' => "Phim đã có trong danh sách xem sau."], 200);
            }else{
                DB::table('watchlist')->insert([
                    'idMovie' => $request->idMovie,
                    'idUser' => $user->id,
                    'created_at' => now()
                ]);
                return response()->json(['status' => "success", 'message' => "Thêm phim vào danh sách xem sau thành công."], 200);
            }
        }
        return response()->json("Bạn cần đăng nhập để sử dụng chức năng này.", 422);
    }

    public function getWatchList() {
        if(!Auth::check()){
            return response()->json("Chưa đăng nhập.", 422);
        }
        $user = Auth::user();
        $list = DB::table('watchlist')->join('movies','movies.id','=','watchlist.idMovie')->where('idUser', $user->id)->get();
        $history = DB::table('history_watch')->join('movies','movies.id','=','history_watch.idMovie')
        ->join('episodes','episodes.id','=','history_watch.idEpisode')
        ->where('idUser', $user->id)
        ->select('movies.slug', 'movies.name','img','ep_number','episodes.slug as slugEpi')
        ->orderByDesc('history_watch.updated_at')->get();
        return response()->json(['watchlist' => $list, 'historylist' => $history], 200);
    }

    public function getDashboard(){
        $sumMovies = DB::table('movies')->count();
        $sumUser = DB::table('users')->count();
        $sumReviews = DB::table('reviews')->count();
        $sumCategories = DB::table('categories')->count();
        $movies = DB::table('movies')->orderByDesc('views')->limit(8)->get();
        $data = DB::table('movies');
        $firstDayOfMonth = Carbon::now()->startOfMonth();
        $endDayOfMonth = Carbon::now()->endOfMonth();
        $users = DB::table('users')
        ->whereDate('created_at', '>', $firstDayOfMonth)
        ->whereDate('created_at', '<=', $endDayOfMonth)
        ->select(
            DB::raw('SUM(IF(verified = "false", 1, 0)) AS unverified_count'),
            DB::raw('SUM(IF(verified = "true", 1, 0)) AS verified_count')
        )
        ->first();

        $weekStartDate = Carbon::now()->startOfWeek();
        $weekEndDate = Carbon::now()->endOfWeek();
        $today = DB::table('daily_rankings')->select(DB::raw("DATE_FORMAT(created_at, '%d/%m') AS day"), DB::raw('SUM(views) AS total'), DB::raw('count(idMovie) AS count'))
        ->whereRaw('YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)')
        ->groupBy(DB::raw('day'))
        ->orderBy('day')
        ->get();
        $missingDays = [];
        for ($date = $weekStartDate; $date->lte($weekEndDate); $date->addDay()) {
            $day = $date->format('d/m');
            $total = 0;
            $count = 0;
            foreach ($today as $movie) {
                if ($movie->day == $day) {
                    $total = $movie->total;
                    $count = $movie->count;
                    break;
                }
            }

            $missingDays[] = ['day' => $day, 'total' => $total, 'count' => $count];
        }
        return response()->json([
            'sumMovies' => $sumMovies,
            'sumUser' => $sumUser,
            'sumReviews' => $sumReviews,
            'sumCategories' => $sumCategories,
            'users' => $users,
            'movies' => $movies,
            'total_views' => $missingDays
        ], 200);
    }

    public function getNotifications(){
        $countReports = DB::table('reports')->where('fixed', 'False')->count();
        $countRequests = DB::table('movies_request')->where('status', 'N')->count();
        return response()->json([
            'countReports' => $countReports,
            'countRequests' => $countRequests
        ], 200);
    }

    public function updateMany(Request $request){
        set_time_limit(10000);
        $data = $request->data;
        $client = new Client();
        $imageKit = new ImageKit(
            config('services.imagekit.public_key'),
            config('services.imagekit.private_key'),
            config('services.imagekit.url_endpoint')
        );
        if($request->serverName == "NGUONC"){
            $item = $request->data;
            $check = DB::table('movies')->where('name', $item['name'])->orWhere('slug', $item['slug'])->first();
            $responsebody = $client->request('GET', 'https://phim.nguonc.com/api/film/'.$item['slug']);
            $content = $responsebody->getBody()->getContents();
            $dataArray = json_decode($content, true);
            if(!$check){
                $id = DB::table('movies')->insertGetId([
                    'name' => $dataArray['movie']['name'],
                    'slug' => $dataArray['movie']['slug'],
                    'othername' => $dataArray['movie']['original_name'],
                    'quality' => $dataArray['movie']['quality'],
                    'year' => $dataArray['movie']['category']["3"]["list"]["0"]['name'],
                    'episode' =>  $dataArray['movie']['current_episode'],
                    'time' => $dataArray['movie']['time'],
                    'casts' => $dataArray['movie']['casts'],
                    'security' => "True",
                    'type' => $dataArray['movie']['category']["1"]["list"]["0"]['name'],
                    'des' => $dataArray['movie']['description'],
                    'country' => $dataArray['movie']['category']["4"]["list"]["0"]['name'],
                    'keyword' => "xem phim ".$dataArray['movie']['name'].", xem phim ". $dataArray['movie']['original_name'],
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
                $resImg = $client->get($dataArray['movie']['thumb_url'])->getBody();
                Storage::disk('public')->put($dataArray['movie']['slug'].'/image.jpg', $resImg);
                $response = $imageKit->upload([
                    'file' => $dataArray['movie']['thumb_url'],
                    'fileName' => $dataArray['movie']['slug'].".jpg",
                    'folder' => 'images/'.$request->slug,
                ]);
                $imageLink = $response->result->url;
                DB::table('movies')->where('id',$id)->update([
                    'img' => $imageLink,
                ]);
                $response1 = $imageKit->upload([
                    'file' => $dataArray['movie']['poster_url'],
                    'fileName' => $dataArray['movie']['slug'].".jpg",
                    'folder' => 'posters/'.$request->slug,
                ]);
                $posterLink = $response1->result->url;
                DB::table('movies')->where('id',$id)->update([
                    'poster' => $posterLink,
                ]);

                foreach($dataArray['movie']['category']["2"]["list"] as $item){
                    $check = DB::table('categories')->where('name', $item['name'])->count();
                    if($check > 0){
                        $idCategory = DB::table('categories')->where('name', $item['name'])->first()->id;
                    }else{
                        $idCategory = DB::table('categories')->insertGetId([
                            'name' => $item['name'],
                            'created_at' => now()
                        ]);
                    }
                    DB::table('movie_categories')->insert([
                        'idMovie' => $id,
                        'idCategory' => $idCategory,
                    ]);
                }
                foreach($dataArray['movie']['episodes']["0"]['items'] as $item){
                    $idEpisode = DB::table('episodes')->insertGetId([
                        'idMovie' => $id,
                        'ep_number' => $item['name'],
                        'slug' => 'tap-'.$item['name'],
                        'created_at' => now()
                    ]);
                    DB::table('server_episodes')->insert([
                        'server' => "NGUONC",
                        'idEpisode' => $idEpisode,
                        'ep_link' => $item['embed']
                    ]);
                }
            }else{
                foreach($dataArray['movie']['episodes']["0"]['items'] as $item){
                    $check1 = DB::table('episodes')->join('server_episodes','server_episodes.idEpisode','=','episodes.id')
                    ->where('idMovie', $check->id)
                    ->where('server_episodes.server', "NGUONC")
                    ->where('ep_number', $item['name'])->first();
                    if(!$check1){
                        DB::table('movies')->where('id',$check->id)->update([
                            'episode' =>  $dataArray['movie']['current_episode'],
                        ]);
                        $idEpisode = DB::table('episodes')->insertGetId([
                            'idMovie' => $check->id,
                            'ep_number' => $item['name'],
                            'slug' => 'tap-'.$item['name'],
                            'created_at' => now()
                        ]);
                        DB::table('server_episodes')->insert([
                            'server' => "NGUONC",
                            'idEpisode' => $idEpisode,
                            'ep_link' => $item['embed']
                        ]);
                    }
                }
            }
        }else if($request->serverName == "OPHIM"){
            $item = $request->data;
            $check = DB::table('movies')->where('name', $item['name'])->orWhere('slug', $item['slug'])->first();
            $responsebody = $client->request('GET', 'https://ophim1.com/phim/'.$item['slug']);
            $content = $responsebody->getBody()->getContents();
            $dataArray = json_decode($content, true);
            $type = "Phim bộ";
            if($dataArray['movie']['type'] != "series"){
                $type = "Phim lẻ";
            }
            if(!$check){
                $id = DB::table('movies')->insertGetId([
                    'name' => $dataArray['movie']['name'],
                    'slug' => $dataArray['movie']['slug'],
                    'othername' => $dataArray['movie']['origin_name'],
                    'quality' => $dataArray['movie']['quality'],
                    'year' => $dataArray['movie']['year'],
                    'episode' =>  $dataArray['movie']['episode_current'],
                    'time' => $dataArray['movie']['time'],
                    'security' => "True",
                    'type' => $type,
                    'des' => $dataArray['movie']['content'],
                    'country' => $dataArray['movie']['country'][0]['name'],
                    'keyword' => "xem phim ".$dataArray['movie']['name'].", xem phim ". $dataArray['movie']['origin_name'],
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
                $newUrl = str_replace('ophim12', 'ophim10', $dataArray['movie']['thumb_url']);
                $resImg = Http::get($newUrl);
                Storage::disk('public')->put($dataArray['movie']['slug'].'/image.jpg', $resImg->body());
                $response = $imageKit->upload([
                    'file' => $dataArray['movie']['thumb_url'],
                    'fileName' => $dataArray['movie']['slug'].".jpg",
                    'folder' => 'images/'.$request->slug,
                ]);
                $imageLink = $response->result->url;
                DB::table('movies')->where('id',$id)->update([
                    'img' => $imageLink,
                ]);
                $response1 = $imageKit->upload([
                    'file' => $dataArray['movie']['poster_url'],
                    'fileName' => $dataArray['movie']['slug'].".jpg",
                    'folder' => 'posters/'.$request->slug,
                ]);
                $posterLink = $response1->result->url;
                DB::table('movies')->where('id',$id)->update([
                    'poster' => $posterLink,
                ]);

                foreach($dataArray['movie']['category'] as $item){
                    $check = DB::table('categories')->where('name', $item['name'])->count();
                    if($check > 0){
                        $idCategory = DB::table('categories')->where('name', $item['name'])->first()->id;
                    }else{
                        $idCategory = DB::table('categories')->insertGetId([
                            'name' => $item['name'],
                            'created_at' => now()
                        ]);
                    }
                    DB::table('movie_categories')->insert([
                        'idMovie' => $id,
                        'idCategory' => $idCategory,
                    ]);
                }
                foreach($dataArray['episodes']["0"]['server_data'] as $item){
                    $idEpisode = DB::table('episodes')->insertGetId([
                        'idMovie' => $id,
                        'ep_number' => $item['name'],
                        'slug' => 'tap-'.$item['name'],
                        'created_at' => now()
                    ]);
                    DB::table('server_episodes')->insert([
                        'server' => "NQTMOVIE",
                        'idEpisode' => $idEpisode,
                        'ep_link' => $item['link_m3u8']
                    ]);
                    DB::table('server_episodes')->insert([
                        'server' => "OPHIM",
                        'idEpisode' => $idEpisode,
                        'ep_link' => $item['link_embed']
                    ]);
                }
            }else{
                foreach($dataArray['episodes']["0"]['server_data'] as $item){
                    $check1 = DB::table('episodes')->join('server_episodes','server_episodes.idEpisode','=','episodes.id')
                    ->where('idMovie', $check->id)
                    ->where('server_episodes.server', "OPHIM")
                    ->where('ep_number', $item['name'])->first();
                    if(!$check1){
                        DB::table('movies')->where('id',$check->id)->update([
                            'episode' =>  $dataArray['movie']['episode_current'],
                        ]);
                        $idEpisode = DB::table('episodes')->insertGetId([
                            'idMovie' => $check->id,
                            'ep_number' => $item['name'],
                            'slug' => 'tap-'.$item['name'],
                            'created_at' => now()
                        ]);
                        DB::table('server_episodes')->insert([
                            'server' => "NQTMOVIE",
                            'idEpisode' => $idEpisode,
                            'ep_link' => $item['link_m3u8']
                        ]);
                        DB::table('server_episodes')->insert([
                            'server' => "OPHIM",
                            'idEpisode' => $idEpisode,
                            'ep_link' => $item['link_embed']
                        ]);
                    }
                }
            }
        }
        return response()->json("Crawl thành công bộ ". $request->name, 200);
    }

    // Server
    public function getMovieServer($slug)
    {
        $movie = DB::table('movies')->where('slug',$slug)->first();
        if(!$movie){
            return response()->json(['status'=>'error', 'movie' => "Không tìm thấy bộ phim!"], 200);

        }
        return response()->json([
            'status'=>'success',
            'movie' => $movie
        ], 200);
    }

    public function getEpisodeServer($slug, $episode){
        $movie = DB::table('movies')->where('slug',$slug)->first();
        if(!$movie){
            return response()->json(['status'=>'error', 'movie' => "Không tìm thấy bộ phim!"], 200);
        }
        $episode = DB::table('episodes')->join('server_episodes','episodes.id','=','server_episodes.idEpisode')->where('slug',$episode)->where('idMovie',$movie->id)->orderBy('server_episodes.id')->get();
        return response()->json([
            'status'=>'success',
            'movie' => $movie,
            'currentEpisode' => $episode,
        ], 200);
    }
}
