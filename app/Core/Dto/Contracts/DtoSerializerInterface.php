<?php

namespace App\Core\Dto\Contracts;

use ReflectionProperty;

interface DtoSerializerInterface
{
    public function serialize($item);

    /**
     * @return iterable<ReflectionProperty>
     */
    public function getDtoProperties(): iterable;
}
