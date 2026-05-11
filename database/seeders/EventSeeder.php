<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::create([
            'photo' => 'events/event1.jpg',
            'name' => 'Film Festival 2026',
            'event_date' => '2026-06-15',
            'description' => 'Annual production house film festival.'
        ]);

        Event::create([
            'photo' => 'events/event2.jpg',
            'name' => 'Talent Audition',
            'event_date' => '2026-07-20',
            'description' => 'Open casting for upcoming films.'
        ]);
    }
}