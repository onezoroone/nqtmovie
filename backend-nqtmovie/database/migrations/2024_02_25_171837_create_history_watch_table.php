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
        Schema::create('history_watch', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idMovie');
            $table->unsignedBigInteger('idUser');
            $table->text('idEpisode');
            $table->foreign('idMovie')->references('id')->on('movies')->onDelete('cascade');
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('history_watch');
    }
};
