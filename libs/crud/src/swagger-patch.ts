import { Type as NestType } from '@nestjs/common'
import { SchemaObjectFactory } from '@nestjs/swagger/dist/services/schema-object-factory'
import { TypeGuard } from '@sinclair/typebox'

function isSchemaValidator(type: any): boolean {
    return type && typeof type === 'object' && typeof type.validate === 'function'
}

export function patchNestJsSwagger() {
    if ((SchemaObjectFactory.prototype as any).__travixPatched) return
    const defaultExplore = SchemaObjectFactory.prototype.exploreModelSchema

    const extendedExplore: SchemaObjectFactory['exploreModelSchema'] = function exploreModelSchema(
        this: SchemaObjectFactory,
        type,
        schemas,
        schemaRefsStack,
    ) {
        if (this['isLazyTypeFunc'](type)) {
            const factory = type as () => NestType<unknown>
            type = factory()
        }
        if (!isSchemaValidator(type)) {
            return defaultExplore.apply(this, [type, schemas, schemaRefsStack])
        }
        schemas[(type as any).name] = (type as any).schema
        return (type as any).name
    }

    SchemaObjectFactory.prototype.exploreModelSchema = extendedExplore
    ;(SchemaObjectFactory.prototype as any).__travixPatched = true
}
