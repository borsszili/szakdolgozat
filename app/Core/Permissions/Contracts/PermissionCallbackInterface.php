<?php

namespace App\Core\Permissions\Contracts;

interface PermissionCallbackInterface
{
    public function validate(): bool;
}
