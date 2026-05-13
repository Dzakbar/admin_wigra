<?php

namespace App\Notifications;

use App\Models\Film;
use App\Models\FilmApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FilmApplicationAcceptedNotification extends Notification
{
    use Queueable;

    public function __construct(
        public FilmApplication $application
    ) {
    }

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $filmName = Film::query()
            ->whereKey($this->application->film_id)
            ->value('name');

        return (new MailMessage)
            ->subject('Pendaftaran Film Diterima')
            ->view('emails.film-application-accepted', [
                'application' => $this->application,
                'filmName' => $filmName,
            ]);
    }
}
