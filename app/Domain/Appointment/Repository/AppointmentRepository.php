<?php

declare(strict_types=1);

namespace App\Domain\Appointment\Repository;

use App\Domain\Appointment\Dto\PagedAppointmentInput;
use App\Domain\Appointment\Model\Appointment;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

final readonly class AppointmentRepository
{
    /**
     * @TODO: cacheable
     * @param PagedAppointmentInput $input
     * @return Collection<Appointment>
     */
    public function getPagedAppointments(PagedAppointmentInput $input): Collection
    {
        return Appointment::query()
            ->with(['employeeHasService', 'employeeHasService.service', 'employeeHasService.employee'])
            ->offset($input->offset)
            ->limit($input->limit)
            ->when(!is_null($input->guestId), fn (Builder$query) => $query->where('guest_id', '=', $input->guestId))
            ->when(!is_null($input->employeeId), fn (Builder $query) => $query->whereHas('employeeHasService', fn (Builder $query) => $query->where('employee_id', '=', $input->employeeId)))
            ->get();
    }

    public function getById(int $id): Appointment
    {
        return Appointment::query()->find($id);
    }
}
