<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use \App\http\Controllers\ProductController;
use \App\http\Controllers\ContactController;
use \App\http\Controllers\OrderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('show/{product}',[ProductController::class,'showProduct']); //show single product
Route::post('createproduct',[ProductController::class,'create']);
Route::post('product_storage',[ProductController::class,'store']);
Route::post('index-product',[ProductController::class,'index']);
Route::post('destroy-data/{product}',[ProductController::class,'destroy']);
Route::post('edit-data/{product}', [ProductController::class, 'edit']);
Route::post('update/{product}', [ProductController::class, 'update']);

  Route::post('order_storage',[OrderController::class,'store']);
  Route::post('index_order',[OrderController::class,'index']);
  Route::post('destroy-order/{order}',[OrderController::class,'destroy']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [authController::class, 'login']);


Route::post('register', [authController::class, 'register']);



Route::group(['middleware' => 'api'], function () {
    
Route::post('index-contact',[ContactController::class,'index']);
    Route::post('contact_storage',[ContactController::class,'store'])->middleware('api');
    // Route::post('contact_storage',[ContactController::class,'store']);
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});



