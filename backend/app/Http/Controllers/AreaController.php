<?php

namespace App\Http\Controllers;
use App\Models\Area;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Area::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $area = Area::create($request->all());
    return response()->json($area, 201);
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Area::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $area = Area::findOrFail($id);
        $area->update($request->all());
        return response()->json($area, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Area::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
