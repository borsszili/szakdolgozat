<?php

namespace App\Core\Dto\Contracts;

interface AttributeSerializerTransformerInterface
{
    public function run($data);
}
