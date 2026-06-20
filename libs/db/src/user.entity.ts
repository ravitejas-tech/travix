import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { RoleEntity } from './role.entity'

@Entity('users')
export class UserEntity extends BaseEntity {
    // properties
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

    // relations
    @ManyToMany(() => RoleEntity, (r) => r.name, { cascade: true })
    @JoinTable()
    roles: RoleEntity[]

    // constants
    static PASSWORD_SALT_ROUNDS: number = 10
}
