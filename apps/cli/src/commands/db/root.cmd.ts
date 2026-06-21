import { Command, CommandRunner } from 'nest-commander';
import {
  MigrationCreateCommand,
  MigrationGenerateCommand,
  MigrationRevertCommand,
  MigrationRunCommand,
  MigrationShowCommand,
} from './migrations';
import { SeedDbCommand } from './seed.cmd';
import { DbDropCommand, DbInitCommand } from './init.cmd';

@Command({
  name: 'db',
  subCommands: [
    MigrationGenerateCommand,
    MigrationRunCommand,
    MigrationRevertCommand,
    MigrationShowCommand,
    MigrationCreateCommand,
    DbInitCommand,
    DbDropCommand,
    SeedDbCommand,
  ],
})
export class DbRootCommand extends CommandRunner {
  async run(_passedParams: string[], _options?: Record<string, any>) {}
}
