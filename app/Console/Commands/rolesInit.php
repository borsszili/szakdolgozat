<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class rolesInit extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:roles-init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $guestRole = Role::create(['name' => 'guest']);

        $guestRole->givePermissionTo($this->getGuestPermissions());

        $employeeRole = Role::create(['name' => 'employee']);

        $employeeRole->givePermissionTo($this->getEmployeePermissions());

        $adminRole = Role::create(['name' => 'admin']);

        $adminRole->givePermissionTo($this->getAdminPermissions());
    }

    private function getGuestPermissions(): Collection
    {
        return collect([
            Permission::firstOrCreate(['name' => 'user edit']),
            Permission::firstOrCreate(['name' => 'user delete']),
            Permission::firstOrCreate(['name' => 'user fetch']),
            Permission::firstOrCreate(['name' => 'service fetch']),
            Permission::firstOrCreate(['name' => 'employee fetch']),
            Permission::firstOrCreate(['name' => 'appointment fetch']),
            Permission::firstOrCreate(['name' => 'appointment create']),
            Permission::firstOrCreate(['name' => 'appointment delete']),
            Permission::firstOrCreate(['name' => 'appointment edit']),
        ]);
    }

    private function getEmployeePermissions(): Collection
    {
        return collect([
            Permission::firstOrCreate(['name' => 'user edit']),
            Permission::firstOrCreate(['name' => 'user delete']),
            Permission::firstOrCreate(['name' => 'user fetch']),
            Permission::firstOrCreate(['name' => 'service fetch']),
            Permission::firstOrCreate(['name' => 'employee fetch']),
            Permission::firstOrCreate(['name' => 'employee edit']),
            Permission::firstOrCreate(['name' => 'appointment fetch']),
            Permission::firstOrCreate(['name' => 'appointment create']),
            Permission::firstOrCreate(['name' => 'appointment delete']),
            Permission::firstOrCreate(['name' => 'appointment edit']),
        ]);
    }

    private function getAdminPermissions(): Collection
    {
        return collect([
            Permission::firstOrCreate(['name' => 'user edit']),
            Permission::firstOrCreate(['name' => 'user delete']),
            Permission::firstOrCreate(['name' => 'user fetch']),
            Permission::firstOrCreate(['name' => 'service fetch']),
            Permission::firstOrCreate(['name' => 'service create']),
            Permission::firstOrCreate(['name' => 'service delete']),
            Permission::firstOrCreate(['name' => 'employee create']),
            Permission::firstOrCreate(['name' => 'employee fetch']),
            Permission::firstOrCreate(['name' => 'employee edit']),
            Permission::firstOrCreate(['name' => 'employee delete']),
            Permission::firstOrCreate(['name' => 'appointment fetch']),
            Permission::firstOrCreate(['name' => 'appointment edit']),
            Permission::firstOrCreate(['name' => 'appointment delete']),
        ]);
    }
}
