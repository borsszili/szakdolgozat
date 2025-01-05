<?php

declare(strict_types=1);

namespace App\Domain\Service\Controller;

use App\Domain\Service\Repository\ServiceRepository;
use Illuminate\Http\JsonResponse;

final readonly class ServiceQueryController
{
    public function index(ServiceRepository $repository): JsonResponse
    {

    }

    public function show(int $id, ServiceRepository $repository): JsonResponse
    {

    }
}
