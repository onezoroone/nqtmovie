<?php
namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\MovieController;
use App\Events\Chat;
class HomeController extends Controller{

    public function index($user = null){
        $first = DB::table('movies')->where('security', 'N')->orderByDesc('views')->limit(1)->get();
        $TMovies =DB::table('movies')->where('security', 'N')->orderByDesc('views')->skip(1)->limit(2)->get();
        $movieController = new MovieController();
        $categories = [];
        $categoriesf =[];
        foreach ($first as $abcc){
            $abc = $movieController->getCateByMovie($abcc->id);
            $categoriesf[]= $abc;
        }
        foreach ($TMovies as $movie){
            $id = $movie->id;
            $category = $movieController->getCateByMovie($id);
            $categories[]= $category;
        }
        $allcategories = DB::table('categories')->get();
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $UMovies = $this->getMovieJustUpdate(8);
        $current_time = Carbon::now();
        $ArrayUpdated = [];
        foreach ($UMovies as $UMovie){
            $update = $UMovie->update_at;
            $updated =Carbon::parse($update);
            $minutesDifference = $current_time->diffInMinutes($updated);
            $ArrayUpdated[] = $minutesDifference;
        }
        $LMovies = $this->getMovieJustUpdate(16);
        $DayLists = $this->getHotMovie();
        $WeekLists = $this->getHotWM('weekly_ranking');
        $MonthLists = $this->getHotWM('monthly_ranking');
        $Favo = DB::table('movie_favo')->join('movies','movies.id','=','movie_favo.id_movie')
                ->join('users','users.id','=','movie_favo.id_user')->where('users.id',$user)->select('movies.*')->get();
        return response()->json([
            'first'=> $first,
            'categoriesf'=>$categoriesf,
            'TMovies'=>$TMovies,
            'categories'=>$categories,
            'UMovies'=>$UMovies,
            'ArrayUpdated'=> $ArrayUpdated,
            'LMovies'=>$LMovies,
            'DayLists'=> $DayLists,
            'WeekLists'=>$WeekLists,
            'MonthLists'=>$MonthLists,
            'allcategories'=>$allcategories,
            'Favo' => $Favo,
        ]);
    }

    public function showDetailMovie($id, $user = null){
        $movie = DB::table('movies')->where('id', $id)->get();
        if($movie[0]->security == "N"){
            $history = null;
            if($user){
                $history = DB::table('historywatch')
                ->join('movie_episodes','movie_episodes.episode_id','=','historywatch.idEpisode')->where('idCustomer', $user)->where('idMovie', $id)->first();
            }
            $allcategories = DB::table('categories')->get();
            $movieController = new MovieController();
            $categories = $movieController->getCateByMovie($id);
            $epsmovie = $this->getMovieEP($id, 4);
            $firstCate = $categories[0];
            $firstname = $firstCate->category;
            $firstep = $this->getMovieEP($id, 1);
            $suggestMovie = $this->getMovieByCate($firstname);
            $checkFavo = $this->checkFavo($id, $user);
            return response()->json([
                'details' => $movie,
                'categories'=>$categories,
                'epsmovie'=>$epsmovie,
                'firstep'=>$firstep,
                'suggestMovie'=>$suggestMovie,
                'allcategories'=>$allcategories,
                'checkFavo'=>$checkFavo,
                'history' => $history,
            ]);
        }else{
            if($user){
                $check = DB::table('users')->where('id',$user)->first();
                if($check->permission == "user"){
                    return response([
                        'message' => "Bạn không có tư cách để xem phim này.Vui lòng liên hệ NQT."
                    ], 422);
                }
                $history = DB::table('historywatch')
                ->join('movie_episodes','movie_episodes.episode_id','=','historywatch.idEpisode')->where('idCustomer', $user)->where('idMovie', $id)->first();
                $allcategories = DB::table('categories')->get();
                $movieController = new MovieController();
                $categories = $movieController->getCateByMovie($id);
                $epsmovie = $this->getMovieEP($id, 4);
                $firstCate = $categories[0];
                $firstname = $firstCate->category;
                $firstep = $this->getMovieEP($id, 1);
                $suggestMovie = $this->getMovieByCate($firstname);
                $checkFavo = $this->checkFavo($id, $user);
                return response()->json([
                    'details' => $movie,
                    'categories'=>$categories,
                    'epsmovie'=>$epsmovie,
                    'firstep'=>$firstep,
                    'suggestMovie'=>$suggestMovie,
                    'allcategories'=>$allcategories,
                    'checkFavo'=>$checkFavo,
                    'history' => $history,
                ]);
            }else{
                return response([
                    'message' => "Bạn cần đăng nhập để xem được bộ phim này."
                ], 422);
            }
        }
    }

    public function watchMovie($id, $user = null){
        $MDetails = DB::table('movies')->join('movie_episodes','movies.id','=', 'movie_episodes.movie_id')
            ->where('episode_id', $id)
            ->get();
        $idmovie = DB::table('movies')->join('movie_episodes','movies.id','=', 'movie_episodes.movie_id')
            ->where('episode_id', $id)
            ->value('id');
        if($MDetails[0]->security == "N"){
            if($user){
                $check = DB::table('historywatch')->where('idMovie', $idmovie)->where('idCustomer', $user)->count();
                if($check == 0){
                    DB::table('historywatch')->insert([
                        'idMovie' => $idmovie,
                        'idCustomer' => $user,
                        'idEpisode' => $id
                    ]);
                }else{
                    DB::table('historywatch')->where('idMovie', $idmovie)->where('idCustomer', $user)->update([
                        'idEpisode' => $id
                    ]);
                }
            }
            $totalEpisodes = DB::table('movie_episodes')->where('movie_id',$idmovie)->count();
            $episodesPerPage = 50;
            $totalPages = ceil($totalEpisodes / $episodesPerPage);
            $movieController = new MovieController();
            $categories = $movieController->getCateByMovie($idmovie);
            $firstCate = $categories[0];
            $firstname = $firstCate->category;
            $suggestMovie = $this->getMovieByCate($firstname);
            $epsmovie = $this->getMovieEP($idmovie, 9999);
            return response()->json([
                'MDetails'=>$MDetails,
                'categories'=>$categories,
                'suggestMovie'=>$suggestMovie,
                'epsmovie'=>$epsmovie,
                'totalEpisodes'=>$totalEpisodes,
                'totalPages'=>$totalPages,
            ]);
        }else{
            if($user){
                $check = DB::table('users')->where('id',$user)->first();
                if($check->permission == "user"){
                    return response([
                        'message' => "Bạn không có tư cách để xem phim này.Vui lòng liên hệ NQT."
                    ], 422);
                }
                $check = DB::table('historywatch')->where('idMovie', $idmovie)->where('idCustomer', $user)->count();
                if($check == 0){
                    DB::table('historywatch')->insert([
                        'idMovie' => $idmovie,
                        'idCustomer' => $user,
                        'idEpisode' => $id
                    ]);
                }else{
                    DB::table('historywatch')->where('idMovie', $idmovie)->where('idCustomer', $user)->update([
                        'idEpisode' => $id
                    ]);
                }
                $totalEpisodes = DB::table('movie_episodes')->where('movie_id',$idmovie)->count();
                $episodesPerPage = 50;
                $totalPages = ceil($totalEpisodes / $episodesPerPage);
                $movieController = new MovieController();
                $categories = $movieController->getCateByMovie($idmovie);
                $firstCate = $categories[0];
                $firstname = $firstCate->category;
                $suggestMovie = $this->getMovieByCate($firstname);
                $epsmovie = $this->getMovieEP($idmovie, 9999);
                return response()->json([
                    'MDetails'=>$MDetails,
                    'categories'=>$categories,
                    'suggestMovie'=>$suggestMovie,
                    'epsmovie'=>$epsmovie,
                    'totalEpisodes'=>$totalEpisodes,
                    'totalPages'=>$totalPages,
                ]);
            }else{
                return response([
                    'message' => "Bạn cần đăng nhập để xem được bộ phim này."
                ], 422);
            }
        }
    }
    public function getAllNotis($id){
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $current_time = Carbon::now();
        $notis = DB::table('notifications')->join('movies','movies.id','=','notifications.MovieID')->where('UserID', $id)->orderByDesc('notifications.Time')->limit(5)
        ->select('notifications.id', 'notifications.Time', 'movies.name', 'movies.img', 'MovieID')->get();
        $notiUpdated = [];
        foreach ($notis as $item){
            $update = $item->Time;
            $updated =Carbon::parse($update);
            $minutesDifference = $current_time->diffInMinutes($updated);
            $notiUpdated[] = $minutesDifference;
        }
        return response()->json([
            'notifications' => $notis,
            'notiUpdated'=> $notiUpdated,
        ]);
    }
    public function watchList($id){
        $list = DB::table('movie_favo')->join('movies','movies.id','=','movie_favo.id_movie')
                ->join('users','users.id','=','movie_favo.id_user')->where('users.id',$id)->select('movies.*')->get();
        return response()->json($list);
    }
    public function viewall(){
        $list = DB::table('movies')->where('security','N')->orderByDesc('update_at')->paginate(16);
        return response()->json(['list'=>$list]);
    }
    public function getMovieEP($mid, $limit): \Illuminate\Support\Collection
    {
        return DB::table('movie_episodes')->where('movie_id', $mid)->orderByDesc('episode_id')->limit($limit)->get();
    }
    public function searchMovie($searchKeyword)
    {
        if($searchKeyword != ""){
            $movies = DB::table('movies')->where('security', 'N')->where('name', 'LIKE', "%$searchKeyword%")
            ->orWhere('othername', 'LIKE', "%$searchKeyword%")->limit(8)
            ->get();
            return response()->json($movies);
        }
        return response("Lỗi");
    }
    public function filterMovie($searchKeyword)
    {
        if($searchKeyword != ""){
            $movies = DB::table('movies')->where('security', 'N')->where('name', 'LIKE', "%$searchKeyword%")
            ->orWhere('othername', 'LIKE', "%$searchKeyword%")
            ->paginate(16);
            return response()->json(['list' => $movies]);
        }
        return response("Lỗi");
    }
    public function getCategory($category){
        $list = DB::table('movies')->select('id_movie as id', 'category', 'img', 'episode', 'name')->join('movie_cate','movies.id','=','movie_cate.id_movie')->join('categories','movie_cate.id_cate','=','categories.id')
        ->where('category',$category)->where('security', 'N')->paginate(16);
        return response()->json(['list'=>$list]);
    }
    public function checkFavo($id, $user){
        return DB::table('movie_favo')->join('users','users.id','=','movie_favo.id_user')
            ->join('movies','movies.id','=','movie_favo.id_movie')
            ->where('id_user', $user)
            ->where('movies.id', $id)->count();
    }
    public function getMovieJustUpdate($limit): \Illuminate\Support\Collection
    {
        return DB::table('movies')->where('security', 'N')->orderByDesc('update_at')->limit($limit)->get();
    }
    public function getHotMovie(): \Illuminate\Support\Collection
    {
        $today = Carbon::today()->toDateString();
        return DB::table('daily_ranking')->join('movies', 'movies.id','=','daily_ranking.movie_id')
            ->where('security', 'N')
            ->where('date',$today)
            ->orderByDesc('view_count')
            ->limit(5)
            ->get();
    }
    public function getMovieByCate($cate): \Illuminate\Support\Collection
    {
        return DB::table('movie_cate')->join('movies','movies.id','=','movie_cate.id_movie')
            ->join('categories','movie_cate.id_cate','=','categories.id')
            ->where('category',$cate)
            ->where('security', 'N')
            ->orderByDesc('update_at')
            ->get();
    }
    public function getHotWM($ranking): \Illuminate\Support\Collection
    {
        $today = Carbon::today()->toDateString();
        return DB::table($ranking)->join('movies', 'movies.id','=',$ranking.'.movie_id')
            ->where('security', 'N')
            ->where('start_date', '<=', $today)
            ->where('end_date', '>=', $today)
            ->orderByDesc('view_count')
            ->limit(5)
            ->get();
    }
    public function AddFMovie($id_movie, $user){
        $check = DB::table('movie_favo')->where('id_user', $user)->where('id_movie', $id_movie)->count();
        if ($check > 0) {
            return 'existed';
        } else {
            DB::table('movie_favo')->insert([
                'id_movie'=> $id_movie,
                'id_user'=> $user,
            ]);
            return 'added';
        }
    }
    public function getbanners(){
        $banner = DB::table('banners')->get('image');
        return response()->json($banner);
    }
    public function getMessages($id = null){
        if($id == null){
            $messages = DB::table('boxchats')->join('users','users.id','=','boxchats.sender')->orderBy('boxchats.created_at')->limit(50)->get();
        }else{
            $messages = DB::table('boxchats')->join('users','users.id','=','boxchats.sender')->where('post',$id)->orderBy('boxchats.created_at')->limit(50)->get();
        }
        return response()->json($messages);
    }
    public function getMessagesByMovie($id){
        $movie = DB::table('movie_episodes')->where('episode_id', $id)->first();
        $messages = DB::table('boxchats')->join('users','users.id','=','boxchats.sender')->where('post',$movie->movie_id)->orderBy('boxchats.created_at')->limit(50)->get();
        return response()->json($messages);
    }
    public function addMessage(Request $request){
        $id = $request->input('idUser');
        $message = $request->input('message');
        if($request->input('idMovie')){
            $idMovie = $request->input('idMovie');
            DB::table('boxchats')->insert(['message' => $message, 'sender' => $id, 'post' => $idMovie]);
        }else{
            DB::table('boxchats')->insert(['message' => $message, 'sender' => $id]);
        }
        $user = DB::table('users')->where('id', $id)->get();
        foreach($user as $item){
            $img = $item->img;
            $name = $item->username;
        }
        event(new Chat($name, $img, $message));
        return response()->json('success');
    }
    //-----------------------Update View------------------------------
    public function UpdateView($movieId){
        DB::table('movies')->where('id',$movieId)->update(['views' => DB::raw('views + 1')]);
        $current = Carbon::today()->format('Y-m-d');
        $check = DB::table('daily_ranking')->where('movie_id',$movieId)->where('date', $current)->count();
        if($check > 0){
            DB::table('daily_ranking')->where('movie_id', $movieId)->update(['view_count' => DB::raw('view_count + 1')]);
        }else{
            DB::table('daily_ranking')->insert(['movie_id'=>$movieId,'date'=>$current]);
        }
        $checkweek = DB::table('weekly_ranking')->where('movie_id', $movieId)->where('start_date','<=',$current)
            ->where('end_date','>=',$current)->count();
        if($checkweek > 0){
            DB::table('weekly_ranking')->where('movie_id', $movieId)->update(['view_count' => DB::raw('view_count + 1')]);
        }else{
            $startOfWeek = DB::raw("DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)");
            $endOfWeek = DB::raw("DATE_ADD($startOfWeek, INTERVAL 6 DAY)");
            DB::table('weekly_ranking')->insert([
                'movie_id' => $movieId,
                'start_date' => $startOfWeek,
                'end_date' => $endOfWeek,
                'view_count' => 1
            ]);
        }
        $checkmonth = DB::table('monthly_ranking')->where('movie_id', $movieId)->where('start_date','<=',$current)
            ->where('end_date','>=',$current)->count();
        if ($checkmonth > 0) {
            DB::table('monthly_ranking')->where('movie_id', $movieId)->update(['view_count' => DB::raw('view_count + 1')]);
        } else {
            $startOfMonth = DB::raw("DATE_FORMAT(CURDATE(), '%Y-%m-01')");
            $endOfMonth = DB::raw("LAST_DAY(CURDATE())");
            DB::table('monthly_ranking')->insert([
                'movie_id' => $movieId,
                'start_date' => $startOfMonth,
                'end_date' => $endOfMonth,
                'view_count' => 1
            ]);
        }
    }
    //-------------------------End Update View----------------------------------
    public function getMoviesPrivate(){
        $movies =  DB::table('movies')->where('security', 'Y')->orderByDesc('update_at')->get();
        return response()->json($movies, 200);
    }
}
