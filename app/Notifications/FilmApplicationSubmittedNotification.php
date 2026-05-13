<?php

namespace App\Notifications;

use App\Models\FilmApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FilmApplicationSubmittedNotification extends Notification
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
        return (new MailMessage)
            ->subject('Pendaftaran Film Berhasil')
            ->greeting('Halo ' . $this->application->name)
            ->line('Pendaftaran Anda berhasil kami terima.')
            ->line('Film ID: #' . $this->application->film_id)
            ->line('Status pendaftaran saat ini: pending.')
            ->line('Terima kasih sudah mendaftar.');
    }
}
