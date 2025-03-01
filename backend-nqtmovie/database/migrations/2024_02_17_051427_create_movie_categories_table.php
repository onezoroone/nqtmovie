<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movie_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idMovie');
            $table->unsignedBigInteger('idCategory');
            $table->foreign('idMovie')->references('id')->on('movies')->onDelete('cascade');
            $table->foreign('idCategory')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movie_categories');
    }
};
