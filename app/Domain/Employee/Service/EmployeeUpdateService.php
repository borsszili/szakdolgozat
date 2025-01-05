<?php

declare(strict_types=1);

namespace App\Domain\Employee\Service;

use App\Domain\Employee\Exception\EmployeeUpdateFailedException;
use App\Domain\Employee\Model\Employee;
use App\Domain\Employee\Request\EmployeeUpdateRequest;

final readonly class EmployeeUpdateService
{
    public function update(EmployeeUpdateRequest $request): Employee
    {
        $data = $request->validated();

        $this->validate($data);

        $update = Employee::query()
            ->find($data['id'])
            ->update($data);

        if(!$update) throw new EmployeeUpdateFailedException();

        return Employee::query()->find($data['id']);
    }

    public function validate(array $data): void
    {

    }
}
