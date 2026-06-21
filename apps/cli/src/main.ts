import { CommandFactory } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { CliModule } from './cli.module';

async function bootstrap() {
  await CommandFactory.run(CliModule, new Logger());
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
