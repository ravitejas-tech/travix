import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { CurrencyEntity } from './currency.entity'
import { TripEntity } from './trip.entity'

@Entity('budget_estimations')
export class BudgetEstimationEntity extends BaseEntity {
    // properties
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    flights: number | null

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    accommodation: number | null

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    food: number | null

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    activities: number | null

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number

    // relations
    @Column({ type: 'varchar', length: 26, unique: true })
    tripId: string

    @OneToOne(() => TripEntity, (trip) => trip.budget)
    @JoinColumn({ name: 'tripId' })
    trip: TripEntity

    @Index()
    @Column({ type: 'varchar', length: 26 })
    currencyId: string

    @ManyToOne(() => CurrencyEntity)
    @JoinColumn({ name: 'currencyId' })
    currency: CurrencyEntity
}
