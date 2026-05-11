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
                  ->constrained()
                  ->onDelete('cascade');
            // relation to film
            $table->foreignId('film_id')
                  ->constrained()
                  ->onDelete('cascade');
            $table->string('name');
            $table->integer('age');
            $table->enum('gender', ['male', 'female']);
            // CV / portfolio / document
            $table->string('document');
            $table->string('telephone_number');
            $table->string('email');
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
