<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Film;

class FilmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Film::create([
            'video' => 'films/trailer1.mp4',
            'name' => 'The Last Journey',
            'director_name' => 'John Smith',
            'duration' => 120,
            'genre' => 'Drama',
            'synopsis' => 'A story about friendship and sacrifice.'
        ]);

        Film::create([
            'video' => 'films/trailer2.mp4',
            'name' => 'Midnight Escape',
            'director_name' => 'Michael Lee',
            'duration' => 95,
            'genre' => 'Action',
            'synopsis' => 'An intense action thriller.'
        ]);
    }
}