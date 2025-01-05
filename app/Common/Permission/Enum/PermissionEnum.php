<?php

declare(strict_types=1);

namespace App\Common\Permission\Enum;

use App\Core\Permissions\Contracts\PermissionEnumInterface;

enum PermissionEnum: string implements PermissionEnumInterface
{
    case USER_FETCH = "user fetch";
    case USER_UPDATE = "user update";
    case USER_DELETE = "user delete";

    case APPOINTMENT_CREATE = "appointment create";
    case APPOINTMENT_UPDATE = "appointment update";
    case APPOINTMENT_DELETE = "appointment delete";
    case APPOINTMENT_FETCH = "appointment fetch";

    case SERVICE_CREATE = "service create";
    case SERVICE_UPDATE = "service update";
    case SERVICE_DELETE = "service delete";
    case SERVICE_FETCH = "service fetch";

    case EMPLOYEE_CREATE = "employee create";
    case EMPLOYEE_UPDATE = "employee update";
    case EMPLOYEE_DELETE = "employee delete";
    case EMPLOYEE_FETCH = "employee fetch";
}
