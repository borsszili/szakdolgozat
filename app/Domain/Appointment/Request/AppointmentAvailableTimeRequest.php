<?php

declare(strict_types=1);

namespace App\Domain\Appointment\Request;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @param int $service_id
 * @param int $employee_id
 */
final class AppointmentAvailableTimeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'start' => 'required|date',
            'end' => 'required|date',
            'service_id' => 'required|int|exists:service,id',
            'employee_id' => 'required|int|exists:employee,id'
        ];
    }
}
