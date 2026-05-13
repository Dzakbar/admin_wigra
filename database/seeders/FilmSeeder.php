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
            'video' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'name' => 'The Last Journey',
            'director_name' => 'John Smith',
            'duration' => 120,
            'genre' => 'Drama',
            'category' => 'films',
            'synopsis' => 'A story about friendship and sacrifice.'
        ]);

        Film::create([
            'video' => 'https://www.youtube.com/watch?v=L_LUpnjgPso',
            'name' => 'Project Chronos',
            'director_name' => 'Sarah Connor',
            'duration' => 0,
            'genre' => 'Sci-Fi',
            'category' => 'upcoming',
            'synopsis' => 'An upcoming masterclass production exploring time travel anomalies.',
            'application_start_date' => date('Y-m-d', strtotime('+1 day')),
            'application_deadline' => date('Y-m-d', strtotime('+14 days')),
            'roles_needed' => 'Talent, Astrada, DOP, ART, Wardrobe, Sound, Gaffer'
        ]);
    }
}