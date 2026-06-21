# `@travix/eslint-config` (Shared ESLint Rules) 📦🚨

This configuration package establishes **shared ESLint rules** to maintain clean code and formatting across the Travix monorepo.

---

## 📁 Available Configurations

The package exports three main rule sets tailored for different environments:

1.  **Base Configuration (`base.js`)**
    - _Target_: General TypeScript files and utility libraries.
    - _Details_: Extends `eslint-config-turbo`, `@typescript-eslint/recommended`, and integrates `eslint-plugin-prettier` to enforce Prettier formatting checks directly through the linter pipeline.
2.  **NestJS Configuration (`nest.js`)**
    - _Target_: Backend API and CLI applications.
    - _Details_: Configures specific rules suited for NestJS dependency injection frameworks and decorators.
3.  **React Router Configuration (`react-router.js`)**
    - _Target_: Frontend web client.
    - _Details_: Enforces browser environment configurations, JSX/TSX syntax checks, and React-specific hooks and syntax.

---

## 🚀 How to Use

In any application or library `package.json`:

1.  Add the package to `devDependencies`:
    ```json
    "@travix/eslint-config": "workspace:*"
    ```
2.  Reference the configuration in `.eslintrc.js` or `eslint.config.js`:
    ```javascript
    module.exports = {
        extends: ['@travix/eslint-config/nest'], // or base, react-router
    }
    ```
3.  Run linting from the monorepo root:
    ```bash
    yarn lint
    ```
