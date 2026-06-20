import { Type as NestType } from '@nestjs/common'
import { createRequire } from 'module'
import { dirname, resolve } from 'path'
import { TypeGuard } from '@sinclair/typebox'

interface SchemaObjectFactory {
    exploreModelSchema(type: any, schemas: Record<string, any>, schemaRefsStack?: string[]): string
    isLazyTypeFunc(type: any): boolean
}

const _require = createRequire(__filename)
const pkgRoot = dirname(_require.resolve('@nestjs/swagger/package.json'))
const { SchemaObjectFactory } = _require(resolve(pkgRoot, 'dist/services/schema-object-factory.js')) as {
    SchemaObjectFactory: { prototype: SchemaObjectFactory & { __travixPatched?: boolean } }
}

function isSchemaValidator(type: any): boolean {
    return type && typeof type === 'object' && typeof type.validate === 'function'
}

export function patchNestJsSwagger() {
    if (SchemaObjectFactory.prototype.__travixPatched) return
    const defaultExplore = SchemaObjectFactory.prototype.exploreModelSchema

    const extendedExplore: SchemaObjectFactory['exploreModelSchema'] = function exploreModelSchema(
        this: SchemaObjectFactory,
        type,
        schemas,
        schemaRefsStack,
    ) {
        if (this.isLazyTypeFunc(type)) {
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
    SchemaObjectFactory.prototype.__travixPatched = true
}
