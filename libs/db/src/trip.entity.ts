import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { BudgetType, TripStatus } from '@travix/shared'
import { BaseEntity } from './base.entity'
import { BudgetEstimationEntity } from './budget-estimation.entity'
import { CityEntity } from './city.entity'
import { HotelSuggestionEntity } from './hotel-suggestion.entity'
import { ItineraryDayEntity } from './itinerary-day.entity'
import { UserEntity } from './user.entity'

@Entity('trips')
export class TripEntity extends BaseEntity {
    // properties
    @Column({ type: 'int' })
    numberOfDays: number

    @Column({ type: 'enum', enum: BudgetType })
    budgetType: BudgetType

    @Column({ type: 'json' })
    interests: string[]

    @Column({ type: 'enum', enum: TripStatus, default: TripStatus.DRAFT })
    status: TripStatus

    // relations
    @Index()
    @Column({ type: 'varchar', length: 26, nullable: true })
    userLocationId: string | null

    @ManyToOne(() => CityEntity)
    @JoinColumn({ name: 'userLocationId' })
    userLocation: CityEntity | null

    @Index()
    @Column({ type: 'varchar', length: 26 })
    userId: string

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
    user: UserEntity

    @Index()
    @Column({ type: 'varchar', length: 26 })
    cityId: string

    @ManyToOne(() => CityEntity)
    @JoinColumn({ name: 'cityId' })
    city: CityEntity

    @OneToMany(() => ItineraryDayEntity, (day) => day.trip)
    days: ItineraryDayEntity[]

    @OneToOne(() => BudgetEstimationEntity, (budget) => budget.trip)
    budget: BudgetEstimationEntity | null

    @OneToMany(() => HotelSuggestionEntity, (hotel) => hotel.trip)
    hotels: HotelSuggestionEntity[]
}
