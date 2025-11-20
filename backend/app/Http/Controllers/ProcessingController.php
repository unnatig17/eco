<?php

namespace App\Http\Controllers;

use App\Models\Processing;
use Illuminate\Http\Request;

class ProcessingController extends Controller
{
    public function index()
    {
        return response()->json(Processing::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'waste_classification_id' => 'required|integer',
            'processing_method'       => 'required|string|max:255',
            'processing_description'  => 'nullable|string',
            'cost'                    => 'required|numeric',
        ]);

        $row = Processing::create($data);
        return response()->json($row, 201);
    }

    public function show($id)
    {
        return response()->json(Processing::findOrFail($id), 200);
    }

    public function update(Request $request, $id)
    {
        $row = Processing::findOrFail($id);

        $data = $request->validate([
            'waste_classification_id' => 'required|integer',
            'processing_method'       => 'required|string|max:255',
            'processing_description'  => 'nullable|string',
            'cost'                    => 'required|numeric',
        ]);

        $row->update($data);
        return response()->json($row, 200);
    }

    public function destroy($id)
    {
        Processing::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
