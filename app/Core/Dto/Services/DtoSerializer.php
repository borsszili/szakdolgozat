<?php

namespace App\Core\Dto\Services;

use App\Core\Debug\Contracts\Debugable;
use App\Core\Dto\BaseDto;
use App\Core\Dto\Contracts\DtoSerializerInterface;
use ReflectionException;
use ReflectionProperty;


class DtoSerializer implements DtoSerializerInterface
{
    /**
     * @var iterable<ReflectionProperty>|null
     */
    private ?array $dtoProperties = null;

    public function __construct(
        private readonly string $dtoClass)
    {
        if (!is_a($dtoClass, BaseDto::class, true)) {
            throw new \RuntimeException("Dto class must implement BaseDto!");
        }
    }

    public function serialize($item)
    {
        $callable = [$this->dtoClass, 'serialize'];
        if (!is_callable($callable)) {
            throw new \RuntimeException("dtoClass::serialize is not callable!");
        }
        return call_user_func($callable, $item);
    }

    /**
     * @return iterable<ReflectionProperty>
     * @throws ReflectionException
     */
    public function getDtoProperties(): iterable
    {
        if (null === $this->dtoProperties) {
            $reflection = new \ReflectionClass($this->dtoClass);
            $this->dtoProperties = $reflection->getProperties(ReflectionProperty::IS_PUBLIC);
        }
        yield from $this->dtoProperties;
    }

    public function debug(): array
    {
        return [
            'dtoClass' => $this->dtoClass
        ];
    }
}

