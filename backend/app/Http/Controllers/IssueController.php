<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IssueController extends Controller
{
    public function store(Request $request)
    {
        $issue = $request->issue_text;
        $file = storage_path('app/issues.csv');

        // Create file with headers if it doesn't exist
        if (!file_exists($file)) {
            file_put_contents($file, "id,issue_text,date\n");
        }

        $id = time(); // unique ID
        $line = "$id,\"$issue\"," . date('Y-m-d H:i:s') . "\n";

        file_put_contents($file, $line, FILE_APPEND);

        return response()->json(['message' => 'Issue saved']);
    }

    public function index()
    {
        $file = storage_path('app/issues.csv');

        if (!file_exists($file)) {
            return response()->json([]);
        }

        $rows = array_map('str_getcsv', file($file));
        $header = array_shift($rows);
        $data = [];

        foreach ($rows as $row) {
            $data[] = array_combine($header, $row);
        }

        return response()->json($data);
    }
}
