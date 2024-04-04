<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = DB::table('categories')->select('name')->get();
        return response()->json($categories, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => "required|unique:categories,name"
        ],[
            'name.required' => 'Tên không được để trống.',
            'name.unique' => 'Thể loại đã tồn tại.'
        ]);
        DB::table('categories')->insert([
            'name' => $request->name,
            'created_at' => now()
        ]);
        return response()->json("Thêm thể loại mới thành công.", 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    public function destroy(Request $request)
    {
        DB::table('categories')->where('name', $request->name)->delete();
        return response()->json("Xóa thành công.", 200);
    }
}
