import { BeforeInsert, CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { ulid } from 'ulid'

export abstract class BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 26 })
    id: string

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt: Date | null

    @BeforeInsert()
    generateId() {
        if (!this.id) {
            this.id = ulid()
        }
    }
}
