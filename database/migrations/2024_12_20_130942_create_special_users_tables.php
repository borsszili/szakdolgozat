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
        Schema::create('guest', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->foreignId('user_id')->references('id')->on("users")->cascadeOnDelete();
        });

        Schema::create('employee', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->foreignId('user_id')->references('id')->on("users")->cascadeOnDelete();

            $table->time("MondayWorkingHoursStart");
            $table->time("MondayWorkingHoursEnd");

            $table->time("TuesdayWorkingHoursStart");
            $table->time("TuesdayWorkingHoursEnd");

            $table->time("WednesdayWorkingHoursStart");
            $table->time("WednesdayWorkingHoursEnd");

            $table->time("ThursdayWorkingHoursStart");
            $table->time("ThursdayWorkingHoursEnd");

            $table->time("FridayWorkingHoursStart");
            $table->time("FridayWorkingHoursEnd");

            $table->time("SaturdayWorkingHoursStart");
            $table->time("SaturdayWorkingHoursEnd");

            $table->time("SundayWorkingHoursStart");
            $table->time("SundayWorkingHoursEnd");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guest');
        Schema::dropIfExists('employee');
    }
};
