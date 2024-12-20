<?php

declare(strict_types = 1);

namespace App\Core\Dto\Annotations\Serializer;

use App\Core\Dto\Contracts\AttributeSerializerTransformerInterface;

#[\Attribute]
class RemovePropertyIfNull implements AttributeSerializerTransformerInterface
{

    public function run($data)
    {
        // TODO: Implement run() method.
    }
}
