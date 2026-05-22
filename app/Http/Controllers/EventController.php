<?php

namespace App\Http\Controllers;

use App\Support\PublicUpload;
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
        $data = $request->all();

        if ($request->hasFile('photo')) {
            $data['photo'] = PublicUpload::store($request->file('photo'), 'events');
        }

        $event = Event::create($data);
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
        $data = $request->all();

        if ($request->hasFile('photo')) {
            $data['photo'] = PublicUpload::store($request->file('photo'), 'events');
        }

        $event->update($data);
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
