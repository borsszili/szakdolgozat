<?php

declare(strict_types=1);

namespace App\Domain\Appointment\Controller;

use App\Common\Permission\Enum\PermissionEnum;
use App\Core\Permissions\Annotations\HasPermission;
use App\Domain\Appointment\Dto\PagedAppointmentInput;
use App\Domain\Appointment\Repository\AppointmentRepository;
use App\Domain\Appointment\Request\AppointmentAvailableTimeRequest;
use App\Domain\Appointment\Request\AppointmentIndexRequest;
use App\Domain\Appointment\Service\AppointmentAvailableTimeCalculatorService;
use Illuminate\Http\JsonResponse;

final readonly class AppointmentQueryController
{
    #[HasPermission(PermissionEnum::APPOINTMENT_FETCH)]
    public function index(
        AppointmentIndexRequest $request,
        AppointmentRepository $repository
    ): JsonResponse
    {
        $appointments = $repository->getPagedAppointments(
            PagedAppointmentInput::serialize($request->only('guestId','employeeId','limit','offset'))
        );

        return response()->json($appointments);
    }

    #[HasPermission(PermissionEnum::APPOINTMENT_FETCH)]
    public function show(int $id, AppointmentRepository $repository): JsonResponse
    {
        $appointment = $repository->getById($id);

        return response()->json($appointment);
    }

    #[HasPermission(PermissionEnum::APPOINTMENT_FETCH)]
    public function calculateAvailableDates(
        AppointmentAvailableTimeRequest $request,
        AppointmentAvailableTimeCalculatorService $availableTimeCalculatorService
    ): JsonResponse
    {
        $appointments = $availableTimeCalculatorService->calculateAppointmentAvailableTime($request);

        return response()->json($appointments);
    }
}
