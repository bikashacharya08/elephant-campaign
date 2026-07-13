<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Volunteer;

class VolunteerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample Volunteer signups
        Volunteer::create([
            'name' => 'Aarav Sharma',
            'email' => 'aarav.sharma@example.com',
            'type' => 'volunteer',
            'message' => 'I would love to volunteer for the elephant campaign. I have experience working with animal rescues and can help with daily care, cleaning, and raising awareness in Sauraha.',
        ]);

        Volunteer::create([
            'name' => 'Sita Adhikari',
            'email' => 'sita.adhikari@example.com',
            'type' => 'volunteer',
            'message' => 'I want to contribute my photography and writing skills to promote the ethical treatment of elephants in Nepal. Happy to help document the campaign.',
        ]);

        // Sample Booking requests
        Volunteer::create([
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'type' => 'booking',
            'date' => date('Y-m-d', strtotime('+7 days')),
            'guests' => 3,
            'message' => 'Hello! We are a group of 3 looking to visit Chitwan next week and want to schedule an ethical jungle walk with the elephants.',
        ]);

        Volunteer::create([
            'name' => 'Emily Watson',
            'email' => 'emily.w@example.com',
            'type' => 'booking',
            'date' => date('Y-m-d', strtotime('+14 days')),
            'guests' => 2,
            'message' => 'We are interested in the food preparation and feeding experience. Can we book a morning slot?',
        ]);
    }
}
