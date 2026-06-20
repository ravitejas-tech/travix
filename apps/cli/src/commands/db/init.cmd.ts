import { Inject, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectDataSource } from '@nestjs/typeorm'
import { CommandRunner, SubCommand } from 'nest-commander'
import { DataSource } from 'typeorm'
import { createDatabase, dropDatabase } from 'typeorm-extension'

@SubCommand({ name: 'init' })
export class DbInitCommand extends CommandRunner {
    private readonly logger = new Logger(DbInitCommand.name)

    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
        @Inject(ConfigService) private readonly configService: ConfigService,
    ) {
        super()
    }

    async run(_passedParams: string[], _options?: Record<string, any>) {
        await dropDatabase(this.dataSource)
        this.logger.log('Database dropped.')
        await createDatabase({ options: this.dataSource.options, synchronize: false })
        this.logger.log('Database created.')
    }
}

@SubCommand({ name: 'drop' })
export class DbDropCommand extends CommandRunner {
    private readonly logger = new Logger(DbDropCommand.name)

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        super()
    }

    async run(_passedParams: string[], _options?: Record<string, any>) {
        try {
            this.dataSource.setOptions({ logging: ['query', 'error'] })
            await this.dataSource.initialize()
            await this.dataSource.dropDatabase()
            await this.dataSource.destroy()
            this.logger.log('Database dropped.')
        } catch (err) {
            this.logger.error('Error dropping database:', err)
            if (this.dataSource?.isInitialized) await this.dataSource.destroy()
        }
    }
}
