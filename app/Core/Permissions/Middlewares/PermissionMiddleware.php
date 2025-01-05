<?php

declare(strict_types=1);

namespace App\Core\Permissions\Middlewares;

use App\Core\Permissions\Annotations\HasPermission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

final class PermissionMiddleware
{
    public function handle($request, \Closure $next): Response|JsonResponse
    {
        $action = Route::currentRouteAction();

        [$controller, $method] = explode('@', $action);

        $attributes = new \ReflectionClass($controller)->getMethod($method)->getAttributes(HasPermission::class);

        if(empty($attributes)) {
            return $next($request);
        }

        /* @var HasPermission $permission */
        $permission = $attributes[0]->newInstance();

        if(!$permission->hasPermission()) {
            return response()->json(data: [], status: 403);
        }


        return $next($request);
    }
}
