import { getCitiesOfState, getCountries, getStatesOfCountry } from '@countrystatecity/countries'
import { CityEntity, CountryEntity, StateEntity } from '@travix/db'
import { DataSource, EntityManager } from 'typeorm'
import { ulid } from 'ulid'
import { BaseSeeder } from './base.seeder'

interface CSCState {
    iso2: string
    name: string
}

interface CSCCity {
    name: string
}

export class CountrySeeder extends BaseSeeder {
    async run(dataSource: DataSource): Promise<void> {
        await this.seedCountries(dataSource.manager)

        const countries: CountryEntity[] = await dataSource.manager.find(CountryEntity)
        for (const country of countries) {
            await this.seedCountryStates(dataSource.manager, country)
        }

        const states: StateEntity[] = await dataSource.manager.find(StateEntity, { relations: ['country'] })
        for (const state of states) {
            await this.seedStateCities(dataSource.manager, state)
        }
    }

    async seedCountries(manager: EntityManager): Promise<void> {
        const countries = await getCountries()
        const existing: CountryEntity[] = await manager.find(CountryEntity)
        const existingCodes = new Set(existing.map((c) => c.code))

        const toPersist = countries
            .filter((c) => !existingCodes.has(c.iso2))
            .map((c) => manager.create(CountryEntity, { id: ulid(), name: c.name, code: c.iso2 }))

        if (toPersist.length > 0) {
            await manager.save(toPersist)
        }
    }

    async seedCountryStates(manager: EntityManager, country: CountryEntity): Promise<void> {
        const existing: StateEntity[] = await manager.find(StateEntity, { where: { countryId: country.id } })
        const existingCodes = new Set(existing.map((s) => s.code))

        const statesData = (await getStatesOfCountry(country.code)) as CSCState[]
        const toPersist = statesData
            .filter((s) => !existingCodes.has(s.iso2))
            .map((s) =>
                manager.create(StateEntity, {
                    id: ulid(),
                    name: s.name,
                    code: s.iso2,
                    country: country,
                }),
            )

        if (toPersist.length > 0) {
            await manager.save(toPersist)
        }
    }

    async seedStateCities(manager: EntityManager, state: StateEntity): Promise<void> {
        const existing: CityEntity[] = await manager.find(CityEntity, { where: { stateId: state.id } })
        const existingNames = new Set(existing.map((c) => c.name))

        const citiesData = (await getCitiesOfState(state.country.code, state.code)) as CSCCity[]
        const toPersist = citiesData
            .filter((c) => !existingNames.has(c.name))
            .map((c) =>
                manager.create(CityEntity, {
                    id: ulid(),
                    name: c.name,
                    state: state,
                    country: state.country,
                }),
            )

        if (toPersist.length === 0) return

        const chunkSize = 500
        for (let i = 0; i < toPersist.length; i += chunkSize) {
            await manager.save(toPersist.slice(i, i + chunkSize))
        }
    }
}
