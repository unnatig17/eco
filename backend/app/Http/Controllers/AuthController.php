<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $file = storage_path('app/login.csv');

        if (!file_exists($file)) {
            return response()->json([
                "success" => false,
                "message" => "Login CSV not found"
            ], 500);
        }

        // Read CSV
        $rows = array_map('str_getcsv', file($file));
        $header = array_shift($rows); // id,password,role

        foreach ($rows as $row) {
            $user = array_combine($header, $row);

            if (
                strtolower(trim($user['id'])) === strtolower(trim($request->id)) &&
                trim($user['password']) === trim($request->password) &&
                strtolower(trim($user['role'])) === strtolower(trim($request->role))
            ) {
                return response()->json([
                    "success" => true,
                    "role" => $user['role']
                ]);
            }
        }

        return response()->json([
            "success" => false,
            "message" => "Invalid ID, password, or role"
        ], 401);
    }
}
