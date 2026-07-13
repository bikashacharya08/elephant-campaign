<?php

namespace App\Http\Controllers;

use App\Models\Volunteer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminSubmissionsController extends Controller
{
    /**
     * Display a listing of submissions.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Volunteer::query();

        // Filter by type if provided (e.g. 'volunteer' or 'booking')
        if ($request->has('type')) {
            $type = $request->input('type');
            if (in_array($type, ['volunteer', 'booking'])) {
                $query->where('type', $type);
            }
        }

        // Handle sorting (default to descending by created_at)
        $sortOrder = $request->input('sort', 'desc') === 'asc' ? 'asc' : 'desc';
        $query->orderBy('created_at', $sortOrder);

        $submissions = $query->get();

        return response()->json([
            'submissions' => $submissions,
            'count' => $submissions->count()
        ], 200);
    }
}
