import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity('currencies')
export class CurrencyEntity extends BaseEntity {
    // properties
    @Column({ type: 'varchar', length: 3, unique: true })
    code: string

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar', length: 10 })
    symbol: string
}
