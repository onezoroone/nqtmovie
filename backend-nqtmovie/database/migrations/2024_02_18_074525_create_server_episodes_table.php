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
        Schema::create('server_episodes', function (Blueprint $table) {
            $table->id();
            $table->string('server')->default('DU');
            $table->unsignedBigInteger('idEpisode');
            $table->text('ep_link');
            $table->foreign('idEpisode')->references('id')->on('episodes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('server_episodes');
    }
};
