import { Global, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GoogleGenAI } from '@google/genai'
import { GeminiGenerationService } from './services/gemini-generation.service'
import { GenerationService } from './services/generation.service'
import { StubGenerationService } from './services/stub-generation.service'

@Global()
@Module({
    providers: [
        {
            provide: GenerationService,
            inject: [ConfigService],
            useFactory(configService: ConfigService): GenerationService {
                const logger = new Logger(GenerationModule.name)
                const apiKey = configService.get<string>('GEMINI_API_KEY')

                if (!apiKey) {
                    logger.warn('GEMINI_API_KEY not set — using deterministic stub generator')
                    return new StubGenerationService()
                }

                const model = configService.get<string>('GEMINI_MODEL', 'gemini-flash-latest')
                logger.log(`Using Gemini generator (model: ${model})`)
                return new GeminiGenerationService(new GoogleGenAI({ apiKey }), model)
            },
        },
    ],
    exports: [GenerationService],
})
export class GenerationModule {}
