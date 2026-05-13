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
        Schema::create('film_applications', function (Blueprint $table) {
            $table->id();
            // relation to user account
            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained()
                  ->onDelete('cascade');
            // relation to film
            $table->foreignId('film_id')
                  ->constrained()
                  ->onDelete('cascade');
            $table->string('name');
            $table->string('contact'); // email or phone number
            $table->enum('role', [
                'Talent',
                'Astrada',
                'DOP',
                'ART',
                'Wardrobe',
                'Sound',
                'Gaffer'
            ]);
            $table->string('portfolio_link')->nullable();
            $table->text('notes')->nullable();
            // application status
            $table->enum('status', [
                'pending',
                'accepted',
                'reviewing',
                'rejected'
            ])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('film_applications');
    }
};
