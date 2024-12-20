<?php

namespace App\Core\Dto\Annotations;

#[\Attribute]
class Serialize
{
    protected string $serializedKey;
    protected array $keys = [];

    /**
     * @param string $serializedKey
     */
    public function __construct(string $serializedKey,...$fallbackKeys)
    {
        $this->serializedKey = $serializedKey;
        $this->keys = $fallbackKeys;
    }

    public function getSerializedKey(): string
    {
        return $this->serializedKey;
    }

    public function getKeys(): array
    {
        return $this->keys;
    }
}
