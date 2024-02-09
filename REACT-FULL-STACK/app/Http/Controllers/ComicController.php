<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use DOMDocument;
use DOMXPath;
use Spatie\Async\Pool;
use Spatie\Async\Promise;
use Illuminate\Support\Facades\DB;
class ComicController extends Controller
{
    //
    public function nettruyen($name){
        set_time_limit(10000);
        $userAgent = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36 Edg/119.0.0.0';
        $url = 'https://www.nettruyenus.com/truyen-tranh/'.$name;
        $client = new Client();
        $response = $client->get($url, [
            'headers' => [
                'User-Agent' => $userAgent,
            ]
        ]);
        $html = $response->getBody()->getContents();
        $dom = new DOMDocument();
        @$dom->loadHTML($html);
        $xpath = new DOMXPath($dom);
        $listChaps = $xpath->query('//div[contains(@class, "col-xs-5 chapter")]//a');
        $genres = $xpath->query('//li[contains(@class, "kind row")]//a');
        $title = $xpath->query('//h1[contains(@class, "title-detail")]');
        $listGenres = [];
        foreach($title as $index){
            $comicName = $index->nodeValue;
        }
        foreach($genres as $item){
            $listGenres[] = $item->nodeValue;
        }
        $picture = $xpath->query('//div[contains(@class, "col-xs-4 col-image")]//img');
        foreach($picture as $abc){
            $anhdaidien = $abc->getAttribute('src');
        }
        $check = DB::table('comics')->where('name', $comicName)->count();
        if($check == 0){
            $id = DB::table('comics')->insertGetId([
                'name' => $comicName,
                'image' => $anhdaidien,
            ]);
            foreach($listGenres as $item){
                $checkGenre = DB::table('comicgenres')->where('genre',$item)->count();
                if($checkGenre > 0){
                    $idGenre = DB::table('comicgenres')->where('genre', $item)->value('id');
                    DB::table('comic_genre')->insert(['ComicID'=> $id, 'GenreID' => $idGenre]);
                }
            }
        }else{
            $id = DB::table('comics')->where('name', $comicName)->value('id');
        }
        $srcs = [];
        foreach($listChaps as $item){
            $href = $item->getAttribute('href');
            $text = $item->nodeValue;
            $chapterNumber = preg_replace('/[^\d]+/', '', $text);
            $srcs[] = array('chap' => $chapterNumber, 'href' => $href);
        }
        DB::table('comics')->where('id', $id)->update([
            'totalchap' => $srcs[0]['chap'],
        ]);
        foreach($srcs as $item){
            $chap = $item['chap'];
            $href = $item['href'];
            $count = DB::table('chapters')->where('chapter', $chap)->where('ComicID', $id)->count();
            if($count > 0){
                continue;
            }
            $idChapter = DB::table('chapters')->insertGetId([
                'chapter' => $chap,
                'ComicID' => $id
            ]);
            $response1 = $client->get($href, [
                'headers' => [
                    'User-Agent' => $userAgent,
                ]
            ]);
            $html1 = $response1->getBody()->getContents();
            @$dom->loadHTML($html1);
            $xpath = new DOMXPath($dom);
            $images = $xpath->query('//div[contains(@class, "page-chapter")]//img');
            foreach ($images as $image) {
                $urlImage = $image->getAttribute('src');
                DB::table('chapterimgs')->insert([
                    'ChapterID' => $idChapter,
                    'link' => $urlImage,
                ]);
            }
        }
        return response('success');
    }
    public function truyenvn($name){
        set_time_limit(1000);
        $url = 'https://truyenvnhay.tv/'. $name;
        $client = new Client();
        $response = $client->post($url, [
            'form_params' => [
                'bf001a61-ea58-4c69-33b4-1b01154b26f5' => '6757ca1afe22276c7d79b9',
            ],
        ]);
        $html = $response->getBody()->getContents();
        $dom = new DOMDocument();
        @$dom->loadHTML($html);
        $xpath = new DOMXPath($dom);

        $lists = $xpath->query('//a[contains(@class, "d-flex justify-content-between w-100")]');
        $title = $xpath->query('//h1[contains(@class, "name font-15x font-bold")]');
        foreach($title as $index){
            $comicName = $index->nodeValue;
        }
        $picture = $xpath->query('//img[contains(@class, "mx-auto lazy")]');
        foreach($picture as $abc){
            $anhdaidien = $abc->getAttribute('src');
        }
        $check = DB::table('comics')->where('name', $comicName)->count();
        if($check == 0){
            $id = DB::table('comics')->insertGetId([
                'name' => $comicName,
                'image' => $anhdaidien,
            ]);
            DB::table('comic_genre')->insert(['ComicID'=> $id , 'GenreID' => '20']);
        }else{
            $id = DB::table('comics')->where('name', $comicName)->value('id');
        }
        $srcs = [];
        foreach($lists as $item){
            $href = $item->getAttribute('href');
            $text = $item->nodeValue;
            preg_match('/Chương (\d+)/', $text, $matches);
            if (isset($matches[1])) {
                $chap = $matches[1];
            }
            $srcs[] = array('chap' => $chap, 'href' => $href);
        }
        DB::table('comics')->where('id', $id)->update([
            'totalchap' => $srcs[0]['chap'],
        ]);
        foreach($srcs as $item){
            $chap = $item['chap'];
            $href = $item['href'];
            $count = DB::table('chapters')->where('chapter', $chap)->where('ComicID', $id)->count();
            if($count > 0){
                continue;
            }
            $idChapter = DB::table('chapters')->insertGetId([
                'chapter' => $chap,
                'ComicID' => $id
            ]);
            $response1 = $client->get($href);
            $html1 = $response1->getBody()->getContents();
            @$dom->loadHTML($html1);
            $xpath = new DOMXPath($dom);
            $images = $xpath->query('//div[contains(@class, "chapter-content")]//img[@loading]');
            foreach ($images as $image) {
                $urlImage = $image->getAttribute('src');
                DB::table('chapterimgs')->insert([
                    'ChapterID' => $idChapter,
                    'link' => $urlImage,
                ]);
            }
        }
        return response('success');
    }
    public function doctruyen3q($url, $id) {
        set_time_limit(1000);
        $url1 = 'https://doctruyen3qvn.com/truyen-tranh/'.$url.'/'.$id;
        $client = new Client();
        $response = $client->get($url1);

        $html = $response->getBody()->getContents();

        $dom = new DOMDocument();
        @$dom->loadHTML($html);
        $xpath = new DOMXPath($dom);
        $title = $xpath->query("//*[@class='title-manga']")->item(0);
        $comicName = $title->nodeValue;
        $images = $xpath->query("//*[@class='image-comic']");
        $genres = $xpath->query('//li[contains(@class, "category row")]//a');
        foreach($images as $item){
            $image = $item->getAttribute('src');
        }
        $listGenres = [];
        foreach($genres as $item){
            $listGenres[] = $item->nodeValue;
        }
        $check = DB::table('comics')->where('name', $comicName)->count();
        if($check == 0){
            $id = DB::table('comics')->insertGetId([
                'name' => $comicName,
                'image' => $image,
            ]);
            foreach($listGenres as $item){
                $checkGenre = DB::table('comicgenres')->where('genre',$item)->count();
                if($checkGenre > 0){
                    $idGenre = DB::table('comicgenres')->where('genre', $item)->value('id');
                    DB::table('comic_genre')->insert(['ComicID'=> $id, 'GenreID' => $idGenre]);
                }
            }
        }else{
            $id = DB::table('comics')->where('name', $comicName)->value('id');
        }

        $lists = $xpath->query('//div[contains(@class, "chapter")]/a');
        $srcList = [];
        $liList = [];
        foreach ($lists as $item) {
                $li = $item->getAttribute('data-id');
                $chap = $item->getAttribute('data-chapter');
                $liList[] = array('li' => $li, 'chap' => $chap);
        }
        array_shift($liList);
        DB::table('comics')->where('id', $id)->update([
            'totalchap' => $liList[0]['chap'],
        ]);
        $urlList = [];
        $i = true;
        $concurrency = 10;
        $pool = Pool::create(['concurrency' => $concurrency]);
        foreach ($liList as $item) {
            $li = $item['li'];
            $chap = $item['chap'];
            $checkChap = DB::table('chapters')->where('id', $li)->count();
            if($checkChap > 0){
                continue;
            }
            $abcd = DB::table('chapters')->where('ComicID', $id)->insertGetId([
                'ComicID' => $id,
                'id' => $li,
                'chapter' => $chap,
            ]);
            $url2 = 'https://doctruyen3qvn.com/truyen-tranh/'.$url.'/chapter-'.$chap.'/'.$li;
            $pool->add(function () use ($client, $li, $url2, $chap) {
                $response = $client->get($url2);
                $html1 = $response->getBody()->getContents();
                $dom1 = new DOMDocument();
                @$dom1->loadHTML($html1);
                $xpath1 = new DOMXPath($dom1);
                $divs = $xpath1->query("//*[@class='page-chapter']");
                $chapSrcList = [];
                foreach ($divs as $div) {
                    $images = $xpath1->query(".//img", $div);
                    foreach($images as $image){
                        $src = $image->getAttribute('src');
                        DB::table('chapterimgs')->insert([
                            'ChapterID' => $li,
                            'link' => $src,
                        ]);
                    }
                }
            });
        }
        $pool->wait();
        return response('success');
    }
    public function getImage($chapterid, $comicid, $user = null){
        $abc = DB::table('chapterimgs')->join('chapters','chapterimgs.ChapterID','=','chapters.id')->where('ChapterID', $chapterid)->select('chapterimgs.id as id', 'ChapterID', 'link', 'chapter')->get();
        $comic = DB::table('chapters')->where('id', $chapterid)->get();
        foreach($comic as $a){
            $comicid = $a->ComicID;
        }

        $chapters = DB::table('chapters')->join('comics','comics.id','=','chapters.ComicID')->where('ComicID', $comicid)
        ->select('chapters.id as id', 'chapter', 'ComicID', 'name', 'image')
        ->orderByRaw('CAST(chapter AS UNSIGNED) DESC')
        ->get();
        if($user !== null){
            $check = DB::table('comichistory')->where('UserId', $user)->where('ComicID', $comicid)->count();
            if($check > 0){
                DB::table('comichistory')->where('UserID', $user)->where('ComicID', $comicid)->update([
                    'ChapterID' => $chapterid,
                ]);
            }else{
                DB::table('comichistory')->insert([
                    'UserID' => $user,
                    'ChapterID' => $chapterid,
                    'ComicID' => $comicid
                ]);
            }
        }
        return response()->json([
            'abc' => $abc,
            'chapters' => $chapters,
        ]);
    }
    public function getComics($limit, $order){
        return DB::table('comics')->select('comics.*')
        ->distinct()->join('comic_genre', 'comics.id', '=', 'comic_genre.ComicID')->where('comic_genre.GenreID', '!=', 20)->orderByDesc($order)->limit($limit)->get();
    }
    public function getAll(){
        $all = $this->getComics(40, 'views');
        $slides = $this->getComics(36, 'views');
        $top = $this->getComics(5, 'views');
        $genres = $this->getGenres();
        return response()->json(['allcomics' => $all, 'slides' => $slides, 'top' => $top, 'genres' => $genres]);
    }
    public function getPrivate(){
        $private = DB::table('comics')->select('comics.*')
        ->distinct()->join('comic_genre', 'comics.id', '=', 'comic_genre.ComicID')->where('comic_genre.GenreID', '=', 20)->get();
        return response()->json($private);
    }
    public function getDetail($idcomic, $user = null){
        $detail = DB::table('comics')->where('id',$idcomic)->get();
        $chapters = DB::table('chapters')->where('ComicID', $idcomic)->orderByRaw('CAST(chapter AS UNSIGNED) DESC')->get();
        if($user != null){
            $history = DB::table('comichistory')->join('chapters','chapters.id','=','comichistory.ChapterID')->where('UserID', $user)->where('comichistory.ComicID', $idcomic)->get();
        }else{
            $history = [];
        }
        return response()->json([
            'chapters' => $chapters,
            'details' => $detail,
            'history' => $history
        ]);
    }
    public function getGenres(){
        return DB::table('comicgenres')->where('id','!=' ,20)->get();
    }
}
