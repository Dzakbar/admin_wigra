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
        $this->normalizeContactFields($request);

        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'film_id' => 'required|exists:films,id',
            'name' => 'required|string|max:255',
            'contact' => 'required|email|max:255',
            'phone_number' => ['required', 'string', 'max:20', 'regex:/^(?=(?:\D*\d){10,})[+\d][\d\s().-]*$/'],
            'role' => 'required|string|max:255',
            'portfolio_link' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $application = FilmApplication::create([
            'user_id' => $validated['user_id'] ?? null,
            'film_id' => $validated['film_id'],
            'name' => $validated['name'],
            'contact' => $validated['contact'],
            'phone_number' => $validated['phone_number'],
            'role' => $validated['role'],
            'portfolio_link' => $validated['portfolio_link'],
            'notes' => $validated['notes'] ?? null,
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
        $this->normalizeContactFields($request);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact' => 'required|email|max:255',
            'phone_number' => ['nullable', 'string', 'max:20', 'regex:/^(?=(?:\D*\d){10,})[+\d][\d\s().-]*$/'],
            'role' => 'required|string|max:255',
            'portfolio_link' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'status' => 'required|in:pending,accepted,reviewing,rejected',
        ]);

        $application->update([
            'name' => $validated['name'],
            'contact' => $validated['contact'],
            'phone_number' => $validated['phone_number'] ?? $application->phone_number,
            'role' => $validated['role'],
            'portfolio_link' => $validated['portfolio_link'],
            'notes' => $validated['notes'] ?? null,
            'status' => $validated['status'],
        ]);

        if ($previousStatus !== 'accepted' && $application->status === 'accepted') {
            $email = $application->contact;

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

    private function normalizeContactFields(Request $request): void
    {
        $email = $this->extractEmailFromContact($request->contact);
        $phoneNumber = $request->phone_number ?: $this->extractPhoneNumberFromContact($request->contact);

        if ($email) {
            $request->merge(['contact' => $email]);
        }

        if ($phoneNumber) {
            $request->merge(['phone_number' => $phoneNumber]);
        }
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

    private function extractPhoneNumberFromContact(?string $contact): ?string
    {
        if (! $contact) {
            return null;
        }

        preg_match_all('/\+?\d[\d\s().-]{8,}\d/', $contact, $matches);

        foreach ($matches[0] ?? [] as $candidate) {
            if (preg_match_all('/\d/', $candidate) >= 10) {
                return trim($candidate);
            }
        }

        return null;
    }

}
