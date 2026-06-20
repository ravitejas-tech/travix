import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const setupSwagger = (app: INestApplication) => {
    const builder = new DocumentBuilder()
        .setTitle('Travix API')
        .setDescription('Travix REST API')
        .setVersion('1.0')
        .addBearerAuth()

    if (['local', 'development'].includes(process.env['NODE_ENV'])) {
        builder.addServer(`http://localhost:${process.env['PORT'] ?? 3000}`)
    }

    const document = SwaggerModule.createDocument(app, builder.build(), {
        operationIdFactory: (controllerKey, methodKey) => {
            const splits = methodKey.split(/(?=[A-Z])/)
            return `${splits[0]}${controllerKey.replace('Controller', '')}${splits.slice(1).join('')}`
        },
    })

    SwaggerModule.setup('openapi', app, document, {
        jsonDocumentUrl: 'openapi.json',
        yamlDocumentUrl: 'openapi.yaml',
        swaggerOptions: { persistAuthorization: true },
    })
}
