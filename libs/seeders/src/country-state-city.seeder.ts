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
        console.log('[CountrySeeder] Starting country/state/city seeding...')

        await dataSource.manager.transaction(async (manager) => {
            const countries = await this.seedCountries(manager)
            console.log(`[CountrySeeder] ${countries.length} countries in DB.`)

            const states = await this.seedAllStates(manager, countries)
            console.log(`[CountrySeeder] ${states.length} states in DB.`)

            await this.seedAllCities(manager, states, countries)
            const cityCount = await manager.count(CityEntity)
            console.log(`[CountrySeeder] ${cityCount} cities in DB. Done.`)
        })
    }

    private async seedCountries(manager: EntityManager): Promise<CountryEntity[]> {
        const countries = await getCountries()
        const existing: CountryEntity[] = await manager.find(CountryEntity)
        const existingCodes = new Set(existing.map((c) => c.code))

        const newCountries = countries
            .filter((c) => !existingCodes.has(c.iso2))
            .map((c) => ({ id: ulid(), name: c.name, code: c.iso2 }))

        if (newCountries.length > 0) {
            const chunkSize = 100
            for (let i = 0; i < newCountries.length; i += chunkSize) {
                await manager.insert(CountryEntity, newCountries.slice(i, i + chunkSize))
            }
            console.log(`[CountrySeeder] Inserted ${newCountries.length} new countries.`)
        }

        return manager.find(CountryEntity)
    }

    private async seedAllStates(
        manager: EntityManager,
        countries: CountryEntity[],
    ): Promise<StateEntity[]> {
        const existing: StateEntity[] = await manager.find(StateEntity)
        const existingKeys = new Set(existing.map((s) => `${s.countryId}:${s.code}`))

        const allNewStates: { id: string; name: string; code: string; countryId: string }[] = []

        for (const country of countries) {
            const statesData = (await getStatesOfCountry(country.code)) as CSCState[]
            for (const s of statesData) {
                if (!existingKeys.has(`${country.id}:${s.iso2}`)) {
                    allNewStates.push({
                        id: ulid(),
                        name: s.name,
                        code: s.iso2,
                        countryId: country.id,
                    })
                }
            }
        }

        if (allNewStates.length > 0) {
            const chunkSize = 500
            for (let i = 0; i < allNewStates.length; i += chunkSize) {
                await manager.insert(StateEntity, allNewStates.slice(i, i + chunkSize))
            }
            console.log(`[CountrySeeder] Inserted ${allNewStates.length} new states.`)
        }

        return manager.find(StateEntity, { relations: ['country'] })
    }

    private async seedAllCities(
        manager: EntityManager,
        states: StateEntity[],
        countries: CountryEntity[],
    ): Promise<void> {
        const countryById = new Map(countries.map((c) => [c.id, c]))

        const existingCities: CityEntity[] = await manager.find(CityEntity)
        const existingKeys = new Set(existingCities.map((c) => `${c.stateId}:${c.name}`))

        const allNewCities: { id: string; name: string; stateId: string; countryId: string }[] = []
        let processedStates = 0

        for (const state of states) {
            const country = countryById.get(state.countryId) ?? state.country
            if (!country) continue

            const citiesData = (await getCitiesOfState(country.code, state.code)) as CSCCity[]

            for (const c of citiesData) {
                if (!existingKeys.has(`${state.id}:${c.name}`)) {
                    allNewCities.push({
                        id: ulid(),
                        name: c.name,
                        stateId: state.id,
                        countryId: country.id,
                    })
                }
            }

            processedStates++
            if (processedStates % 500 === 0) {
                console.log(
                    `[CountrySeeder] Processed ${processedStates}/${states.length} states, ${allNewCities.length} new cities queued...`,
                )
            }
        }

        if (allNewCities.length > 0) {
            console.log(`[CountrySeeder] Inserting ${allNewCities.length} cities in chunks...`)
            const chunkSize = 1000
            for (let i = 0; i < allNewCities.length; i += chunkSize) {
                await manager.insert(CityEntity, allNewCities.slice(i, i + chunkSize))
                if ((i / chunkSize) % 10 === 0) {
                    console.log(
                        `[CountrySeeder] Inserted ${Math.min(i + chunkSize, allNewCities.length)}/${allNewCities.length} cities...`,
                    )
                }
            }
        }
    }
}
