<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $order=Order::all();
       return response()->json(['status' => 200, 'order' => $order]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('order');
    }
    
    /**
     * Store a newly created resource in storage.
     */
   

     public function store(Request $request)
     {
         $data = $request->validate([
             'email' => 'required',
             'country' => 'required',
             'fname' => 'required',
             'lname' => 'required',
             'address' => 'required',
             'p_code' => 'required',
             'city' => 'required',
             'phone' => 'required',
             'user_id'=> 'required',
             'total_price'=> 'required',
             'titles' => 'required|array',
             'titles.*' => 'required|string',
         ]);
 
         $order = Order::create($data);
 
         return response()->json([
             'message' => 'Order successfully created.',
         ]);
     }


    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return view('order3',compact('order'));
    }

    /**
     * Update the specified resource in storage.
     */
  

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
    
        return response()->json(['status' => 200, 'message' => 'Product deleted successfully']);
    }
}
