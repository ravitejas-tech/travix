// @nestjs/swagger restricts subpath exports (no `./dist/constants`), so we mirror the
// single metadata key we rely on. Value must match `DECORATORS.API_RESPONSE` in @nestjs/swagger.
export const API_RESPONSE_METADATA = 'swagger/apiResponse'
