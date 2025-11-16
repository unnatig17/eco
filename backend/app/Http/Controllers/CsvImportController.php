<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CsvImportController extends Controller
{
    public function import(Request $request)
    {
        // csv filename from query: ?file=dumps.csv
        $fileName = $request->query('file');

        if (!$fileName) {
            return response()->json(['error' => 'File name missing'], 400);
        }

        $path = storage_path("app/public/$fileName");

        if (!file_exists($path)) {
            return response()->json(['error' => 'CSV file not found'], 404);
        }

        $rows = array_map('str_getcsv', file($path));
        $header = array_shift($rows);

        $data = array_map(fn($r) => array_combine($header, $r), $rows);

        return response()->json($data);
    }
}
