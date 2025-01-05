<?php

declare(strict_types=1);

namespace App\Domain\Service\Service;

use App\Domain\Service\Model\Service;
use App\Domain\Service\Request\ServiceUpdateRequest;

final readonly class ServiceUpdateManager
{
    public function update(int $id, ServiceUpdateRequest $request): int
    {
        $data = $request->validated();

        return Service::query()
            ->where('id', $id)
            ->update($data);
    }
}
