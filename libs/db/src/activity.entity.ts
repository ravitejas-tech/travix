import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { ActivityType } from '@travix/shared'
import { BaseEntity } from './base.entity'
import { ItineraryDayEntity } from './itinerary-day.entity'

@Entity('activities')
export class ActivityEntity extends BaseEntity {
    // properties
    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'text', nullable: true })
    description: string | null

    @Column({ type: 'enum', enum: ActivityType })
    type: ActivityType

    @Column({ type: 'int' })
    sortOrder: number

    @Column({ type: 'boolean', default: false })
    isCustom: boolean

    // relations
    @Index()
    @Column({ type: 'varchar', length: 26 })
    itineraryDayId: string

    @ManyToOne(() => ItineraryDayEntity)
    @JoinColumn({ name: 'itineraryDayId' })
    itineraryDay: ItineraryDayEntity
}
