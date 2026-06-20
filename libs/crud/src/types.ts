import type { TSchema } from '@sinclair/typebox'

export interface Configure {
    patchSwagger?: boolean
    setFormats?: boolean
}

export interface SchemaValidator<T extends TSchema = TSchema> {
    schema: T
    name: string
    check: (value: unknown) => boolean
    validate: (data: unknown) => unknown
}
