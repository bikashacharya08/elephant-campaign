<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VolunteerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Valid volunteer data creates a volunteer and returns 201.
     */
    public function test_volunteer_signup_with_valid_data(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'name'    => 'Jane Doe',
            'email'   => 'jane@example.com',
            'type'    => 'volunteer',
            'message' => 'I want to help free elephants!',
        ]);

        $response->assertStatus(201)
                 ->assertJson(['message' => 'Volunteer securely saved!']);

        $this->assertDatabaseHas('volunteers', [
            'name'  => 'Jane Doe',
            'email' => 'jane@example.com',
            'type'  => 'volunteer',
        ]);
    }

    /**
     * Valid booking data creates a volunteer entry and returns 201.
     */
    public function test_booking_signup_with_valid_data(): void
    {
        $tomorrow = now()->addDay()->format('Y-m-d');
        
        $response = $this->postJson('/api/volunteer', [
            'name'    => 'John Traveler',
            'email'   => 'john@traveler.com',
            'type'    => 'booking',
            'date'    => $tomorrow,
            'guests'  => 4,
            'message' => 'We would love to do the river walk experience!',
        ]);

        $response->assertStatus(201)
                 ->assertJson(['message' => 'Volunteer securely saved!']);

        $this->assertDatabaseHas('volunteers', [
            'name'    => 'John Traveler',
            'email'   => 'john@traveler.com',
            'type'    => 'booking',
            'date'    => $tomorrow,
            'guests'  => 4,
        ]);
    }

    /**
     * Booking fails when date or guest count is missing.
     */
    public function test_booking_fails_without_date_or_guests(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'name'    => 'John Traveler',
            'email'   => 'john@traveler.com',
            'type'    => 'booking',
            'message' => 'I want to book!',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['date', 'guests']);
    }

    /**
     * Signup fails with an invalid type parameter.
     */
    public function test_signup_fails_with_invalid_type(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'name'    => 'Jane Doe',
            'email'   => 'jane@example.com',
            'type'    => 'invalid-type',
            'message' => 'I want to help!',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['type']);
    }

    /**
     * Missing name returns 422 with validation error.
     */
    public function test_volunteer_signup_fails_without_name(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'email'   => 'jane@example.com',
            'type'    => 'volunteer',
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
            'type'    => 'volunteer',
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
            'type'    => 'volunteer',
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
            'type'  => 'volunteer',
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
                 ->assertJsonValidationErrors(['name', 'email', 'type', 'message']);
    }

    /**
     * Name exceeding 255 characters returns 422.
     */
    public function test_volunteer_signup_fails_with_name_too_long(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'name'    => str_repeat('A', 256),
            'email'   => 'jane@example.com',
            'type'    => 'volunteer',
            'message' => 'I want to help!',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['name']);
    }

    /**
     * Valid donation request creates a volunteer record with amount and returns 201.
     */
    public function test_donation_signup_with_valid_data(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'name'    => 'Donator Name',
            'email'   => 'donator@example.com',
            'type'    => 'donation',
            'amount'  => 1500.50,
            'message' => 'I want to support the elephant purchase fundraising!',
        ]);

        $response->assertStatus(201)
                 ->assertJson(['message' => 'Volunteer securely saved!']);

        $this->assertDatabaseHas('volunteers', [
            'name'    => 'Donator Name',
            'email'   => 'donator@example.com',
            'type'    => 'donation',
            'amount'  => 1500.50,
        ]);
    }

    /**
     * Donation request fails when amount is missing or invalid.
     */
    public function test_donation_fails_without_amount(): void
    {
        $response = $this->postJson('/api/volunteer', [
            'name'    => 'Donator Name',
            'email'   => 'donator@example.com',
            'type'    => 'donation',
            'message' => 'No amount given',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['amount']);
    }
}
