<?php

namespace Tests\Feature;

use App\Models\Film;
use App\Models\User;
use App\Notifications\FilmApplicationSubmittedNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class FilmApplicationNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_successful_film_application_sends_email_notification(): void
    {
        Notification::fake();

        $user = User::create([
            'name' => 'Applicant User',
            'email' => 'applicant-account@example.com',
            'telephone_number' => '081234567890',
            'password' => 'password',
            'role' => 'user',
        ]);

        $film = Film::create([
            'video' => 'films/test-trailer.mp4',
            'name' => 'Test Film',
            'director_name' => 'Test Director',
            'duration' => 90,
            'genre' => 'Drama',
            'synopsis' => 'Test synopsis.',
        ]);

        $response = $this->postJson('/api/film-applications', [
            'user_id' => $user->id,
            'film_id' => $film->id,
            'name' => 'Applicant Name',
            'age' => 25,
            'gender' => 'male',
            'document' => 'https://example.com/document.pdf',
            'telephone_number' => '081234567890',
            'email' => 'applicant@example.com',
        ]);

        $response
            ->assertOk()
            ->assertJson([
                'message' => 'Application submitted successfully',
            ]);

        $this->assertDatabaseHas('film_applications', [
            'user_id' => $user->id,
            'film_id' => $film->id,
            'email' => 'applicant@example.com',
            'status' => 'pending',
        ]);

        Notification::assertSentOnDemand(
            FilmApplicationSubmittedNotification::class,
            function (FilmApplicationSubmittedNotification $notification, array $channels, object $notifiable): bool {
                return in_array('mail', $channels, true)
                    && ($notifiable->routes['mail'] ?? null) === 'applicant@example.com'
                    && $notification->application->email === 'applicant@example.com'
                    && $notification->application->status === 'pending';
            }
        );
    }
}
