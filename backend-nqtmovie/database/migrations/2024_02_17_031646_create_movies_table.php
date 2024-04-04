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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->String('slug')->unique();
            $table->string('othername');
            $table->string('quality')->nullable();
            $table->string('year')->nullable();
            $table->string('episode')->nullable();
            $table->string('time')->nullable();
            $table->string('status')->nullable();
            $table->string('img')->nullable();
            $table->string('trailer')->nullable();
            $table->string('casts')->nullable();
            $table->string('country')->nullable();
            $table->enum('security', ['True', 'False'])->default('False');
            $table->string('type')->nullable();
            $table->text('des')->nullable();
            $table->string('poster')->nullable();
            $table->integer('views')->unsigned()->default(0);
            $table->text('keyword')->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
