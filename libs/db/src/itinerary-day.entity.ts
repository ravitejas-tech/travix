import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { ActivityEntity } from './activity.entity'
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

    @ManyToOne(() => TripEntity, (trip) => trip.days)
    @JoinColumn({ name: 'tripId' })
    trip: TripEntity

    @OneToMany(() => ActivityEntity, (activity) => activity.itineraryDay)
    activities: ActivityEntity[]
}
