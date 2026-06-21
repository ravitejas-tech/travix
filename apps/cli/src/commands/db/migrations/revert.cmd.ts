import { Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CommandRunner, SubCommand } from 'nest-commander';
import { DataSource } from 'typeorm';

@SubCommand({ name: 'migrations:revert' })
export class MigrationRevertCommand extends CommandRunner {
  private readonly logger = new Logger(MigrationRevertCommand.name);

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super();
  }

  async run(_passedParams: string[], _options?: Record<string, any>) {
    try {
      this.dataSource.setOptions({
        subscribers: [],
        logging: ['query', 'error', 'schema'],
      });
      await this.dataSource.initialize();
      await this.dataSource.undoLastMigration();
      await this.dataSource.destroy();
      this.logger.log('Last migration reverted successfully.');
    } catch (err) {
      this.logger.error('Error reverting migration:', err);
      if (this.dataSource?.isInitialized) await this.dataSource.destroy();
    }
  }
}
