import { DataSource } from 'typeorm'
import { Seeder } from 'typeorm-extension'

export abstract class BaseSeeder implements Seeder {
    abstract run(dataSource: DataSource): Promise<void>
}
