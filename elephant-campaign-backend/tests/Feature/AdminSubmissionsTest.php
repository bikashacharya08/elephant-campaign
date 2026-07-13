<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Volunteer;

class AdminSubmissionsTest extends TestCase
{
    use RefreshDatabase;

    private string $token = 'elephant_secret_admin_token_2026';

    protected function setUp(): void
    {
        parent::setUp();
        // Force env token value for testing consistency
        config(['app.admin_api_token' => $this->token]);
        putenv("ADMIN_API_TOKEN={$this->token}");
    }

    /**
     * Test admin endpoint blocks request when token is missing.
     */
    public function test_admin_endpoint_blocks_request_without_token(): void
    {
        $response = $this->getJson('/api/admin/submissions');

        $response->assertStatus(401);
        $response->assertJson([
            'message' => 'Unauthorized: Invalid or missing admin token.'
        ]);
    }

    /**
     * Test admin endpoint blocks request when token is incorrect.
     */
    public function test_admin_endpoint_blocks_request_with_invalid_token(): void
    {
        $response = $this->getJson('/api/admin/submissions', [
            'X-Admin-Token' => 'wrong_token_123'
        ]);

        $response->assertStatus(401);
        $response->assertJson([
            'message' => 'Unauthorized: Invalid or missing admin token.'
        ]);
    }

    /**
     * Test admin endpoint lists submissions when token is correct.
     */
    public function test_admin_endpoint_allows_access_with_valid_token(): void
    {
        Volunteer::create([
            'name' => 'Aarav Sharma',
            'email' => 'aarav@example.com',
            'type' => 'volunteer',
            'message' => 'Want to volunteer',
        ]);

        $response = $this->getJson('/api/admin/submissions', [
            'X-Admin-Token' => $this->token
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'submissions',
            'count'
        ]);
        $this->assertEquals(1, $response->json('count'));
        $this->assertEquals('Aarav Sharma', $response->json('submissions.0.name'));
    }

    /**
     * Test admin endpoint filtering by type.
     */
    public function test_admin_endpoint_filters_by_type(): void
    {
        // 1 volunteer
        Volunteer::create([
            'name' => 'Aarav Sharma',
            'email' => 'aarav@example.com',
            'type' => 'volunteer',
            'message' => 'Want to volunteer',
        ]);

        // 1 booking
        Volunteer::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'type' => 'booking',
            'date' => '2026-08-01',
            'guests' => 3,
            'message' => 'Want to book',
        ]);

        // Request type=volunteer
        $response = $this->getJson('/api/admin/submissions?type=volunteer', [
            'X-Admin-Token' => $this->token
        ]);
        $response->assertStatus(200);
        $this->assertEquals(1, $response->json('count'));
        $this->assertEquals('volunteer', $response->json('submissions.0.type'));

        // Request type=booking
        $response = $this->getJson('/api/admin/submissions?type=booking', [
            'X-Admin-Token' => $this->token
        ]);
        $response->assertStatus(200);
        $this->assertEquals(1, $response->json('count'));
        $this->assertEquals('booking', $response->json('submissions.0.type'));
    }

    /**
     * Test admin endpoint sorting.
     */
    public function test_admin_endpoint_sorts_by_date(): void
    {
        $v1 = new Volunteer([
            'name' => 'Aarav Sharma',
            'email' => 'aarav@example.com',
            'type' => 'volunteer',
            'message' => 'Want to volunteer',
        ]);
        $v1->timestamps = false;
        $v1->created_at = now()->subDay();
        $v1->save();

        $v2 = new Volunteer([
            'name' => 'Sita Adhikari',
            'email' => 'sita@example.com',
            'type' => 'volunteer',
            'message' => 'Want to volunteer too',
        ]);
        $v2->timestamps = false;
        $v2->created_at = now();
        $v2->save();


        // Sort desc (default)
        $response = $this->getJson('/api/admin/submissions?sort=desc', [
            'X-Admin-Token' => $this->token
        ]);
        $response->assertStatus(200);
        $this->assertEquals('Sita Adhikari', $response->json('submissions.0.name'));
        $this->assertEquals('Aarav Sharma', $response->json('submissions.1.name'));

        // Sort asc
        $response = $this->getJson('/api/admin/submissions?sort=asc', [
            'X-Admin-Token' => $this->token
        ]);
        $response->assertStatus(200);
        $this->assertEquals('Aarav Sharma', $response->json('submissions.0.name'));
        $this->assertEquals('Sita Adhikari', $response->json('submissions.1.name'));
    }
}
