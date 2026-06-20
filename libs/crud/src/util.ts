import { TSchema, Type, SchemaOptions } from '@sinclair/typebox'

export const Nullable = <T extends TSchema>(schema: T) => Type.Union([schema, Type.Null()])

export const capitalize = <S extends string>(str: S): Capitalize<S> =>
    (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<S>
