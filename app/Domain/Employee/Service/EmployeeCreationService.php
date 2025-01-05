<?php

declare(strict_types=1);

namespace App\Domain\Employee\Service;

use App\Domain\Employee\Model\Employee;
use App\Domain\Employee\Request\EmployeeCreateRequest;

final readonly class EmployeeCreationService
{
    public function create(EmployeeCreateRequest $request): Employee
    {
        $data = $request->validated();

        $this->validate($data);

        return Employee::query()->create($data);
    }

    private function validate(array $validatedData): void
    {
    }
}
