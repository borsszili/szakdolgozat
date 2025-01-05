<?php

declare(strict_types=1);

namespace App\Domain\Employee\Controller;

use App\Common\Permission\Enum\PermissionEnum;
use App\Core\Permissions\Annotations\HasPermission;

use App\Domain\Service\Request\ServiceCreateRequest;
use App\Domain\Service\Request\ServiceDeleteRequest;
use App\Domain\Service\Request\ServiceUpdateRequest;
use App\Domain\Service\Service\ServiceCreationManager;
use App\Domain\Service\Service\ServiceDeleteManager;
use App\Domain\Service\Service\ServiceUpdateManager;
use Illuminate\Http\JsonResponse;

final readonly class EmployeeCommandController
{
    #[HasPermission(PermissionEnum::SERVICE_CREATE)]
    public function create(
        ServiceCreateRequest   $request,
        ServiceCreationManager $appointmentService
    ): JsonResponse
    {
        $response = $appointmentService->create($request);

        return response()->json($response);
    }

    #[HasPermission(PermissionEnum::SERVICE_UPDATE)]
    public function update(
        int $id,
        ServiceUpdateRequest $request,
        ServiceUpdateManager $appointmentService
    ): JsonResponse
    {
        $response = $appointmentService->update($id, $request);

        return response()->json($response);
    }

    #[HasPermission(PermissionEnum::SERVICE_DELETE)]
    public function delete(
        int $id,
        ServiceDeleteRequest $request,
        ServiceDeleteManager $appointmentService
    ): JsonResponse
    {
        $response = $appointmentService->delete($id, $request);

        return response()->json($response);
    }
}
