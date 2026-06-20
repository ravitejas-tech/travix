import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { TripEntity } from './trip.entity'

@Entity('itinerary_days')
export class ItineraryDayEntity extends BaseEntity {
    // properties
    @Column({ type: 'int' })
    dayNumber: number

    @Column({ type: 'varchar', nullable: true })
    summary: string | null

    // relations
    @Index()
    @Column({ type: 'varchar', length: 26 })
    tripId: string

    @ManyToOne(() => TripEntity)
    @JoinColumn({ name: 'tripId' })
    trip: TripEntity
}
