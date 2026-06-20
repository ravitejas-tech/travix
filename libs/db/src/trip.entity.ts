import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { BudgetType, TripStatus } from '@travix/shared'
import { BaseEntity } from './base.entity'
import { CityEntity } from './city.entity'
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
}
