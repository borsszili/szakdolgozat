<?php

namespace App\Domain\Appointment\Dto;

use App\Core\Dto\Annotations\Serialize;
use App\Core\Dto\BaseDto;

class PagedAppointmentInput extends BaseDto
{
    #[Serialize("guestId")]
    public ?int $guestId = null;

    #[Serialize("employeeId")]
    public ?int $employeeId = 1;

    #[Serialize("offset")]
    public int $offset = 0;

    #[Serialize("limit")]
    public int $limit = 10;
}
