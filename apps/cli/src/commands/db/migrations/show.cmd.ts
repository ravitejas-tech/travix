import { Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CommandRunner, SubCommand } from 'nest-commander';
import { DataSource } from 'typeorm';

@SubCommand({ name: 'migrations:show' })
export class MigrationShowCommand extends CommandRunner {
  private readonly logger = new Logger(MigrationShowCommand.name);

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super();
  }

  async run(_passedParams: string[], _options?: Record<string, any>) {
    try {
      this.dataSource.setOptions({ subscribers: [], logging: ['schema'] });
      await this.dataSource.initialize();
      await this.dataSource.showMigrations();
      await this.dataSource.destroy();
    } catch (err) {
      this.logger.error('Error showing migrations:', err);
      if (this.dataSource?.isInitialized) await this.dataSource.destroy();
    }
  }
}
