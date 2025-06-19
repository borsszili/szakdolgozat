<?php

namespace Database\Seeders;

use App\Common\User\Model\User;
use App\Domain\Guest\Model\Guest;
use App\Domain\Service\Model\EmployeeHasService;
use App\Domain\Service\Model\Service;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedUser();
        $this->seedGuest();
        $this->seedEmployee();
        $this->seedService();
        $this->seedEmployeeHasService();
        $this->seedEvent();
    }

    private function seedUser(): void
    {
        User::factory()->create([
            ['name' => 'John Doe', 'email' => 'johndoe@example.com', 'is_admin' => 'false', 'password' => bcrypt('password')],
            ['name' => 'Jane Smith', 'email' => 'janesmith@example.com', 'is_admin' => 'false', 'password' => bcrypt('password')],
            ['name' => 'Alice Johnson', 'email' => 'alice@example.com', 'is_admin' => 'false', 'password' => bcrypt('password')],
            ['name' => 'Bob Brown', 'email' => 'bob@example.com', 'is_admin' => 'false', 'password' => bcrypt('password')]
        ]);
    }

    private function seedGuest(): void
    {
        Guest::factory()->create([
            ["user_id" => 1],
            ["user_id" => 2],
        ]);
    }

    private function seedEmployee(): void
    {

    }

    private function seedService(): void
    {
        Service::factory()->create([
            ['name' => 'Manual driving lesson', 'price' => '60'],
            ['name' => 'Mock exam', 'price' => '30'],
            ['name' => 'Automatic driving lesson', 'price' => '120']
        ]);
    }

    private function seedEmployeeHasService(): void
    {
        EmployeeHasService::factory()->create([
            'service_id' => 1,
            'employee_id' => 1
        ]);

        EmployeeHasService::factory()->create([
            'service_id' => 2,
            'employee_id' => 1
        ]);

        EmployeeHasService::factory()->create([
            'service_id' => 3,
            'employee_id' => 2
        ]);
    }

    private function seedEvent(): void
    {

    }
}
