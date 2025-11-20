<?php

namespace App\Http\Controllers;

use App\Models\DumpLocation;
use Illuminate\Http\Request;

class DumpLocationController extends Controller
{
    public function index()
    {
        return response()->json(DumpLocation::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'area_id'       => 'nullable|integer',
            'location_name' => 'required|string|max:255',
            'address'       => 'nullable|string',
            'latitude'      => 'nullable|numeric',
            'longitude'     => 'nullable|numeric',
        ]);

        $dump = DumpLocation::create($data);
        return response()->json($dump, 201);
    }

    public function show($id)
    {
        return response()->json(DumpLocation::findOrFail($id), 200);
    }

    public function update(Request $request, $id)
    {
        $dump = DumpLocation::findOrFail($id);

        $data = $request->validate([
            'area_id'       => 'nullable|integer',
            'location_name' => 'required|string|max:255',
            'address'       => 'nullable|string',
            'latitude'      => 'nullable|numeric',
            'longitude'     => 'nullable|numeric',
        ]);

        $dump->update($data);
        return response()->json($dump, 200);
    }

    public function destroy($id)
    {
        DumpLocation::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
