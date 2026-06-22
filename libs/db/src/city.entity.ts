import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { CountryEntity } from './country.entity'
import { StateEntity } from './state.entity'

@Entity('cities')
export class CityEntity extends BaseEntity {
    // properties
    @Index({ fulltext: true })
    @Column({ type: 'varchar' })
    name: string

    // relations
    @Index()
    @Column({ type: 'varchar', length: 26, nullable: true })
    stateId: string | null

    @ManyToOne(() => StateEntity, { nullable: true })
    @JoinColumn({ name: 'stateId' })
    state: StateEntity | null

    @Index()
    @Column({ type: 'varchar', length: 26 })
    countryId: string

    @ManyToOne(() => CountryEntity)
    @JoinColumn({ name: 'countryId' })
    country: CountryEntity
}
