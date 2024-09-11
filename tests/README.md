# Tidybee Front-End Tests
This directory contains both unit tests and E2E (End-to-End) tests for Tidybee. Unit tests are essential to ensure that the various parts of the application function correctly in isolation. E2E tests, on the other hand, simulate real user behavior, verifying the end-to-end interaction between the various application components.

## Available commands

### Running tests

1. Unit Tests

To execute unit tests, utilize the following command:

```npm run test:unit```

This command will execute the unit tests and showcase the results within the console. Unit tests are designed to validate the functionality of individual units or components in isolation

2. End-to-End (E2E) Tests

For running end-to-end (E2E) tests, utilize the following command:

```npm run test:e2e```

This command will trigger Cypress, allowing the execution of end-to-end tests. E2E tests simulate real user interactions and validate the application's behavior across multiple components, ensuring seamless end-to-end functionality.

## Test conventions

1. File structure
Test files should be placed in the tests/unit/ directory.

2. Naming test files
Test files should be named using the file-name.spec.js convention.

3. Using test libraries
This project uses Jest as the default test framework for unit testing. Assertions can be made with Jest or other libraries such as 'chai' or 'expect'.

4. Test organization
Organize your tests by functionality or component, using 'describe' blocks to group and describe expected behavior.