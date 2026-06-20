import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { HotelCategory } from '@travix/shared'
import { BaseEntity } from './base.entity'
import { TripEntity } from './trip.entity'

@Entity('hotel_suggestions')
export class HotelSuggestionEntity extends BaseEntity {
    // properties
    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'enum', enum: HotelCategory })
    category: HotelCategory

    @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
    rating: number | null

    @Column({ type: 'text', nullable: true })
    description: string | null

    @Column({ type: 'int' })
    sortOrder: number

    // relations
    @Index()
    @Column({ type: 'varchar', length: 26 })
    tripId: string

    @ManyToOne(() => TripEntity, (trip) => trip.hotels)
    @JoinColumn({ name: 'tripId' })
    trip: TripEntity
}
