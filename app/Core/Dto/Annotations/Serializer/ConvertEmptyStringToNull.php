<?php

namespace App\Core\Dto\Annotations\Serializer;

use App\Core\Dto\Contracts\AttributeSerializerTransformerInterface;

#[\Attribute]
class ConvertEmptyStringToNull implements AttributeSerializerTransformerInterface
{
    public function run($data) {
        return $data === "" ? null : $data;
    }
}
