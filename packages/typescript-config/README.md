# `@travix/typescript-config` (Shared tsconfig Configs) 📦🏷️

This package provides **shared TypeScript compiler configurations** used across the Travix monorepo to maintain uniform TypeScript compilation and strict typing.

---

## 📁 Available Configurations

The package exports three compiler profiles:

1.  **Base Configuration (`base.json`)**
    - _Target_: General configuration rules.
    - _Details_: Targets `ES2022`, enables `strict` compiler checks, generates type declaration maps (`declarationMap: true`), resolves JSON modules, and sets `noUncheckedIndexedAccess` to true to enforce safe array indexing.
2.  **NestJS Configuration (`nestjs.json`)**
    - _Target_: Backend API and CLI applications.
    - _Details_: Extends the base compiler configurations and explicitly enables decorator metadata support (`emitDecoratorMetadata: true`, `experimentalDecorators: true`), which are essential for NestJS dependency injection.
3.  **React Router Configuration (`react-router.json`)**
    - _Target_: Frontend web client.
    - _Details_: Extends base configurations and adds compiler options tailored for React 19 and JSX parsing.

---

## 🚀 How to Use

In any application or library `tsconfig.json`:

Extend the relevant configuration:

```json
{
    "extends": "@travix/typescript-config/nestjs.json", // or base.json, react-router.json
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*"]
}
```

Ensure `@travix/typescript-config` is added to your project's `package.json` `devDependencies` workspace dependencies.
