<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('country');
            $table->string('fname');
            $table->string('lname');
            $table->string('address');
            $table->string('p_code');
            $table->string('city');
            $table->string('phone');
            $table->unsignedBigInteger('user_id');
            $table->integer('total_price');
            $table->json('titles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
