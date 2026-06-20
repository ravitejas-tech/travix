import { RoleEntity } from '@travix/db'
import { Role } from '@travix/shared'
import { DataSource } from 'typeorm'
import { BaseSeeder } from './base.seeder'

export class RoleSeeder extends BaseSeeder {
    async run(dataSource: DataSource): Promise<void> {
        const manager = dataSource.manager

        for (const role of Object.values(Role)) {
            const exists = await manager.findOneBy(RoleEntity, { name: role })
            if (!exists) {
                await manager.save(manager.create(RoleEntity, { name: role }))
            }
        }
    }
}
