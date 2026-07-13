<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\StoreVolunteerRequest;
use App\Models\Volunteer;
use Illuminate\Http\JsonResponse;

class VolunteerController extends Controller
{
    /**
     * Store a newly created volunteer application.
     */
    public function store(StoreVolunteerRequest $request): JsonResponse
    {
        Volunteer::create($request->validated());

        return response()->json([
            'message' => 'Volunteer securely saved!',
        ], 201);
    }
}
