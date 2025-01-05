<?php

declare(strict_types=1);

namespace App\Core\Permissions\Annotations;

use App\Common\User\Model\User;
use App\Core\Permissions\Contracts\PermissionCallbackInterface;
use App\Core\Permissions\Contracts\PermissionEnumInterface;
use App\Core\Permissions\Exceptions\InvalidPermissionCallbackTypeException;

#[\Attribute]
final class HasPermission
{

    public function __construct(
        private PermissionEnumInterface|string $permission,
        private readonly null|PermissionCallbackInterface|\Closure $callback = null
    ) {}

    /**
     * @throws InvalidPermissionCallbackTypeException
     */
    public function hasPermission(): bool
    {
        /* @var ?User $user*/
        $user = request()->user();

        if(is_a($this->permission, PermissionEnumInterface::class)) {
            $this->permission = $this->permission->value;
        }

        if(is_null($this->callback)) {
            return $user->hasPermissionTo($this->permission);
        }

        if(is_a($this->callback, PermissionCallbackInterface::class)) {
            return $user->hasPermissionTo($this->permission) && $this->callback->validate();
        }

        $callback = $this->callback;

        $callbackVal = $callback($user);

        if(!is_bool($callbackVal)) throw new InvalidPermissionCallbackTypeException("Non boolean return value given!");

        return ($user->hasPermissionTo($this->permission) && $callbackVal);

    }
}
