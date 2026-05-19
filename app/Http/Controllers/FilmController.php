<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Film;

class FilmController extends Controller
{
    // Get all
    public function index()
    {
        return response()->json(Film::all());
    }

    // Create film
    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('films', 's3');
            $data['photo'] = Storage::disk('s3')->url($path);
        }

        $film = Film::create($data);
        return response()->json([
            'message' => 'Film created successfully',
            'data' => $film
        ]);
    }

    public function show($id)
    {
        return response()->json(
            Film::findOrFail($id)
        );
    }

    // Update film
    public function update(Request $request, $id)
    {
        $film = Film::findOrFail($id);
        $data = $request->all();

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('films', 's3');
            $data['photo'] = Storage::disk('s3')->url($path);
        }

        $film->update($data);
        return response()->json([
            'message' => 'Film updated successfully',
            'data' => $film
        ]);
    }

    // Delete
    public function destroy($id)
    {
        $film = Film::findOrFail($id);
        $film->delete();
        return response()->json([
            'message' => 'Film deleted successfully'
        ]);
    }
}
