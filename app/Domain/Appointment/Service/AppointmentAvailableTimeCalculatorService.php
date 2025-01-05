<?php

declare(strict_types=1);

namespace App\Domain\Appointment\Service;

use App\Domain\Appointment\Request\AppointmentAvailableTimeRequest;
use Illuminate\Support\Collection;

final readonly class AppointmentAvailableTimeCalculatorService
{
    public function calculateAppointmentAvailableTime(AppointmentAvailableTimeRequest $request): Collection
    {

    }
}
