import { IdProviderEntity } from './id-provider.entity'
import { TimestampedEntity } from './timestamped.entity'

export abstract class BaseEntity extends IdProviderEntity {
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}

Object.assign(BaseEntity.prototype, TimestampedEntity.prototype)
