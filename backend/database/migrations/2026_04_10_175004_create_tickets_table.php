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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->string('description', 255);
            $table->string('client', 100);
            $table->enum('priority', ['Bajo', 'Medio', 'Alto', 'Crítico'])->default('Medio');
            $table->enum('status', ['Abierto', 'En progreso', 'Resuelto'])->default('Abierto');
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
