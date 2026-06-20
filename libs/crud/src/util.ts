import { SchemaOptions, Static, StringOptions, TLiteral, TObject, TSchema, TUnion, Type } from '@sinclair/typebox'

import { AllKeys, Obj, TPartialSome } from './types'

export const capitalize = <S extends string>(str: S): Capitalize<S> => {
    return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<S>
}

export const isObj = (obj: unknown): obj is Obj => obj !== null && typeof obj === 'object'

export type TUnionOfString<T extends string[], Acc extends TSchema[] = []> = T extends [
    infer L extends string,
    ...infer R extends string[],
]
    ? TUnionOfString<R, [...Acc, TLiteral<L>]>
    : Acc

export const LiteralUnion = <const T extends string[]>(
    values: [...T],
    options?: SchemaOptions,
): TUnion<TUnionOfString<T>> => {
    return Type.Union(
        values.map((value) => Type.Literal(value)),
        options,
    ) as never
}

export const PartialSome = <T extends TObject, K extends AllKeys<Static<T>>[]>(
    schema: T,
    keys: readonly [...K],
    options?: SchemaOptions,
): TPartialSome<T, K> => {
    return Type.Composite([Type.Omit(schema, keys), Type.Partial(Type.Pick(schema, keys))], options)
}

// NOTE: Latest version of typebox makes Omit/Pick distributive by default, but loses strongly typed keys
export const DistOmit = <T extends TSchema, K extends AllKeys<Static<T>>[]>(
    schema: T,
    keys: readonly [...K],
    options?: SchemaOptions,
) => {
    return Type.Omit(schema, keys, options)
}

export const DistPick = <T extends TSchema, K extends AllKeys<Static<T>>[]>(
    schema: T,
    keys: readonly [...K],
    options?: SchemaOptions,
) => {
    return Type.Pick(schema, keys, options)
}

export const MaybeArray = <T extends TSchema>(schema: T, options?: SchemaOptions) =>
    Type.Union([schema, Type.Array(schema)], options)

export const Nullable = <T extends TSchema>(schema: T, options?: SchemaOptions) =>
    Type.Optional(Type.Union([schema, Type.Null()], options))

export const MaybeDateOrDateString = () => Type.Union([Type.String({ format: 'date-time' }), Type.Date()])

export const IsoDate = (options?: StringOptions) =>
    Type.Transform(Type.String({ format: 'date-time', ...options }))
        .Decode((value) => new Date(value))
        .Encode((value) => value.toISOString())
