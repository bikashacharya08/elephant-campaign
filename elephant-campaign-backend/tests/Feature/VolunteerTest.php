<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VolunteerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Valid data creates a volunteer and returns 201.
     */
    public function test_volunteer_signup_with_valid_data(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'name'    => 'Jane Doe',
            'email'   => 'jane@example.com',
            'message' => 'I want to help free elephants!',
        ]);

        $response->assertStatus(201)
                 ->assertJson(['message' => 'Volunteer securely saved!']);

        $this->assertDatabaseHas('volunteers', [
            'name'  => 'Jane Doe',
            'email' => 'jane@example.com',
        ]);
    }

    /**
     * Missing name returns 422 with validation error.
     */
    public function test_volunteer_signup_fails_without_name(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'email'   => 'jane@example.com',
            'message' => 'I want to help!',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name']);
    }

    /**
     * Missing email returns 422 with validation error.
     */
    public function test_volunteer_signup_fails_without_email(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'name'    => 'Jane Doe',
            'message' => 'I want to help!',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    /**
     * Invalid email format returns 422 with validation error.
     */
    public function test_volunteer_signup_fails_with_invalid_email(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'name'    => 'Jane Doe',
            'email'   => 'not-an-email',
            'message' => 'I want to help!',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    /**
     * Missing message returns 422 with validation error.
     */
    public function test_volunteer_signup_fails_without_message(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'name'  => 'Jane Doe',
            'email' => 'jane@example.com',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['message']);
    }

    /**
     * Completely empty body returns 422 with errors for all fields.
     */
    public function test_volunteer_signup_fails_with_empty_body(): void
    {
        $response = $this->postJson('/api/volunteer', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name', 'email', 'message']);
    }

    /**
     * Name exceeding 255 characters returns 422.
     */
    public function test_volunteer_signup_fails_with_name_too_long(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'name'    => str_repeat('A', 256),
            'email'   => 'jane@example.com',
            'message' => 'I want to help!',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name']);
    }
}
