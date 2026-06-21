import { DefaultErrorFunction, SetErrorFunction } from '@sinclair/typebox/errors'

import { setFormats } from './formats'
import { patchNestJsSwagger } from './swagger-patch'
import { Configure } from './types'

export const configureNestJsTypebox = (options?: Configure) => {
    SetErrorFunction(
        (params) => (params.schema as { errorMessage?: string }).errorMessage ?? DefaultErrorFunction(params),
    )

    if (options?.patchSwagger) {
        patchNestJsSwagger()
    }

    if (options?.setFormats) {
        setFormats()
    }
}
