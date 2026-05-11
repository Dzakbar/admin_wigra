<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FilmApplication;

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
            'age' => $request->age,
            'gender' => $request->gender,
            'document' => $request->document,
            'telephone_number' => $request->telephone_number,
            'email' => $request->email,
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

        $application->update([
            'name' => $request->name,
            'age' => $request->age,
            'gender' => $request->gender,
            'document' => $request->document,
            'telephone_number' => $request->telephone_number,
            'email' => $request->email,
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
