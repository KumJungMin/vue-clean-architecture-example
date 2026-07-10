// Compatibility layer for the current unpublished smart-schema-converter package.
// Remove the Vite/TS aliases when the GitHub package ships importable dist files.
export interface MappingRuleOptions<TValue> {
    dtoOrigin?: string;
    dtoDescription?: string;
    domainDescription?: string;
    defaultValue?: TValue;
}

export interface MappingRule<TValue> {
    path: string;
    options?: MappingRuleOptions<TValue>;
    read(value: unknown, dto: unknown): TValue;
}

export type MappingSpec<TDto, TDomain> = {
    readonly __dtoType?: (dto: TDto) => void;
} & {
    [Key in keyof TDomain]: MappingRule<TDomain[Key]>;
};

export function defineMap<TDto, TDomain>() {
    return (spec: MappingSpec<TDto, TDomain>) => spec;
}

export function source<TValue>(
    path: string,
    options?: MappingRuleOptions<TValue>
): MappingRule<TValue> {
    return {
        path,
        options,
        read(value) {
            if (value === undefined && options && 'defaultValue' in options) {
                return options.defaultValue as TValue;
            }

            return value as TValue;
        }
    };
}

export function transform<TValue, TResult>(
    path: string,
    mapper: (value: TValue, dto: unknown) => TResult,
    options?: MappingRuleOptions<TResult>
): MappingRule<TResult> {
    return {
        path,
        options,
        read(value, dto) {
            if (value === undefined && options && 'defaultValue' in options) {
                return options.defaultValue as TResult;
            }

            return mapper(value as TValue, dto);
        }
    };
}

export function makeMapper<TDto, TDomain>(spec: MappingSpec<TDto, TDomain>) {
    return (dto: TDto): TDomain => {
        const rules = spec as unknown as Record<string, MappingRule<unknown>>;

        return Object.entries(rules).reduce<Record<string, unknown>>((domain, [domainKey, mappingRule]) => {
            domain[domainKey] = mappingRule.read(readPath(dto, mappingRule.path), dto);
            return domain;
        }, {}) as TDomain;
    };
}

function readPath(sourceValue: unknown, path: string): unknown {
    return path.split('.').reduce<unknown>((current, key) => {
        if (current === null || current === undefined) {
            return undefined;
        }

        if (Array.isArray(current) && /^\d+$/.test(key)) {
            return current[Number(key)];
        }

        if (typeof current === 'object') {
            return (current as Record<string, unknown>)[key];
        }

        return undefined;
    }, sourceValue);
}
