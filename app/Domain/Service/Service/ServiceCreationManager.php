<?php

declare(strict_types=1);

namespace App\Domain\Service\Service;

use App\Domain\Service\Model\Service;
use App\Domain\Service\Request\ServiceCreateRequest;

final readonly class ServiceCreationManager
{
    public function create(ServiceCreateRequest $request): object
    {
        $data = $request->validated();

        return Service::query()->create($data);
    }
}
