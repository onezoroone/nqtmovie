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
        Schema::create('daily_rankings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idMovie');
            $table->integer('views')->unsigned()->default(1);
            $table->timestamps();
            $table->foreign('idMovie')->references('id')->on('movies')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_rankings');
    }
};
