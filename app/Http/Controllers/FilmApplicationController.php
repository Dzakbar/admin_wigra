<?php

namespace App\Http\Controllers;

use App\Models\FilmApplication;
use App\Notifications\FilmApplicationSubmittedNotification;
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

        try {
            Notification::route('mail', $application->email)
                ->notify(new FilmApplicationSubmittedNotification($application));
        } catch (Throwable $e) {
            Log::warning('Failed to send film application success email', [
                'film_application_id' => $application->id,
                'email' => $application->email,
                'error' => $e->getMessage(),
            ]);
        }

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

        $application->update([
            'name' => $request->name,
            'contact' => $request->contact,
            'role' => $request->role,
            'portfolio_link' => $request->portfolio_link,
            'notes' => $request->notes,
            'status' => $request->status,
        ]);

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
}
