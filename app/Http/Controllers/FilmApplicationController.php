<?php

namespace App\Http\Controllers;

use App\Models\FilmApplication;
use App\Notifications\FilmApplicationAcceptedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Throwable;

class FilmApplicationController extends Controller
{
    // Get all
    public function index()
    {
        return response()->json(
            FilmApplication::with(['user', 'film'])->get()
        );
    }

    // Application Form
    public function store(Request $request)
    {
        $application = FilmApplication::create([
            'user_id' => $request->user_id,
            'film_id' => $request->film_id,
            'name' => $request->name,
            'contact' => $request->contact,
            'role' => $request->role,
            'portfolio_link' => $request->portfolio_link,
            'notes' => $request->notes,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Application submitted successfully',
            'data' => $application
        ]);
    }

    // tampilkan 1 pendaftar
    public function show($id)
    {
        return response()->json(
            FilmApplication::with(['user', 'film'])->findOrFail($id)
        );
    }

    // Update
    public function update(Request $request, $id)
    {
        $application = FilmApplication::findOrFail($id);
        $previousStatus = $application->status;

        $application->update([
            'name' => $request->name,
            'contact' => $request->contact,
            'role' => $request->role,
            'portfolio_link' => $request->portfolio_link,
            'notes' => $request->notes,
            'status' => $request->status,
        ]);

        if ($previousStatus !== 'accepted' && $application->status === 'accepted') {
            $email = $this->extractEmailFromContact($application->contact);

            if ($email) {
                try {
                    Notification::route('mail', $email)
                        ->notify(new FilmApplicationAcceptedNotification($application));
                } catch (Throwable $e) {
                    Log::warning('Failed to send film application accepted email', [
                        'film_application_id' => $application->id,
                        'email' => $email,
                        'error' => $e->getMessage(),
                    ]);
                }
            } else {
                Log::warning('Film application accepted without a valid email contact', [
                    'film_application_id' => $application->id,
                    'contact' => $application->contact,
                ]);
            }
        }

        return response()->json([
            'message' => 'Application updated successfully',
            'data' => $application
        ]);
    }

    // Delete
    public function destroy($id)
    {
        $application = FilmApplication::findOrFail($id);

        $application->delete();

        return response()->json([
            'message' => 'Application deleted successfully'
        ]);
    }

    private function extractEmailFromContact(?string $contact): ?string
    {
        if (! $contact) {
            return null;
        }

        preg_match('/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i', $contact, $matches);

        return isset($matches[0]) && filter_var($matches[0], FILTER_VALIDATE_EMAIL)
            ? $matches[0]
            : null;
    }
}
