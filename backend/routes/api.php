<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CsvController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Routes in this file automatically get the "api" prefix.
| So /csv-data here becomes /api/csv-data in the browser.
|
*/
use App\Services\CsvService;

use App\Http\Controllers\CsvImportController;

Route::get('/csv', [CsvImportController::class, 'import']);


Route::get('/ping', function () {
    return ['status' => 'API OK'];
});

