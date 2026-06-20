import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class TimestampedEntity {
    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt: Date | null
}
