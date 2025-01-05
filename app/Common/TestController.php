<?php

namespace App\Common;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class TestController
{
    public function test(Request $request) {
        dd(Route::currentRouteAction(), $request->user());
    }
}
