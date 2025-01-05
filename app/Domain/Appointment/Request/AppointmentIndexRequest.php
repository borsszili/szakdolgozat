<?php

namespace App\Domain\Appointment\Request;

use App\Core\Traits\RequestDefaultValuesTrait;
use Illuminate\Foundation\Http\FormRequest;

class AppointmentIndexRequest extends FormRequest
{
    use RequestDefaultValuesTrait;

    public function defaults(): array
    {
        return [
            "guestId" => null,
            "employeeId" => null,
            "offset" => 0,
            "limit" => 10,
        ];
    }
}
