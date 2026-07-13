<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VolunteerController;
use App\Http\Controllers\AdminSubmissionsController;
use App\Http\Middleware\CheckAdminToken;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/volunteer', [VolunteerController::class, 'store']);

Route::get('/admin/submissions', [AdminSubmissionsController::class, 'index'])
    ->middleware(CheckAdminToken::class);

Route::delete('/admin/submissions/{id}', [AdminSubmissionsController::class, 'destroy'])
    ->middleware(CheckAdminToken::class);