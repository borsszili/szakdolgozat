<?php

declare(strict_types=1);

namespace App\Domain\Appointment\Service;

use App\Domain\Appointment\Model\Appointment;
use App\Domain\Appointment\Request\AppointmentDeleteRequest;

final readonly class AppointmentDeleteService
{
    public function delete(AppointmentDeleteRequest $request): bool
    {
        $data = $request->validated();

        return Appointment::query()->find($data['id'])->delete();
    }
}
