import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity('countries')
export class CountryEntity extends BaseEntity {
    // properties
    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar', length: 2, unique: true })
    code: string
}
