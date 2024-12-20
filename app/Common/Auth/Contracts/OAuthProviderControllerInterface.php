<?php

namespace App\Common\Auth\Contracts;

interface OAuthProviderControllerInterface
{
    public function redirectToProvider();

    public function handleProviderCallback();
}
