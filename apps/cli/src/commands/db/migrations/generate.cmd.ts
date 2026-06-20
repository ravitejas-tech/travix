import { Logger } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { format } from '@sqltools/formatter/lib/sqlFormatter'
import chalk from 'chalk'
import { camelCase } from 'change-case-all'
import { mkdir, writeFile } from 'fs/promises'
import { CommandRunner, Option, SubCommand } from 'nest-commander'
import { basename, dirname, resolve } from 'path'
import { DataSource } from 'typeorm'

@SubCommand({ name: 'migrations:generate', arguments: '<path>' })
export class MigrationGenerateCommand extends CommandRunner {
    private readonly logger = new Logger(MigrationGenerateCommand.name)

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        super()
    }

    @Option({ flags: '--timestamp [number]' })
    parseTimestamp(timestamp: any) {
        return timestamp ? new Date(Number(timestamp)).getTime() : Date.now()
    }

    @Option({ flags: '--pretty [boolean]' })
    parsePretty(p: any) { return Boolean(p) }

    @Option({ flags: '--check [boolean]' })
    parseCheck(p: any) { return Boolean(p) }

    @Option({ flags: '--dry [boolean]' })
    parseDryRun(p: any) { return Boolean(p) }

    async run(passedParams: string[], options?: Record<string, any>) {
        let [name] = passedParams
        const migrationsDir = process.env['DATABASE_MIGRATIONS_DIR']
            ? resolve(process.cwd(), process.env['DATABASE_MIGRATIONS_DIR'])
            : process.cwd()
        const dir = name.startsWith('/') ? name : resolve(migrationsDir, name)
        const { timestamp = Date.now(), pretty = false, check = false, dry: dryrun = false } = options

        try {
            this.dataSource.setOptions({ synchronize: false, migrationsRun: false, dropSchema: false, logging: false })
            await this.dataSource.initialize()

            const upSqls: string[] = []
            const downSqls: string[] = []

            try {
                const sqlInMemory = await this.dataSource.driver.createSchemaBuilder().log()

                if (pretty) {
                    sqlInMemory.upQueries.forEach((q) => { q.query = this.prettify(q.query) })
                    sqlInMemory.downQueries.forEach((q) => { q.query = this.prettify(q.query) })
                }

                sqlInMemory.upQueries.forEach((q) => {
                    upSqls.push(`        await queryRunner.query(\`${q.query.replace(/`/g, '\\`')}\`${this.params(q.parameters)});`)
                })
                sqlInMemory.downQueries.forEach((q) => {
                    downSqls.push(`        await queryRunner.query(\`${q.query.replace(/`/g, '\\`')}\`${this.params(q.parameters)});`)
                })
            } finally {
                await this.dataSource.destroy()
            }

            if (!upSqls.length) {
                this.logger.log(chalk.yellow('No schema changes detected.'))
                return
            }

            const migrationName = `${camelCase(basename(dir))}${timestamp}`
            const content = `import { MigrationInterface, QueryRunner } from "typeorm";

export class ${migrationName} implements MigrationInterface {
    name = '${migrationName}'

    public async up(queryRunner: QueryRunner): Promise<void> {
${upSqls.join('\n')}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
${downSqls.reverse().join('\n')}
    }
}
`
            if (check) {
                this.logger.log(chalk.yellow(`Schema changes detected:\n\n${content}`))
                process.exit(1)
            }

            if (dryrun) {
                this.logger.log(chalk.green(`Dry run — migration content:\n\n${content}`))
            } else {
                const filename = `${dirname(dir)}/${timestamp}-${basename(dir)}.ts`
                await mkdir(dirname(dir), { recursive: true })
                await writeFile(filename, content)
                this.logger.log(chalk.green(`Migration ${chalk.blue(filename)} generated successfully.`))
            }
        } catch (err) {
            this.logger.error('Error generating migration:', err)
        }
    }

    private params(parameters: any[] | undefined): string {
        return parameters?.length ? `, ${JSON.stringify(parameters)}` : ''
    }

    private prettify(query: string): string {
        const formatted = format(query, { indent: '    ' })
        return '\n' + formatted.replace(/^/gm, '            ') + '\n        '
    }
}
