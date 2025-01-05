<?php

declare(strict_types=1);

namespace App\Domain\Appointment\Model;

use App\Domain\Service\Model\EmployeeHasService;
use App\Domain\Guest\Model\Guest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

final class Appointment extends Model
{
    use SoftDeletes;

    protected $table = 'appointment';

    protected $fillable = [
        'start',
        'end',
        'employee_has_service_id',
        'guest_id'
    ];

    public function employeeHasService(): HasOne
    {
        return $this->hasOne(EmployeeHasService::class,'id','employee_has_service_id');
    }

    public function guest(): HasOne
    {
        return $this->hasOne(Guest::class);
    }
}
