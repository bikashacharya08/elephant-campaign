<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdminToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('X-Admin-Token');
        $expectedToken = env('ADMIN_API_TOKEN');

        if (!$expectedToken || $token !== $expectedToken) {
            return response()->json([
                'message' => 'Unauthorized: Invalid or missing admin token.'
            ], 401);
        }

        return $next($request);
    }
}
