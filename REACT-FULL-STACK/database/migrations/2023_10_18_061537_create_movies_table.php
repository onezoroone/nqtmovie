<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateMoviesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('othername')->nullable();
            $table->string('quality', 20)->nullable();
            $table->string('year', 5)->nullable();
            $table->string('episode', 50)->nullable();
            $table->string('time', 50)->nullable();
            $table->dateTime('posted')->default(DB::raw('current_timestamp'))->nullable();
            $table->string('status', 50)->nullable();
            $table->string('img')->nullable();
            $table->string('actor')->nullable();
            $table->string('type')->nullable();
            $table->string('trailer')->nullable();
            $table->text('describe')->nullable();
            $table->string('poster')->nullable();
            $table->unsignedInteger('views')->default('0');
            $table->timestamp('update_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movies');
    }
}
