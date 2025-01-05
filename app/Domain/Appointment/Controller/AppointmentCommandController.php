<?php

declare(strict_types=1);

namespace App\Domain\Appointment\Controller;

use App\Common\Permission\Enum\PermissionEnum;
use App\Core\Permissions\Annotations\HasPermission;
use App\Domain\Appointment\Request\AppointmentCreateRequest;
use App\Domain\Appointment\Request\AppointmentDeleteRequest;
use App\Domain\Appointment\Request\AppointmentUpdateRequest;
use App\Domain\Appointment\Service\AppointmentCreationService;
use App\Domain\Appointment\Service\AppointmentDeleteService;
use App\Domain\Appointment\Service\AppointmentUpdateService;
use Illuminate\Http\JsonResponse;

final readonly class AppointmentCommandController
{
    #[HasPermission(PermissionEnum::APPOINTMENT_CREATE)]
    public function create(
        AppointmentCreateRequest   $request,
        AppointmentCreationService $appointmentService
    ): JsonResponse
    {
        $response = $appointmentService->create($request);

        return response()->json($response);
    }

    #[HasPermission(PermissionEnum::APPOINTMENT_UPDATE)]
    public function update(
        AppointmentUpdateRequest $request,
        AppointmentUpdateService $appointmentService
    ): JsonResponse
    {
        $response = $appointmentService->update($request);

        return response()->json($response);
    }

    #[HasPermission(PermissionEnum::APPOINTMENT_DELETE)]
    public function delete(
        AppointmentDeleteRequest $request,
        AppointmentDeleteService $appointmentService
    ): JsonResponse
    {
        $response = $appointmentService->delete($request);

        return response()->json($response);
    }
}
