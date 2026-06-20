import { Logger } from '@nestjs/common'
import { camelCase } from 'change-case-all'
import { mkdir, writeFile } from 'fs/promises'
import { CommandRunner, Option, SubCommand } from 'nest-commander'
import { basename, dirname, resolve } from 'path'

@SubCommand({ name: 'migrations:create', arguments: '<path>' })
export class MigrationCreateCommand extends CommandRunner {
    private readonly logger = new Logger(MigrationCreateCommand.name)

    @Option({ flags: '--timestamp [number]' })
    parseTimestamp(timestamp: any) {
        if (timestamp && (isNaN(timestamp) || timestamp < 0)) {
            throw new Error(`timestamp must be a non-negative number, received: ${timestamp}`)
        }
        return timestamp ? new Date(Number(timestamp)).getTime() : Date.now()
    }

    async run(passedParams: string[], options?: Record<string, any>) {
        try {
            let [dir] = passedParams
            dir = dir.startsWith('/') ? dir : resolve(process.cwd(), dir)
            const { timestamp = Date.now() } = options
            const filename = `${timestamp}-${basename(dir)}.ts`
            const migrationName = `${camelCase(basename(dir))}${timestamp}`
            const content = `import { MigrationInterface, QueryRunner } from "typeorm";

export class ${migrationName} implements MigrationInterface {
    name = '${migrationName}'

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
`
            await mkdir(dirname(dir), { recursive: true })
            const migrationFile = `${dirname(dir)}/${filename}`
            await writeFile(migrationFile, content)
            this.logger.log(`Migration ${migrationFile} created successfully.`)
        } catch (err) {
            this.logger.error('Error creating migration:', err)
        }
    }
}
