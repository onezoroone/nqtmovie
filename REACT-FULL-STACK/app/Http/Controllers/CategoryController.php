<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function index()
    {
        //
        if (!session('admin')) {
            return redirect('/admin/login');
        }
        $categories = Category::all();
        return view('admin.list-category', ['categories'=>$categories]);
    }
    public function getAllCate(){
        $list =  DB::table('categories')->get();
        return response()->json($list);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function create()
    {
        //
        if (!session('admin')) {
            return redirect('/admin/login');
        }
        return view('admin.add-category');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Routing\Redirector
     */
    public function store(Request $request)
    {
        //
        $name = $request->input('genre');
        $check = DB::table('categories')->where('category', $name)->first();
        if($check){
            return back()->with('error', $name);
        }else{
            DB::table('categories')->insert(['category' => $name]);
            return back()->with('success', $name);
        }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Routing\Redirector
     */
    public function destroy($id)
    {
        //
        $category = DB::table('categories')->where('id', $id)->get();
        foreach ($category as $item){
            $category = $item->category;
        }
        DB::table('categories')->where('id', $id)->delete();
        return back()->with('success', 'Delete Successfully Category '. $category);
    }
}
