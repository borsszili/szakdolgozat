<?php

declare(strict_types=1);

namespace App\Domain\Employee\Model;

use App\Common\User\Model\User;
use App\Domain\Service\Model\EmployeeHasService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

final class Employee extends Model
{
    protected $table = 'employee';

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function employeeHasService(): BelongsToMany
    {
        return $this->belongsToMany(
            related:EmployeeHasService::class,
            table: 'employee_has_service'
        );
    }
}
