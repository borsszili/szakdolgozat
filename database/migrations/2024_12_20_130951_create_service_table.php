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
        Schema::create('service', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->string('name');
            $table->integer('price');

            $table->string('description')->nullable();
        });

        Schema::create('employee_has_service', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->foreignId('employee_id')->references('id')->on("employee")->cascadeOnDelete();
            $table->foreignId('service_id')->references('id')->on("service")->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service');
        Schema::dropIfExists('employee_has_service');
    }
};
