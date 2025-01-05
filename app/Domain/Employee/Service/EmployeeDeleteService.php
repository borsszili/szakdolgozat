<?php

declare(strict_types=1);

namespace App\Domain\Employee\Service;

use App\Domain\Employee\Model\Employee;
use App\Domain\Employee\Request\EmployeeDeleteRequest;

final readonly class EmployeeDeleteService
{
    public function delete(EmployeeDeleteRequest $request): bool
    {
        $data = $request->validated();

        return Employee::query()->find($data['id'])->delete();
    }
}
