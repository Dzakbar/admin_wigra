<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Support\PublicUpload;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(\App\Models\Team::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('photo')) {
            $data['photo'] = PublicUpload::store($request->file('photo'), 'teams');
        }

        $team = \App\Models\Team::create($data);
        
        return response()->json([
            'message' => 'Team member created successfully',
            'data' => $team
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(\App\Models\Team::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $team = \App\Models\Team::findOrFail($id);
        $data = $request->all();

        if ($request->hasFile('photo')) {
            $data['photo'] = PublicUpload::store($request->file('photo'), 'teams');
        }

        $team->update($data);

        return response()->json([
            'message' => 'Team member updated successfully',
            'data' => $team
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $team = \App\Models\Team::findOrFail($id);
        $team->delete();

        return response()->json([
            'message' => 'Team member deleted successfully'
        ]);
    }
}
