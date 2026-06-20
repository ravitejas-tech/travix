import { CurrencyEntity } from '@travix/db'
import { DataSource } from 'typeorm'
import { BaseSeeder } from './base.seeder'

const CURRENCIES: Pick<CurrencyEntity, 'code' | 'name' | 'symbol'>[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
]

export class CurrencySeeder extends BaseSeeder {
    async run(dataSource: DataSource): Promise<void> {
        const manager = dataSource.manager

        for (const data of CURRENCIES) {
            const exists = await manager.findOneBy(CurrencyEntity, { code: data.code })
            if (!exists) {
                await manager.save(manager.create(CurrencyEntity, data))
            }
        }
    }
}
