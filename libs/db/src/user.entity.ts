import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column({ type: 'varchar', nullable: true })
    firstName: string

    @Column({ type: 'varchar', nullable: true })
    lastName: string

    @Column({ type: 'varchar', nullable: true })
    phone: string | null

    @Column({ type: 'varchar', unique: true })
    email: string

    @Column('varchar', { nullable: true })
    password: string

    @Column('date', { nullable: true })
    dateOfBirth: Date

    // CONSTANTS
    static PASSWORD_SALT_ROUNDS: number = 10
}
