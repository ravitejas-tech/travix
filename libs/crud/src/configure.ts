import { setFormats } from './formats'
import { patchNestJsSwagger } from './swagger-patch'
import { Configure } from './types'

export const configureNestJsTypebox = (options?: Configure) => {
    if (options?.patchSwagger) {
        patchNestJsSwagger()
    }
    if (options?.setFormats) {
        setFormats()
    }
}
