import { FormatRegistry } from '@sinclair/typebox'

export function setFormats() {
    FormatRegistry.Set('date-time', (value) => !isNaN(Date.parse(value)))
    FormatRegistry.Set('date', (value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
    FormatRegistry.Set('email', (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    FormatRegistry.Set('uri', (value) => {
        try {
            new URL(value)
            return true
        } catch {
            return false
        }
    })
}
