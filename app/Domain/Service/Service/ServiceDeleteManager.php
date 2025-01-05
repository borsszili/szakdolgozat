<?php

declare(strict_types=1);

namespace App\Domain\Service\Service;

use App\Domain\Service\Model\Service;
use App\Domain\Service\Request\ServiceDeleteRequest;

final readonly class ServiceDeleteManager
{
    public function delete(int $id, ServiceDeleteRequest $request): bool
    {
        return Service::query()
            ->where('id', $id)
            ->delete();
    }
}
