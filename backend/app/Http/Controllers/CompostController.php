<?php

namespace App\Http\Controllers;

use App\Models\Compost;
use Illuminate\Http\Request;

class CompostController extends Controller
{
    public function index()
    {
        return response()->json(Compost::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'area_id'      => 'nullable|integer',
            'compost_type' => 'required|string|max:255',
            'quantity_kg'  => 'required|numeric',
            'price_per_kg' => 'required|numeric',
        ]);

        $row = Compost::create($data);
        return response()->json($row, 201);
    }

    public function show($id)
    {
        return response()->json(Compost::findOrFail($id), 200);
    }

    public function update(Request $request, $id)
    {
        $row = Compost::findOrFail($id);

        $data = $request->validate([
            'area_id'      => 'nullable|integer',
            'compost_type' => 'required|string|max:255',
            'quantity_kg'  => 'required|numeric',
            'price_per_kg' => 'required|numeric',
        ]);

        $row->update($data);
        return response()->json($row, 200);
    }

    public function destroy($id)
    {
        Compost::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
