/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface V1AuthControllerRegisterBody {
    firstName?: string | null
    lastName?: string | null
    /**
     * @format email
     * @example "johndoe@example.com"
     */
    email: string
    /**
     * @minLength 8
     * @maxLength 64
     * @example "abcd@123456"
     */
    password: string
}

export interface V1AuthControllerRegisterResponse {
    accessToken: string
    refreshToken: string
    user: {
        id: string
        /** @format email */
        email: string
        firstName?: string | null
        lastName?: string | null
        phone?: string | null
        roles: string[]
    }
}

export interface V1AuthControllerLoginBody {
    /**
     * @format email
     * @example "johndoe@example.com"
     */
    email: string
    /**
     * @minLength 8
     * @maxLength 64
     * @example "abcd@123456"
     */
    password: string
}

export interface V1AuthControllerLoginResponse {
    accessToken: string
    refreshToken: string
    user: {
        id: string
        /** @format email */
        email: string
        firstName?: string | null
        lastName?: string | null
        phone?: string | null
        roles: string[]
    }
}

export interface V1AuthControllerRefreshBody {
    refreshToken: string
}

export interface V1AuthControllerRefreshResponse {
    accessToken: string
    refreshToken: string
    user: {
        id: string
        /** @format email */
        email: string
        firstName?: string | null
        lastName?: string | null
        phone?: string | null
        roles: string[]
    }
}

export interface V1AuthControllerMeResponse {
    id: string
    /** @format email */
    email: string
    firstName?: string | null
    lastName?: string | null
    phone?: string | null
    roles: string[]
}

export interface V1LocationsControllerSearchCitiesResponse {
    items: {
        id: string
        name: string
        stateName?: string | null
        countryId: string
        countryName: string
        countryCode: string
    }[]
    meta: {
        itemCount: number
        itemsPerPage: number
        currentPage: number
        totalItems?: number | null
        totalPages?: number | null
    }
    links?: {
        first?: string
        last?: string
        next?: string
        previous?: string
    } | null
}

export interface V1TripsControllerCreateBody {
    /** @example "01J0X8Z9C0V8Q5K3R7T2M4N6P8" */
    cityId: string
    /**
     * @min 1
     * @max 30
     * @example 5
     */
    numberOfDays: number
    /** @example "medium" */
    budgetType: 'low' | 'medium' | 'high'
    /** @example ["food","culture"] */
    interests: string[]
    /**
     * @minLength 3
     * @maxLength 3
     * @default "USD"
     * @example "USD"
     */
    currencyCode?: string
}

export interface V1TripsControllerCreateResponse {
    id: string
    destination: {
        cityId: string
        cityName: string
        countryName: string
    }
    numberOfDays: number
    budgetType: 'low' | 'medium' | 'high'
    interests: string[]
    status: 'draft' | 'generating' | 'active' | 'archived'
    total?: number | null
    /** @format date-time */
    createdAt: string
    days: {
        id: string
        dayNumber: number
        summary?: string | null
        activities: {
            id: string
            name: string
            description?: string | null
            type: 'food' | 'culture' | 'adventure' | 'shopping' | 'sightseeing' | 'other'
            sortOrder: number
            isCustom: boolean
        }[]
    }[]
    budget?: {
        flights?: number | null
        accommodation?: number | null
        food?: number | null
        activities?: number | null
        total: number
        currencyCode: string
        currencySymbol: string
    } | null
    hotels: {
        id: string
        name: string
        category: 'budget' | 'mid_range' | 'luxury'
        rating?: number | null
        description?: string | null
        sortOrder: number
    }[]
}

export interface V1TripsControllerListResponse {
    items: {
        id: string
        destination: {
            cityId: string
            cityName: string
            countryName: string
        }
        numberOfDays: number
        budgetType: 'low' | 'medium' | 'high'
        interests: string[]
        status: 'draft' | 'generating' | 'active' | 'archived'
        total?: number | null
        /** @format date-time */
        createdAt: string
    }[]
    meta: {
        itemCount: number
        itemsPerPage: number
        currentPage: number
        totalItems?: number | null
        totalPages?: number | null
    }
    links?: {
        first?: string
        last?: string
        next?: string
        previous?: string
    } | null
}

export interface V1TripsControllerDetailResponse {
    id: string
    destination: {
        cityId: string
        cityName: string
        countryName: string
    }
    numberOfDays: number
    budgetType: 'low' | 'medium' | 'high'
    interests: string[]
    status: 'draft' | 'generating' | 'active' | 'archived'
    total?: number | null
    /** @format date-time */
    createdAt: string
    days: {
        id: string
        dayNumber: number
        summary?: string | null
        activities: {
            id: string
            name: string
            description?: string | null
            type: 'food' | 'culture' | 'adventure' | 'shopping' | 'sightseeing' | 'other'
            sortOrder: number
            isCustom: boolean
        }[]
    }[]
    budget?: {
        flights?: number | null
        accommodation?: number | null
        food?: number | null
        activities?: number | null
        total: number
        currencyCode: string
        currencySymbol: string
    } | null
    hotels: {
        id: string
        name: string
        category: 'budget' | 'mid_range' | 'luxury'
        rating?: number | null
        description?: string | null
        sortOrder: number
    }[]
}

export interface V1ItineraryControllerRegenerateDayBody {
    instructions?: string | null
}

export interface V1ItineraryControllerRegenerateDayResponse {
    id: string
    dayNumber: number
    summary?: string | null
    activities: {
        id: string
        name: string
        description?: string | null
        type: 'food' | 'culture' | 'adventure' | 'shopping' | 'sightseeing' | 'other'
        sortOrder: number
        isCustom: boolean
    }[]
}

export interface V1ItineraryControllerAddActivityBody {
    /** @example "Sunset cruise" */
    name: string
    description?: string | null
    /** @example "adventure" */
    type: 'food' | 'culture' | 'adventure' | 'shopping' | 'sightseeing' | 'other'
}

export interface V1ItineraryControllerAddActivityResponse {
    id: string
    name: string
    description?: string | null
    type: 'food' | 'culture' | 'adventure' | 'shopping' | 'sightseeing' | 'other'
    sortOrder: number
    isCustom: boolean
}

export type V1HotelsControllerListResponse = {
    id: string
    name: string
    category: 'budget' | 'mid_range' | 'luxury'
    rating?: number | null
    description?: string | null
    sortOrder: number
}[]

export type V1HotelsControllerRegenerateResponse = {
    id: string
    name: string
    category: 'budget' | 'mid_range' | 'luxury'
    rating?: number | null
    description?: string | null
    sortOrder: number
}[]

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean
    /** request path */
    path: string
    /** content type of request body */
    type?: ContentType
    /** query params */
    query?: QueryParamsType
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType
    /** request body */
    body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
    securityWorker?: (
        securityData: SecurityDataType | null,
    ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
    secure?: boolean
    format?: ResponseType
}

export enum ContentType {
    Json = 'application/json',
    JsonApi = 'application/vnd.api+json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
    Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
    public instance: AxiosInstance
    private securityData: SecurityDataType | null = null
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
    private secure?: boolean
    private format?: ResponseType

    constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
        this.instance = axios.create({
            ...axiosConfig,
            baseURL: axiosConfig.baseURL || 'http://localhost:6500',
        })
        this.secure = secure
        this.format = format
        this.securityWorker = securityWorker
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data
    }

    protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
        const method = params1.method || (params2 && params2.method)

        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        }
    }

    protected stringifyFormItem(formItem: unknown) {
        if (typeof formItem === 'object' && formItem !== null) {
            return JSON.stringify(formItem)
        } else {
            return `${formItem}`
        }
    }

    protected createFormData(input: Record<string, unknown>): FormData {
        if (input instanceof FormData) {
            return input
        }
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key]
            const propertyContent: any[] = property instanceof Array ? property : [property]

            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
            }

            return formData
        }, new FormData())
    }

    public request = async <T = any, _E = any>({
        secure,
        path,
        type,
        query,
        format,
        body,
        ...params
    }: FullRequestParams): Promise<AxiosResponse<T>> => {
        const secureParams =
            ((typeof secure === 'boolean' ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {}
        const requestParams = this.mergeRequestParams(params, secureParams)
        const responseFormat = format || this.format || undefined

        if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
            body = this.createFormData(body as Record<string, unknown>)
        }

        if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
            body = JSON.stringify(body)
        }

        return this.instance.request({
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type ? { 'Content-Type': type } : {}),
            },
            params: query,
            responseType: responseFormat,
            data: body,
            url: path,
        })
    }
}

/**
 * @title Travix API
 * @version 1.0
 * @baseUrl http://localhost:6500
 * @contact
 *
 * Travix REST API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    v1 = {
        /**
         * No description
         *
         * @tags Auth
         * @name RegisterV1Auth
         * @summary Register a new user
         * @request POST:/v1/auth/register
         */
        registerV1Auth: (data: V1AuthControllerRegisterBody, params: RequestParams = {}) =>
            this.request<V1AuthControllerRegisterResponse, any>({
                path: `/v1/auth/register`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auth
         * @name LoginV1Auth
         * @summary Authenticate with email and password
         * @request POST:/v1/auth/login
         */
        loginV1Auth: (data: V1AuthControllerLoginBody, params: RequestParams = {}) =>
            this.request<V1AuthControllerLoginResponse, any>({
                path: `/v1/auth/login`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auth
         * @name RefreshV1Auth
         * @summary Exchange a refresh token for a new token pair
         * @request POST:/v1/auth/refresh
         */
        refreshV1Auth: (data: V1AuthControllerRefreshBody, params: RequestParams = {}) =>
            this.request<V1AuthControllerRefreshResponse, any>({
                path: `/v1/auth/refresh`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auth
         * @name MeV1Auth
         * @summary Get the authenticated user profile
         * @request GET:/v1/auth/me
         * @secure
         */
        meV1Auth: (params: RequestParams = {}) =>
            this.request<V1AuthControllerMeResponse, any>({
                path: `/v1/auth/me`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Locations
         * @name SearchV1LocationsCities
         * @summary Search destination cities
         * @request GET:/v1/locations/cities
         */
        searchV1LocationsCities: (
            query?: {
                /** @example "tokyo" */
                search?: string
                /**
                 * @min 1
                 * @default 1
                 */
                page?: number
                /**
                 * @min 1
                 * @max 100
                 * @default 20
                 */
                limit?: number
            },
            params: RequestParams = {},
        ) =>
            this.request<V1LocationsControllerSearchCitiesResponse, any>({
                path: `/v1/locations/cities`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Trips
         * @name CreateV1Trips
         * @summary Create a trip and generate its itinerary
         * @request POST:/v1/trips
         * @secure
         */
        createV1Trips: (data: V1TripsControllerCreateBody, params: RequestParams = {}) =>
            this.request<V1TripsControllerCreateResponse, any>({
                path: `/v1/trips`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Trips
         * @name ListV1Trips
         * @summary List the authenticated user trips
         * @request GET:/v1/trips
         * @secure
         */
        listV1Trips: (
            query?: {
                /**
                 * @min 1
                 * @default 1
                 */
                page?: number
                /**
                 * @min 1
                 * @max 100
                 * @default 20
                 */
                limit?: number
                /** @example "Tokyo" */
                search?: string
                /** @example "budget_high" */
                sort?: 'recent' | 'budget_high' | 'budget_low'
            },
            params: RequestParams = {},
        ) =>
            this.request<V1TripsControllerListResponse, any>({
                path: `/v1/trips`,
                method: 'GET',
                query: query,
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Trips
         * @name DetailV1Trips
         * @summary Get a trip with its itinerary, budget and hotels
         * @request GET:/v1/trips/{tripId}
         * @secure
         */
        detailV1Trips: (tripId: string, params: RequestParams = {}) =>
            this.request<V1TripsControllerDetailResponse, any>({
                path: `/v1/trips/${tripId}`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Trips
         * @name RemoveV1Trips
         * @summary Delete a trip
         * @request DELETE:/v1/trips/{tripId}
         * @secure
         */
        removeV1Trips: (tripId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/v1/trips/${tripId}`,
                method: 'DELETE',
                secure: true,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Itinerary
         * @name RegenerateV1ItineraryDay
         * @summary Regenerate an itinerary day
         * @request POST:/v1/trips/{tripId}/days/{dayId}/regenerate
         * @secure
         */
        regenerateV1ItineraryDay: (
            dayId: string,
            tripId: string,
            data: V1ItineraryControllerRegenerateDayBody,
            params: RequestParams = {},
        ) =>
            this.request<V1ItineraryControllerRegenerateDayResponse, any>({
                path: `/v1/trips/${tripId}/days/${dayId}/regenerate`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Itinerary
         * @name AddV1ItineraryActivity
         * @summary Add a custom activity to a day
         * @request POST:/v1/trips/{tripId}/days/{dayId}/activities
         * @secure
         */
        addV1ItineraryActivity: (
            dayId: string,
            tripId: string,
            data: V1ItineraryControllerAddActivityBody,
            params: RequestParams = {},
        ) =>
            this.request<V1ItineraryControllerAddActivityResponse, any>({
                path: `/v1/trips/${tripId}/days/${dayId}/activities`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Itinerary
         * @name RemoveV1ItineraryActivity
         * @summary Remove an activity from a day
         * @request DELETE:/v1/trips/{tripId}/days/{dayId}/activities/{activityId}
         * @secure
         */
        removeV1ItineraryActivity: (activityId: string, dayId: string, tripId: string, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/v1/trips/${tripId}/days/${dayId}/activities/${activityId}`,
                method: 'DELETE',
                secure: true,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Hotels
         * @name ListV1Hotels
         * @summary List hotel suggestions for a trip
         * @request GET:/v1/trips/{tripId}/hotels
         * @secure
         */
        listV1Hotels: (tripId: string, params: RequestParams = {}) =>
            this.request<V1HotelsControllerListResponse, any>({
                path: `/v1/trips/${tripId}/hotels`,
                method: 'GET',
                secure: true,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags Hotels
         * @name RegenerateV1Hotels
         * @summary Regenerate hotel suggestions for a trip
         * @request POST:/v1/trips/{tripId}/hotels/regenerate
         * @secure
         */
        regenerateV1Hotels: (tripId: string, params: RequestParams = {}) =>
            this.request<V1HotelsControllerRegenerateResponse, any>({
                path: `/v1/trips/${tripId}/hotels/regenerate`,
                method: 'POST',
                secure: true,
                format: 'json',
                ...params,
            }),
    }
}
