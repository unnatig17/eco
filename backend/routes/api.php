<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CsvImportController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\DumpLocationController;
use App\Http\Controllers\ProcessingController;
use App\Http\Controllers\CompostController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes (all prefixed with /api)
|--------------------------------------------------------------------------
*/

// CSV (keep if you still use it anywhere)
Route::get('/csv', [CsvImportController::class, 'import']);

// --- CRUD RESOURCES ---
Route::apiResource('areas', AreaController::class);
Route::apiResource('dump-locations', DumpLocationController::class);
Route::apiResource('processing', ProcessingController::class);
Route::apiResource('compost', CompostController::class);
Route::apiResource('issues', IssueController::class);

Route::post('/report-issue', [IssueController::class, 'store']);

// login
Route::post('/login', [AuthController::class, 'login']);

// health check
Route::get('/ping', function () {
    return ['status' => 'API OK'];
});
