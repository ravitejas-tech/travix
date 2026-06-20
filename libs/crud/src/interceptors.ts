import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { API_RESPONSE_METADATA } from './constants'
import { isSchemaValidator } from './decorators'

@Injectable()
export class TypeboxTransformInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            map((data) => {
                const responseMeta = this.reflector.get(API_RESPONSE_METADATA, context.getHandler()) ?? {}
                const validator = (responseMeta['200'] || responseMeta['201'] || {})['type']

                if (!isSchemaValidator(validator)) {
                    return data
                }

                return validator.validate(data)
            }),
        )
    }
}
