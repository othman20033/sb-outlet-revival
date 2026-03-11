<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

    public function show($id)
    {
        return response()->json(Category::findOrFail($id));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string|unique:categories',
        ]);

        $category = Category::create($validated);
        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'slug' => 'sometimes|required|string|unique:categories,slug,'.$category->id,
        ]);
        
        $category->update($validated);
        return response()->json($category);
    }

    public function destroy($id)
    {
        Category::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
