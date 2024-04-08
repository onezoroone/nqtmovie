<?php

namespace App\Http\Controllers;

use App\Models\Episode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use DOMDocument;
class EpisodeController extends Controller
{
    public function index($slug)
    {
        $movie = DB::table('movies')->where('slug', $slug)->first();
        if(!$movie){
            return response()->json(['status'=>'error', 'movie' => "Không tìm thấy bộ phim!"], 200);
        }
        $name = $movie->name;
        $img = $movie->poster;
        $servers = DB::table('episodes')
        ->join('server_episodes', 'server_episodes.idEpisode', '=', 'episodes.id')->where('idMovie', $movie->id)->distinct()->select('server')->get();
        $data = [];
        foreach ($servers as $server) {
            $maxNumber = DB::table('episodes')->where('idMovie',$movie->id)->max(DB::raw('CAST(ep_number AS UNSIGNED)'));
            $maxDigits = strlen((string)$maxNumber);
            $serverEpisodes = DB::table('episodes')
            ->join('server_episodes', 'server_episodes.idEpisode', '=', 'episodes.id')
            ->where('server_episodes.server', $server->server)
            ->where('idMovie', $movie->id)
            ->select('ep_link', 'ep_number', 'slug', 'idEpisode', 'server', 'thumbnail', 'created_at', 'server_episodes.id')
            ->orderByRaw("LPAD(ep_number, $maxDigits, '0') DESC")
            ->get();
            $serverData = [
                'server' => $server->server,
                'episodes' => []
            ];

            foreach ($serverEpisodes as $episode) {
                $serverData['episodes'][] = [
                    'ep_link' => $episode->ep_link,
                    'ep_number' => $episode->ep_number,
                    'slug' => $episode->slug,
                    'idEpisode' => $episode->idEpisode,
                    'thumbnail' => $episode->thumbnail,
                    'server' => $episode->server,
                    'id' => $episode->id,
                    'created_at' => $episode->created_at
                ];
            }
            $data[] = $serverData;
        }

        return response()->json(['name' => $name, 'idMovie' => $movie->id ,'data' => $data, 'img' => $img], 200);
    }

    public function store(Request $request)
    {
        $episode = DB::table('episodes')->where('idMovie', $request->idMovie)->where('ep_number', $request->episode)->first();
        if($episode){
            $check = DB::table('server_episodes')->where('server', $request->serverName)->where('idEpisode', $episode->id)->first();
            if($check){
                return response()->json("Máy chủ phim ".$request->serverName." đã có tập phim này.", 422);
            }
            DB::table('server_episodes')->insert([
                'server' => $request->serverName,
                'idEpisode' => $episode->id,
                'ep_link' => $request->link
            ]);
        }else{
            $id = DB::table('episodes')->insertGetId([
                'idMovie' => $request->idMovie,
                'ep_number' => $request->episode,
                'slug' => 'tap-'.$request->episode,
                'created_at' => now()
            ]);
            DB::table('server_episodes')->insert([
                'ep_link' => $request->link,
                'idEpisode' => $id,
                'server' => $request->serverName
            ]);
        }
        return response()->json("Thêm tập ".$request->episode." thành công", 200);
    }

    public function update(Request $request)
    {
        $episode = DB::table('server_episodes')->where('id', $request->id)->first();
        DB::table('server_episodes')->where('id', $request->id)->update([
            'server' => $request->serverName,
            'idEpisode' => $request->idEpisode,
            'ep_link' => $request->link,
        ]);
        return response()->json("Sửa Thành Công Tập Phim.", 200);
    }

    public function destroy(Request $request)
    {
        DB::table('server_episodes')->where('idEpisode', $request->idEpisode)->where('server', $request->serverName)->delete();
        $check = DB::table('server_episodes')->where('idEpisode', $request->idEpisode)->count();
        if($check == 0){
            DB::table('episodes')->where('id', $request->idEpisode)->delete();
        }
        return response()->json("Xóa thành công tập phim.", 200);
    }

    public function addManyEpisodes(Request $request){
        $array = explode("\n", $request->list);
        foreach ($array as $item) {
            $innerArray = explode("|", $item);
            $episode = DB::table('episodes')->where('idMovie', $request->idMovie)->where('ep_number', $innerArray[0])->first();
            if(!$episode){
                $id = DB::table('episodes')->insertGetId([
                    'ep_number' => $innerArray[0],
                    'idMovie' => $request->idMovie,
                    'created_at' => now(),
                    'slug' => "tap-".$innerArray[0]
                ]);

                DB::table('server_episodes')->insert([
                    'idEpisode' => $id,
                    'ep_link' => $innerArray[1],
                    'server' => $request->serverName
                ]);
            }else{
                $check = DB::table('server_episodes')->where('idEpisode', $episode->id)->where('server', $request->serverName)->first();
                if(!$check){
                    DB::table('server_episodes')->insert([
                        'server' => $request->serverName,
                        'ep_link' => $innerArray[1],
                        'idEpisode' => $episode->id
                    ]);
                }
            }
        }
        return response()->json("Thêm thành công.", 200,);
    }
    public function crawlEpisodeOphim(Request $request){
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', "https://ophim1.com/phim/".$request->slug);
        $content = $response->getBody()->getContents();
        $movie = DB::table('movies')->where('slug', $request->slug)->first();
        $content = json_decode($content, true);
        $data = $content['episodes'][0]['server_data'];
        if(!$data){
            return response()->json("Không tìm thấy phim.", 422);
        }
        $count = count($data);
        DB::table('movies')->where('id', $movie->id)->update([
            'episode' => "Tập ".$data[$count-1]['name'],
            'updated_at' => now()
        ]);
        for($i = $count - 1; $i >= 0; $i--){
            $idEpisode = DB::table('episodes')->where('idMovie', $movie->id)->where('ep_number', $data[$i]['name'])->first();
            if($idEpisode){
                $check = DB::table('server_episodes')->where('idEpisode', $idEpisode->id)->where('server', "OPHIM")->first();
                if(!$check){
                    DB::table('server_episodes')->insert([
                        'idEpisode' => $idEpisode->id,
                        'ep_link' => $data[$i]['link_embed'],
                        'server' => "OPHIM",
                    ]);
                    DB::table('episodes')->where('id', $idEpisode->id)->update([
                        'thumbnail' => dirname($data[$i]['link_m3u8']).'/1.jpg'
                    ]);
                }
            }else{
                $thumbnail = dirname($data[$i]['link_m3u8']).'/1.jpg';
                $id = DB::table('episodes')->insertGetId([
                    'ep_number' => $data[$i]['name'],
                    'idMovie' => $movie->id,
                    'created_at' => now(),
                    'slug' => "tap-".$data[$i]['name'],
                    'thumbnail' => $thumbnail
                ]);
                DB::table('server_episodes')->insert([
                    'idEpisode' => $id,
                    'ep_link' => $data[$i]['link_m3u8'],
                    'server' => "NQTMOVIE"
                ]);
                DB::table('server_episodes')->insert([
                    'idEpisode' => $id,
                    'ep_link' => $data[$i]['link_embed'],
                    'server' => "OPHIM"
                ]);
            }
        }
        return response()->json("Cập nhật tập phim thành công.", 200);
    }

    public function crawlEpisodeNguonc(Request $request){
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', "https://phim.nguonc.com/api/film/".$request->slug);
        $content = $response->getBody()->getContents();
        $movie = DB::table('movies')->where('slug', $request->slug)->first();
        $content = json_decode($content, true);
        $data = $content['movie']['episodes'][0]['items'];
        if(!$data){
            return response()->json("Không tìm thấy phim.", 422);
        }
        $count = count($data);
        DB::table('movies')->where('id', $movie->id)->update([
            'episode' => "Tập ".$data[$count-1]['name'],
            'updated_at' => now()
        ]);
        for($i = $count - 1; $i >= 0; $i--){
            $idEpisode = DB::table('episodes')->where('idMovie', $movie->id)->where('ep_number', $data[$i]['name'])->first();
            if($idEpisode){
                $check = DB::table('server_episodes')->where('idEpisode', $idEpisode->id)->where('server', "NGUONC")->first();
                if(!$check){
                    DB::table('server_episodes')->insert([
                        'idEpisode' => $idEpisode->id,
                        'ep_link' => $data[$i]['embed'],
                        'server' => "NGUONC"
                    ]);
                }
            }else{
                $id = DB::table('episodes')->insertGetId([
                    'ep_number' => $data[$i]['name'],
                    'idMovie' => $movie->id,
                    'created_at' => now(),
                    'slug' => "tap-".$data[$i]['name']
                ]);
                DB::table('server_episodes')->insert([
                    'idEpisode' => $id,
                    'ep_link' => $data[$i]['embed'],
                    'server' => "NGUONC"
                ]);
            }
        }
        return response()->json("Cập nhật tập phim thành công.", 200);
    }

    public function crawlEpisodeKKPhim(Request $request){
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', "https://phimapi.com/phim/".$request->slug);
        $content = $response->getBody()->getContents();
        $movie = DB::table('movies')->where('slug', $request->slug)->first();
        $content = json_decode($content, true);
        $data = $content['episodes'][0]['server_data'];
        if(!$data){
            return response()->json("Không tìm thấy phim.", 422);
        }
        $count = count($data);
        for($i = $count - 1; $i >= 0; $i--){
            $episodeNumber = (int) preg_replace('/\D/', '', $data[$i]['name']);
            $idEpisode = DB::table('episodes')->where('idMovie', $movie->id)->where('ep_number', $episodeNumber)->first();
            if($idEpisode){
                $check = DB::table('server_episodes')->where('idEpisode', $idEpisode->id)->where('server', "KKPHIM")->first();
                if(!$check){
                    DB::table('server_episodes')->insert([
                        'idEpisode' => $idEpisode->id,
                        'ep_link' => $data[$i]['link_m3u8'],
                        'server' => "Vietsub#1"
                    ]);
                    DB::table('server_episodes')->insert([
                        'idEpisode' => $idEpisode->id,
                        'ep_link' => $data[$i]['link_embed'],
                        'server' => "KKPHIM",
                    ]);
                }
            }else{
                $thumbnail = dirname($data[$i]['link_m3u8']).'/1.jpg';
                $id = DB::table('episodes')->insertGetId([
                    'ep_number' => preg_replace('/\D/', '', $data[$i]['name']),
                    'idMovie' => $movie->id,
                    'created_at' => now(),
                    'slug' => "tap-".preg_replace('/\D/', '', $data[$i]['name']),
                ]);
                DB::table('server_episodes')->insert([
                    'idEpisode' => $id,
                    'ep_link' => $data[$i]['link_m3u8'],
                    'server' => "Vietsub#1"
                ]);
                DB::table('server_episodes')->insert([
                    'idEpisode' => $id,
                    'ep_link' => $data[$i]['link_embed'],
                    'server' => "KKPHIM"
                ]);
            }
        }
        return response()->json("Cập nhật tập phim thành công.", 200);
    }
}
