<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film;

class FilmController extends Controller
{
    // Get all
    public function index()
    {
        return response()->json(Film::all());
    }

    // Creata film
    public function store(Request $request)
    {
        $film = Film::create($request->all());
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
        $film->update($request->all());
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
