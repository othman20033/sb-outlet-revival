<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::with('category')->get());
    }

    public function show($id)
    {
        return response()->json(Product::with('category')->findOrFail($id));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'sometimes|uuid',
            'name' => 'required|string',
            'price' => 'required|numeric',
            'original_price' => 'nullable|numeric',
            'brand' => 'required|string',
            'size' => 'required|string',
            'category_id' => 'required|uuid|exists:categories,id',
            'images' => 'required|array',
            'status' => 'in:available,sold,reserved',
            'description' => 'required|string',
            'drop_id' => 'nullable|uuid',
        ]);

        $product = Product::create($validated);
        return response()->json($product->load('category'), 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric',
            'original_price' => 'nullable|numeric',
            'brand' => 'sometimes|required|string',
            'size' => 'sometimes|required|string',
            'category_id' => 'sometimes|required|uuid|exists:categories,id',
            'images' => 'sometimes|required|array',
            'status' => 'in:available,sold,reserved',
            'description' => 'sometimes|required|string',
            'drop_id' => 'nullable|uuid',
        ]);
        
        $product->update($validated);
        return response()->json($product->load('category'));
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
