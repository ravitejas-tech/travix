import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { CountryEntity } from './country.entity'

@Entity('states')
export class StateEntity extends BaseEntity {
    // properties
    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar', nullable: true })
    code: string | null

    // relations
    @Index()
    @Column({ type: 'varchar', length: 26 })
    countryId: string

    @ManyToOne(() => CountryEntity)
    @JoinColumn({ name: 'countryId' })
    country: CountryEntity
}
