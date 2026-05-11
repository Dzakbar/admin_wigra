<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FilmApplication;

class FilmApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        FilmApplication::create([
            'user_id' => 3,
            'film_id' => 1,
            'name' => 'Normal User',
            'age' => 22,
            'gender' => 'male',
            'document' => 'documents/cv1.pdf',
            'telephone_number' => '083333333333',
            'email' => 'user@gmail.com',
            'status' => 'pending'
        ]);

        FilmApplication::create([
            'user_id' => 3,
            'film_id' => 2,
            'name' => 'Normal User',
            'age' => 22,
            'gender' => 'male',
            'document' => 'documents/cv2.pdf',
            'telephone_number' => '083333333333',
            'email' => 'user@gmail.com',
            'status' => 'accepted'
        ]);
    }
}
