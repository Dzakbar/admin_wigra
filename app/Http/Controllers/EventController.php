<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    // Get all
    public function index()
    {
        return response()->json(Event::all());
    }

    // Create
    public function store(Request $request)
    {
        $event = Event::create($request->all());
        return response()->json([
            'message' => 'Event created successfully',
            'data' => $event
        ]);
    }

    public function show($id)
    {
        return response()->json(
            Event::findOrFail($id)
        );
    }

    // Update Event
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update($request->all());
        return response()->json([
            'message' => 'Event updated successfully',
            'data' => $event
        ]);
    }

    // Delete
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return response()->json([
            'message' => 'Event deleted successfully'
        ]);
    }
}
