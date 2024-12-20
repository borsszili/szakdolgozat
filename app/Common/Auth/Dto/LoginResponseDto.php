<?php

namespace App\Common\Auth\Dto;

use App\Common\User\Model\User;
use App\Core\Dto\Annotations\Serialize;
use App\Core\Dto\BaseDto;

class LoginResponseDto extends BaseDto
{
    #[Serialize("token")]
    public ?string $token;

    #[Serialize("user")]
    public ?User $user;
}
