<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IssueController extends Controller
{
    public function store(Request $request)
    {
        $file = storage_path('app/issues.csv');

        // If file does not exist → create with header
        if (!file_exists($file)) {
            file_put_contents($file, implode(',', [
                "issue_id",
                "user_id",
                "dump_location_id",
                "description",
                "status",
                "date"
            ]) . "\n");
        }

        $row = [
            uniqid("issue_"),              // issue_id
            "N/A",                         // user_id (since citizens don’t log in)
            "",                            // dump_location_id (optional)
            $request->issue_text,          // description
            "pending",                     // status
            date("Y-m-d"),                 // date
        ];

        $fp = fopen($file, 'a');
        fputcsv($fp, $row);
        fclose($fp);

        return response()->json([
            "success" => true,
            "message" => "Issue saved"
        ]);
    }
}
