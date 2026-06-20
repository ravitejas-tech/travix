import { registerAs } from '@nestjs/config'
import { Params } from 'nestjs-pino'
import { version } from '../../package.json'

export const loggerConfig = registerAs('logger.config', (): Params => {
    const isProd = process.env['NODE_ENV'] === 'production'
    const level = process.env['LOG_LEVEL'] ?? (isProd ? 'info' : 'debug')

    return {
        pinoHttp: {
            level,
            base: {
                pid: process.pid,
                serviceName: 'api',
                serviceVersion: version,
            },
            redact: {
                paths: [
                    'req.headers.authorization',
                    'req.headers.cookie',
                    '*.password',
                    '*.token',
                    '*.secret',
                ],
                remove: true,
            },
            ...(isProd
                ? {}
                : {
                      transport: {
                          target: 'pino-pretty',
                          options: {
                              all: true,
                              colorize: true,
                              translateTime: 'SYS:HH:MM:ss.l',
                              ignore: 'pid,hostname',
                          },
                      },
                  }),
        },
    }
})
