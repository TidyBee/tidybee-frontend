# End-to-End Tests (E2E)

This folder contains the scripts and documentation necessary to create and launch end-to-end tests for the TidyBee front-end.

## Objective

E2E tests are designed to ensure the proper functioning of the application in an environment similar to that of production. These tests replicate real user interactions, from launching the application to completing specific scenarios.

## Prerequisites

Make sure to have the following installed before running the tests:

- npm install

## Test Creation

### Test Structure

E2E tests are organized in the `/tests/e2e/` directory and are separated based on the application's features. Each test file follows a specific structure to ensure easy maintenance and a clear understanding of the tested scenarios.

```plaintext
/specs/
|-- /dashboard
|   |-- /dashboard/gradeWidget/
|   |-- testExample.spec.js
|   |-- /dashboard/textWidgets/
|   |-- testExample.spec.js
|   |-- /dashboard/graphWidget/
|   |-- testExample.spec.js
|   |-- /dashboard/overViewWidget/
|   |-- testExample.spec.js
|-- SettingPage.spec.js
```

### Use of `data-cy` for Selectors

To facilitate element identification during test creation, we use the `data-cy` attribute in our components. This separates test logic from HTML structure and avoids fragile dependencies on specific classes or tags.

#### `data-cy` Naming Convention

When adding the `data-cy` attribute, follow a clear and descriptive naming convention. For example, for a login button, the `data-cy` selector could be defined as follows:

```html
<v-btn class="refresh-btn" @click="refresh"> {{ $t('dashboard.refresh') }} </v-btn>
```

This intuitive naming convention makes selectors easy to understand and use in tests without constantly inspecting the source code.

## Running Tests

Launch tests with a visual representation:
- npm run test:e2e-withoutHeadles

Launch tests in the terminal:
- npm run test:e2e

## Directory Structure

- `/tests`: Contains E2E test scripts.
- `/videos`: Contains detailed videos generated after test execution.
- `/screenshots`: Contains screenshots taken when tests fail.

**Happy testing!**