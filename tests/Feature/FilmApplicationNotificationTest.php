<?php

namespace Tests\Feature;

use App\Models\Film;
use App\Models\FilmApplication;
use App\Models\User;
use App\Notifications\FilmApplicationAcceptedNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class FilmApplicationNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_successful_film_application_does_not_send_email_notification_on_submit(): void
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
            'contact' => 'applicant@example.com / 081234567890',
            'role' => 'Talent',
            'portfolio_link' => 'https://example.com/portfolio',
            'notes' => 'Test notes.',
        ]);

        $response
            ->assertOk()
            ->assertJson([
                'message' => 'Application submitted successfully',
            ]);

        $this->assertDatabaseHas('film_applications', [
            'user_id' => $user->id,
            'film_id' => $film->id,
            'contact' => 'applicant@example.com / 081234567890',
            'status' => 'pending',
        ]);

        Notification::assertNothingSent();
    }

    public function test_film_application_sends_email_notification_when_status_changes_to_accepted(): void
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

        $application = FilmApplication::create([
            'user_id' => $user->id,
            'film_id' => $film->id,
            'name' => 'Applicant Name',
            'contact' => 'applicant@example.com / 081234567890',
            'role' => 'Talent',
            'portfolio_link' => 'https://example.com/portfolio',
            'notes' => 'Test notes.',
            'status' => 'pending',
        ]);

        $response = $this->putJson("/api/film-applications/{$application->id}", [
            'name' => $application->name,
            'contact' => $application->contact,
            'role' => $application->role,
            'portfolio_link' => $application->portfolio_link,
            'notes' => $application->notes,
            'status' => 'accepted',
        ]);

        $response
            ->assertOk()
            ->assertJson([
                'message' => 'Application updated successfully',
            ]);

        $this->assertDatabaseHas('film_applications', [
            'id' => $application->id,
            'status' => 'accepted',
        ]);

        Notification::assertSentOnDemand(
            FilmApplicationAcceptedNotification::class,
            function (FilmApplicationAcceptedNotification $notification, array $channels, object $notifiable) use ($application): bool {
                return in_array('mail', $channels, true)
                    && ($notifiable->routes['mail'] ?? null) === 'applicant@example.com'
                    && $notification->application->id === $application->id
                    && $notification->application->status === 'accepted';
            }
        );
    }
}
