<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   // ProductController.php

public function index()
{
    $product_data = Product::all();
    return response()->json(['status' => 200, 'Products' => $product_data]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('product_Main');
    }

    /**
     * Store a newly created resource in storage.
     */
 public function store(Request $request)
{
    $data = $request->validate([
        'title' => 'required',
        'price' => 'required',
        'description' => 'required',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        'category' => 'required',
        'quantity' => 'required',
        'weight' => 'required',
        'available' => 'required',
        'discount' => 'required',
        'featured' => 'required'
    ]);

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('public/uploads');
        $data['image'] = str_replace('public/', '', $imagePath);
    }
    $product_data = Product::create($data);

    return response()->json(['status' => 200, 'product' => $product_data]);
}



    

    /**
     * Display the specified resource.
     */

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
{
    return response()->json([
        'status' => 200,
        'product' => $product,
    ]);
}

public function showProduct(Product $product)
{
    return response()->json([
        'status' => 200,
        'product' => $product,
    ]);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
{
    $data = $request->all();

    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = time() . '_' . $file->getClientOriginalName();
        $destinationPath = public_path('storage');
        $file->move($destinationPath, $filename);
        $data['image'] = $filename;
    }

    $product->update($data);

        return response()->json([
            'status' => 200,
            'message' => 'Product updated successfully.',
        ]);
    }
  
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $product = Product::findOrFail($id);
    $product->delete();

    return response()->json(['status' => 200, 'message' => 'Product deleted successfully']);
}
}

