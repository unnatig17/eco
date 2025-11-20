<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function index()
    {
        return response()->json(Area::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $area = Area::create($data);
        return response()->json($area, 201);
    }

    public function show($id)
    {
        return response()->json(Area::findOrFail($id), 200);
    }

    public function update(Request $request, $id)
    {
        $area = Area::findOrFail($id);

        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $area->update($data);
        return response()->json($area, 200);
    }

    public function destroy($id)
    {
        Area::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
