import { BeforeInsert, PrimaryColumn } from 'typeorm'
import { ulid } from 'ulid'

export abstract class IdProviderEntity {
    @PrimaryColumn({ type: 'varchar', length: 26 })
    id: string

    @BeforeInsert()
    generateId() {
        if (!this.id) {
            this.id = ulid()
        }
    }
}
