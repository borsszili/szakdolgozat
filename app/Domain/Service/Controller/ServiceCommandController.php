<?php

declare(strict_types=1);

namespace App\Domain\Service\Controller;

use App\Domain\Service\Request\ServiceCreateRequest;
use App\Domain\Service\Request\ServiceDeleteRequest;
use App\Domain\Service\Request\ServiceUpdateRequest;
use App\Domain\Service\Service\ServiceCreationManager;
use App\Domain\Service\Service\ServiceDeleteManager;
use App\Domain\Service\Service\ServiceUpdateManager;
use Illuminate\Http\JsonResponse;

final readonly class ServiceCommandController
{
    public function create(
        ServiceCreateRequest $request,
        ServiceCreationManager $serviceManager
    ): JsonResponse
    {
        $service = $serviceManager->create($request);

        return response()->json($service);
    }

    public function update(
        int $id,
        ServiceUpdateRequest $request,
        ServiceUpdateManager $serviceManager
    ): JsonResponse
    {
        $affectedRows = $serviceManager->update($id, $request);

        return response()->json($affectedRows);
    }

    public function delete(
        int $id,
        ServiceDeleteRequest $request,
        ServiceDeleteManager $serviceManager
    ): JsonResponse
    {
        $deleted = $serviceManager->delete($id, $request);

        return response()->json($deleted);
    }
}
