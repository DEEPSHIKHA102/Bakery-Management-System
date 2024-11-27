<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'country',
        'fname',
        'lname',
        'address',
        'p_code',
        'city',
        'phone',
        'user_id',
        'total_price',
        'titles',
    ];

    protected $casts = [
        'titles' => 'json',
    ];
}
