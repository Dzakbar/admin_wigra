<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('film_applications', function (Blueprint $table) {
            $table->string('phone_number')->nullable()->after('contact');
        });
    }

    public function down(): void
    {
        Schema::table('film_applications', function (Blueprint $table) {
            $table->dropColumn('phone_number');
        });
    }
};
