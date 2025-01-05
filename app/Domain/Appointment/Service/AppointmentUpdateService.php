<?php

declare(strict_types=1);

namespace App\Domain\Appointment\Service;

use App\Domain\Appointment\Exception\AppointmentUpdateFailedException;
use App\Domain\Appointment\Model\Appointment;
use App\Domain\Appointment\Request\AppointmentUpdateRequest;

final readonly class AppointmentUpdateService
{
    public function update(AppointmentUpdateRequest $request): Appointment
    {
        $data = $request->validated();

        $this->validate($data);

        $update = Appointment::query()
            ->find($data['id'])
            ->update($data);

        if(!$update) throw new AppointmentUpdateFailedException();

        return Appointment::query()->find($data['id']);
    }

    public function validate(array $data): void
    {

    }
}
