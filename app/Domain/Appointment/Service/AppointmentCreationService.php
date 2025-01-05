<?php

declare(strict_types=1);

namespace App\Domain\Appointment\Service;

use App\Domain\Appointment\Model\Appointment;
use App\Domain\Appointment\Request\AppointmentCreateRequest;

final readonly class AppointmentCreationService
{
    public function create(AppointmentCreateRequest $request): Appointment
    {
        $data = $request->validated();

        $this->validate($data);

        return Appointment::query()->create($data);
    }

    private function validate(array $validatedData): void
    {
    }
}
