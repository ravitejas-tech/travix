import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { InjectDataSource } from '@nestjs/typeorm'
import { UserEntity } from '@travix/db'
import { DataSource } from 'typeorm'
import { GetProfileQuery } from '../impl/get-profile.query'

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<GetProfileQuery> {
    constructor(@InjectDataSource() private readonly datasource: DataSource) {}

    async execute(query: GetProfileQuery) {
        const user = await this.datasource.manager.findOne(UserEntity, {
            where: { id: query.userId },
            relations: ['roles'],
        })

        if (!user) {
            throw new NotFoundException('user not found')
        }

        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName ?? null,
            lastName: user.lastName ?? null,
            phone: user.phone ?? null,
            roles: user.roles?.map((role) => role.name) ?? [],
        }
    }
}
