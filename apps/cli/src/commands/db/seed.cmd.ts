import { Logger } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { CountrySeeder, CurrencySeeder, RoleSeeder } from '@travix/seeders'
import { CommandRunner, Option, SubCommand } from 'nest-commander'
import { DataSource } from 'typeorm'
import { runSeeders, SeederConstructor } from 'typeorm-extension'

const ALL_SEEDERS: SeederConstructor[] = [RoleSeeder, CurrencySeeder, CountrySeeder]

@SubCommand({ name: 'seed' })
export class SeedDbCommand extends CommandRunner {
    private readonly logger = new Logger(SeedDbCommand.name)

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        super()
    }

    @Option({ flags: '--initial [boolean]' })
    parseInitial(b: any) { return Boolean(b) }

    async run(_passedParams: string[], options?: Record<string, any>) {
        const { initial = false } = options ?? {}
        try {
            await this.dataSource.initialize()

            const seeds: SeederConstructor[] = initial ? ALL_SEEDERS : []

            await runSeeders(this.dataSource, { seeds, seedTracking: false })
            this.logger.log('Seeding complete.')
        } catch (err) {
            this.logger.error('Seeding error:', err)
        } finally {
            if (this.dataSource?.isInitialized) await this.dataSource.destroy()
        }
    }
}
