<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/volunteer', function(Request $request) {
    // 1. Catch the data and insert it into the database table
    DB::table('volunteers')->insert([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'message' => $request->input('message'),
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    
    // 2. Send a "201 Created" success ticket back to the frontend
    return response()->json(['message' => 'Volunteer securely saved!'], 201);
});