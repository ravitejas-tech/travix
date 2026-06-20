import { Logger } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { CommandRunner, Option, SubCommand } from 'nest-commander'
import { DataSource } from 'typeorm'

@SubCommand({ name: 'migrations:run' })
export class MigrationRunCommand extends CommandRunner {
    private readonly logger = new Logger(MigrationRunCommand.name)

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        super()
    }

    @Option({ flags: '--fake [boolean]' })
    parseFake(value: any) { return Boolean(value) }

    @Option({ flags: '--transaction [string]' })
    parseTx(value: any) { return value }

    async run(_passedParams: string[], options?: Record<string, any>) {
        try {
            const { transaction, fake } = options
            this.dataSource.setOptions({ subscribers: [], logging: ['query', 'error', 'schema'] })
            await this.dataSource.initialize()

            const txMode = ['all', 'none', 'each'].includes(transaction) ? transaction : undefined
            await this.dataSource.runMigrations({ transaction: txMode, fake: !!fake })
            await this.dataSource.destroy()
            this.logger.log('Migrations ran successfully.')
        } catch (err) {
            this.logger.error('Error running migrations:', err)
            if (this.dataSource?.isInitialized) await this.dataSource.destroy()
        }
    }
}
